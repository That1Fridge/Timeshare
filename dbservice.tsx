import { AppState } from 'react-native';
import { connectAndQuery } from './dbconnection';
import { supabase } from './supabase';
import { useEffect, useState } from 'react';
import { toMilliseconds, twentyfourConverter } from './functions/timeConverter';


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


const setActivity = {current:null};
const setRank = {current:null};
const setPercent = {current:null};
const setDaycent = {current:null};


export function Log(total: number,value: number, showRange: boolean, start_time:string ,end_time: string, date:string,activity:string,rank:string,percent:string,daycent:string,customActivity:String,color:String) {
    console.log("color type",color);
    if(activity=='custom'){
        setActivity.current = customActivity;
        setRank.current = rank;
        setPercent.current = percent;
        setDaycent.current = daycent;
    }else{
        setActivity.current = activity;
        
    }


 
    
    connectAndQuery(`  
IF OBJECT_ID('dbo.Log', 'U') IS NULL
BEGIN
    CREATE TABLE Log (
        entryId INT IDENTITY(1,1) PRIMARY KEY,
        total_time INT NOT NULL,
        start_time TIME,
        end_time TIME,
        daydate DATE NOT NULL,
        ActivityName NVARCHAR(255) NOT NULL,
        FOREIGN KEY (daydate) REFERENCES Day(daydate),
        FOREIGN KEY (ActivityName) REFERENCES Activity(ActivityName)
        
    );
END;`,false);

if(showRange){
connectAndQuery(`IF OBJECT_ID('dbo.Activity', 'U') IS NULL
BEGIN
    CREATE TABLE Activity (
        ActivityName NVARCHAR(255) PRIMARY KEY,
        Ranking INT NOT NULL,
        PercentOverall INT NOT NULL,
        DayPercent INT,
        ColorType NVARCHAR(255)

    );
END;
IF NOT EXISTS (SELECT 1 FROM Activity WHERE ActivityName = '${setActivity.current}')  
BEGIN  
    INSERT INTO Activity (ActivityName, Ranking, PercentOverall, DayPercent, ColorType)  
    VALUES ('${setActivity.current}', ${setRank.current}, ${setPercent.current}, ${setDaycent.current}, '${color}');  
END;
    INSERT INTO Log (total_time, start_time, end_time, daydate,ActivityName) 
    VALUES (${value}, '${start_time}', '${end_time}', '${date}','${setActivity.current}');`,false);
}else{
   const time =  new Date().getHours()+ ":" + new Date().getMinutes()+":"+new Date().getSeconds();
   const milTime = toMilliseconds(  new Date().getHours(),new Date().getMinutes(),new Date().getSeconds());
   const prevTime = twentyfourConverter(milTime - total); 
    connectAndQuery(`IF OBJECT_ID('dbo.Activity', 'U') IS NULL
BEGIN
    CREATE TABLE Activity (
        ActivityName NVARCHAR(255) PRIMARY KEY,
        Ranking INT NOT NULL,
        PercentOverall INT NOT NULL,
        DayPercent INT,
        ColorType NVARCHAR(255)
    );
END;
IF NOT EXISTS (SELECT 1 FROM Activity WHERE ActivityName = '${setActivity.current}')  
BEGIN  
    INSERT INTO Activity (ActivityName, Ranking, PercentOverall, DayPercent, ColorType)  
    VALUES ('${setActivity.current}', ${setRank.current}, ${setPercent.current}, ${setDaycent.current}, '${color}');  
END;
        INSERT INTO Log (total_time, start_time, end_time, daydate,ActivityName) 
    VALUES (${total},'${prevTime}','${twentyfourConverter(milTime)}','${date}', '${setActivity.current}');`,false);

}

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
    connectAndQuery(query,false);
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
        daydate DATE  PRIMARY KEY,
        timeLeft INT NOT NULL DEFAULT 86400000
    );
END; `,false);
};


export function NextDay(behind: boolean, total: number, currDate: string, value: number, showRange: boolean){
    if(behind&&showRange){
        console.log('in Behind');
        connectAndQuery(`INSERT INTO Day(daydate,timeLeft) VALUES ('${currDate}',${86400000-value});`,false);
    }else if(behind){
        console.log('in Behind');
        connectAndQuery(`INSERT INTO Day(daydate,timeLeft) VALUES ('${currDate}',${86400000-total});`,false);
    }
    else if(showRange){
        console.log('from range value',value);
        connectAndQuery(`UPDATE Day SET timeLeft = ${86400000-value} WHERE daydate = '${currDate}';`,false);
    }
    else {
        console.log('not in behindConvert to millseconds');
        connectAndQuery(`UPDATE Day SET timeLeft = ${86400000-total} WHERE daydate = '${currDate}';`,false);
    }

};


export function Activity(){
    connectAndQuery(`IF OBJECT_ID('dbo.Activity', 'U') IS NULL
BEGIN
    CREATE TABLE Activity (
        ActivityName NVARCHAR(255) PRIMARY KEY,
        Ranking INT NOT NULL,
        PercentOverall INT NOT NULL,
        DayPercent INT,
        ColorType NVARCHAR(255)
    );
END;`, false);   
};


