import { AppState } from 'react-native';
import { connectAndQuery } from './dbconnection';
import { supabase } from './supabase';



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




export function Entry() {
    connectAndQuery(`CREATE TABLE 
    IF NOT EXISTS Entry(
        entryId INTEGER PRIMARY KEY AUTOINCREMENT,
        total_time INTEGER NOT NULL,
        start_time DATETIME,
        end_time DATETIME,
        dayId INTEGER,
        FOREIGN KEY (dayId) REFERENCES Entry(dayId)

    );`);
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

// export function Day(){
//     connectAndQuery(`CREATE TABLE
//     IF NOT EXISTS Day(
//         dayId INTEGER PRIMARY KEY AUTOINCREMENT,
//         timeLeft INTEGER NOT NULL,
//     )`);
// };