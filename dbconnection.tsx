import {openDatabase} from 'react-native-sqlite-storage';
import * as mssql from 'mssql'

// Remove the import of mssql as it is a Node.js module
// import * as mssql from 'mssql'

// Remove the require statement for mssql
// const sql = require('mssql');


// const sql = require('mssql');

const config = {
    user: 'ariTime', 
    password: 'Timesharedata1',
    server: 'timeshare-server.database.windows.net', 
    port: 1433,
    database: 'TimeShare', 
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}


// connectAndQuery();

export function connectAndQuery(query:String) {
    console.log('a');
    // try {
    //     var poolConnection = await sql.connect(config);
    //     var resultSet = await poolConnection.request().query(`${query}`);

    //     poolConnection.close();
    // } catch (err) {
    //     console.error(err.message);
    // }
};
