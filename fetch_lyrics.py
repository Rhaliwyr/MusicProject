import os
import lyricsgenius
import uuid
import re
from deep_translator import GoogleTranslator
import nltk
from nltk.corpus import wordnet
import random
import time
from langdetect import detect

# Ensure NLTK data is downloaded
try:
    nltk.data.find('corpora/wordnet.zip')
    nltk.data.find('corpora/omw-1.4.zip')
except LookupError:
    print("Downloading NLTK data...")
    nltk.download('wordnet')
    nltk.download('omw-1.4')

def get_emoji_for_title(title):
    """
    Simple heuristic to generate emojis based on title keywords.
    This is a placeholder for more advanced logic.
    """
    title_lower = title.lower()
    emojis = []
    
    keywords = {
        'love': '❤️', 'heart': '❤️', 'baby': '👶', 'girl': '👧', 'boy': '👦',
        'world': '🌍', 'life': '🧬', 'death': '💀', 'die': '💀', 'kill': '🔪',
        'happy': '😊', 'sad': '😢', 'cry': '😭', 'smile': '🙂', 'sun': '☀️',
        'rain': '🌧️', 'snow': '❄️', 'fire': '🔥', 'water': '💧', 'sea': '🌊',
        'ocean': '🌊', 'river': '🏞️', 'mountain': '⛰️', 'sky': '🌌', 'star': '⭐',
        'moon': '🌙', 'night': '🌃', 'day': '☀️', 'time': '⏳', 'money': '💰',
        'gold': '🥇', 'king': '👑', 'queen': '👸', 'prince': '🤴', 'princess': '👸',
        'god': '🙏', 'devil': '😈', 'angel': '👼', 'demon': '👹', 'ghost': '👻',
        'war': '⚔️', 'peace': '☮️', 'gun': '🔫', 'shoot': '🔫', 'bang': '💥',
        'boom': '💥', 'crash': '💥', 'car': '🚗', 'drive': '🚗', 'road': '🛣️',
        'home': '🏠', 'house': '🏠', 'door': '🚪', 'window': '🪟', 'bed': '🛏️',
        'sleep': '😴', 'dream': '💭', 'wake': '⏰', 'up': '⬆️', 'down': '⬇️',
        'left': '⬅️', 'right': '➡️', 'stop': '🛑', 'go': '🟢', 'run': '🏃',
        'walk': '🚶', 'fly': '✈️', 'bird': '🐦', 'dog': '🐶', 'cat': '🐱',
        'fish': '🐟', 'food': '🍔', 'drink': '🥤', 'party': '🎉', 'dance': '💃',
        'music': '🎵', 'song': '🎤', 'sing': '🎤', 'rock': '🎸', 'roll': '🥐',
        'pop': '🍿', 'jazz': '🎷', 'blues': '💙', 'metal': '🤘', 'punk': '🤘',
        'hey': '👋', 'hello': '👋', 'goodbye': '👋', 'bye': '👋', 'see': '👀',
        'look': '👀', 'watch': '⌚', 'listen': '👂', 'hear': '👂', 'touch': '👈',
        'feel': '😌', 'kiss': '💋', 'hug': '🤗', 'hold': '🤝', 'hand': '✋',
        'face': '😐', 'eye': '👁️', 'mouth': '👄', 'nose': '👃', 'ear': '👂',
        'hair': '💇', 'head': '🗣️', 'body': '🧍', 'arm': '💪', 'leg': '🦵',
        'foot': '🦶', 'shoe': 'u👟', 'hat': '🧢', 'shirt': '👕', 'pants': '👖',
        'dress': '👗', 'skirt': '👗', 'coat': '🧥', 'jacket': '🧥', 'glove': '🧤',
        'scarf': '🧣', 'sock': '🧦', 'boot': '👢', 'bag': '👜', 'purse': '👛',
        'wallet': '👛', 'money': '💵', 'cash': '💵', 'card': '💳', 'coin': '🪙',
        'rich': '🤑', 'poor': '🥺', 'old': '👴', 'new': '🆕', 'young': '👶',
        'big': '🐘', 'small': '🐜', 'long': '📏', 'short': '📏', 'fast': '⏩',
        'slow': '⏪', 'hot': '🥵', 'cold': '🥶', 'warm': '🌡️', 'cool': '😎',
        'good': '👍', 'bad': '👎', 'yes': '✅', 'no': '❌', 'maybe': '🤔',
        'always': '♾️', 'never': '🚫', 'forever': '♾️', 'now': '👇', 'later': '🕒',
        'here': '📍', 'there': '👉', 'where': '❓', 'when': '❓', 'who': '❓',
        'what': '❓', 'why': '❓', 'how': '❓', 'please': '🙏', 'thank': '🙏',
        'sorry': '🙇', 'excuse': '🙇', 'pardon': '🙇', 'welcome': '🤝', 'friend': '🧑‍🤝‍🧑',
        'enemy': '🦹', 'fight': '🥊', 'win': '🏆', 'lose': '🏳️', 'game': '🎮',
        'play': '▶️', 'pause': '⏸️', 'stop': '⏹️', 'record': '🔴', 'camera': '📷',
        'video': '📹', 'movie': '🎬', 'film': '🎞️', 'picture': '🖼️', 'photo': '📸',
        'book': '📖', 'read': '👓', 'write': '✍️', 'pen': '🖊️', 'pencil': '✏️',
        'paper': '📄', 'letter': '✉️', 'email': '📧', 'phone': '📱', 'call': '📞',
        'message': '💬', 'chat': '🗨️', 'talk': '🗣️', 'speak': '🗣️', 'say': '🗣️',
        'shout': '📢', 'whisper': '🤫', 'silent': '🔇', 'loud': '🔊', 'noise': '📢',
        'sound': '🔉', 'voice': '🎤', 'radio': '📻', 'tv': '📺', 'computer': '💻',
        'internet': '🌐', 'web': '🕸️', 'link': '🔗', 'click': '🖱️', 'tap': '👆',
        'swipe': '👆', 'scroll': '📜', 'screen': '🖥️', 'keyboard': '⌨️', 'mouse': '🖱️',
        'battery': '🔋', 'power': '🔌', 'energy': '⚡', 'light': '💡', 'dark': '🌑',
        'black': '⚫', 'white': '⚪', 'red': '🔴', 'blue': '🔵', 'green': '🟢',
        'yellow': '🟡', 'orange': '🟠', 'purple': '🟣', 'pink': '🌸', 'brown': '🟤',
        'gray': '🔘', 'silver': '🥈', 'gold': '🥇', 'rainbow': '🌈', 'cloud': '☁️',
        'storm': '⛈️', 'thunder': '⚡', 'lightning': '⚡', 'wind': '💨', 'breeze': '🍃',
        'flower': '🌸', 'rose': '🌹', 'tree': '🌳', 'forest': '🌲', 'jungle': '🌴',
        'desert': '🌵', 'beach': '🏖️', 'island': '🏝️', 'city': '🏙️', 'town': '🏘️',
        'village': '🏡', 'country': '🏳️', 'nation': '🇺🇳', 'planet': '🪐', 'space': '🚀',
        'universe': '🌌', 'galaxy': '🌌', 'alien': '👽', 'ufo': '🛸', 'robot': '🤖',
        'monster': '👾', 'zombie': '🧟', 'vampire': '🧛', 'witch': '🧙', 'wizard': '🧙',
        'magic': '✨', 'spell': '📜', 'curse': '☠️', 'luck': '🍀', 'fate': '🔮',
        'destiny': '🛤️', 'future': '🔮', 'past': '🕰️', 'present': '🎁', 'history': '📚',
        'science': '🔬', 'math': '🧮', 'art': '🎨', 'sport': '⚽', 'ball': '⚽',
        'team': '👕', 'player': '🏃', 'coach': '🧢', 'stadium': '🏟️', 'gym': '🏋️',
        'workout': '💪', 'run': '🏃', 'swim': '🏊', 'bike': '🚴', 'drive': '🚗',
        'fly': '✈️', 'sail': '⛵', 'travel': '🧳', 'trip': '🗺️', 'vacation': '🏖️',
        'holiday': '🎉', 'christmas': '🎄', 'halloween': '🎃', 'easter': '🐰',
        'birthday': '🎂', 'wedding': '💍', 'marriage': '💒', 'divorce': '💔',
        'single': '👤', 'couple': '👫', 'family': '👪', 'parent': '👪', 'child': '👶',
        'kid': '🧒', 'adult': '🧑', 'man': '👨', 'woman': '👩', 'human': '🧍',
        'animal': '🐾', 'pet': '🐶', 'wild': '🦁', 'zoo': '🦁', 'farm': '🚜',
        'garden': '🌻', 'park': '🏞️', 'school': '🏫', 'college': '🎓', 'university': '🎓',
        'work': '💼', 'job': '👔', 'boss': '👨‍💼', 'office': '🏢', 'factory': '🏭',
        'store': '🏪', 'shop': '🛍️', 'market': '🛒', 'money': '💵', 'bank': '🏦',
        'hospital': '🏥', 'doctor': '👨‍⚕️', 'nurse': '👩‍⚕️', 'police': '👮',
        'firefighter': '👨‍🚒', 'soldier': '🪖', 'army': '🎖️', 'navy': '⚓',
        'airforce': '✈️', 'war': '⚔️', 'peace': '☮️', 'law': '⚖️', 'justice': '⚖️',
        'crime': '🔫', 'prison': '🔒', 'jail': '⛓️', 'thief': '🦹', 'steal': '💰',
        'kill': '🔪', 'murder': '🩸', 'dead': '💀', 'alive': '🧬', 'born': '👶',
    }
    
    # Sort keywords by length descending to match longer phrases first
    sorted_keywords = sorted(keywords.keys(), key=len, reverse=True)
    
    for word in sorted_keywords:
        if word in title_lower:
            emojis.append(keywords[word])
            
    # Remove duplicates while preserving order
    seen = set()
    unique_emojis = []
    for e in emojis:
        if e not in seen:
            unique_emojis.append(e)
            seen.add(e)
        
    return unique_emojis

