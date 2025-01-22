const express = require('express');
const sql = require('mssql');

const app = express();
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

// app.get('/index', async (req, res) => {
//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request().query(req.query.sql);
//         res.json(result.recordset);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
