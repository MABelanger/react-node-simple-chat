// ref: https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
export function timeDifference(current, previous) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < 0) {
         return Math.round(0) + ' seconds ago';
    }

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if ( (elapsed < msPerMonth) && (Math.round(elapsed/msPerDay) <= 1) ) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    // else if (elapsed < msPerYear) {
    //     return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    // }

    else {
        // return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
        var options = { weekday: 'long', month: 'long', day: 'numeric' };
        let day = new Date(previous).toLocaleDateString("fr-CA", options);
        return day;
    }
}

export function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
