
import { createClient } from '@supabase/supabase-js'
import { mockData } from '../src/data/mockData.js'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const logStream = fs.createWriteStream('migration_debug.log', { flags: 'a' });
function log(message) {
    console.log(message);
    logStream.write(message + '\n');
}

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    const msg = 'Missing Supabase credentials. Please check your .env file.';
    console.error(msg);
    logStream.write(msg + '\n');
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function migrate() {
    log('Starting migration...')

    // 1. Migrate Artists
    log('Migrating artists...')
    for (const artist of mockData.artists) {
        const { error } = await supabase
            .from('artists')
            .upsert({ id: artist.id, name: artist.name })

        if (error) {
            log(`Error migrating artist ${artist.name}: ${JSON.stringify(error)}`)
        } else {
            log(`Migrated artist: ${artist.name}`)
        }

        // 2. Migrate Songs
        if (artist.songs) {
            for (const song of artist.songs) {
                const { error: songError } = await supabase
                    .from('songs')
                    .upsert({
                        id: song.id,
                        artist_id: artist.id,
                        title: song.title,
                        lyrics: song.lyrics,
                        lyrics_fr: song.lyrics_fr,
                        lyrics_synonym: song.lyrics_synonym,
                        title_emoji: song.title_emoji
                    })

                if (songError) {
                    log(`Error migrating song ${song.title}: ${JSON.stringify(songError)}`)
                } else {
                    log(`Migrated song: ${song.title}`)
                }
            }
        }
    }

    log('Migration complete!')
}

migrate()
