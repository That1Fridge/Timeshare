import React, { useState } from 'react';
import './style.css';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';
import ScaleBox from './components/scaleBox';
import { User } from './dbservice';





export default function App() {
    const [showEntryOptions, setShowEntryOptions] = useState(false);
    const [showAmount, setShowAmount] = useState(false);
    const [showRange, setShowRange] = useState(false);


    return (

        <View style={style.body}>
            <View style={style.header}>

            </View>

            <View style={style.leftsidebar}>
            </View>

            <View style={style.centre}>
                {EntryOptions()}
                {Amount()}
                {Range()}
            </View>


        </View>
    )


    function EntryOptions() {

        if (showAmount) {
            return (null)
        } else

            if (showRange) {
                return (null)
            } else

                if (showEntryOptions) {

                    return (
                        <View id='options' style={style.Options}>
                            <View style={style.SelectChoice}>
                                <View id='amount' style={style.Amount}>
                                    <Button title="Amount" onPress={() => (setShowAmount(true))} />
                                </View>
                                <Button title="Range" onPress={() => (setShowRange(true))} />
                            </View>
                            <Button title="Cancel" onPress={() => alert('Hello World')} />
                        </View>
                    )
                }

                else {
                    return (
                        <View id='entry' style={style.Entry}>
                            <Button title="Entry" onPress={() => (setShowEntryOptions(true))} />
                        </View>)
                }

    };


    function Amount() {
        if (showAmount) {
            console.log('Amount');
            return (
                <View style={style.Options}>
                    <View style={style.amount}>
                        <TextInput style={style.input} placeholder="  hrs" />
                        <Text >:</Text>
                        <TextInput style={style.input} placeholder="mins" />
                        <Text >:</Text>
                        <TextInput style={style.input} placeholder="secs" />
                    </View>
                    <Button title="Submit" onPress={() => (Submit())} />
                </View>
            )
        }
    };

    function Range() {
        if (showRange) {
            console.log('Range');
            return (
                <ScaleBox />
            )
        }
    };


    function Submit() {
        User();
        // console.log('s');
    };



};


const style = StyleSheet.create({


    input: {
        width: '70%',
        margin: 0,
        padding: 1,
        marginRight: 0,

    },

    amount: {
        width: '40%',
        marginLeft: '30%',
        padding: 0,
        borderColor: 'white',
        borderWidth: 2,
        flexDirection: 'row'
    },

    header: {
        backgroundColor: 'rgb(176, 37, 37)',
        height: '5%',
        width: '100%',
        flexGrow: 1,
        marginBottom: '0%',
    },


    body: {
        flexGrow: 1,
    },

    leftsidebar: {
        width: '10%',
        backgroundColor: 'rgb(0, 0, 0)',
        height: '100%',
        flexGrow: 1,
    },

    centre: {
        paddingTop: '0%',
        marginTop: '2.4%',
        marginLeft: '10%',
        marginRight: '0%',
        height: '100%',
        width: '90%',
        flexGrow: 1,
        position: 'absolute',
        backgroundColor: 'green',
    },

    Button: {
        width: '300%',
        flex: 1,
        justifyContent: 'space-between',
        padding: '20%',
        paddingBlock: '20%',
        borderRadius: 0,
    },

    Amount: {
        marginLeft: '25%',
        borderRadius: 0,

    },

    Options: {
        flexDirection: 'column',
        marginRight: '0%',
        marginLeft: '35%',
        justifyContent: 'space-between',
        width: '20%',


    },

    Entry: {
        marginLeft: '35%',
        width: '20%',
        fontSize: 3000,
    },

    SelectChoice: {
        flexDirection: 'row',
        flex: 1,

    },


    Text: {
        fontSize: 200,
        color: 'rgb(255, 255, 255)',
        marginTop: '0%',
    }
});