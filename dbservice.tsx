import { AppState } from 'react-native';
import { connectAndQuery } from './dbconnection';
import { supabase } from './supabase';
import { useEffect, useState } from 'react';


// // Tells Supabase Auth to continuously refresh the session automatically if
// // the app is in the foreground. When this is added, you will continue to receive
// // `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// // if the user's session is terminated. This should only be registered once.
// AppState.addEventListener('change', (state) => {
//     if (state === 'active') {
//       supabase.auth.startAutoRefresh()
//     } else {
//       supabase.auth.stopAutoRefresh()
//     }
//   })




export function Log() {
    connectAndQuery(`IF OBJECT_ID('dbo.Log', 'U') IS NULL
BEGIN
    CREATE TABLE Log (
        entryId INT IDENTITY(1,1) PRIMARY KEY,
        total_time INT NOT NULL,
        start_time DATETIME,
        end_time DATETIME,
        dayId INT,
        FOREIGN KEY (dayId) REFERENCES Day(dayId)
    );
END;`);

connectAndQuery(``);

};


export function User() {
    let query = `IF OBJECT_ID('dbo.UserName', 'U') IS NULL BEGIN
    CREATE TABLE UserName (
        userId INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        pass NVARCHAR(255) NOT NULL
    );
END;`
    console.log("a");
    connectAndQuery(query);
};

// export function User(){
//     let query = `CREATE TABLE
//     IF NOT EXISTS User(
//         userId INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT NOT NULL,
//         email TEXT NOT NULL,
//         password TEXT NOT NULL
//     );`
//     console.log("a");
//     connectAndQuery(query);
// };

// export function UserEntry(){
//     connectAndQuery(`CREATE TABLE
//     IF NOT EXISTS UserEntry(
//         userEntryId INTEGER PRIMARY KEY AUTOINCREMENT,
//         userId INTEGER NOT NULL,
//         entryId INTEGER NOT NULL,
//         FOREIGN KEY (userId) REFERENCES User(userId),
//         FOREIGN KEY (entryId) REFERENCES Entry(entryId)
//     )`);
// };

export function Day(){
    connectAndQuery(`IF OBJECT_ID('dbo.Day', 'U') IS NULL
BEGIN
    CREATE TABLE Day (
        dayId INT IDENTITY(1,1) PRIMARY KEY,
        timeLeft INT NOT NULL DEFAULT 86400000,
        daydate DATE NOT NULL
    );
END; `);
};


export function NextDay(behind: boolean, total: number, currDate: string, value: number, showRange: boolean){
    if(behind){
        console.log('in Behind');
        connectAndQuery(`INSERT INTO Day DEFAULT VALUES;`);
    }
    else if(showRange){
        console.log('from range value',value);
        connectAndQuery(`UPDATE Day SET timeLeft = ${86400000-value} WHERE daydate = '${currDate}';`);
    }
    else {
        console.log('not in behindConvert to millseconds');
        connectAndQuery(`UPDATE Day SET timeLeft = ${86400000-total} WHERE daydate = '${currDate}';`);
    }

};


export function Entry(){

};

