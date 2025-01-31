
const range = {current:0};
const sliderBetween = {current:[0,0]}

export const useRangeReturn = () => {


    return range.current;
    // const {range} = returnValues();
    // console.log("range cool", range);

    // return range;
};


export const useSlideBetweenReturn = () => {


    return sliderBetween.current;
   
};



export const setSliderValues = (values) => {
    range.current = values; 
};

export const setSliderBetween = (values) => {
    sliderBetween.current = values; 
};