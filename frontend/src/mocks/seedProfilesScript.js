import { defineCreatorServices } from './defaultServices.js';
import createPostJSONObject from './postTemplate.ts';
import dayOfWeek from './dayOfWeek.js';
import { v4 as uuid } from 'uuid'
import fs from 'fs'
// command to run is npx tsx seedProfilesScript.js
const id = uuid();
export const seedProfiles = [
  {
    id: id,
    userName: '@luna_gamer',
    userDisplayName: 'Luna Wang',
    profilePhoto: 'https://example.com/avatar1.png',
    backgroundPhoto: 'https://example.com/background1.jpg',
    userBio: 'Passionate gamer and content creator. I love sharing my gaming experiences and connecting with fellow gamers!',
    gamesPlayed: 150,
    favoriteGame: 'The Legend of Zelda: Breath of the Wild',
    availability_time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    quickFacts: [
        { label: "Languages", value: "English, Korean", icon: "Translate" },
        { label: "Location", value: "New York, USA", icon: "Public" },
        { label: "Avg Response", value: "1 hour", icon: "WatchLater" }
    ],
    recentPosts: [
        createPostJSONObject('Hello World', id, 'This is a sample post content.', [{ type: 'image', url: 'https://via.placeholder.com/150' }], [{ id: uuid(), author_id: uuid(), content: 'Nice post!' }]),
        createPostJSONObject('Another Post', id, 'This is another sample post content.', [], [{ id: uuid(), author_id: uuid(), content: 'Great insights!' }]),
        createPostJSONObject('Gaming Tips', id, 'Here are some gaming tips for beginners.', [{ type: 'video', url: 'https://example.com/video.mp4' }], [{ id: uuid(), author_id: uuid(), content: 'Thanks for the tips!' }]),
        createPostJSONObject('Live Stream Announcement', id, 'Join me for a live stream this weekend!', [], [{ id: uuid(), author_id: uuid(), content: 'Looking forward to it!' }]),
        createPostJSONObject('Game Review', id, 'Just finished playing XYZ game. Here’s my review.', [{ type: 'image', url: 'https://via.placeholder.com/150' }], [{ id: uuid(), author_id: uuid(), content: 'Great review!' }]),
    ],
    services: defineCreatorServices([
        {
            templateId: 'gamingDuo',
            durations: [30, 60],
            prices: [5, 10],
        },
        {
            templateId: 'faceCall',
            durations: [15, 30],
            pricePerMinute: 0.66,
        },
        {
            templateId: 'exclusivePhotos',
            bundles: [
                {size: 5, price: 12},
                {size: 10, price: 20},
                {size: 20, price: 35}
            ]
        }
    ], {maxServices: 7}),

    availabilities: [{
        weekday: dayOfWeek.Monday, // Monday
        startMin: 540, // 9:00 AM
        endMin: 1020, // 5:00 PM
    },
    {
        weekday: dayOfWeek.Tuesday, // Tuesday
        startMin: 540, // 9:00 AM
        endMin: 1020, // 5:00 PM
    },
    {   weekday: dayOfWeek.Thursday, // Thursday
        startMin: 540, // 9:00 AM
        endMin: 1020, // 5:00 PM
    },
    {
        weekday: dayOfWeek.Friday, // Friday
        startMin: 540, // 9:00 AM
        endMin: 1020, // 5:00 PM
    }],
    sessions: [
        {
            session_id: uuid(),
            session_provider: id, // creator
            session_consumer: uuid(), // user
            session_type: 'Duo Gaming',
            session_start_UTC: '2023-08-01T14:00:00Z',
            session_end_UTC: '2023-08-01T15:00:00Z',
            session_duration_min: 60, // in minutes
            session_cost: 50.00, // in USD
            session_status: 'booked', // tbd state machine for session lifecycle
        },
    ]
  },
];

fs.writeFileSync('seedProfiles.json', JSON.stringify(seedProfiles, null, 2));