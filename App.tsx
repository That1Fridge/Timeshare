import React, { useEffect, useState } from 'react';
import './style.css';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';
import ScaleBox, {   returnValues}  from './components/scaleBox';
import { NextDay, User } from './dbservice';
import { connectAndQuery } from './dbconnection';
import { useRangeReturn } from './components/sliderStore';




export default function App() {
    const [showEntryOptions, setShowEntryOptions] = useState(false);
    const [showAmount, setShowAmount] = useState(false);
    const [showRange, setShowRange] = useState(false);
    const [submit, setSubmit] = useState(false);   
    const [currDate, setCurrDate] = useState("");
    const [behind, setBehind] = useState(false);
    const [hrs, setHrs] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    const [total, setTotal] = useState(0);
    const [value, setValue] = useState(0);



    Submitfunction();

    return (

        <View style={style.body}>
            <View style={style.header}>

            </View>

            <View style={style.leftsidebar}>
            </View>

            <View style={style.centre}>
                {EntryOptions()}
                {Amount()}
                {/* {Range()} */}
                {RangeSubmit()}
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
                        <TextInput style={style.input} placeholder="  hrs" onChangeText={newText => setHrs(parseInt(newText))}/>
                        <Text >:</Text>
                        <TextInput style={style.input} placeholder="mins" onChangeText={newText => setMins(parseInt(newText))} />
                        <Text >:</Text>
                        <TextInput style={style.input} placeholder="secs" onChangeText={newText => setSecs(parseInt(newText))} />
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

    function RangeSubmit() {
        if (showRange) {
            return (
                <View style={style.Options}>
                <View style={style.Range}>
                    {Range()}
                </View>
                <Button title="Submit" onPress={() => (Submit())} />
                 </View>
            )
        }
    };

    function Submit() {
        setTotal((hrs * 3600000) + (mins * 60000) + (secs * 1000));
        if(showRange){
        //     console.log("TESTTT 1001");
        // console.log('range try', useRangeReturn());
        // // const {range} = returnValues();
        // // console.log("PLEASE WORK : ", range);
        setValue(useRangeReturn());
        
        }
        console.log('total', total);
        setSubmit(true);
    }


    function Submitfunction() {

        useEffect(() => {
                
                const now = new Date();
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Ensure 2-digit month
                const date = now.getDate().toString().padStart(2, "0"); // Ensure 2-digit date
                  console.log('date ' + `${year}-${month}-${date}`);      
                  setCurrDate(`${year}-${month}-${date}`);


                //   setBehind(false); 

        },[]);


            if(submit){
                console.log('Submitfunction');

                connectAndQuery(`SELECT TOP 1 daydate
           FROM Day
           ORDER BY daydate DESC;`).then((result) => {

            let maxDate = result[0].daydate.toString().substring(0,10);
            console.log('begin behind', behind,'date1 ', currDate, 'date2', maxDate);
            if(parseInt(maxDate.substring(0,4)) < parseInt(currDate.substring(0,4))){
                setBehind(true);
                console.log('in behind', behind);
            }

            if(parseInt(maxDate.substring(5,7)) < parseInt(currDate.substring(5,7))){
                    setBehind(true);
                    console.log('in behind', behind);
                }
             if(parseInt(maxDate.substring(8,10)) < parseInt(currDate.substring(8,10))){
                        setBehind(true);
                        console.log('in behind 3', behind);
             }
             setSubmit(false);

        });


        
            }
            NextDay(behind,total, currDate, value, showRange);
        // User();
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

    Range: {
        flexDirection: 'column',
        marginRight: '70%',
        marginTop: '10%',
        marginLeft: '-80%',
        marginBottom: '30%',
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