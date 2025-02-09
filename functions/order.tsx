import { Item } from "./selectedArray";


export function ArrayOrder (array:Item[]){
    let a = 0;
    // let arrayhelp: Item[] = new Array(array.length);
    let arrayhelper :Item;
    for(let i = 0; i<array.length;i++){
        if(i!=0){
            console.log("ARRAY RANK",array[i].Ranking);
        if(parseInt((array[i].Ranking))<a){
            a=parseInt((array[i].Ranking));
            arrayhelper = array[i];
            array[i] = array[i-1];
            array[i-1] = arrayhelper;
        }
    }else{
        a=parseInt(array[i].Ranking);
    }
    }

    return array;
}