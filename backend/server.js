const express = require('express');
const connectDatabase = require('./models/db');
require('dotenv').config();

connectDatabase();

const app = express();
app.use(express.json());

app.use(express.json());
app.use("/api/users", require('./routes/user-routes'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

