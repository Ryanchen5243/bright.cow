import { defineCreatorServices } from './defaultServices.js';
import { createPost } from './postTemplate.js';
import { v4 as uuid } from 'uuid'
import fs from 'fs'

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
        createPost({
            title: 'Epic Boss Battle in Elden Ring!',
            author: id,
            content: 'Just defeated the Fire Giant in Elden Ring after hours of trying! Here\'s how I did it...',
            attachments: [{ type: 'image', url: 'https://example.com/eldenring_boss.jpg' }],
            comments: [
                { id: uuid(), author: 'user123', content: 'Congrats! That boss is tough!' },
                { id: uuid(), author: 'gamer_girl', content: 'Ive been stuck on that part for days, any tips?' }
            ]
        }),
        createPost({
            title: 'Top 5 Tips for New Players in Elden Ring',
            author: id,
            content: 'If you\'re new to Elden Ring, here are my top 5 tips to get you started on your adventure!',
            attachments: [{ type: 'video', url: 'https://example.com/eldenring_tips.mp4' }],
            comments: [
                { id: uuid(), author: 'newbie_gamer', content: 'Thanks for the tips! Just started playing and this is super helpful.' },
                { id: uuid(), author: 'veteran_player', content: 'Great advice! I wish I had this when I first started.' }
            ]
        }),
        createPost({
            title: 'Open Slots for Weekend Sessions',
            author: id,
            content: 'I have some open slots for gaming sessions this weekend. DM me if you want to join!',
            attachments: [],
            comments: [
                { id: uuid(), author: 'gamer_buddy', content: 'I\'d love to join! I\'ve been looking for someone to play with.' },
                { id: uuid(), author: 'casual_gamer', content: 'I\'m interested too! What games are you planning to play?' }
            ]
        }),
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