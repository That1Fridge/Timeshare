/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");



const config = {
  user: "ariTime",
  password: "Timesharedata1",
  server: "timeshare.database.windows.net",
  port: 1433,
  database: "TimeShare",
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest(async (request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
const sql = require("mssql");

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`IF OBJECT_ID('dbo.UserName', 'U') IS NULL
BEGIN
    CREATE TABLE UserName (
        userId INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        pass NVARCHAR(255) NOT NULL
    );
END;
`);
    const string = "Query executed successfully result:";
    response.send(string + JSON.stringify(result.recordset));
  } catch (err) {
    response.send("Error: TWO NUM TWO " + err);
  }
});

// const functions = require('firebase-functions');
// const app = require('./server'); // Adjust the path as necessary

// exports.app = functions.https.onRequest(app);
