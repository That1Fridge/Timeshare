import { openDatabase } from 'react-native-sqlite-storage';
import axios from 'axios';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export async function connectAndQuery(query: string) {
    console.log('Executing query:', query);
    try {
        const response = await axios.post('https://timeshare-d5a98.web.app/index', {
            sql: query,
        });
        console.log('Response from backend:', response.data);
    } catch (err) {
        console.error('Error executing query:', err.message);
    }
}
