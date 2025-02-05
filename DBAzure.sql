

IF OBJECT_ID('dbo.UserEntry', 'U') IS NOT NULL
BEGIN
    DROP TABLE [dbo].[UserEntry];
END;

IF OBJECT_ID('dbo.Log', 'U') IS NOT NULL
BEGIN
    DROP TABLE [dbo].[Log];
END;

IF OBJECT_ID('dbo.Day', 'U') IS NOT NULL
BEGIN
    DROP TABLE [dbo].[Day];
END;

IF OBJECT_ID('dbo.UserName', 'U') IS NOT NULL
BEGIN
    DROP TABLE [dbo].[UserName];
END;


IF OBJECT_ID('dbo.UserName', 'U') IS NULL
BEGIN
    CREATE TABLE UserName (
        userId INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        pass NVARCHAR(255) NOT NULL
    );
END;


IF OBJECT_ID('dbo.Day', 'U') IS NULL
BEGIN
    CREATE TABLE Day (
        daydate DATE DEFAULT CAST(GETDATE() AS DATE) PRIMARY KEY,
        timeLeft INT NOT NULL DEFAULT 86400000,
    );
END;

IF OBJECT_ID('dbo.Log', 'U') IS NULL
BEGIN
    CREATE TABLE Log (
        entryId INT IDENTITY(1,1) PRIMARY KEY,
        total_time INT NOT NULL,
        start_time DATETIME,
        end_time DATETIME,
        dayId INT,
        FOREIGN KEY (dayId) REFERENCES Day(dayId)
    );
END;

BEGIN
    INSERT INTO Log (total_time, start_time, end_time, dayId)
    VALUES (0, GETDATE(), GETDATE(), 1);
END;


IF OBJECT_ID('dbo.UserEntry', 'U') IS NULL
BEGIN
    CREATE TABLE UserEntry (
        userEntryId INT IDENTITY(1,1) PRIMARY KEY,
        userId INT NOT NULL,
        entryId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES UserName(userId),
        FOREIGN KEY (entryId) REFERENCES Log(entryId)
    );
END;


IF OBJECT_ID('dbo.Activity', 'U') IS NULL
BEGIN
    CREATE TABLE Activity (
        ActivityName NVARCHAR(255) PRIMARY KEY,
    );
END;




INSERT INTO Day DEFAULT VALUES;
