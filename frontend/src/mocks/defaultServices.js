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
                price: config.price,
            };
        case ServiceType.Session:
            return {
                type: ServiceType.Session,
                name: config.name,
                description: config.description,
                durationMin: config.durationMin ?? null,
                price: config.price,
            };
        case ServiceType.Bundle:
            return {
                type: ServiceType.Bundle,
                name: config.name,
                description: config.description,
                itemsPerBundle: config.itemsPerBundle,
                pricePerItem: config.pricePerItem,
                price: config.price,
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
 *   - durations: number[]  + pricePerMinute: number  (Minute services)
 *   - durations: number[]  + prices: number[]         (one price per duration, Session services)
 *   - bundles: { size, price }[]                      (Bundle services)
 *
 * Every duration / bundle size becomes a separate, individually keyed entry
 * in the returned object. Entries are capped at `maxServices` (default 10);
 * once the limit is reached, any remaining definitions are skipped with a warning.
 * Invalid or duplicate entries are also skipped with a warning rather than throwing.
 *
 * Returns a flat object keyed as  "<templateId>-<duration>min"  or
 * "<templateId>-<size>x"  suitable for direct use in booking/profile UIs.
 *
 * @param {object[]} serviceDefinitions - Array of service definition objects.
 * @param {object}   [options]
 * @param {number}   [options.maxServices=10] - Maximum number of service entries in the result.
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
 * ], { maxServices: 5 })
 */
