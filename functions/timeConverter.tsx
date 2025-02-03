

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

     if (hours > 24) {
        console.log("IN RANGE 3 ", hours);
        timeString = hours - 24 + ":" + minutes + ":" + seconds;
    }else if(hours==24){
        console.log("IN RANGE 1 ", hours);
        timeString = "23:59:59.997";

    }else{
        console.log("IN RANGE 2 ", hours);
        timeString = hours+ ":" + minutes + ":" + seconds;

    }
    console.log("TWENTY FOUR", timeString);

    return timeString;
}

export function toMilliseconds(hours: number, minutes:number, seconds:number) {
    let millseconds = 3600000*hours + 60000*minutes + 1000*seconds

    return millseconds;

}
