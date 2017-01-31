const path = require('path');
const express = require('express');
const fs = require('fs');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();

app.use(express.static(publicPath));

/*
app.get('/', (req, res) => {
    fs.readFile(`${publicPath}/index.html`, 'utf8', (err, data) => {
        console.log('data: ', data);
        res.status(200).send(data);
    });
});
*/

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});