def clean_lyrics(lyrics):
    """
    Cleans the lyrics by removing section headers and splitting into lines.
    """
    lines = lyrics.split('\n')
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Filter out lines that are just bracketed text like [Chorus], [Verse 1], etc.
        if re.match(r'^\[.*\]$', line):
            continue
        cleaned_lines.append(line)
        
    return cleaned_lines

def translate_lyrics(lines, target='fr'):
    """
    Translates a list of lyric lines to the target language.
    Chunking is important to avoid API limits and context loss.
    """
    translator = GoogleTranslator(source='auto', target=target)
    translated_lines = []
    
    # Batch processing could be faster but might hit limits. Detailed processing per line or chunks.
    # Let's try to batch lines in chunks of text < 5000 chars.
    
    buffer = ""
    batch_lines = []
    
    for line in lines:
        if len(buffer) + len(line) + 1 > 4500: # Safe margin
            try:
                translated_text = translator.translate(buffer)
                if translated_text:
                    translated_lines.extend(translated_text.split('\n'))
                else:
                    # Fallback if empty translation
                    translated_lines.extend(batch_lines)
            except Exception as e:
                print(f"Translation error: {e}")
                translated_lines.extend(batch_lines)
            
            buffer = ""
            batch_lines = []
            time.sleep(1) # Be nice to the API
            
        buffer += line + "\n"
        batch_lines.append(line)
        
    if buffer:
        try:
            translated_text = translator.translate(buffer)
            if translated_text:
                translated_lines.extend(translated_text.split('\n'))
            else:
                translated_lines.extend(batch_lines)
        except Exception as e:
            print(f"Translation error: {e}")
            translated_lines.extend(batch_lines)
            
    # Clean up empty lines from translation result
    return [l.strip() for l in translated_lines if l.strip()]