export function defineCreatorServices(serviceDefinitions, { maxServices = 10 } = {}) {
    const result = [];
    const sessionServiceDurationHash = new Set(); // To track unique durations for Session services
    const minuteServiceDurationHash = new Set();  // To track unique durations for Minute services

    for (const def of serviceDefinitions) {
        if (result.length >= maxServices) {
            console.warn(`[defineCreatorServices] Reached maxServices limit of ${maxServices}. Additional services will be ignored.`);
            break;
        }
        const template = serviceTemplates[def.templateId];
        if (!template) {
            throw new Error(`Unknown service template: "${def.templateId}". Available: ${Object.keys(serviceTemplates).join(', ')}`);
        }

        const baseKey = def.templateId;

        // --- Minute-type services (pricePerMinute × duration) ---
        if (template.type === ServiceType.Minute) {
            if (def.durations == null || def.pricePerMinute == null) {
                console.warn(`[defineCreatorServices] "${baseKey}" is a Minute-type service but missing durations or pricePerMinute — both are required for Minute services.`);
                continue;
            }
            if (!Array.isArray(def.durations) || !(def.durations.length > 0)) {
                console.warn(`[defineCreatorServices] "${baseKey}" is a Minute-type service but no valid durations were provided — skipping.`);
                continue;
            }
            if (typeof def.pricePerMinute !== 'number' || def.pricePerMinute <= 0) {
                console.warn(`[defineCreatorServices] "${baseKey}" has an invalid pricePerMinute (${def.pricePerMinute}) for a Minute-type service — skipping.`);
                continue;
            }
            for (let index = 0; index < def.durations.length; index++) {
                if (result.length >= maxServices) {
                    console.warn(`[defineCreatorServices] Reached maxServices limit of ${maxServices}. Additional services will be ignored.`);
                    break;
                }
                const duration = def.durations[index];
                if (typeof duration !== 'number' || duration <= 0) {
                    console.warn(`[defineCreatorServices] "${baseKey}" duration at index ${index} is invalid (${duration}) — skipping this entry.`);
                    continue;
                }
                if (minuteServiceDurationHash.has(duration)) {
                    console.warn(`[defineCreatorServices] "${baseKey}" duration ${duration}min at index ${index} is a duplicate — skipping this entry.`);
                    continue;
                }
                minuteServiceDurationHash.add(duration);
                const key = `${baseKey}-${duration}min`;
                result.push({ id: key, ...createService(ServiceType.Minute, {
                    ...template,
                    durationMin: duration,
                    price: Math.round(def.pricePerMinute * duration * 100) / 100,
                }) });
            }
        }

        // --- Session-type services (fixed price per session, optional durations) ---
        else if (template.type === ServiceType.Session) {
            if (def.durations == null || def.prices == null) {
                console.error(`[defineCreatorServices] "${baseKey}" is a Session-type service but missing durations or prices — both are required for Session services.`);
                continue;
            }
            if (!Array.isArray(def.durations) || !Array.isArray(def.prices)) {
                console.error(`[defineCreatorServices] "${baseKey}" durations and prices must be arrays for Session-type services.`);
                continue;
            }
            if (!(def.durations.length > 0) || !(def.prices.length > 0)) {
                console.error(`[defineCreatorServices] "${baseKey}" durations and prices arrays must have at least one entry for Session-type services.`);
                continue;
            }
            if (def.durations.length !== def.prices.length) {
                console.error(`[defineCreatorServices] "${baseKey}" durations and prices arrays must be of the same length for Session-type services.`);
                continue;
            }
            if (Object.keys(def).filter(k => k !== 'templateId' && k !== 'durations' && k !== 'prices').length > 0) {
                console.warn(`[defineCreatorServices] "${baseKey}" has unexpected properties — they will be ignored.`);
            }
            for (let index = 0; index < def.durations.length; index++) {
                if (result.length >= maxServices) {
                    console.warn(`[defineCreatorServices] Reached maxServices limit of ${maxServices}. Additional services will be ignored.`);
                    break;
                }
                const duration = def.durations[index];
                if (typeof duration !== 'number' || duration <= 0) {
                    console.warn(`[defineCreatorServices] "${baseKey}" duration at index ${index} is invalid (${duration}) — skipping this entry.`);
                    continue;
                }
                if (sessionServiceDurationHash.has(duration)) {
                    console.warn(`[defineCreatorServices] "${baseKey}" duration ${duration}min at index ${index} is a duplicate for Session-type services — skipping this entry.`);
                    continue;
                }
                sessionServiceDurationHash.add(duration);
                const price = def.prices[index] ?? null;
                if (price === null) {
                    console.warn(`[defineCreatorServices] "${baseKey}-${duration}min" has no price (prices[${index}] is missing) — price will be null.`);
                }
                if (typeof price === 'number' && price < 0) {
                    console.warn(`[defineCreatorServices] "${baseKey}-${duration}min" has a negative price (${price}). Skipping this entry.`);
                    continue;
                }
                const key = `${baseKey}-${duration}min`;
                result.push({ id: key, ...createService(ServiceType.Session, {
                    ...template,
                    durationMin: duration,
                    price,
                }) });
            }
        }

        // --- Bundle-type services ---
        else if (template.type === ServiceType.Bundle) {
            if (!def.bundles || def.bundles.length === 0) {
                console.warn(`[defineCreatorServices] "${baseKey}" is a Bundle-type service but no bundles were provided — skipping.`);
            } else {
                for (let index = 0; index < def.bundles.length; index++) {
                    if (result.length >= maxServices) {
                        console.warn(`[defineCreatorServices] Reached maxServices limit of ${maxServices}. Additional services will be ignored.`);
                        break;
                    }
                    const { size, price } = def.bundles[index];
                    if (typeof size !== 'number' || size <= 0) {
                        console.warn(`[defineCreatorServices] "${baseKey}" bundle at index ${index} has an invalid size (${size}) — skipping this entry.`);
                        continue;
                    }
                    if (typeof price !== 'number' || price < 0) {
                        console.warn(`[defineCreatorServices] "${baseKey}" bundle at index ${index} has an invalid price (${price}) — skipping this entry.`);
                        continue;
                    }
                    if (price === 0) {
                        console.warn(`[defineCreatorServices] "${baseKey}-${size}x" has a price of 0.`);
                    }
                    const key = `${baseKey}-${size}x`;
                    result.push({ id: key, ...createService(ServiceType.Bundle, {
                        ...template,
                        itemsPerBundle: size,
                        pricePerItem: Math.round((price / size) * 100) / 100,
                        price,
                    }) });
                }
            }
        }
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

