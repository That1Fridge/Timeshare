import React from "react";
import { Text, View , StyleSheet, Dimensions} from "react-native";

function LabelProp(props)
{
    const { position, value } = props;

    return (
        <View style={[
            styles.sliderLabel, // this one is position absolute
            {
                left: position - (Dimensions.get('window').width * 0.5) / 2,
            },
        ]}>
            <Text style={styles.sliderLabelText} >{value}</Text>
        </View>
    );
}



export default function LabelTransformer(textTransformer: (value: number) => string){
    return function (props) {

        const {
            oneMarkerValue,
            twoMarkerValue,
            oneMarkerLeftPosition,
            twoMarkerLeftPosition,
        } = props;

        return (            <View>
            <LabelProp
                position={oneMarkerLeftPosition}
                value={textTransformer(oneMarkerValue)}
            />
            {twoMarkerValue ? 
                <LabelProp
                    position={twoMarkerLeftPosition}
                    value={textTransformer(twoMarkerValue)}
                /> : null
            }
        </View>
);
    };
}


 
const styles = StyleSheet.create({
    sliderLabel: {
        position: 'absolute',
        justifyContent: 'center',
        top: 30,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.05,
    },
    sliderLabelText: {
        textAlign: 'center',
        lineHeight: Dimensions.get('window').height * 0.05,
        flex: 1,
    },
});
