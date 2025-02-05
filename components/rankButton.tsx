import { View, StyleSheet, Text, Button, TouchableOpacity, Pressable } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DraggableFlatList, { NestableScrollContainer, NestableDraggableFlatList, RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'; 
import { Header } from "@rneui/themed";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { pressed, setPressed } from "../functions/rankingfunctions";



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






// export function dropDown(){
// //     const [selectedValue, setSelectedValue] = useState("option1");
// //     const NUM_ITEMS = 10;
// // function getColor(i: number) {
// //   const multiplier = 255 / (NUM_ITEMS - 1);
// //   const colorVal = i * multiplier;
// //   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
// // }

// // type Item = {
// //   key: string;
// //   label: string;
// //   height: number;
// //   width: number;
// //   backgroundColor: string;
// // };
// //     const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
// //         const backgroundColor = getColor(index);
// //         return {
// //           key: `item-${index}`,
// //           label: String(index) + "",
// //           height: 100,
// //           width: 60 + Math.random() * 40,
// //           backgroundColor,
// //         };
// //       });
// //     const [data1, setData1] = useState<Item[]>(initialData);
// //     const [data2, setData2] = useState<Item[]>(initialData);
// //     const [data3, setData3] = useState<Item[]>(initialData);
// //     const [data, setData] = useState(initialData);

// //     const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
// //         return (
// //           <ScaleDecorator>
// //             <TouchableOpacity
// //               onLongPress={drag}
// //               disabled={isActive}
// //               style={[
// //                 style.rowItem,
// //                 { backgroundColor: isActive ? "red" : item.backgroundColor },
// //               ]}
// //             >
// //               <Text style={style.text}>{item.label}</Text>
// //             </TouchableOpacity>
// //           </ScaleDecorator>
// //         );
// //       };
    

// //     function keyExtractor(item: Item, index: number): string {
// //         if(item[0] == data1){
// //             return "1";
// //         }
// //         if(item[0] ==data2){
// //             return "2";
// //         }
// //         if(item[0] ==data3){
// //             return "3";
// //         }
// //     }

//     const OPTIONS = [
//       { id: "1", label: "Option 1" },
//       { id: "2", label: "Option 2" },
//       { id: "3", label: "Option 3" },
//       { id: "4", label: "Option 4" },
//     ];
//     const [data, setData] = useState(OPTIONS);

//     return (   
//     // <NestableScrollContainer>
//     //     {/* <Header centerComponent={{ text: 'List 1', style: { color: '#fff' } }} /> */}
//     //     <NestableDraggableFlatList
//     //       data={data1}
//     //       renderItem={renderItem}
//     //       keyExtractor={keyExtractor}
//     //       onDragEnd={({ data }) => setData1(data)}
//     //     />
//     //     {/* <Header centerComponent={{ text: 'List 2', style: { color: '#fff' } }} /> */}
//     //     <NestableDraggableFlatList
//     //       data={data2}
//     //       renderItem={renderItem}
//     //       keyExtractor={keyExtractor}
//     //       onDragEnd={({ data }) => setData2(data)}
//     //     />
//     //     {/* <Header centerComponent={{ text: 'List 3', style: { color: '#fff' } }} />
//     //     <NestableDraggableFlatList
//     //       data={data3}
//     //       renderItem={renderItem}
//     //       keyExtractor={keyExtractor}
//     //       onDragEnd={({ data }) => setData3(data)}
//     //     /> */}
//     //   </NestableScrollContainer>
//     <View style={style.container}>
//     <DraggableFlatList
//       data={data}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item, drag, isActive }) => (
//         <View
//           style={[style.item, isActive && style.activeItem]}
//           onLongPress={drag}
//         >
//           <Text style={style.text}>{item.label}</Text>
//         </View>
//       )}
//       onDragEnd={({ data }) => setData(data)}
//     />
//   </View>
// );

  
// }


// export function pressed (){
//   const isReturn = returnValuesRank().isReturn;
//   console.log("retunner", isReturn);

//   return isReturn;
// };


const OPTIONS = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Option 4" },
];


export function DraggableList (){
  const [data, setData] = useState(OPTIONS);

  return (
    <View style={style.container}>
      <DraggableFlatList
        data={data}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setData(data)}
        activationDistance={1} // Reduces delay before dragging
        renderItem={({ item, drag, isActive }) => {
        
          return (
            <TouchableOpacity
              onLongPress={drag} // This should trigger dragging
              disabled={isActive} // Prevents issues while dragging
              delayLongPress={0} 
              style={[style.item, isActive && style.activeItem]}
            >
              <Text style={style.typetext}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
        

      />

    </View>
    
  );
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