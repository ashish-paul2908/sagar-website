// All editable site copy and links live here.
// To change text, links or releases, edit this file only.

const spotifyCover = (hash: string) => `https://i.scdn.co/image/ab67616d0000b273${hash}`

export const ARTIST = {
  name: 'Sagar Verma',
  tagline: 'Songs for people who overthink everything and still fall in love anyway.',
  photo: 'https://i.scdn.co/image/ab6761610000e5eba4b1a820b7cd22f4c7e61e01',
  managementEmail: 'ashish@ctrlsmgmt.com',
  managementName: 'Ctrl + S',
}

export const LINKS = {
  spotify: 'https://open.spotify.com/artist/18lQZ09TgoILbt94KdrBpO',
  apple: 'https://music.apple.com/in/artist/sagar-verma/1168339135',
  youtube: 'https://www.youtube.com/c/sagarvermamusic',
  instagram: 'https://www.instagram.com/sagarvermamusic',
  amazon: 'https://music.amazon.com/artists/B074W6SZ1C',
  soundcloud: 'https://soundcloud.com/sagarverma',
  facebook: 'https://www.facebook.com/sagarvermamusic',
}

export const EP = {
  title: 'aakhri tohfa',
  meaning: 'the last gift',
  // Midnight IST on release day
  releaseAt: '2026-11-19T00:00:00+05:30',
  releaseLabel: '19 November 2026',
  cover:
    'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/8f/33/2a/8f332aa9-61ad-a9d5-aa14-52fb028550bb/8902358491641_cover.jpg/1200x1200bb.jpg',
  // Set this to the EP's Spotify album URL once it is live; until then we link the artist page.
  listenUrl: '' as string,
  logline: 'A tale of love, betrayal, and the aftermath of it all.',
  intro:
    'Told in sequence, because sequence is the only way this story makes sense: betrayal, then anger, then the grey where love survives it anyway, and the quiet that comes after. It is also a sonic shift — from introspective indie pop into something harder and more textured.',
  quote: 'I’ve never felt so naked while writing what I’ve written this year.',
}

export type Chapter = {
  n: number
  title: string
  gloss?: string
  state: string
  sound: string
  with?: string
  body: string
  line?: string
  released: string
  spotifyAlbumId?: string
  tone: string
}

export const CHAPTERS: Chapter[] = [
  {
    n: 1,
    title: 'usey pata bhi nahi',
    gloss: 'they don’t even know',
    state: 'Betrayal',
    sound: 'Pop-rock',
    with: 'with Timothy Thampy',
    body: 'A betrayal the other person doesn’t know about — told as a narrative. The trigger point. The initial conflict. Everything that follows on this record begins here.',
    released: '1 October 2026',
    spotifyAlbumId: '4n9MFNbR6xr6JTbsHxNBu7',
    tone: '#8a6fa8',
  },
  {
    n: 2,
    title: 'gunaah',
    gloss: 'the crime',
    state: 'Anger',
    sound: 'Rock',
    with: 'with Dwai',
    body: 'The immediate response. Accusation. Making someone your metaphorical criminal — and recognising you were their crime, because of what they did and how they did it. Anger with somewhere to go.',
    released: '22 October 2026',
    spotifyAlbumId: '1zwp5SAVhtuJS1OGNSqd0a',
    tone: '#c2462f',
  },
  {
    n: 3,
    title: 'aakhri tohfa',
    gloss: 'the last gift',
    state: 'The in-between',
    sound: 'Strings, guitar, voice',
    body: 'When love remains beyond betrayal and you have to deal with that yourself. An acknowledgement of what once was. A final act of letting go, while being completely honest about how much love was actually there.',
    line: 'mere bas mein hota toh…',
    released: '19 November 2026',
    tone: '#d9a45a',
  },
  {
    n: 4,
    title: 'waqt hi na sahi / kyun nahi',
    state: 'Aftermath',
    sound: 'Rock',
    body: 'The depressive episode. Introspection turning inward — the quiet that settles once there is nothing left to argue with. The EP’s outro.',
    line: 'Time has made a relationship with pain.',
    released: '19 November 2026',
    tone: '#5f7d9c',
  },
]

export const BIO = [
  'Sagar writes about the messy middle — when love stops making sense, and moving on isn’t quite as simple as everyone makes it sound.',
  'A Mumbai singer-songwriter, guitarist and self-described one-man boy band, Sagar has spent sixteen years obsessing over songwriting: guitar-led, Urdu-rooted songs about the things people feel constantly and say out loud rarely. Over 700 songs written, 26 released — a catalogue built on intricate guitar work, poetic lyricism in Hindi and Urdu, and an instinct to look directly at the parts of being human that are harder to say.',
  'Their music moves through love, mental health, self-love and identity, often pushing back on ideas of gender conformity — and it has made a home for a fiercely loyal, queer-friendly community of listeners.',
]

