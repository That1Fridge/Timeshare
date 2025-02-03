import { View, StyleSheet, Dimensions, PixelRatio } from "react-native";


export default function Registered(range:number, start_time:number){

    let fractionRange = range/86400000;
    let fractionStart = 250*(start_time/86400000);

    console.log("Fract RANge", fractionRange);
    console.log("Fract START", fractionStart);
        //Since Multislider only takes const numbers, we need to get the screen width and set it to that value.
        const screenWidth = Dimensions.get('window').width;
        const pixelRatio = PixelRatio.get();
        const sliderWidth = (screenWidth * 0.5) - (76.5 * pixelRatio); // 50% of screen width
    

    const style = StyleSheet.create({

        overlay:{
            backgroundColor:'red',
            flexDirection: 'column',
            marginRight: '70%',
            marginTop: '-35%',
            marginLeft: `${-77 + fractionStart}%`,
            marginBottom: '30%',
            justifyContent: 'space-between',
            position:'absolute',
            width: sliderWidth*fractionRange,
            height:60,
            padding:0,
        },
        });

    return(
        <View style={style.overlay}>
        
                            </View>
    )





}