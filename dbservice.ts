import {openDatabase} from 'react-native-sqlite-storage';


export const getDBConnection = async () => {

    const db = openDatabase({name: 'timeshared.db', location : 'default'});

    return db;
}



