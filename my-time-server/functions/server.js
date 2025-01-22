const express = require('express');
const app = express();

app.get('/time', (req, res) => {
    // const currentTime = new Date().toLocaleTimeString();
    res.send("Hello from Firebase!");
    // res.send(`<!DOCTYPE html><html><head><title>Current Time</title></head><body><p>${currentTime}</p></body></html>`);
});

// const PORT = 800;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// res.send("Hello from Firebase!");
