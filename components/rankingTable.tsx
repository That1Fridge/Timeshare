import { View, StyleSheet, Text } from "react-native";


export default function RankTable() {
    const rankEntries = [
        { rank: 1, name: 'Alice' },
        { rank: 2, name: 'Bob' },
        { rank: 3, name: 'Charlie' },
    ];

    return (
        <View>
        <View style={style.table}>
        <View style={style.entry}>
        <Text style={style.text}>Ranking</Text>
        </View>
    
        {rankEntries.map(({ rank, name }, index) => (
            <RankEntry key={index} rank={rank} name={name} />
        ))}
        </View>

        </View>
    );
}


interface RankEntryProps {
    rank: number;
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