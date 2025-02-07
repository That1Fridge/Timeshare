import { View, StyleSheet, Text } from "react-native";
import { connectAndQuery } from "../dbconnection";
import { useEffect, useState } from "react";
import { Item, selectedArray } from "../functions/selectedArray";

const percent = 50;


// const selected = {current:null};

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
//         SELECT * FROM Activity;`,false).then((result) => {
//         // console.log("IN ARRAY", result);

//         selected.current = result;
//         return result;
//     });
// }

// type Item = {
//   ActivityName: string;
//   Ranking: string;

// };

export function DistributionBar(){
    const [activities, setActivities] = useState<any[]>([]); 
    const [componActivity, setComponActivity] = useState<React.ReactNode>(null);
    const [first, setFirst] = useState(true);
    const [overallComp, setOverallComp] = useState<React.ReactNode>(null);
    
    useEffect(() => {
        if(first){
        selectedArray().then((result) => {
            const activityComponents = result.map((item: Item) => (
                <View key={item.Ranking} style={style.disActivity}>
                    
                </View> 
            ));
    
            setComponActivity(activityComponents);       
            setFirst(false); 
        })
        
    }else{
        const interval = setInterval(() => {
            selectedArray().then((result) => {
                const activityComponents = result.map((item: Item) => (
                    <View key={item.Ranking} style={style.disActivity}>
                        
                    </View> 
                ));
        
                setComponActivity(activityComponents);    
            })
    }, 10000);
    return () => clearInterval(interval);

    }
    });


useEffect(() => {
    console.log("COMPO,",componActivity);
    setOverallComp( <View style={style.distribution}>
        {/* <Text>.</Text> */}
        {/* <DistributionActivity/> */}
        {componActivity}
    </View>);
}, [componActivity]);

return (
    overallComp
);

}





const style = StyleSheet.create({

    distribution:{
        backgroundColor:'black',
        width:'70%',
        marginLeft:'10%',
        borderWidth:1,
        borderRadius:10,
        height:'2.5%',
        padding:0,
        
    },
    disActivity:{
        backgroundColor:'red',
        width:`${100*percent/100}%`,
        height:'100%',
        padding:0,
        borderColor:'red',
        borderWidth:1,
        borderRadius:10,
    }



})