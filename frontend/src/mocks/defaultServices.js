export const ServiceType = {
    Minute: 'minute',
    Session: 'session',
    Bundle: 'bundle',
}
const services = {
    /*
        Default Services [creator -> minimum 2 services (e.g. gaming session + photo request @ $3 per photo), no restrictions on 2+ of same kind service
        -> creator selection of services capped at 10, exclusive of custom session [with custom message (e.g. DM me for more etc)] -> total is max 11 services for any profile
        Gaming Session (1 on 1, $[5-10] per session) [Gaming Duo]
        Message Chat (texting, $[2-5] per 15 min) [Private Chat]
        Video Conversation (casual video call, $[5-10] per 15 min) [1-on-1 Face Call]
        Photo Request (tier list -> $[2-5] per photo, $[20] per bundle of 10 photos) [Exclusive Photos]
        Voice Message Request ($[5] per message, $[15] per bundle of 4 (buy3get1free) [ASMR/Voice Message]
        Custom Session -> (e.g. Private Forum/Page/Discord Server/Instagram, $ tbd)
    */
    gamingSession: {
        name: 'Gaming Session',
        description: '1 on 1 gaming session',
        type: ServiceType.Session,
        recommendedPrice: [5, 10],
        durationMin: null,
        bundleSize: null,
        price: recommendedPrice[0]
    },
    messageChat: {
        name: 'Message Chat',
        description: 'Texting service',
        type: ServiceType.Minute,
        recommendedPrice: [2, 5],
        durationMin: 15,
        bundleSize: null,
        price: recommendedPrice[0],
    },
    videoConversation: {
        name: 'Video Conversation',
        description: 'Casual video call',
        type: ServiceType.Minute,
        recommendedPrice: [5, 10],
        durationMin: 15,
        bundleSize: null,
        price: recommendedPrice[0],
    },
    photoRequest: {
        name: 'Photo Request',
        description: 'Request exclusive photos',
        type: ServiceType.Bundle,
        recommendedPrice: [2, 5],
        durationMin: null,
        bundleSize: 10,
        price: recommendedPrice[0],
    },
    voiceMessageRequest: {
        name: 'Voice Message Request',
        description: 'Request ASMR/Voice messages',
        type: ServiceType.Bundle,
        recommendedPrice: [5, 15],
        durationMin: null,
        bundleSize: 4,
        price: recommendedPrice[0],
    },
    customSession: {
        name: 'Custom Session',
        description: 'Custom service session',
        type: ServiceType.Session,
        recommendedPrice: [null, null],
        durationMin: null,
        bundleSize: null,
        price: recommendedPrice[0],
    },
}
export default services