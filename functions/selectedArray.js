import { useEffect, useState } from "react";
import { connectAndQuery } from "../dbconnection";


const selected = {current:null};

export async function selectedArray(){
    // const [selected, setSelected] = useState(null)
    Activity();
    
    connectAndQuery(`SELECT * FROM Activity;`).then((result) => {

        console.log("IN ARRAY",result);

        selected.current= (result);
       
    });
    

}

export const useSelectedArray = () => {
    selectedArray()

    const OPTIONS = {id:Number,label:String};
    if(selected.current!=null){
        console.log("IN ARRAY",selected.current[0].start_time);
        return selected.current;

        }

};
