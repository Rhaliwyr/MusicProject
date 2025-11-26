-- Insert Sleep Token Artist
INSERT INTO public.artists (id, name)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Sleep Token')
ON CONFLICT (id) DO NOTHING;

-- Insert Songs
INSERT INTO public.songs (id, artist_id, title, lyrics, lyrics_fr, lyrics_synonym, title_emoji)
VALUES 
  (
    'st1', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'The Summoning', 
    ARRAY[
      'I''ve got a river running right into you',
      'I''ve got a blood trail, red in the blue',
      'Something you say or something you do',
      'The taste of the divine',
      'You''ve got my body, flesh and bone',
      'The sky above, the earth below'
    ], 
    ARRAY[
      'J''ai une rivière qui coule droit vers toi',
      'J''ai une trace de sang, rouge dans le bleu',
      'Quelque chose que tu dis ou quelque chose que tu fais',
      'Le goût du divin',
      'Tu as mon corps, chair et os',
      'Le ciel au-dessus, la terre en dessous'
    ], 
    ARRAY[
      'I possess a stream flowing directly into you',
      'I possess a crimson path, scarlet within the azure',
      'A phrase you utter or an action you perform',
      'The flavor of the godlike',
      'You possess my anatomy, meat and skeletal structure',
      'The heavens overhead, the ground underneath'
    ], 
    ARRAY['🔮', '🩸', '🛐']
  ),
  (
    'st2', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Chokehold', 
    ARRAY[
      'When we were made',
      'It was no accident',
      'We were tangled up like branches in a flood',
      'I come as a blade',
      'A sacred guardian',
      'So you keep me sharp and test my worth in blood'
    ], 
    ARRAY[
      'Quand nous avons été faits',
      'Ce n''était pas un accident',
      'Nous étions emmêlés comme des branches dans une inondation',
      'Je viens comme une lame',
      'Un gardien sacré',
      'Alors tu me gardes tranchant et testes ma valeur dans le sang'
    ], 
    ARRAY[
      'At the time of our creation',
      'It was not a mishap',
      'We were intertwined resembling boughs in a deluge',
      'I arrive as a cutting implement',
      'A hallowed protector',
      'Thus you maintain my keenness and assay my value in plasma'
    ], 
    ARRAY['✊', '🧣', '🗡️']
  ),
  (
    'st3', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Granite', 
    ARRAY[
      'You only drink the water',
      'When you think it''s holy',
      'You only see the future',
      'When the glass is broken',
      'I was more than just a body in your passenger seat',
      'You were more than just a someone I was destined to meet'
    ], 
    ARRAY[
      'Tu ne bois l''eau',
      'Que lorsque tu penses qu''elle est sainte',
      'Tu ne vois le futur',
      'Que lorsque le verre est brisé',
      'J''étais plus qu''un simple corps sur ton siège passager',
      'Tu étais plus qu''un simple quelqu''un que j''étais destiné à rencontrer'
    ], 
    ARRAY[
      'You solely imbibe the liquid',
      'When you believe it is sacred',
      'You solely perceive the tomorrow',
      'When the crystal is shattered',
      'I was greater than merely a form in your co-driver chair',
      'You were greater than merely an individual I was fated to encounter'
    ], 
    ARRAY['🪨', '🚗', '💥']
  ),
  (
    'st4', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Alkaline', 
    ARRAY[
      'She''s not acid nor alkaline',
      'Caught between black and white',
      'Not quite either day or night',
      'She''s perfectly misaligned',
      'I''m caught up in her design',
      'And how it connects to mine'
    ], 
    ARRAY[
      'Elle n''est ni acide ni alcaline',
      'Prise entre le noir et le blanc',
      'Pas tout à fait jour ou nuit',
      'Elle est parfaitement désalignée',
      'Je suis pris dans sa conception',
      'Et comment elle se connecte à la mienne'
    ], 
    ARRAY[
      'She is neither pH low nor pH high',
      'Trapped betwixt ebony and ivory',
      'Not entirely sun-time or moon-time',
      'She is flawlessly askew',
      'I am entangled in her blueprint',
      'And the manner it links to my own'
    ], 
    ARRAY['⚗️', '⚖️', '🧪']
  ),
  (
    'st5', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'The Offering', 
    ARRAY[
      'You are a garden, entangled',
      'With the willow tree',
      'Take a bite',
      'I want to see your teeth',
      'There is no one else',
      'Who can take you down like this'
    ], 
    ARRAY[
      'Tu es un jardin, emmêlé',
      'Avec le saule pleureur',
      'Prends une bouchée',
      'Je veux voir tes dents',
      'Il n''y a personne d''autre',
      'Qui peut te faire tomber comme ça'
    ], 
    ARRAY[
      'You are a horticultural plot, twisted',
      'Alongside the salix plant',
      'Consume a morsel',
      'I desire to view your incisors',
      'There exists no other person',
      'Capable of dismantling you in this fashion'
    ], 
    ARRAY['🤲', '🦷', '🌳']
  ),
  (
    'st6', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Jaws', 
    ARRAY[
      'Show me what you are',
      'I am desperate to know',
      'Are you still a weapon?',
      'And are your jaws still locked?',
      'I''m not gonna tell you',
      'That I haven''t been checking you out'
    ], 
    ARRAY[
      'Montre-moi ce que tu es',
      'Je suis désespéré de savoir',
      'Es-tu toujours une arme ?',
      'Et tes mâchoires sont-elles toujours verrouillées ?',
      'Je ne vais pas te dire',
      'Que je ne t''ai pas maté'
    ], 
    ARRAY[
      'Display to me your essence',
      'I am frantic to comprehend',
      'Do you remain an armament?',
      'And are your mandibles still secured?',
      'I shall not inform you',
      'That I have not been observing you'
    ], 
    ARRAY['🦈', '🦷', '🔒']
  ),
  (
    'st7', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Sugar', 
    ARRAY[
      'Sugar, I''ve developed a taste for you',
      'Now I''m gonna need some more',
      'I don''t know if I can stop',
      'I''ve been waiting for a reason to give up',
      'But you''re just too sweet'
    ], 
    ARRAY[
      'Sucre, j''ai développé un goût pour toi',
      'Maintenant j''en aurai besoin de plus',
      'Je ne sais pas si je peux m''arrêter',
      'J''attendais une raison d''abandonner',
      'Mais tu es juste trop doux'
    ], 
    ARRAY[
      'Sucrose, I have acquired a palate for thee',
      'Presently I shall require additional quantity',
      'I am uncertain if I can cease',
      'I have been anticipating a justification to surrender',
      'However you are simply excessively saccharine'
    ], 
    ARRAY['🍬', '🍭', '😋']
  ),
  (
    'st8', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Atlantic', 
    ARRAY[
      'Call me when you get the chance',
      'I can feel the walls around me closing in',
      'I didn''t want to be this way',
      'I didn''t want to be the one to fall apart',
      'Flood me like the Atlantic'
    ], 
    ARRAY[
      'Appelle-moi quand tu as l''occasion',
      'Je peux sentir les murs autour de moi se refermer',
      'Je ne voulais pas être comme ça',
      'Je ne voulais pas être celui qui s''effondre',
      'Inonde-moi comme l''Atlantique'
    ], 
    ARRAY[
      'Ring me when you obtain the opportunity',
      'I can perceive the partitions surrounding me narrowing',
      'I did not desire to exist in this manner',
      'I did not desire to be the individual to crumble',
      'Deluge me resembling the Ocean'
    ], 
    ARRAY['🌊', '🔵', '🏊']
  ),
  (
    'st9', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Hypnosis', 
    ARRAY[
      'Listen to the sound of the evening',
      'I can hear the silence eating away at the room',
      'Wait for the signal',
      'I can feel the pressure starting to consume',
      'Hypnotize me'
    ], 
    ARRAY[
      'Écoute le son de la soirée',
      'Je peux entendre le silence ronger la pièce',
      'Attends le signal',
      'Je peux sentir la pression commencer à consumer',
      'Hypnotise-moi'
    ], 
    ARRAY[
      'Harken to the audio of the dusk',
      'I can detect the quietude devouring the chamber',
      'Pause for the indication',
      'I can sense the compression commencing to devour',
      'Mesmerize me'
    ], 
    ARRAY['🌀', '😵', '🕰️']
  ),
  (
    'st10', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Mine', 
    ARRAY[
      'You will be mine',
      'And I will be yours',
      'I am certain',
      'Even if it hurts',
      'We are tangled in the roots',
      'Of a tree that has fallen'
    ], 
    ARRAY[
      'Tu seras à moi',
      'Et je serai à toi',
      'Je suis certain',
      'Même si ça fait mal',
      'Nous sommes emmêlés dans les racines',
      'D''un arbre qui est tombé'
    ], 
    ARRAY[
      'You shall belong to me',
      'And I shall belong to thee',
      'I am convinced',
      'Even if it causes pain',
      'We are knotted in the underground fibers',
      'Of a timber that has collapsed'
    ], 
    ARRAY['💍', '🤝', '❤️']
  ),
  (
    'st11', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Vore', 
    ARRAY[
      'I wanna go where nobody else will ever go',
      'The walls of your chest are beginning to close',
      'I am a shadow, I am a ghost',
      'Searching for a place to call my own',
      'Will you let me in?'
    ], 
    ARRAY[
      'Je veux aller là où personne d''autre n''ira jamais',
      'Les murs de ta poitrine commencent à se fermer',
      'Je suis une ombre, je suis un fantôme',
      'Cherchant un endroit à appeler le mien',
      'Vas-tu me laisser entrer ?'
    ], 
    ARRAY[
      'I desire to travel where no other individual shall ever travel',
      'The partitions of your thorax are commencing to shut',
      'I am a silhouette, I am a specter',
      'Seeking a location to designate as my personal property',
      'Shall you permit my entry?'
    ], 
    ARRAY['🍽️', '👄', '🕳️']
  ),
  (
    'st12', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Ascensionism', 
    ARRAY[
      'Who made you like this?',
      'Who encrypted your dark gospel in body language?',
      'Synapses snap back in blissful anguish',
      'Tell me you met me in past lives',
      'Past the life between the light and the dark'
    ], 
    ARRAY[
      'Qui t''a fait comme ça ?',
      'Qui a crypté ton évangile sombre dans le langage corporel ?',
      'Les synapses claquent dans une angoisse heureuse',
      'Dis-moi que tu m''as rencontré dans des vies antérieures',
      'Au-delà de la vie entre la lumière et l''obscurité'
    ], 
    ARRAY[
      'Who constructed you in this manner?',
      'Who encoded your obscure scripture in somatic communication?',
      'Neural junctions recoil in euphoric torment',
      'Inform me you encountered me in previous existences',
      'Beyond the existence betwixt the radiance and the gloom'
    ], 
    ARRAY['🚀', '✨', '🆙']
  ),
  (
    'st13', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Rain', 
    ARRAY[
      'And I know, I know, I know',
      'The way that it goes',
      'You''re waiting for the rain',
      'To wash away the dust',
      'But I''m just a guest',
      'In your hollowed out chest'
    ], 
    ARRAY[
      'Et je sais, je sais, je sais',
      'Comment ça se passe',
      'Tu attends la pluie',
      'Pour laver la poussière',
      'Mais je suis juste un invité',
      'Dans ta poitrine creusée'
    ], 
    ARRAY[
      'And I comprehend, I comprehend, I comprehend',
      'The manner in which it proceeds',
      'You are anticipating the precipitation',
      'To cleanse the particulate matter',
      'However I am merely a visitor',
      'In your excavated thorax'
    ], 
    ARRAY['🌧️', '☔', '💧']
  ),
  (
    'st14', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Take Me Back To Eden', 
    ARRAY[
      'I dream in phosphorescence',
      'Bleed through spaces',
      'See you drifting past the fog',
      'But I don''t know what you want',
      'I don''t know what you need',
      'But I''ll take you back to Eden'
    ], 
    ARRAY[
      'Je rêve en phosphorescence',
      'Saigne à travers les espaces',
      'Je te vois dériver au-delà du brouillard',
      'Mais je ne sais pas ce que tu veux',
      'Je ne sais pas ce dont tu as besoin',
      'Mais je te ramènerai à Eden'
    ], 
    ARRAY[
      'I fantasize in luminescence',
      'Hemorrhage via voids',
      'Perceive you floating beyond the mist',
      'However I am ignorant of your desires',
      'I am ignorant of your requirements',
      'However I shall transport you return to Paradise'
    ], 
    ARRAY['🍎', '🐍', '🌳']
  ),
  (
    'st15', 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
    'Euclid', 
    ARRAY[
      'The night belongs to you',
      'This bough has broken through',
      'I must be someone new',
      'No, for me',
      'It''s still the autumn leaves',
      'These ancient canopies'
    ], 
    ARRAY[
      'La nuit t''appartient',
      'Cette branche a percé',
      'Je dois être quelqu''un de nouveau',
      'Non, pour moi',
      'C''est toujours les feuilles d''automne',
      'Ces canopées anciennes'
    ], 
    ARRAY[
      'The nocturnal period is your property',
      'This limb has penetrated',
      'I am obligated to be a novel individual',
      'Negative, regarding myself',
      'It remains the fall foliage',
      'These archaic tree covers'
    ], 
    ARRAY['📐', '🍂', '🌃']
  )
ON CONFLICT (id) DO NOTHING;
