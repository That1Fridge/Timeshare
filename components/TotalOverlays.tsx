import { useEffect, useState } from "react";
import { connectAndQuery } from "../dbconnection";
import Registered from "./overlay";
import { toMilliseconds } from "../functions/timeConverter";
import { View } from "react-native";



export function AllOverlayBars(){
     const [overlays, setOverlays] = useState<any[]>([]); 
     const [componOverlay, setComponOverlay] = useState<React.ReactNode>(null);
     const [overallOverlay, setOverallOverlay] = useState<React.ReactNode>(null);
     const [first, setFirst] = useState(true);
    useEffect(() => {
        if(first){
            connectAndQuery(`IF OBJECT_ID('dbo.Log', 'U') IS NULL
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
            END;
            SELECT L.*, A.ColorType
            FROM Log L
            JOIN Activity A ON L.ActivityName = A.ActivityName;`,false).then((result) => {

                const overlaysComponents = result.map((result, index: number) => (
                                    <View key={index}>
                                        {/* {Registered(overlay.end_time - overlay.start_time, overlay.start_time)} */}
                                        {Registered(toMilliseconds(
                                            result.end_time.substring(11,13),
                                            result.end_time.substring(14,16),
                                            result.end_time.substring(17,22)) - toMilliseconds(
                                                result.start_time.substring(11,13),
                                                result.start_time.substring(14,16),
                                                result.start_time.substring(17,22)), 
                                                toMilliseconds(
                                                    result.start_time.substring(11,13),
                                                    result.start_time.substring(14,16),
                                                    result.start_time.substring(17,22)),
                                                    ("rgb"+result.ColorType)
                                                )}
                                    </View>
                                ));
                    
                                setComponOverlay(overlaysComponents);
                                setFirst(false); 
        }   );
            
        }else{
            const interval = setInterval(() => {

                connectAndQuery(`IF OBJECT_ID('dbo.Log', 'U') IS NULL
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
                    END;
                    SELECT L.*, A.ColorType
                    FROM Log L
                    JOIN Activity A ON L.ActivityName = A.ActivityName;`,false).then((result) => {
        
                        const overlaysComponents = result.map((result, index: number) => (
                                            <View key={index}>
                                                {/* {Registered(overlay.end_time - overlay.start_time, overlay.start_time)} */}
                                                {Registered(toMilliseconds(
                                                    result.end_time.substring(11,13),
                                                    result.end_time.substring(14,16),
                                                    result.end_time.substring(17,22)) - toMilliseconds(
                                                        result.start_time.substring(11,13),
                                                        result.start_time.substring(14,16),
                                                        result.start_time.substring(17,22)), 
                                                        toMilliseconds(
                                                            result.start_time.substring(11,13),
                                                            result.start_time.substring(14,16),
                                                            result.start_time.substring(17,22)),
                                                            ("rgb"+result.ColorType)
                                                        )}
                                            </View>
                                        ));
                            
                                        setComponOverlay(overlaysComponents);
                }   );
                    
                

            }, 10000);
            return () => clearInterval(interval);
        }

    });

    useEffect(() => {
        console.log("COMPO,",componOverlay);
        setOverallOverlay( <View>
            {/* <Text>.</Text> */}
            {/* <DistributionActivity/> */}
            {componOverlay}
        </View>);
    }, [componOverlay]);
    
    return (
        overallOverlay
    );
    
}