def get_synonyms(word, lang='fra'):
    """
    Get synonyms for a word in the specified language using WordNet.
    """
    synonyms = set()
    for syn in wordnet.synsets(word, lang=lang):
        for lemma in syn.lemmas(lang=lang):
            synonyms.add(lemma.name().replace('_', ' '))
    return list(synonyms)

def generate_synonym_lyrics(lines, lang='fr'):
    """
    Replaces random words with synonyms.
    Assumes lines are in the target language (default French).
    """
    synonym_lines = []
    nltk_lang = 'fra' if lang == 'fr' else 'eng'
    
    for line in lines:
        words = line.split()
        new_words = []
        for word in words:
            # Clean punctuation for lookup
            clean_word = re.sub(r'[^\w]', '', word.lower())
            
            if len(clean_word) > 3 and random.random() < 0.3: # 30% chance to replace long words
                synonyms = get_synonyms(clean_word, lang=nltk_lang)
                if synonyms:
                    # Pick a random synonym that is not the word itself
                    valid_synonyms = [s for s in synonyms if s.lower() != clean_word.lower()]
                    if valid_synonyms:
                        # Attempt to matching casing/punctuation? keeping it simple for now.
                        new_word = random.choice(valid_synonyms)
                        # primitive casing check
                        if word[0].isupper():
                            new_word = new_word.capitalize()
                        if not word[-1].isalnum():
                            new_word += word[-1]
                        new_words.append(new_word)
                    else:
                        new_words.append(word)
                else:
                    new_words.append(word)
            else:
                new_words.append(word)
        synonym_lines.append(" ".join(new_words))
        
    return synonym_lines

