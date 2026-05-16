const express = require('express');
const path = require('path');
const app = express();
const port = 8800;

app.use('/', express.static('client'));

app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'books.csv'));
})

app.listen(port, () => {
    console.log(`bools at port ${port} (client: http://127.0.0.1:8800/)`);
})
