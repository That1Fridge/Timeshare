import { View, Text, TextInput, StyleSheet } from "react-native";


export function ActivityEnter(){
    return(<View style={style.Activity}>
        <Text style={style.ActivityTitle}>Activity</Text>
        <TextInput style={style.activityEnter}></TextInput>
                    </View>);
                    
}


const style = StyleSheet.create({

Activity:{
    marginLeft:'20%',
},

activityEnter:{
    width:'10%',
    borderColor:'white',
    borderWidth:3,
    paddingLeft:'0.25%',
    fontWeight:'400'
},

ActivityTitle:{
    alignItems:'center',
    marginLeft:'2%',
    fontSize:20,
    fontWeight:'bold'
}
});