def escape_sql_string(s):
    """
    Escapes single quotes for SQL.
    """
    return s.replace("'", "''")

def generate_sql(artist_name, songs, artist_uuid):
    """
    Generates the SQL content.
    """
    sql_content = f"-- Seed data for {artist_name}\n"
    sql_content += f"-- Artist ID: {artist_uuid}\n\n"
    
    # Insert Artist
    sql_content += f"INSERT INTO public.artists (id, name)\n"
    sql_content += f"VALUES ('{artist_uuid}', '{escape_sql_string(artist_name)}')\n"
    sql_content += f"ON CONFLICT (id) DO NOTHING;\n\n"
    
    # Insert Songs
    sql_content += "INSERT INTO public.songs (id, artist_id, title, lyrics, lyrics_fr, lyrics_synonym, title_emoji)\n"
    sql_content += "VALUES \n"
    
    values_list = []
    
    for song in songs:
        song_id = str(uuid.uuid4())
        title = escape_sql_string(song['title'])
        lyrics_array = "ARRAY[\n    '" + "',\n    '".join([escape_sql_string(line) for line in song['lyrics']]) + "'\n  ]"
        
        # Use generated French lyrics or empty array
        if song.get('lyrics_fr'):
            lyrics_fr = "ARRAY[\n    '" + "',\n    '".join([escape_sql_string(line) for line in song['lyrics_fr']]) + "'\n  ]"
        else:
            lyrics_fr = "ARRAY[]::text[]"

        # Use generated Synonym lyrics or empty array
        if song.get('lyrics_synonym'):
            lyrics_synonym = "ARRAY[\n    '" + "',\n    '".join([escape_sql_string(line) for line in song['lyrics_synonym']]) + "'\n  ]"
        else:
            lyrics_synonym = "ARRAY[]::text[]"
        
        emojis = get_emoji_for_title(song['title'])
        # Ensure at least one empty string if no emojis, to match the pattern we saw? 
        # Actually user wants FIX for empty strings. The fix was in JS.
        # But if we want to be safe, we should provide valid emojis. 
        # If emojis is empty, ARRAY[]::text[] might be better or ARRAY[''] depending on DB constraint?
        # The schema says text[] null.
        # JS Fix: "arr && arr.length > 0 && arr.some(item => item && item.trim() !== '')"
        # So empty list is fine for JS now, but `ARRAY['']` was the problem.
        # Let's generate ARRAY['emoji'] or ARRAY[]::text[] if empty.
        
        if emojis:
             emoji_array = "ARRAY['" + "', '".join(emojis) + "']"
        else:
             emoji_array = "ARRAY[]::text[]"
        
        value = f"(\n  '{song_id}', \n  '{artist_uuid}', \n  '{title}', \n  {lyrics_array}, \n  {lyrics_fr}, \n  {lyrics_synonym}, \n  {emoji_array}\n)"
        values_list.append(value)
        
    sql_content += ",\n".join(values_list)
    sql_content += "\nON CONFLICT (id) DO NOTHING;\n"
    
    return sql_content

