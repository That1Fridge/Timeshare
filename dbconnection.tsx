import { openDatabase } from 'react-native-sqlite-storage';
import axios from 'axios';
import { useState } from 'react';


export async function connectAndQuery(query: string, continous:boolean) {
    if(continous!=true){

    console.log('Executing query:', query);
    }
    const data = {
        sql: query,
    }
   
        const response = await axios.post('https://helloworld-v2mwnwfqxa-uc.a.run.app/',data).then((response) => {
            if(continous!=true){
            console.log('Response from backend:', response.data);
            }
            return response.data;
        }).  catch((error) => {
            console.error('Error:', error);
        });

    return response;
}



