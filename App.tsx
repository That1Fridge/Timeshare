import React, { act, useEffect, useState } from 'react';
import './style.css';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';
import ScaleBox, { returnValues } from './components/scaleBox';
import { Day, Log, NextDay, User } from './dbservice';
import { connectAndQuery } from './dbconnection';
import { useRangeReturn, useSlideBetweenReturn } from './functions/sliderStore';
import { timeTransformer, toMilliseconds, twentyfourConverter } from './functions/timeConverter';
import Registered from './components/overlay';
import { selectedArray } from './functions/selectedArray';




export default function App() {
    const [showEntryOptions, setShowEntryOptions] = useState(false);
    const [showAmount, setShowAmount] = useState(false);
    const [showRange, setShowRange] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [currDate, setCurrDate] = useState("");
    const [behind, setBehind] = useState(null);
    const [hrs, setHrs] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    const [total, setTotal] = useState(0);
    const [value, setValue] = useState(0);
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    // const [overlays, setOverlays] = useState(null);
    const [activeOver,setActiveOver] = useState(null);



    Submitfunction();
        if(activeOver!=false){
    return (

        <View style={style.body}>
            <View style={style.header}>

            </View>

            <View style={style.leftsidebar}>
            </View>

            <View style={style.centre}>
                {EntryOptions()}
                {Amount()}
                {RangeSubmit()}
            </View>


        </View>
    )
} else{
    return  (

        <View >

                {EntryOptions()}
                {Amount()}
                {RangeSubmit()}



        </View>
    )
}


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
                        <TextInput style={style.input} placeholder="  hrs" onChangeText={newText => setHrs(parseInt(newText))} />
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
        const [overlays, setOverlays] = useState<any[]>([]); 
        const [componOverlay, setComponOverlay] = useState<React.ReactNode>(null);


        useEffect(() => {
            if (showRange) {
                fetchOverlays();
                setActiveOver(false);

            }
        
        }, [showRange]);
        
    
        async function fetchOverlays() {
            try {
                const result = await connectAndQuery(`SELECT * FROM Log;`);
                console.log("RESULT of OVERLAY", result);
                setOverlays(result);
                


                const overlaysComponents = result.map((overlay: any, index: number) => (
                    <View key={index}>
                        {/* {Registered(overlay.end_time - overlay.start_time, overlay.start_time)} */}
                        {Registered(toMilliseconds(
                            overlay.end_time.substring(11,13),
                            overlay.end_time.substring(14,16),
                            overlay.end_time.substring(17,22)) - toMilliseconds(
                                overlay.start_time.substring(11,13),
                                overlay.start_time.substring(14,16),
                                overlay.start_time.substring(17,22)), 
                                toMilliseconds(
                                    overlay.start_time.substring(11,13),
                                    overlay.start_time.substring(14,16),
                                    overlay.start_time.substring(17,22))
                                )}
                        {/* <Text>`${"end timex,"+ 
                            overlay.end_time.substring(11,13)+":"+
                            overlay.end_time.substring(14,16)+":"+
                            overlay.end_time.substring(17,22)+ "start time" + toMilliseconds(
                                overlay.start_time.substring(11,13),
                                overlay.start_time.substring(14,16),
                                overlay.start_time.substring(17,22))}`</Text> */}
                    </View>
                ));
    
                setComponOverlay(overlaysComponents);
                setActiveOver(true);
            } catch (error) {
                console.error("Error fetching overlays:", error);
            }
        }

        
        // useEffect(() => {
        //     if(showRange){
        //         setOverlays(selectedArray());
        //     }
        // },[showRange]);
        if (showRange && activeOver) {
            // setOverlays(selectedArray());
            // let arraylength = overlays.length;
            return (
                <View style={style.Options}>
                    <View style={style.Range}>
                        {Range()}
                    </View>
                    {activeOver&&componOverlay}
                    {/* <AllOverlaysComponent overlays={overlays} /> */}
                    <Button title="Submit" onPress={() => (Submit())} />
                </View>
            )
        }
    };


    


     function AllOverlaysComponent({ overlays }: { overlays: any[] }){
        // const [componOverlay, setComponOverlay] = useState<React.ReactNode>(null);
        // const [overlays, setOverlays] = useState<any[]>([]); 
        // const [componOverlay, setComponOverlay] = useState<React.ReactNode>(null);
    
        // useEffect(() => {
  
        // const result = connectAndQuery(`SELECT * FROM Log;`)
            // .then((result) => {
            //     setOverlays(result);

            //     const overlaysComponents = result.map((overlay: any, index: number) => (
            //         <View key={index}>
            //             {Registered(overlay.end_time - overlay.start_time, overlay.start_time)}
            //         </View>
            //     ));
                
            //     setComponOverlay(overlaysComponents);
            //     console.log("IN EFFECT", result);
            //     return componOverlay;

            // });
    
        // }, []);
        console.log("IN OVERLAY");
        return (
            <View>
                {overlays.map((overlay: any, index: number) => (
                    <View key={index}>
                        {Registered(overlay.end_time - overlay.start_time, overlay.start_time)}
                    </View>
                ))}
            </View>
        );
    

    }



    function Submit() {
        setTotal((hrs * 3600000) + (mins * 60000) + (secs * 1000));
        if (showRange) {
            //     console.log("TESTTT 1001");
            // console.log('range try', useRangeReturn());
            // // const {range} = returnValues();
            // // console.log("PLEASE WORK : ", range);
            setValue(useRangeReturn());
            setStartTime(twentyfourConverter(useSlideBetweenReturn()[0]));
            setEndTime(twentyfourConverter(useSlideBetweenReturn()[1]));
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

        }, []);

        useEffect(() => {
            if (submit) {
                console.log('Submitfunction');
                Day();
                connectAndQuery(`SELECT TOP 1 daydate
           FROM Day
           ORDER BY daydate DESC;`).then((result) => {

                    let maxDate = result[0].daydate.toString().substring(0, 10);
                    console.log('begin behind', behind, 'date1 ', currDate, 'date2', maxDate);
                    if (parseInt(maxDate.substring(0, 4)) < parseInt(currDate.substring(0, 4)) ||
                        parseInt(maxDate.substring(5, 7)) < parseInt(currDate.substring(5, 7)) ||
                        parseInt(maxDate.substring(8, 10)) < parseInt(currDate.substring(8, 10))) {
                        setBehind(true);
                        console.log('in behind', behind);
                    } else {
                        setBehind(false);
                    }

                });
            }
        });


        // if(showRange){
        //     setStartTime(sliderBetween()[0]);
        //     setEndTime(sliderBetween()[1])
        // }
        useEffect(() => {
            if (submit) {
                console.log('value behind', behind);
                console.log('values, value:', value);
                NextDay(behind, total, currDate, value, showRange);
                Log(total, value, showRange, start_time, end_time, currDate);
                setSubmit(false);
            }
            setBehind(null);
        }, [behind]);

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

    overlay: {
        backgroundColor: 'red',
        flexDirection: 'column',
        marginRight: '70%',
        marginTop: '10%',
        marginLeft: '-80%',
        marginBottom: '30%',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '250%',
        height: 60,
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
        position: 'relative'

    },

    Range: {
        marginRight: '70%',
        marginTop: '10%',
        marginLeft: '-80%',
        marginBottom: '30%',
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

