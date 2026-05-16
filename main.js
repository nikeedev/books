const express = require('express');
const path = require('path');
const fs = require('node:fs');
const app = express();
const port = 8800;

app.use('/', express.static('client'));


app.use(express.text());

app.post('/add', (req, res) => {
    fs.appendFile(path.join(__dirname, 'books.csv'), req.body, (err) => {
        if (err) {
            res.sendStatus(500);
            console.error(err);
        }
    });

    res.sendStatus(200);
})

app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'books.csv'));
})

app.listen(port, () => {
    console.log(`books at port ${port} (client: http://127.0.0.1:8800/)`);
})
