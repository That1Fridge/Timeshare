import { StyleSheet, View, Text, useAnimatedValue, Animated, ViewStyle, Dimensions,PixelRatio} from 'react-native';
import React, { useEffect, PropsWithChildren, useState } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LabelTransformer from '../.expo/functions/valueToTime';



  
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


    function timeTransformer(value: number) {
        let minsSecs; 

      let hours = ( Math.floor(value / (1000 * 60 * 60)));
     let minutes = (Math.floor((value % (1000 * 60 * 60)) / (1000 * 60)));
     let seconds = (Math.floor((value % (1000 * 60)) / 1000));
     let timeString = "";
     if(hours===0){
         timeString = "12:" + minutes + ":" +  seconds + "AM";

     } else if(hours <12 ){
         timeString = hours + ":" + minutes + ":" +  seconds + "AM";
     } else if (hours === 12){
         timeString = hours + ":" + minutes + ":" +  seconds + "PM";
     }
     else if (hours > 12){
         timeString = hours-12 + ":" + minutes + ":" +  seconds + "PM";
     }

        return timeString;
        }
    
    


export default function ScaleBox() {

    return (
<FadeInView style ={style.SliderContainer}>
        <View style={style.Slider}>
            <MultiSlider
                min={0}
                max={86400000}
                values={[0, 86400000]}
                onValuesChange={(values) => console.log(values)}
                sliderLength={sliderWidth}
                enableLabel={true}
                step={10000}
                customLabel={LabelTransformer(timeTransformer)}
                
            />
        </View>

                </FadeInView>

    );


};


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
        borderWidth: 10,
        position: 'absolute',
        backgroundColor: '#2C4870',
    },
});