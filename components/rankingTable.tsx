import { View, StyleSheet, Text } from "react-native";
import { Activity } from "../dbservice";
import { connectAndQuery } from "../dbconnection";
import { useEffect, useState } from "react";
import { Item, selectedArray } from "../functions/selectedArray";
import { ArrayOrder } from "../functions/order";


// const OPTIONS = useSelectedArray();
const selected = {current:null};

// export async function selectedArray(): Promise<Item[]> {
//     // const [selected, setSelected] = useState(null)
//     // Activity();
//     // console.log("selected",selected.current);
//     return connectAndQuery(`
//         IF OBJECT_ID('dbo.Activity', 'U') IS NULL
//     BEGIN
//     CREATE TABLE Activity (
//         ActivityName NVARCHAR(255) PRIMARY KEY,
//         Ranking INT NOT NULL UNIQUE,
//         PercentOverall INT NOT NULL UNIQUE,
//         DayPercent INT
//     );
//     END;
//         SELECT * FROM Activity;`,true).then((result) => {
//         // console.log("IN ARRAY", result);

//         selected.current = result;
//         return result;
//     });
// }

// type Item = {
//   ActivityName: string;
//   Ranking: string;

// };


export default function RankTable() {
    const rankEntries = [
        { rank: 1, name: 'Alice' },
        { rank: 2, name: 'Bob' },
        { rank: 3, name: 'Charlie' },
    ];


      const [datas, setData] = useState<Item[]>([]);
      const [valuesString, setvaluesString] = useState("");    


    const [first,setFirst] = useState(true);
    
      const [component, setComponent] = useState(null);
      /*UseEffect so doesnt continally connect data base only intervally
       so network connection errors will be avoided*/
            useEffect(() => {
    
            if(first){
                selectedArray().then((result) => {
                  console.log("waiting");
                  setData(ArrayOrder(result));
                  setFirst(false);
                  console.log("IN result", result);
              
              })
              }else{
    
                const interval = setInterval(() => {
      selectedArray().then((result) => {

        setData(ArrayOrder(result));
        console.log("IN result data", result);
    
    });
    
    }, 10000); // Check for changes every 100ms
    
    return () => clearInterval(interval);
              }
    });

    useEffect(() => {
    setComponent(
        <View>
        <View style={style.table}>
        <View style={style.entry}>
        <Text style={style.text}>Ranking</Text>
        </View>
    
        {datas.map(({ ActivityName, Ranking }, index) => (
            <RankEntry key={index} rank={`${Ranking}`} name={ActivityName} />
        ))}
        </View>

        </View>
    );
},[datas]);


return component;
}


interface RankEntryProps {
    rank: string;
    name: string;
}

export function RankEntry({ rank, name }: RankEntryProps) {
    return (
        <View style={style.entry}>
            <Text style={style.rank}>{'#'+rank}</Text>
            <Text style={style.text}>{name}</Text>
        </View>
    );
}

const style = StyleSheet.create({

    table:{
        marginTop:'70%',
        padding:0
    },
    
    entry:{
        borderColor: 'white',
        borderWidth: 2,
        alignItems:'center',
        flexDirection: 'row'

    },

    title:{
        marginTop:'160%',
        color:'white',
        padding:0,
        marginBottom:0,

    },

    rank:{
        color:'white',
        borderRightWidth:2,
        borderColor:'white',
        paddingRight:'2.5%',
        paddingLeft:'2.5%',
        
    },

    text:{
        color:'white',  
        marginTop:0,
        paddingLeft :'2.5%'
    }

})