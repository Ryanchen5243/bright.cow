import { defineCreatorServices } from './defaultServices.js';
import { v4 as uuid } from 'uuid'
import fs from 'fs'
export const defaultProfiles = [
  {
    id: uuid(),
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
    {
        title: "Shipping a cleaner booking flow this week",
        body: "Tightening up my late-night Valorant sessions so it is easier to book ranked, VOD review, or a low-key duo queue without the back-and-forth.",
        timestamp: "2h ago",
        likes: 84,
        comments: 12
    },
    {
        title: "Current focus: confidence + comms",
        body: "Most players do not need more raw mechanics first. They need sharper comms, cleaner pacing, and someone to make the next game feel winnable again.",
        timestamp: "Yesterday",
        likes: 61,
        comments: 8
    },
    {
        title: "Open slots for weekend sessions",
        body: "Added extra availability for Friday and Saturday. If you want structured help without the rigid coaching vibe, this is the best window to grab.",
        timestamp: "3d ago",
        likes: 49,
        comments: 5
    }],
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

fs.writeFileSync('src\\mocks\\lunaProfile.json', JSON.stringify(defaultProfiles, null, 2));