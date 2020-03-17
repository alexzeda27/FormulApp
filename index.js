const express = require('express');
const connectionDB = require('./config/database');

//Create server
const app = express();

//Connect to database
connectionDB();

//Enable express.json
app.use(express.json({ extended: true }));

//App port
const PORT = process.env.PORT || 8000;

//** TO DO Import routes */
app.use('/api/users', require('./routes/users'));

//Start App
app.listen(PORT, () => {
    console.log(`This server is active at port ${PORT}`);
});