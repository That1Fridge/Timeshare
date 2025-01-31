

export function timeTransformer(value: number) {

    let hours = (Math.floor(value / (1000 * 60 * 60)));
    let minutes = (Math.floor((value % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = (Math.floor((value % (1000 * 60)) / 1000));
    let timeString = "";

    if (hours === 0) {
        timeString = "12:" + minutes + ":" + seconds + "AM";

    } else if (hours < 12) {
        timeString = hours + ":" + minutes + ":" + seconds + "AM";
    } else if (hours === 12) {
        timeString = hours + ":" + minutes + ":" + seconds + "PM";
    }
    else if (hours > 12) {
        timeString = hours - 12 + ":" + minutes + ":" + seconds + "PM";
    }

    return timeString;
}


export function twentyfourConverter(value: number) {
    let hours = (Math.floor(value / (1000 * 60 * 60)));
    let minutes = (Math.floor((value % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = (Math.floor((value % (1000 * 60)) / 1000));

    let timeString = "";

    if (hours === 0) {
        timeString = "24:" + minutes + ":" + seconds;

    } else if (hours < 24) {
        timeString = hours + ":" + minutes + ":" + seconds;
    } 
    else if (hours > 24) {
        timeString = hours - 24 + ":" + minutes + ":" + seconds + "PM";
    }

    return timeString;
}