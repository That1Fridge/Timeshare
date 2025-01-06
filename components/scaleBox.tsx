import { StyleSheet, View, Text, useAnimatedValue, Animated, ViewStyle, Dimensions,PixelRatio} from 'react-native';
import React, { useEffect, PropsWithChildren } from 'react';
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


    const timeTransformer = (value) => {
        let minsSecs; 
        if (value % 1!= 0) {
            //if the value is not a whole num, get the decimal part and convert it to mins/secs
            minsSecs =  ":" + (value- Math.floor(value))*100;
        }
    
        if (value === 0){
            return "12:" +minsSecs + " AM" //if the value is 0, return 12:00 AM
        }
        if (value > 12) {
            //if the value is greater than 12, subtract 12 and add PM
            //if the value is not a whole num, remove decimal to put it in string minsSecs
            return (value - 12) - (value%(Math.floor(value)))+ minsSecs + " PM";
        } else if (value < 12) {
            return value + minsSecs + " AM"; //if the value is less than 12, return the value + minsSecs + AM
        } else if (value === 12) {
            return "12:" + minsSecs +" PM";//if the value is 12, return 12:00 PM
        }
        }
    
    


export default function ScaleBox() {

    return (
<FadeInView style ={style.SliderContainer}>
        <View style={style.Slider}>
            <MultiSlider
                min={0.5}
                max={24}
                values={[0, 24]}
                onValuesChange={(values) => console.log(values)}
                sliderLength={sliderWidth}
                enableLabel={true}
                step={0.06}
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