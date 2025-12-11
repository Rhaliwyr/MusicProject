import lyricsgenius
import uuid
import re

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
    Cleans the lyrics by removing section headers like [Chorus], [Verse 1], etc.
    And splits into lines.
    """
    # Remove lines that look like headers (e.g., [Chorus], [Verse 1])
    # lines = [line for line in lyrics.split('\n') if not re.match(r'^\[.*\]$', line)]
    
    # Actually, keeping headers might be useful for structure, but the user asked for "integrality of lyrics".
    # The schema uses an array of strings.
    # Let's just split by newline and filter out empty lines.
    
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
        
        # Placeholders for future features
        lyrics_fr = "ARRAY[]::text[]"
        lyrics_synonym = "ARRAY[]::text[]"
        
        emojis = get_emoji_for_title(song['title'])
        emoji_array = "ARRAY['" + "', '".join(emojis) + "']"
        
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
    
    # Configure genius to be less verbose if needed, or handle timeouts
    genius.verbose = False
    genius.remove_section_headers = False # We handle cleaning ourselves if needed, or keep them.
    # Keep section headers to ensure we get everything as requested
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
        processed_songs.append({
            'title': song.title,
            'lyrics': clean_lyrics(song.lyrics)
        })
        
    # Generate UUID for artist
    artist_uuid = str(uuid.uuid4())
    
    # Generate SQL
    print("Generating SQL...")
    sql_output = generate_sql(artist.name, processed_songs, artist_uuid)
    
    # Save to file
    filename = f"seed_{artist.name.replace(' ', '_').lower()}.sql"
    # Remove special chars from filename
    filename = re.sub(r'[^\w\-_.]', '', filename)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(sql_output)
        
    print(f"Success! SQL file created: {filename}")

if __name__ == "__main__":
    main()
