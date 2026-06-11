export const ServiceType = {
    Minute: 'minute',
    Session: 'session',
    Bundle: 'bundle',
}
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

function createService(type, config) {
    switch (type) {
        case ServiceType.Minute:
            return {
                type: ServiceType.Minute,
                name: config.name,
                description: config.description,
                durationMin: config.durationMin ?? 15,
                pricePerMinute: config.pricePerMinute,
            };
        case ServiceType.Session:
            return {
                type: ServiceType.Session,
                name: config.name,
                description: config.description,
                pricePerSession: config.pricePerSession ?? 5,
            };
        case ServiceType.Bundle:
            return {
                type: ServiceType.Bundle,
                name: config.name,
                description: config.description,
                pricePerItem: config.pricePerItem,
                itemsPerBundle: config.itemsPerBundle,
                bundlePrice: config.bundlePrice,
            };
        default:
            throw new Error(`Unknown service type: ${type}`);
    }
}

// Canonical base-service definitions — no variants baked in.
// Creators pick from these base IDs and define their own durations / bundle sizes.
export const serviceTemplates = {
    gamingDuo: {
        type: ServiceType.Session,
        name: 'Gaming Duo',
        description: '1-on-1 gaming session',
    },
    privateChat: {
        type: ServiceType.Minute,
        name: 'Private Chat',
        description: 'Texting service',
    },
    faceCall: {
        type: ServiceType.Minute,
        name: '1-on-1 Face Call',
        description: 'Casual video conversation',
    },
    exclusivePhotos: {
        type: ServiceType.Bundle,
        name: 'Exclusive Photos',
        description: 'Photo request service with bundle pricing',
    },
    asmrVoiceMessage: {
        type: ServiceType.Bundle,
        name: 'ASMR/Voice Message',
        description: 'Voice message request service with bundle pricing',
    },
    customSession: {
        type: ServiceType.Session,
        name: 'Custom Session',
        description: 'Flexible session designed around the fan\'s request',
    },
};

/**
 * defineCreatorServices — the main creator-facing API.
 *
 * A creator passes an array of service definitions. Each entry picks a base
 * template and then supplies either:
 *   - durations: number[]  + pricePerMinute (Minute services)
 *   - durations: number[]  + prices: number[]  (one price per duration, Session services)
 *   - bundles: { size, price }[]              (Bundle services)
 *
 * Every duration / bundle size becomes a separate, individually capped entry
 * toward the 10-service limit.
 *
 * Returns a flat object keyed as  "<templateId>-<duration>min"  or
 * "<templateId>-<size>x"  suitable for direct use in booking/profile UIs.
 *
 * @example
 * defineCreatorServices([
 *   {
 *     templateId: 'gamingDuo',
 *     durations: [15, 20, 30, 45],
 *     prices: [5, 7, 10, 14],           // one price per duration
 *   },
 *   {
 *     templateId: 'privateChat',
 *     durations: [15, 30],
 *     pricePerMinute: 0.33,
 *   },
 *   {
 *     templateId: 'exclusivePhotos',
 *     bundles: [
 *       { size: 1,  price: 3  },
 *       { size: 5,  price: 12 },
 *       { size: 10, price: 20 },
 *     ],
 *   },
 * ])
 */
export function defineCreatorServices(serviceDefinitions, { maxServices = 10 } = {}) {
    const result = {};

    for (const def of serviceDefinitions) {
        const template = serviceTemplates[def.templateId];
        if (!template) {
            throw new Error(`Unknown service template: "${def.templateId}". Available: ${Object.keys(serviceTemplates).join(', ')}`);
        }

        const baseKey = def.templateId;

        // --- Minute-type services (pricePerMinute × duration) ---
        if (template.type === ServiceType.Minute && def.durations) {
            def.durations.forEach((duration, index) => {
                const pricePerMinute = def.pricePerMinute ?? 0;
                const cost = def.prices
                    ? def.prices[index] ?? null
                    : Math.round(duration * pricePerMinute * 100) / 100;
                const key = `${baseKey}-${duration}min`;
                result[key] = createService(ServiceType.Minute, {
                    ...template,
                    durationMin: duration,
                    pricePerMinute: cost !== null ? cost / duration : pricePerMinute,
                    _cost: cost, // flat cost label for display
                });
                result[key]._displayCost = cost;
            });
        }

        // --- Session-type services (fixed price per session, optional durations) ---
        else if (template.type === ServiceType.Session) {
            if (def.durations && def.prices) {
                def.durations.forEach((duration, index) => {
                    const price = def.prices[index] ?? null;
                    const key = `${baseKey}-${duration}min`;
                    result[key] = createService(ServiceType.Session, {
                        ...template,
                        pricePerSession: price,
                        _durationMin: duration,
                    });
                    result[key]._durationMin = duration;
                });
            } else if (def.prices) {
                def.prices.forEach((price) => {
                    const key = `${baseKey}-$${price}`;
                    result[key] = createService(ServiceType.Session, {
                        ...template,
                        pricePerSession: price,
                    });
                });
            } else {
                // Single default entry with no variants
                result[baseKey] = createService(ServiceType.Session, { ...template });
            }
        }

        // --- Bundle-type services ---
        else if (template.type === ServiceType.Bundle && def.bundles) {
            def.bundles.forEach(({ size, price }) => {
                const key = `${baseKey}-${size}x`;
                result[key] = createService(ServiceType.Bundle, {
                    ...template,
                    itemsPerBundle: size,
                    bundlePrice: price,
                    pricePerItem: Math.round((price / size) * 100) / 100,
                });
            });
        }

        if (Object.keys(result).length >= maxServices) break;
    }

    return result;
}

// Kept for backward compat — pre-built flat catalog using the new API.
export const defaultServices = defineCreatorServices([
    {
        templateId: 'gamingDuo',
        durations: [30, 60],
        prices: [5, 10],
    },
    {
        templateId: 'privateChat',
        durations: [15, 30],
        pricePerMinute: 0.33,
    },
    {
        templateId: 'faceCall',
        durations: [15, 30, 60],
        pricePerMinute: 0.66,
    },
    {
        templateId: 'exclusivePhotos',
        bundles: [
            { size: 1,  price: 3  },
            { size: 10, price: 20 },
        ],
    },
    {
        templateId: 'asmrVoiceMessage',
        bundles: [
            { size: 1, price: 5  },
            { size: 4, price: 15 },
        ],
    },
]);

// --- OLD API (superseded by defineCreatorServices) ---
// function mergeServiceConfig(service, override = {}) {
//     return {
//         ...service,
//         ...override,
//     }
// }
//
// export function getCustomizableDefaultServices(options = {}) {
//     const {
//         overrides = {},
//         enabledServiceKeys = null,
//         maxServices = 10,
//     } = options
//
//     const merged = Object.entries(defaultServices).reduce((acc, [serviceKey, serviceConfig]) => {
//         acc[serviceKey] = mergeServiceConfig(serviceConfig, overrides[serviceKey])
//         return acc
//     }, {})
//
//     const filteredEntries = enabledServiceKeys
//         ? Object.entries(merged).filter(([serviceKey]) => enabledServiceKeys.includes(serviceKey))
//         : Object.entries(merged)
//
//     return Object.fromEntries(filteredEntries.slice(0, maxServices))
// }
//
// export function getCustomizableDefaultServicesList(options = {}) {
//     return Object.entries(getCustomizableDefaultServices(options)).map(([serviceKey, service]) => ({
//         key: serviceKey,
//         ...service,
//     }))
// }
//
// export default getCustomizableDefaultServices