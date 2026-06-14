import { defineCreatorServices } from './defaultServices';
import { v4 as uuid } from 'uuid'
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
console.log('Default profiles defined:', defaultProfiles);