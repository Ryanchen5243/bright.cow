import { eachDayOfInterval, startOfMonth, endOfMonth, getDay } from 'date-fns';
import fs from 'fs';
import dayOfWeek from './dayOfWeek.js';
import { DateTime } from 'luxon';
const clientBrowserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const daysInCurrentMonth = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
});
// minutes-of-day + timezone + date → absolute instant (UTC)
// goal is f(provider_availabilities, consumer_time_zone, mm/yyyy) => provider_availabilities_in_consumer_time_zone
const data = JSON.parse(fs.readFileSync('./seedProfiles.json', 'utf-8'));
const providerTimeZone = data[0].availability_time_zone;
const providerAvailabilities = daysInCurrentMonth.map((day) => { // getDay(day) returns 0-6 for Sunday-Saturday
    return {
        day: day.toISOString().split('T')[0],
        beginAvailability: data[0].availabilities.find(availability => availability.weekday === getDay(day))?.startMin,
        endAvailability: data[0].availabilities.find(availability => availability.weekday === getDay(day))?.endMin,
    };
});
const providerRaw = {providerTimeZone, providerAvailabilities};
console.log('Provider Default Availabilities:', providerRaw);

/*
UI will generate provider availabilities via a calender interface with dragging as means for time slot creation -> backend will
normalize and process these availabilities into standard format -> React Big Calendar
*/


/*
function convert(day, startMin, endMin, fromTZ, toTZ) {
  const start = DateTime
    .fromISO(day, { zone: fromTZ })
    .plus({ minutes: startMin });

  const end = DateTime
    .fromISO(day, { zone: fromTZ })
    .plus({ minutes: endMin });

  return {
    start: start.setZone(toTZ),
    end: end.setZone(toTZ)
  };
}
const targetTimeZone = 'Asia/Tokyo';
const VALID_TIME_ZONES = Intl.supportedValuesOf('timeZone');
if (!VALID_TIME_ZONES.includes(targetTimeZone)) {
  throw new Error(`Invalid time zone: ${targetTimeZone}`);
}
const consumerAvailabilities = providerAvailabilities.map((availability) => {
    const { day, beginAvailability, endAvailability } = availability;
    const converted = convert(day, beginAvailability, endAvailability, providerTimeZone, targetTimeZone);
    return {
        beginAvailability: converted.start.toISO(),
        endAvailability: converted.end.toISO(),
        timeZone: targetTimeZone
    };
});
// console.log('Consumer Availabilities:', consumerAvailabilities);
*/