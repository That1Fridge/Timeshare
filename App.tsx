import React, { useState } from 'react';
import './style.css';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';




export default function App() {
    const [showEntryOptions, setShowEntryOptions] = useState(false);
    const [showAmount, setShowAmount] = useState(false);

    return (

        <View style={style.body}>
            <View style={style.header}>

            </View>

            <View style={style.leftsidebar}>
                <Text>Left</Text>
            </View>

            <View style={style.centre}>
                {EntryOptions()}
                {Amount()}
            </View>

            <View id="rightsidebar">
            </View>
        </View>
    )


    function EntryOptions() {

        if (showAmount) {
            return(null)
        } else 
      
        if (showEntryOptions) {

            return (
                <View id='options' style={style.Options}>
                    <View style={style.SelectChoice}>
                    <Button title="Amount" onPress={() => (setShowAmount(true))} />
                    <Button title="Range" onPress={() => alert('Hello World')} />
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
        if(showAmount) {
            console.log('Amount');
        return (
            <View id='options' style={style.Options}>
                <TextInput placeholder="Amount" />
            </View>
        )
    }
    };



};


const style = StyleSheet.create({

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
        marginTop: '20%',
        marginLeft: '47%',
        flexGrow: 1,
        position: 'absolute',
    },


    Button: {
        marginTop: '0%',
        margin: '0%',

    },

    Options: {
        flexDirection: 'column',
        marginRight: '0%',
    },

    Entry: {
        marginLeft: '30%',
        width: '130%',  
        fontSize: 3000, 
    },
    
    SelectChoice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    


    Text: {
        fontSize: 200,
        color: 'rgb(255, 255, 255)',
        marginTop: '0%',
    }
});