-- Sleep Token Part 1 (Songs 1-25)
-- Artist ID: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33

INSERT INTO public.artists (id, name)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Sleep Token')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.songs (id, artist_id, title, lyrics, lyrics_fr, lyrics_synonym, title_emoji)
VALUES 
-- 1. The Night Does Not Belong to God
(
  'st_01', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'The Night Does Not Belong to God',
  ARRAY[
    'The night comes down like heaven',
    'I watch the sky turn black',
    'And the light begins to fade',
    'I am not the only one',
    'Who is waiting for the sun',
    'To rise and show his face',
    'The night does not belong to God',
    'The night belongs to you',
    'And I am just a shadow',
    'Dancing in your room'
  ],
  ARRAY[
    'La nuit tombe comme le paradis',
    'Je regarde le ciel devenir noir',
    'Et la lumière commence à s''estomper',
    'Je ne suis pas le seul',
    'Qui attend que le soleil',
    'Se lève et montre son visage',
    'La nuit n''appartient pas à Dieu',
    'La nuit t''appartient',
    'Et je ne suis qu''une ombre',
    'Dansant dans ta chambre'
  ],
  ARRAY[
    'The evening descends akin to nirvana',
    'I observe the firmament turning ebony',
    'And the illumination commences to wane',
    'I am not the solitary individual',
    'Who is anticipating the solar star',
    'To ascend and display his visage',
    'The nocturnal period does not pertain to the Deity',
    'The nocturnal period pertains to thee',
    'And I am merely a silhouette',
    'Prancing within your chamber'
  ],
  ARRAY['🌃', '🚫', '⛪']
),
-- 2. The Offering
(
  'st_02', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'The Offering',
  ARRAY[
    'You are a garden, entangled',
    'With the willow tree',
    'Take a bite',
    'I want to see your teeth',
    'There is no one else',
    'Who can take you down like this',
    'Turn the lights out',
    'Drag me under',
    'I am not afraid',
    'To give you what you need'
  ],
  ARRAY[
    'Tu es un jardin, emmêlé',
    'Avec le saule pleureur',
    'Prends une bouchée',
    'Je veux voir tes dents',
    'Il n''y a personne d''autre',
    'Qui peut te faire tomber comme ça',
    'Éteins les lumières',
    'Entraîne-moi vers le fond',
    'Je n''ai pas peur',
    'De te donner ce dont tu as besoin'
  ],
  ARRAY[
    'You are a horticultural plot, twisted',
    'Alongside the salix plant',
    'Consume a morsel',
    'I desire to view your incisors',
    'There exists no other person',
    'Capable of dismantling you in this fashion',
    'Extinguish the illuminations',
    'Pull me beneath',
    'I possess no trepidation',
    'To provide you with your requirements'
  ],
  ARRAY['🤲', '🦷', '🌳']
),
-- 3. Dark Signs
(
  'st_03', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Dark Signs',
  ARRAY[
    'I might break and bend to my basic need',
    'To be loved and close to somebody',
    'And I might take a leap to the other side',
    'Where the grass is green and the water''s wide',
    'But I know that you''re looking for a sign',
    'Something to tell you that I''m still mine',
    'And I know that you hate when I get like this',
    'Caught up in the dark signs that I miss',
    'I am not a monster, I am just a man',
    'Trying to find a place to stand'
  ],
  ARRAY[
    'Je pourrais me briser et me plier à mon besoin fondamental',
    'D''être aimé et proche de quelqu''un',
    'Et je pourrais faire un saut de l''autre côté',
    'Où l''herbe est verte et l''eau est large',
    'Mais je sais que tu cherches un signe',
    'Quelque chose pour te dire que je suis toujours à moi',
    'Et je sais que tu détestes quand je deviens comme ça',
    'Pris dans les signes sombres qui me manquent',
    'Je ne suis pas un monstre, je suis juste un homme',
    'Essayant de trouver un endroit où se tenir'
  ],
  ARRAY[
    'I might fracture and flex to my primal necessity',
    'To be cherished and adjacent to an individual',
    'And I might execute a bound to the opposing flank',
    'Where the turf is verdant and the liquid is expansive',
    'However I comprehend that you are seeking an omen',
    'Something to inform you that I remain my own',
    'And I comprehend that you detest when I become this way',
    'Entangled in the obscure omens that I overlook',
    'I am not a beast, I am merely a male',
    'Attempting to locate a location to station'
  ],
  ARRAY['🚫', '🛑', '⚫']
),
-- 4. Higher
(
  'st_04', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Higher',
  ARRAY[
    'Cause I look for you',
    'In the center of the sun',
    'I take a bite',
    'Of the bullet just for fun',
    'And I am the fire',
    'And you are the rain',
    'Washing me out',
    'Again and again',
    'The debt that I owe',
    'Is the price that I pay'
  ],
  ARRAY[
    'Parce que je te cherche',
    'Au centre du soleil',
    'Je mords',
    'La balle juste pour le plaisir',
    'Et je suis le feu',
    'Et tu es la pluie',
    'Me lavant',
    'Encore et encore',
    'La dette que je dois',
    'Est le prix que je paie'
  ],
  ARRAY[
    'Because I search for thee',
    'In the nucleus of the star',
    'I consume a morsel',
    'Of the projectile merely for amusement',
    'And I am the blaze',
    'And you are the precipitation',
    'Cleansing me',
    'Repeatedly',
    'The obligation that I possess',
    'Is the cost that I remit'
  ],
  ARRAY['🆙', '🔥', '🔫']
),
-- 5. Take Aim
(
  'st_05', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Take Aim',
  ARRAY[
    'And you know I''ll be yours',
    'Just as long as you''re mine',
    'And we''ll wait for the fire',
    'To run out of time',
    'Take aim at me',
    'For I have been sinning',
    'And I''ll take the blame',
    'For the way we''re beginning',
    'I am a hunter',
    'But you are the prey'
  ],
  ARRAY[
    'Et tu sais que je serai à toi',
    'Tant que tu seras à moi',
    'Et nous attendrons que le feu',
    'Manque de temps',
    'Vise-moi',
    'Car j''ai péché',
    'Et je prendrai le blâme',
    'Pour la façon dont nous commençons',
    'Je suis un chasseur',
    'Mais tu es la proie'
  ],
  ARRAY[
    'And you comprehend I shall belong to thee',
    'Provided that you belong to me',
    'And we shall anticipate the blaze',
    'To deplete its duration',
    'Direct your weapon at me',
    'For I have been transgressing',
    'And I shall accept the culpability',
    'For the manner we are commencing',
    'I am a predator',
    'However you are the quarry'
  ],
  ARRAY['🎯', '🏹', '👀']
),
-- 6. Give
(
  'st_06', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Give',
  ARRAY[
    'I will give you all that you ask',
    'And I will give you more',
    'I will be the one to save you',
    'From the wolf at the door',
    'And I will be the one to hold you',
    'When the night is cold',
    'I will be the one to love you',
    'When you are old',
    'Give me your heart',
    'And I will give you mine'
  ],
  ARRAY[
    'Je te donnerai tout ce que tu demandes',
    'Et je te donnerai plus',
    'Je serai celui qui te sauvera',
    'Du loup à la porte',
    'Et je serai celui qui te tiendra',
    'Quand la nuit est froide',
    'Je serai celui qui t''aimera',
    'Quand tu seras vieux',
    'Donne-moi ton cœur',
    'Et je te donnerai le mien'
  ],
  ARRAY[
    'I shall bestow upon thee all that you request',
    'And I shall bestow upon thee additional',
    'I shall be the individual to rescue thee',
    'From the lupine creature at the entrance',
    'And I shall be the individual to embrace thee',
    'When the evening is frigid',
    'I shall be the individual to cherish thee',
    'When you are aged',
    'Present me your cardiac organ',
    'And I shall present thee mine'
  ],
  ARRAY['🎁', '🤲', '❤️']
),
-- 7. Gods
(
  'st_07', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Gods',
  ARRAY[
    'There are gods in the sky',
    'And they''re watching us die',
    'And they''re laughing at us',
    'As we crawl in the dust',
    'And I know that you know',
    'That we''re putting on a show',
    'But the curtain is falling',
    'And the gods are calling',
    'It''s all for nothing',
    'It''s all for you'
  ],
  ARRAY[
    'Il y a des dieux dans le ciel',
    'Et ils nous regardent mourir',
    'Et ils rient de nous',
    'Alors que nous rampons dans la poussière',
    'Et je sais que tu sais',
    'Que nous faisons un spectacle',
    'Mais le rideau tombe',
    'Et les dieux appellent',
    'C''est tout pour rien',
    'C''est tout pour toi'
  ],
  ARRAY[
    'There exist deities in the firmament',
    'And they are observing us expire',
    'And they are chuckling at us',
    'As we creep in the particulate matter',
    'And I comprehend that you comprehend',
    'That we are performing an exhibition',
    'However the drapery is descending',
    'And the deities are summoning',
    'It is entirely for naught',
    'It is entirely for thee'
  ],
  ARRAY['⚡', '🏛️', '👁️']
),
-- 8. Sugar
(
  'st_08', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Sugar',
  ARRAY[
    'Sugar, I''ve developed a taste for you',
    'Now I''m gonna need some more',
    'I don''t know if I can stop',
    'I''ve been waiting for a reason to give up',
    'But you''re just too sweet',
    'And I am just a fool',
    'Playing by your rules',
    'I am addicted to the pain',
    'Running through my veins',
    'Sugar, you are the death of me'
  ],
  ARRAY[
    'Sucre, j''ai développé un goût pour toi',
    'Maintenant j''en aurai besoin de plus',
    'Je ne sais pas si je peux m''arrêter',
    'J''attendais une raison d''abandonner',
    'Mais tu es juste trop doux',
    'Et je ne suis qu''un idiot',
    'Jouant selon tes règles',
    'Je suis accro à la douleur',
    'Courant dans mes veines',
    'Sucre, tu es ma mort'
  ],
  ARRAY[
    'Sucrose, I have acquired a palate for thee',
    'Presently I shall require additional quantity',
    'I am uncertain if I can cease',
    'I have been anticipating a justification to surrender',
    'However you are simply excessively saccharine',
    'And I am merely a simpleton',
    'Participating according to your regulations',
    'I am dependent on the agony',
    'Sprinting through my blood vessels',
    'Sucrose, you are my demise'
  ],
  ARRAY['🍬', '🍭', '😋']
),
-- 9. Say That You Will
(
  'st_09', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Say That You Will',
  ARRAY[
    'Say that you will',
    'Be there when I fall',
    'Say that you will',
    'Answer when I call',
    'I am tired of waiting',
    'For a sign from above',
    'I am tired of hating',
    'The things that I love',
    'Just say the word',
    'And I will be yours'
  ],
  ARRAY[
    'Dis que tu le feras',
    'Sois là quand je tombe',
    'Dis que tu le feras',
    'Réponds quand j''appelle',
    'Je suis fatigué d''attendre',
    'Un signe d''en haut',
    'Je suis fatigué de détester',
    'Les choses que j''aime',
    'Dis juste le mot',
    'Et je serai à toi'
  ],
  ARRAY[
    'Utter that you shall',
    'Be present when I descend',
    'Utter that you shall',
    'Respond when I summon',
    'I am exhausted of anticipating',
    'An omen from overhead',
    'I am exhausted of loathing',
    'The items that I cherish',
    'Merely utter the term',
    'And I shall belong to thee'
  ],
  ARRAY['🗣️', '🤙', '💍']
),
-- 10. Drag Me Under
(
  'st_10', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Drag Me Under',
  ARRAY[
    'Drag me under',
    'The water is cold',
    'I am getting older',
    'I am getting old',
    'And I can see the light',
    'Fading from your eyes',
    'And I can see the night',
    'Filling up the skies',
    'Don''t let me go',
    'Just drag me down'
  ],
  ARRAY[
    'Entraîne-moi vers le fond',
    'L''eau est froide',
    'Je vieillis',
    'Je deviens vieux',
    'Et je peux voir la lumière',
    'S''effacer de tes yeux',
    'Et je peux voir la nuit',
    'Remplir les cieux',
    'Ne me laisse pas partir',
    'Tire-moi juste vers le bas'
  ],
  ARRAY[
    'Pull me beneath',
    'The liquid is frigid',
    'I am aging',
    'I am becoming aged',
    'And I can perceive the illumination',
    'Vanishing from your oculars',
    'And I can perceive the nocturnal period',
    'Occupying the firmaments',
    'Do not release me',
    'Merely pull me downward'
  ],
  ARRAY['⚓', '🌊', '⬇️']
),
-- 11. Blood Sport
(
  'st_11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Blood Sport',
  ARRAY[
    'I want to be forgiven',
    'I want to choke up chunks of my own sins',
    'Even if the sky cracks in the morning',
    'I want to be somewhere else',
    'And I am still your favourite regret',
    'You''re still my weapon of choosing',
    'And out there, stuck in the quantum pattern',
    'Tangled with what I never said',
    'You say it doesn''t matter',
    'Out of the blood sport'
  ],
  ARRAY[
    'Je veux être pardonné',
    'Je veux recracher des morceaux de mes propres péchés',
    'Même si le ciel se fissure le matin',
    'Je veux être ailleurs',
    'Et je suis toujours ton regret préféré',
    'Tu es toujours mon arme de choix',
    'Et là-bas, coincé dans le motif quantique',
    'Emmêlé avec ce que je n''ai jamais dit',
    'Tu dis que ça n''a pas d''importance',
    'Hors du sport sanglant'
  ],
  ARRAY[
    'I desire to be absolved',
    'I desire to regurgitate fragments of my own transgressions',
    'Even if the firmament fractures in the dawn',
    'I desire to be elsewhere',
    'And I remain your preferred remorse',
    'You remain my armament of selection',
    'And externally, trapped in the quantum design',
    'Intertwined with what I never uttered',
    'You state it is of no consequence',
    'Exterior to the plasma recreation'
  ],
  ARRAY['🩸', '🎹', '😭']
),
-- 12. Atlantic
(
  'st_12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Atlantic',
  ARRAY[
    'Call me when you get the chance',
    'I can feel the walls around me closing in',
    'I didn''t want to be this way',
    'I didn''t want to be the one to fall apart',
    'Flood me like the Atlantic',
    'Bandage up the trenches',
    'Anything to get me to sleep',
    'I woke up surrounded',
    'Eyes like frozen planets',
    'Just orbiting the vacuum I am'
  ],
  ARRAY[
    'Appelle-moi quand tu as l''occasion',
    'Je peux sentir les murs autour de moi se refermer',
    'Je ne voulais pas être comme ça',
    'Je ne voulais pas être celui qui s''effondre',
    'Inonde-moi comme l''Atlantique',
    'Panse les tranchées',
    'N''importe quoi pour me faire dormir',
    'Je me suis réveillé entouré',
    'Des yeux comme des planètes gelées',
    'Orbitant juste autour du vide que je suis'
  ],
  ARRAY[
    'Ring me when you obtain the opportunity',
    'I can perceive the partitions surrounding me narrowing',
    'I did not desire to exist in this manner',
    'I did not desire to be the individual to crumble',
    'Deluge me resembling the Ocean',
    'Dress the excavations',
    'Anything to induce slumber',
    'I awakened encircled',
    'Oculars resembling solidified worlds',
    'Merely revolving around the void I exist as'
  ],
  ARRAY['🌊', '🔵', '🏊']
),
-- 13. Hypnosis
(
  'st_13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Hypnosis',
  ARRAY[
    'Listen to the sound of the evening',
    'I can hear the silence eating away at the room',
    'Wait for the signal',
    'I can feel the pressure starting to consume',
    'Hypnotize me',
    'Sink into the rhythm',
    'Let the water rise',
    'I am just a vessel',
    'For the tides',
    'Pull me under again'
  ],
  ARRAY[
    'Écoute le son de la soirée',
    'Je peux entendre le silence ronger la pièce',
    'Attends le signal',
    'Je peux sentir la pression commencer à consumer',
    'Hypnotise-moi',
    'Coule dans le rythme',
    'Laisse l''eau monter',
    'Je ne suis qu''un vaisseau',
    'Pour les marées',
    'Tire-moi encore vers le fond'
  ],
  ARRAY[
    'Harken to the audio of the dusk',
    'I can detect the quietude devouring the chamber',
    'Pause for the indication',
    'I can sense the compression commencing to devour',
    'Mesmerize me',
    'Descend into the cadence',
    'Permit the liquid to ascend',
    'I am merely a container',
    'For the currents',
    'Drag me beneath once more'
  ],
  ARRAY['🌀', '😵', '🕰️']
),
-- 14. Mine
(
  'st_14', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Mine',
  ARRAY[
    'You will be mine',
    'And I will be yours',
    'I am certain',
    'Even if it hurts',
    'We are tangled in the roots',
    'Of a tree that has fallen',
    'And I can''t get up',
    'But I don''t want to',
    'Just lie here with me',
    'Until the end of time'
  ],
  ARRAY[
    'Tu seras à moi',
    'Et je serai à toi',
    'Je suis certain',
    'Même si ça fait mal',
    'Nous sommes emmêlés dans les racines',
    'D''un arbre qui est tombé',
    'Et je ne peux pas me relever',
    'Mais je ne veux pas',
    'Reste juste ici avec moi',
    'Jusqu''à la fin des temps'
  ],
  ARRAY[
    'You shall belong to me',
    'And I shall belong to thee',
    'I am convinced',
    'Even if it causes pain',
    'We are knotted in the underground fibers',
    'Of a timber that has collapsed',
    'And I am unable to arise',
    'However I do not desire to',
    'Merely recline here with me',
    'Until the cessation of existence'
  ],
  ARRAY['💍', '🤝', '❤️']
),
-- 15. Like That
(
  'st_15', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Like That',
  ARRAY[
    'Do you like that?',
    'Do you like the way I hurt?',
    'Do you like the way I bleed?',
    'Do you like the way I crawl?',
    'I am nothing but a worm',
    'Beneath your feet',
    'And you are the bird',
    'Waiting to eat',
    'So take another bite',
    'And swallow me whole'
  ],
  ARRAY[
    'Aimes-tu ça ?',
    'Aimes-tu la façon dont j''ai mal ?',
    'Aimes-tu la façon dont je saigne ?',
    'Aimes-tu la façon dont je rampe ?',
    'Je ne suis rien d''autre qu''un ver',
    'Sous tes pieds',
    'Et tu es l''oiseau',
    'Attendant de manger',
    'Alors prends une autre bouchée',
    'Et avale-moi tout entier'
  ],
  ARRAY[
    'Do you appreciate that?',
    'Do you appreciate the manner in which I suffer?',
    'Do you appreciate the manner in which I hemorrhage?',
    'Do you appreciate the manner in which I creep?',
    'I am naught but a larva',
    'Underneath your extremities',
    'And you are the avian',
    'Anticipating to consume',
    'Thus acquire another morsel',
    'And ingest me entirely'
  ],
  ARRAY['👍', '🩸', '🐛']
),
-- 16. The Love You Want
(
  'st_16', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'The Love You Want',
  ARRAY[
    'You say you want the love',
    'But you can''t take the pain',
    'You say you want the sun',
    'But you can''t stand the rain',
    'And I am just a ghost',
    'Haunting your halls',
    'Waiting for the moment',
    'When the hammer falls',
    'I will give you everything',
    'But it won''t be enough'
  ],
  ARRAY[
    'Tu dis que tu veux l''amour',
    'Mais tu ne peux pas supporter la douleur',
    'Tu dis que tu veux le soleil',
    'Mais tu ne peux pas supporter la pluie',
    'Et je ne suis qu''un fantôme',
    'Hantant tes couloirs',
    'Attendant le moment',
    'Où le marteau tombe',
    'Je te donnerai tout',
    'Mais ce ne sera pas assez'
  ],
  ARRAY[
    'You state you desire the affection',
    'However you cannot endure the agony',
    'You state you desire the solar star',
    'However you cannot tolerate the precipitation',
    'And I am merely a specter',
    'Plaguing your corridors',
    'Anticipating the instant',
    'When the mallet descends',
    'I shall bestow upon thee everything',
    'However it shall not suffice'
  ],
  ARRAY['❤️', '💔', '👻']
),
-- 17. Fall For Me
(
  'st_17', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Fall For Me',
  ARRAY[
    'My insecurities surround me like lions in the den',
    'And I feel like I''m losing my touch',
    'And I know that I am a mess',
    'But I am trying my best',
    'To be the one you need',
    'Won''t you fall for me?',
    'Won''t you fall for me?',
    'Through the cracks in the floor',
    'I am waiting for you',
    'To come knocking at my door'
  ],
  ARRAY[
    'Mes insécurités m''entourent comme des lions dans la fosse',
    'Et j''ai l''impression de perdre la main',
    'Et je sais que je suis un désastre',
    'Mais je fais de mon mieux',
    'Pour être celui dont tu as besoin',
    'Ne tomberas-tu pas pour moi ?',
    'Ne tomberas-tu pas pour moi ?',
    'À travers les fissures du sol',
    'Je t''attends',
    'Pour venir frapper à ma porte'
  ],
  ARRAY[
    'My uncertainties encircle me resembling felines in the lair',
    'And I perceive like I am misplacing my aptitude',
    'And I comprehend that I am a shambles',
    'However I am attempting my optimum',
    'To be the individual you require',
    'Shall you not descend for me?',
    'Shall you not descend for me?',
    'Via the crevices in the pavement',
    'I am anticipating you',
    'To arrive rapping at my entrance'
  ],
  ARRAY['🍂', '🦁', '🚪']
),
-- 18. Alkaline
(
  'st_18', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Alkaline',
  ARRAY[
    'She''s not acid nor alkaline',
    'Caught between black and white',
    'Not quite either day or night',
    'She''s perfectly misaligned',
    'I''m caught up in her design',
    'And how it connects to mine',
    'I see in a different light',
    'The object of my desire',
    'She''s chemistry and poetry',
    'Mixed in a perfect fire'
  ],
  ARRAY[
    'Elle n''est ni acide ni alcaline',
    'Prise entre le noir et le blanc',
    'Pas tout à fait jour ou nuit',
    'Elle est parfaitement désalignée',
    'Je suis pris dans sa conception',
    'Et comment elle se connecte à la mienne',
    'Je vois sous un jour différent',
    'L''objet de mon désir',
    'Elle est chimie et poésie',
    'Mélangées dans un feu parfait'
  ],
  ARRAY[
    'She is neither pH low nor pH high',
    'Trapped betwixt ebony and ivory',
    'Not entirely sun-time or moon-time',
    'She is flawlessly askew',
    'I am entangled in her blueprint',
    'And the manner it links to my own',
    'I perceive in a distinct illumination',
    'The focus of my craving',
    'She is science and verse',
    'Blended in a flawless blaze'
  ],
  ARRAY['⚗️', '⚖️', '🧪']
),
-- 19. Distraction
(
  'st_19', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Distraction',
  ARRAY[
    'It''s too late to tell you now',
    'That I am not okay',
    'I am looking for a distraction',
    'To take the pain away',
    'And I know that it''s not right',
    'To use you like a drug',
    'But I need to feel something',
    'Other than this numbness',
    'So be my distraction',
    'Just for tonight'
  ],
  ARRAY[
    'Il est trop tard pour te dire maintenant',
    'Que je ne vais pas bien',
    'Je cherche une distraction',
    'Pour enlever la douleur',
    'Et je sais que ce n''est pas bien',
    'De t''utiliser comme une drogue',
    'Mais j''ai besoin de ressentir quelque chose',
    'Autre que cet engourdissement',
    'Alors sois ma distraction',
    'Juste pour ce soir'
  ],
  ARRAY[
    'It is excessively tardy to inform you presently',
    'That I am not satisfactory',
    'I am seeking a diversion',
    'To remove the agony',
    'And I comprehend that it is not correct',
    'To utilize you resembling a narcotic',
    'However I require to perceive something',
    'Distinct from this insensibility',
    'Thus be my diversion',
    'Merely for this evening'
  ],
  ARRAY['🚧', '💊', '🙈']
),
-- 20. Descending
(
  'st_20', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Descending',
  ARRAY[
    'We are descending',
    'Into the dark',
    'I can see the ending',
    'Before we start',
    'And I know that you''re scared',
    'Of what we might find',
    'But I''ll be there',
    'Right by your side',
    'So close your eyes',
    'And let''s go down'
  ],
  ARRAY[
    'Nous descendons',
    'Dans l''obscurité',
    'Je peux voir la fin',
    'Avant que nous commencions',
    'Et je sais que tu as peur',
    'De ce que nous pourrions trouver',
    'Mais je serai là',
    'Juste à tes côtés',
    'Alors ferme tes yeux',
    'Et descendons'
  ],
  ARRAY[
    'We are going downwards',
    'Into the gloom',
    'I can perceive the conclusion',
    'Prior to our commencement',
    'And I comprehend that you are terrified',
    'Of what we might discover',
    'However I shall be present',
    'Directly adjacent to you',
    'Thus shut your oculars',
    'And let us proceed downwards'
  ],
  ARRAY['📉', '🕳️', '😨']
),
-- 21. Telomeres
(
  'st_21', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Telomeres',
  ARRAY[
    'Let the tides carry you back to me',
    'The past is a foreign country',
    'And we are just tourists',
    'Visiting for a while',
    'But I want to stay',
    'In this moment forever',
    'Like telomeres',
    'Protecting the code',
    'I will protect you',
    'From the cold'
  ],
  ARRAY[
    'Laisse les marées te ramener à moi',
    'Le passé est un pays étranger',
    'Et nous sommes juste des touristes',
    'Visitant pour un moment',
    'Mais je veux rester',
    'Dans ce moment pour toujours',
    'Comme des télomères',
    'Protégeant le code',
    'Je te protégerai',
    'Du froid'
  ],
  ARRAY[
    'Permit the currents to transport you return to me',
    'The history is an alien nation',
    'And we are merely sightseers',
    'Sojourning for a duration',
    'However I desire to remain',
    'In this instant eternally',
    'Resembling chromosome ends',
    'Safeguarding the cipher',
    'I shall safeguard thee',
    'From the frigidity'
  ],
  ARRAY['🧬', '⏳', '🛡️']
),
-- 22. High Water
(
  'st_22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'High Water',
  ARRAY[
    'For the time being',
    'I will admit',
    'I am in too deep',
    'And I can''t quit',
    'The water is rising',
    'Above my head',
    'And I am drowning',
    'In the things I said',
    'I can''t hold back',
    'The high water'
  ],
  ARRAY[
    'Pour le moment',
    'J''admettrai',
    'Je suis trop impliqué',
    'Et je ne peux pas arrêter',
    'L''eau monte',
    'Au-dessus de ma tête',
    'Et je me noie',
    'Dans les choses que j''ai dites',
    'Je ne peux pas retenir',
    'Les hautes eaux'
  ],
  ARRAY[
    'For the duration being',
    'I shall confess',
    'I am excessively profound',
    'And I cannot cease',
    'The liquid is ascending',
    'Superior to my cranium',
    'And I am submerging',
    'In the items I uttered',
    'I cannot restrain',
    'The elevated liquid'
  ],
  ARRAY['🌊', '⬆️', '🏊']
),
-- 23. Missing Limbs
(
  'st_23', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Missing Limbs',
  ARRAY[
    'I''d give anything',
    'To borrow your indifference',
    'I''d drink you in',
    'To quench my ambition',
    'And I am missing limbs',
    'Trying to hold on to you',
    'It''s like phantom pain',
    'Where you used to be',
    'I am incomplete',
    'Without you'
  ],
  ARRAY[
    'Je donnerais n''importe quoi',
    'Pour emprunter ton indifférence',
    'Je te boirais',
    'Pour étancher mon ambition',
    'Et il me manque des membres',
    'Essayant de m''accrocher à toi',
    'C''est comme une douleur fantôme',
    'Là où tu étais',
    'Je suis incomplet',
    'Sans toi'
  ],
  ARRAY[
    'I would bestow anything',
    'To loan your apathy',
    'I would imbibe thee',
    'To satiate my aspiration',
    'And I am lacking appendages',
    'Attempting to cling to thee',
    'It is resembling spectral agony',
    'Where you utilized to exist',
    'I am unfinished',
    'Devoid of thee'
  ],
  ARRAY['🦵', '💪', '👻']
),
-- 24. Chokehold
(
  'st_24', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Chokehold',
  ARRAY[
    'When we were made',
    'It was no accident',
    'We were tangled up like branches in a flood',
    'I come as a blade',
    'A sacred guardian',
    'So you keep me sharp and test my worth in blood',
    'You''ve got me in a chokehold',
    'And I like the way it feels',
    'I am your prisoner',
    'And you are my keeper'
  ],
  ARRAY[
    'Quand nous avons été faits',
    'Ce n''était pas un accident',
    'Nous étions emmêlés comme des branches dans une inondation',
    'Je viens comme une lame',
    'Un gardien sacré',
    'Alors tu me gardes tranchant et testes ma valeur dans le sang',
    'Tu me tiens en étranglement',
    'Et j''aime ce que ça fait',
    'Je suis ton prisonnier',
    'Et tu es mon gardien'
  ],
  ARRAY[
    'At the time of our creation',
    'It was not a mishap',
    'We were intertwined resembling boughs in a deluge',
    'I arrive as a cutting implement',
    'A hallowed protector',
    'Thus you maintain my keenness and assay my value in plasma',
    'You possess me in a stranglehold',
    'And I appreciate the sensation',
    'I am your captive',
    'And you are my warden'
  ],
  ARRAY['✊', '🧣', '🗡️']
),
-- 25. The Summoning
(
  'st_25', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'The Summoning',
  ARRAY[
    'I''ve got a river running right into you',
    'I''ve got a blood trail, red in the blue',
    'Something you say or something you do',
    'The taste of the divine',
    'You''ve got my body, flesh and bone',
    'The sky above, the earth below',
    'Raise me up again',
    'Take me to the edge',
    'I want to see the other side',
    'Of your paradise'
  ],
  ARRAY[
    'J''ai une rivière qui coule droit vers toi',
    'J''ai une trace de sang, rouge dans le bleu',
    'Quelque chose que tu dis ou quelque chose que tu fais',
    'Le goût du divin',
    'Tu as mon corps, chair et os',
    'Le ciel au-dessus, la terre en dessous',
    'Élève-moi encore',
    'Emmène-moi au bord',
    'Je veux voir l''autre côté',
    'De ton paradis'
  ],
  ARRAY[
    'I possess a stream flowing directly into you',
    'I possess a crimson path, scarlet within the azure',
    'A phrase you utter or an action you perform',
    'The flavor of the godlike',
    'You possess my anatomy, meat and skeletal structure',
    'The heavens overhead, the ground underneath',
    'Elevate me once more',
    'Transport me to the brink',
    'I desire to view the opposing flank',
    'Of your utopia'
  ],
  ARRAY['🔮', '🩸', '🛐']
)
ON CONFLICT (id) DO NOTHING;