def main():
    print("--- Offline Lyrics Fetcher & SQL Generator ---")
    
    # Get inputs
    token = input("Enter your Genius API Access Token: ").strip()
    if not token:
        print("Error: API Token is required.")
        return

    artist_name = input("Enter Artist Name: ").strip()
    if not artist_name:
        print("Error: Artist Name is required.")
        return
        
    try:
        max_songs = int(input("Enter number of songs to fetch: ").strip())
    except ValueError:
        print("Error: Invalid number.")
        return
        
    print(f"Connecting to Genius...")
    genius = lyricsgenius.Genius(token, timeout=15, retries=3)
    
    # Configure genius
    genius.verbose = False
    genius.remove_section_headers = False 
    genius.skip_non_songs = True
    genius.excluded_terms = ["(Remix)", "(Live)"]
    
    print(f"Searching for {artist_name}...")
    artist = genius.search_artist(artist_name, max_songs=max_songs, sort="popularity")
    
    if not artist:
        print("Artist not found.")
        return
        
    print(f"Found {len(artist.songs)} songs.")
    
    processed_songs = []
    for song in artist.songs:
        print(f"Processing: {song.title}")
        cleaned = clean_lyrics(song.lyrics)
        
        # Detect Language
        full_text = "\n".join(cleaned)
        try:
            detected_lang = detect(full_text)
        except:
            detected_lang = 'en' # Fallback
            
        print(f"  - Detected Language: {detected_lang}")
        
        # Translation Logic
        if detected_lang == 'fr':
            print("  - Lyrics are already in French. Skipping translation.")
            lyrics_fr = cleaned
        else:
            print(f"  - Translating to French...")
            lyrics_fr = translate_lyrics(cleaned, target='fr')
        
        # Synonyms (generate from French)
        if detected_lang == 'fr':
            print(f"  - Generating Synonyms (from French)...")
            lyrics_synonym = generate_synonym_lyrics(lyrics_fr, lang='fr')
        else:
            print(f"  - Original not French. Skipping synonyms.")
            lyrics_synonym = []
        
        processed_songs.append({
            'title': song.title,
            'lyrics': cleaned,
            'lyrics_fr': lyrics_fr,
            'lyrics_synonym': lyrics_synonym
        })
        
    # Generate UUID for artist
    artist_uuid = str(uuid.uuid4())
    
    # Generate SQL
    print("Generating SQL...")
    sql_output = generate_sql(artist.name, processed_songs, artist_uuid)
    
    # Save to file
    output_dir = "generated_sql"
    os.makedirs(output_dir, exist_ok=True)
    
    filename = f"seed_{artist.name.replace(' ', '_').lower()}.sql"
    # Remove special chars from filename
    filename = re.sub(r'[^\w\-_.]', '', filename)
    file_path = os.path.join(output_dir, filename)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(sql_output)
        
    print(f"Success! SQL file created: {file_path}")

if __name__ == "__main__":
    main()
