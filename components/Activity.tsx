import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Item, selectedArray } from "../functions/selectedArray";
import { RgbColorPicker } from "react-colorful";

const selectedactivity = {current:null};
const selectedcustomactivity = {current:null};
const selectedrank= {current:null};
const selectedpercent = {current:null};
const selecteddaycent= {current:null};
const selectedColor = {current:null};

export function ActivityEnter(){

    return(<View style={style.Activity}>
        <Text style={style.ActivityTitle}>Activity</Text>
        {/* <TextInput style={style.activityEnter} onChangeText={newText =>setActivity(newText)}></TextInput> */}
        <DropdownWithTextInput/>
                    </View>);
                
                    
}

const DropdownWithTextInput = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [customValue, setCustomValue] = useState("");
    const [customRank, setCustomRank] = useState("");
    const [customPercent, setCustomPercent] = useState("");
    const [customDaycent, setCustomDaycent] = useState("");
    const [result, setResult ] = useState("");
    const [newVal, setNewVal] = useState(null);
    const [color, setColor] = useState({ r: 50, g: 100, b: 150 });

  
    const [componActivity, setComponActivity] = useState<React.ReactNode>(null);
        const [first, setFirst] = useState(true);
        const [overallComp, setOverallComp] = useState<React.ReactNode>(null);
        
        useEffect(() => {
            if(first){
                selectedArray().then((result) => {

                    const activityComponents = result.map((item: Item) => (
                        <Picker.Item label={item.ActivityName} value={item.ActivityName} />

                    ));

                    setComponActivity(activityComponents);

                })

                


setFirst(false);
}
else{

    const interval = setInterval(() => {
        selectedArray().then((result) => {

            const activityComponents = result.map((item: Item) => (
                <Picker.Item label={item.ActivityName} value={item.ActivityName} />

            ));

            setComponActivity(activityComponents);

})
    }, 10000);
    return () => clearInterval(interval);

}
})

selectedactivity.current = selectedValue;

selectedrank.current = customRank;

selectedpercent.current = customPercent;

selecteddaycent.current = customDaycent;

selectedcustomactivity.current = customValue;

selectedColor.current = "("+color.r+","+color.g+","+color.b+")";

console.log("current",selectedactivity.current);


return (
    <View  style={style.activityEnter}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={style.activitySelect}
      >
        {/* {/* <Picker.Item label="Option 1" value="option1" /> */}
        <Picker.Item label="Select" value="Select" /> 
      
        {componActivity}
        <Picker.Item label="New Activity (Type Below)" value="custom" />
      </Picker>

      {selectedValue === "custom" && (
        <View>
        <TextInput
          placeholder="Enter Name"
          value={customValue}
          onChangeText={setCustomValue}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
          }}
        /> 
        <View style={{flexDirection:'row'}}>
        <TextInput
        placeholder="Rank"
        value={customRank}
        onChangeText={(text => handleChange(text,setCustomRank))}
        inputMode="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginTop: 10,
          borderRadius: 5,
          width:'50%'
        }}
      />
      <TextInput
        placeholder="%"
        value={customPercent}
        inputMode="numeric"
        onChangeText={(text => handleChange(text,setCustomPercent))}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 5,
          marginTop: 10,
          borderRadius: 5,
          width:'40%'

        }}
      />
      <TextInput
        placeholder="24hr %"
        value={customDaycent}
        onChangeText={(text => handleChange(text,setCustomDaycent))}
        inputMode="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 4,
          marginTop: 10,
          borderRadius: 5,
          width:'50%'

        }}
      />
      </View>
      <RgbColorPicker color={color} onChange={setColor} style={style.ColorChooser}  />
      </View>

      )}
    </View>
  );


// return (
//     overallComp
// );

  };


  export const returnActivity = () => {
        return selectedactivity.current;
  }
  

  export const returnCustomActivity = () => {
    return selectedcustomactivity.current;
}


  export const returnRank = () => {
    return selectedrank.current;
}

export const returnPercent= () => {
  return selectedpercent.current;
}

export const returnDaycent= () => {
  return selecteddaycent.current;
}

export const returnColor= () => {
  return selectedColor.current;
}




  const handleChange = (text, setValue) => {
    if (/^\d*\.?\d*$/.test(text)) {
      setValue(text);
    }
  };
  
const style = StyleSheet.create({

Activity:{
    marginLeft:'20%',
},


ColorChooser:{
  width:'100%',
  height:150,
  // margin:0,
  // padding:0,
  

},

activityEnter:{
    width:'17%',
    borderColor:'white',
    borderWidth:3,
    paddingLeft:'0.25%',
    fontWeight:'400',
},

activitySelect:{
    backgroundColor:'rgba(0,0,0,0)',

},

ActivityTitle:{
    alignItems:'center',
    marginLeft:'5%',
    fontSize:20,
    fontWeight:'bold',
    
}
});