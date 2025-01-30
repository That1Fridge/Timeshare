
const range = {current:0};

export const useRangeReturn = () => {


    return range.current;
    // const {range} = returnValues();
    // console.log("range cool", range);

    // return range;
};


export const setSliderValues = (values) => {
    range.current = values; 
};