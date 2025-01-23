import { openDatabase } from 'react-native-sqlite-storage';
import axios from 'axios';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export async function connectAndQuery(query: string) {
    console.log('Executing query:', query);
    const data = {
        sql: query,
    }
   
        const response = await axios.post('https://helloworld-v2mwnwfqxa-uc.a.run.app/',data).then((response) => {
            console.log('Response from backend:', response.data);
        }).  catch((error) => {
            console.error('Error:', error);
        });
}