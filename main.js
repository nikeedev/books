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

app.get("/search", (req, res) => {
    const q = (req.query.q || "").toLowerCase();

    const data = fs.readFileSync("books.csv", "utf8");

    const rows = data
        .split("\n")
        .filter(line => line.trim() !== "");

    const header = rows[0];
    const records = rows.slice(1);

    const result = records
        .map(line => {
            const [isbn, name, shelf, author] = line.split(",");
            return { isbn, name, shelf, author };
        })
        .filter(book =>
            book.isbn.toLowerCase().includes(q) ||
            book.name.toLowerCase().includes(q) ||
            book.shelf.toLowerCase().includes(q) ||
            book.author.toLowerCase().includes(q)
        );

    res.json(result);
});

app.listen(port, () => {
    console.log(`books at port ${port} (client: http://127.0.0.1:8800/)`);
})
