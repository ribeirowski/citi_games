import { getDay,getMonth,getYear } from "date-fns";

export function isActual(matchDate: Date,currentDate: Date): number {
    const matchDay = getDay(matchDate);
    const matchMonth = getMonth(matchDate);
    const matchYear = getYear(matchDate);
    const currentDay = getDay(currentDate);
    const currentMonth = getMonth(currentDate);
    const currentYear = getYear(currentDate);
    if (matchYear > currentYear) {
        return 2;
    } else if (matchYear === currentYear) {
        if (matchMonth > currentMonth) {
            return 2;
        } else if (matchMonth === currentMonth) {
            if (matchDay > currentDay) {
                return 2;
            }
            else if (matchDay === currentDay) {
                return 1;
            }
        }
    }
    return 0;
}

export function hourInvalid(matchDate: Date, currentDate: Date): boolean {
    const matchHour = matchDate.getHours();
    const matchMinute = matchDate.getMinutes();
    const currentMinute = currentDate.getMinutes();
    const currentHour = currentDate.getHours();
    if (matchHour > currentHour) {
        return false;
    }
    else if ( matchHour === currentHour) {
        if (matchMinute > currentMinute) {
            return false;
        }
    }
    return true;
}