import { defineCreatorServices } from './defaultServices.js';
import createPostJSONObject from './postTemplate.ts';
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
        }],{maxServices: 7}),
    },
];

fs.writeFileSync('seedProfiles.json', JSON.stringify(seedProfiles, null, 2));