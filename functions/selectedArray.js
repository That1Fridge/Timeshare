import { useEffect, useState } from "react";
import { connectAndQuery } from "../dbconnection";


const selected = {current:null};

export async function selectedArray(){
    // const [selected, setSelected] = useState(null)

    connectAndQuery(`SELECT * FROM Log;`).then((result) => {

        console.log("IN ARRAY",result);

        return (result);
       
    });




    // console.log("IN ARRAY",selected.current);
    

    // return selected.current;
    

}

export const useSelectedArray = () => {
    // selectedArray()
    // if(selected.current!=null){
    //     console.log("IN ARRAY",selected.current[0].start_time);
    //     }
    // return selected.current;

    // const {range} = returnValues();
    // console.log("range cool", range);

    // return range;
};
