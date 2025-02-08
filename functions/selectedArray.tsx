import { connectAndQuery } from "../dbconnection";

export const selected = {current:null};

export async function selectedArray(): Promise<Item[]> {
    // const [selected, setSelected] = useState(null)
    // Activity();
    // console.log("selected",selected.current);
    return connectAndQuery(`
       IF OBJECT_ID('dbo.Activity', 'U') IS NULL
BEGIN
    CREATE TABLE Activity (
        ActivityName NVARCHAR(255) PRIMARY KEY,
        Ranking INT NOT NULL,
        PercentOverall INT NOT NULL,
        DayPercent INT,
        ColorType NVARCHAR(255)
    );
END;
        SELECT * FROM Activity;`,false).then((result) => {
        // console.log("IN ARRAY", result);

        selected.current = result;
        return result;
    });
}

export type Item = {
  ActivityName: string;
  Ranking: string;
  PercentOverall: string;
  DayPercent: string;
  ColorType: string;
};
