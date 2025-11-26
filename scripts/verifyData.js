
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials.')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verify() {
    console.log('Verifying Supabase connection...')
    const { data, error } = await supabase.from('artists').select('*')

    if (error) {
        console.error('Error fetching artists:', error)
    } else {
        console.log('Successfully fetched artists:', data)
        console.log(`Found ${data.length} artists.`)
    }
}

verify()
