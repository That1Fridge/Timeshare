
CREATE TABLE 
    IF NOT EXISTS Entry(
        entryId INTEGER PRIMARY KEY AUTOINCREMENT,
        total_time INTEGER NOT NULL,
        start_time DATETIME,
        end_time DATETIME,
        dayId INTEGER,
        FOREIGN KEY (dayId) REFERENCES Entry(dayId)

    );

CREATE TABLE
    IF NOT EXISTS User(
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS UserEntry(
        userEntryId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        entryId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(userId),
        FOREIGN KEY (entryId) REFERENCES Entry(entryId)
    )


CREATE TABLE
    IF NOT EXISTS Day(
        dayId INTEGER PRIMARY KEY AUTOINCREMENT,
        timeLeft INTEGER NOT NULL,
    )

