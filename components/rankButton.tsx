import { View, StyleSheet, Text, Button, TouchableOpacity, Pressable } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DraggableFlatList, { NestableScrollContainer, NestableDraggableFlatList, RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'; 
import { Header } from "@rneui/themed";
import 'react-native-gesture-handler';
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { pressed, setPressed } from "../functions/rankingfunctions";
import { Activity } from "../dbservice";
import { connectAndQuery } from "../dbconnection";
import { Item, selectedArray } from "../functions/selectedArray";
import { ArrayOrder } from "../functions/order";



export default function RankButton() {
    const [isReturn, setIsReturn] = useState(pressed());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentPressed = pressed();
            setIsReturn(prev => {
                if (prev !== currentPressed) {
                    return currentPressed;
                }
                return prev;
            });
        }, 100); // Check for changes every 100ms

        return () => clearInterval(interval);
    }, []);

    const button = returnValuesRank().button;

    return button;
}


export function returnValuesRank(){

  const pressing = () =>{
    console.log("in here");
    if(pressed()){     console.log("in here2");
      setPressed(false);}else{setPressed(true); console.log("in here3");}

      
  }

  const button = (
    <View >
<TouchableOpacity style={style.button} onPress={() => {pressing()}}>
              <Text style={style.buttonText}>Rank</Text>
          </TouchableOpacity>                   
          </View>
  );

  

  return {button}
}




const OPTIONS = [
  { id: "1", label: "Option 1" },

];



const string = {current:null};


export function DraggableList (){
  const [datas, setData] = useState<Item[]>([]);
  const [valuesString, setvaluesString] = useState("");
  const [first,setFirst] = useState(true);
  // const [data, setData] = useState(OPTIONS);

  const [component, setComponent] = useState(null);
  /*UseEffect so doesnt continally connect data base only intervally
   so network connection errors will be avoided*/
      // if(selected.current==null){
        useEffect(() => {

          /*If statment, is so only do Interval, after you first
          ,Open the drag list, so first opening won't take to long
          and lag from switching order, due to waiting for query response,
          does not occur because interval is long enough that query most
           likely is concluded.*/
          if(first){
            selectedArray().then((result) => {
              console.log("waiting");
              //ORDER HEREE
              setData(ArrayOrder(result));
              // setData(result);
              // console.log("IN result", result);
          
          })
          }else{

            const interval = setInterval(() => {
  selectedArray().then((result) => {
    setData(result);
    // console.log("IN result", result);

});

}, 10000); // Check for changes every 100ms

return () => clearInterval(interval);
          }
}, []);



useEffect(() => {
  // console.log("IN drag", data);

  setComponent (
  <View style={style.container}>
    <DraggableFlatList
      data={datas}
      keyExtractor={(item) => `${item.Ranking}`}
      onDragEnd={({ data }) => (setData(data),
      string.current = ( data.map((item, index) => `('${item.ActivityName}', ${index+1})`).join(", ")),
      console.log("val string",string.current),
      connectAndQuery(
        `MERGE INTO Activity AS Target
USING (VALUES ${string.current}) 
AS Source(ActivityName, Ranking)
ON Target.ActivityName = Source.ActivityName
WHEN MATCHED THEN 
    UPDATE SET Ranking = Source.Ranking
WHEN NOT MATCHED THEN 
    INSERT (ActivityName, Ranking) VALUES (Source.ActivityName, Source.Ranking);
`,false))}
      activationDistance={1} // Reduces delay before dragging
      renderItem={({ item, drag, isActive }) => {
      
        return (
          <TouchableOpacity
            onLongPress={drag} // This should trigger dragging
            disabled={isActive} // Prevents issues while dragging
            delayLongPress={0} 
            style={[style.item, isActive && style.activeItem]}
          >
            <Text style={style.typetext}>{`${item.ActivityName}`}</Text>
          </TouchableOpacity>
        );
      }}
      

    />

    <TextInput></TextInput>

  </View>
  
);
},[datas]);
 return component;
// selectedArray();
// console.log("OPTIONS",OPTIONS);
//     return(
//           <View style={style.container}>
//             <DraggableFlatList
//               data={data}
//               keyExtractor={(item) => item.id}
//               onDragEnd={({ data }) => setData(data)}
//               activationDistance={1} // Reduces delay before dragging
//               renderItem={({ item, drag, isActive }) => {
              
//                 return (
//                   <TouchableOpacity
//                     onLongPress={drag} // This should trigger dragging
//                     disabled={isActive} // Prevents issues while dragging
//                     delayLongPress={0} 
//                     style={[style.item, isActive && style.activeItem]}
//                   >
//                     <Text style={style.typetext}>{item.label}</Text>
//                   </TouchableOpacity>
//                 );
//               }}
              
      
//             />
      
//             <TextInput></TextInput>
      
//           </View>
          
//         );
};



const style = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  rank:{
    width:'15%',
    marginLeft:'38%',
    marginTop:'5%', 
    shadowColor:'black',
    shadowRadius:3000,
    shadowOpacity:1,
    boxShadow: '0px -4px 20000px rgba(0, 0, 0, 1)',
    borderColor: 'rgba(248,248,248,1)', // Ensure shadow is visible
    borderRadius:10,
    borderWidth:5,
    borderTopWidth:5,
    borderBottomWidth:5,
},
  item: {
    padding: 20,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activeItem: {
    backgroundColor: "#ddd",
  },
    rowItem: {
        height: 100,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
      },
      typetext: { fontSize: 18, fontWeight: "bold", 
        textAlign: "center",
      },
      text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
      },

    button:{
        marginTop:'100%',
        marginBottom:0,
        backgroundColor:'rgb(33,150,243)',
        borderRadius:100,
        borderColor:'grey',
        borderWidth:3,
        borderBlockColor:'black',
        borderBlockStartColor:'grey',
        width:'45%',
        height:'35%',
        marginLeft:'25%',
        paddingLeft:'5%',
        color:'white'
    },

    buttonText:{
        color:'white',
        marginTop:'35%',
        marginLeft:'14%',
        fontSize:15,
        fontWeight:'400',
    }

});