export const STATS = [
  { value: '5M+', label: 'Spotify streams' },
  { value: '700+', label: 'songs written' },
  { value: '26', label: 'songs released' },
  { value: '12,000+', label: 'Daisies' },
]

export const HIGHLIGHTS = [
  {
    kicker: 'Netflix',
    title: 'Mismatched, Season 3',
    body: '“Khaamiyan” and “Pyaar Hai” on the soundtrack — plus an on-screen cameo. Both songs charted on Spotify’s Viral India (#23 and #29).',
  },
  {
    kicker: 'Spotify editorial',
    title: 'Cover of Naya Indiestan',
    body: 'Also featured on Fresh Finds, Chai & Acoustic, Latest Love Tunes, Dinner & Chill and Web Series Hits.',
  },
  {
    kicker: 'On tour',
    title: 'Opened for Anuv Jain',
    body: 'Support slot on the national tour, playing to rooms of 15,000+.',
  },
  {
    kicker: 'Headliner',
    title: 'Tinder’s Queer Made Weekend',
    body: 'Headlined the festival — plus a private residency at The Lalit and a college circuit built largely independently.',
  },
]

// `with`: Sagar's song featuring others. `by`: someone else's song that Sagar features on.
export type Release = { title: string; year: number; with?: string; by?: string; cover: string; url: string; note?: string }

export const RELEASES: Release[] = [
  { title: 'gunaah', year: 2026, with: 'Dwai', cover: spotifyCover('1704ece7eedb2db2f3c83115'), url: 'https://open.spotify.com/album/1zwp5SAVhtuJS1OGNSqd0a' },
  { title: 'usey pata bhi nahi', year: 2026, with: 'Timothy Thampy', cover: spotifyCover('73e9ae1cf88cc6d7d4181bf0'), url: 'https://open.spotify.com/album/4n9MFNbR6xr6JTbsHxNBu7' },
  { title: 'Ittefaq', year: 2026, by: 'Deepika Seth', cover: spotifyCover('a08dd4d7a8c76ce5da530f00'), url: LINKS.spotify },
  { title: 'Jaaoge Toh', year: 2026, with: 'Nidhi Wagle', cover: spotifyCover('f23e9a2c8386cd91ec22fdbb'), url: 'https://open.spotify.com/album/6qGUHGcSTWe1TvRVyjM7eE' },
  { title: 'Saza', year: 2026, by: 'Sanjeeta Bhattacharya', cover: spotifyCover('75a2f60a11b76cdeeb58277f'), url: 'https://open.spotify.com/album/6qI2m8VHBk6sA9eWEn0gFl' },
  { title: 'aasaan mohabbatein', year: 2025, with: 'Gup Shup, Meera', cover: spotifyCover('b9303cf2d89fb0361215ff17'), url: LINKS.spotify },
  { title: 'Khaamiyan', year: 2024, note: 'Mismatched S3 · Netflix', cover: spotifyCover('a4be3815bbbcb3b5ebc0bf61'), url: LINKS.spotify },
  { title: 'awaaz bhi na aayi', year: 2024, with: 'Samahita Narang', cover: spotifyCover('d7da400f1910e4f176be5b39'), url: LINKS.spotify },
  { title: 'guzaara mera', year: 2024, cover: spotifyCover('173a304a317ab61af234a978'), url: LINKS.spotify },
  { title: 'khaamiyan (celebrate your imperfections)', year: 2023, cover: spotifyCover('8513d6db7de4e08cbfa686e0'), url: 'https://open.spotify.com/album/5aseIDR7reqh3gBzD1Vu5t' },
  { title: 'awaaz', year: 2022, cover: spotifyCover('344e2ec35e619a25f6e42dc7'), url: 'https://open.spotify.com/album/2DqlAntVB2QIn1t9H9JOAc' },
  { title: 'sach kehne do', year: 2022, cover: spotifyCover('6f7679ef6d0fd42631f4309e'), url: 'https://open.spotify.com/album/72RPtO7taz2nG9sls2AnAk' },
]

export const LIVE = {
  cities: 5,
  window: 'Feb–Mar ’27',
  note: 'five cities · early 2027',
  body: 'Cities and dates are being locked in right now. Daisies hear first — and get first dibs on tickets.',
}

export const BOOKING = {
  body: 'Festivals, college fests, weddings, private and corporate events, brand partnerships, sync and co-writes. Tell us what you have in mind and management will get back to you.',
  formats: [
    { name: 'Solo', detail: 'Voice and acoustic guitar — intimate rooms, residencies, weddings.' },
    { name: 'Duo', detail: 'Stripped back, for private events and smaller stages.' },
    { name: 'Five-piece', detail: 'Keys, electric guitar, bass and drums — festivals, college fests, headline shows.' },
  ],
}

export const DAISIES = {
  body: 'Around the music is The Daisies — 12,000+ people who came for the songs, stayed because they felt a little less alone in them, and found a home in the music and in each other.',
  perks: ['First dibs on tour tickets', 'Exclusive drops around the EP', 'Unreleased songs & voice notes'],
}
