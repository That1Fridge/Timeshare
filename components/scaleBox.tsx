import { StyleSheet, View, Text, useAnimatedValue, Animated, ViewStyle, Dimensions,PixelRatio} from 'react-native';
import React, { useEffect, PropsWithChildren, useState, useCallback, useRef } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LabelTransformer from '../.expo/functions/valueToTime';
import { color } from '@rneui/themed/dist/config';
// import { range } from './App';
import { useRangeReturn, setSliderValues, setSliderBetween } from '../functions/sliderStore.js'; 
import {timeTransformer} from '../functions/timeConverter';
import { Slider } from 'react-compound-slider';


  
const FadeInView: React.FC<PropsWithChildren<{style: ViewStyle}>> = props => {
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};


    //Since Multislider only takes const numbers, we need to get the screen width and set it to that value.
    const screenWidth = Dimensions.get('window').width;
    const pixelRatio = PixelRatio.get();
    const sliderWidth = (screenWidth * 0.5) - (76.5 * pixelRatio); // 50% of screen width


    
    
  // const [range, setRange] = useState(0);


export default function ScaleBox() {
//   const [range, setRange] = useState(0);
//     return (
// <FadeInView style ={style.SliderContainer}>
//         <View style={style.Slider}>
//             <MultiSlider
//                 min={0}
//                 max={86400000}
//                 values={[0, 86400000]}
//                 onValuesChange={(values) => console.log(values[1]-values[0])}
//                 sliderLength={sliderWidth}
//                 enableLabel={true}
//                 step={10000}
//                 customLabel={LabelTransformer(timeTransformer)}
                
//             />
//         </View>

//                 </FadeInView>

//     );
    const {scale} = returnValues();

    return scale;

};


// export const useRangeReturn = () => {


//     // return range.current;
//     // const {range} = returnValues();
//     // console.log("range cool", range);

//     // return range;
// };

// const range = useRef(0);

export function returnValues() {

  const valuechanges = (values) => {
    setSliderValues(values[1]-values[0]);
    // range.current = values[1]-values[0];
    setSliderBetween(values);
  }

  const scale = (

<FadeInView style ={style.SliderContainer}>
        <View style={style.Slider}>
            <MultiSlider
                min={0}
                max={86400000}
                values={[0, 86400000]}
                onValuesChange={valuechanges}
                sliderLength={sliderWidth}
                enableLabel={true}
                step={10000}
                customLabel={LabelTransformer(timeTransformer)}
                
            />
        </View>

                </FadeInView>

  );

  return {scale};

}

function setReturn(setRange: any, range: any) {
  // const [range, setRange] = useState(0);

  useEffect(() => {
      console.log('Range:', range);
    setRange(range);
      }, [range]);
}

const style = StyleSheet.create({

    Slider: {
        marginTop: '20%',
        width: '50%',
        height: '100%',
        position: 'absolute',
    },


    SliderContainer: {
        width: '50%',
        height: '30%',
        marginLeft: '20%',
        marginTop: '10%',
        borderRadius: 0,
        borderColor: 'black',
        borderWidth: 0,
        position: 'absolute',
    },
});

