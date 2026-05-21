const express = require('express');
const db = require('better-sqlite3')('books.db');
const bodyParser = require('body-parser');

const app = express();
const port = 8800;

db.pragma('journal_mode = WAL');

app.use('/', express.static('client'));
app.use(bodyParser.json());

app.post('/add', (req, res) => {
    const stmt = db.prepare(`INSERT INTO books (isbn, name, shelf, author) VALUES (?, ?, ?, ?)`);

    const result = stmt.run(req.body.isbn, req.body.name, req.body.shelf, req.body.author);

    res.sendStatus(200);
})

app.post('/edit', (req, res) => {
    const stmt = db.prepare(`UPDATE books SET isbn = ?, name = ?, shelf = ?, author = ? WHERE isbn = ?`);
    
    const result = stmt.run(req.body.new_isbn, req.body.name, req.body.shelf, req.body.author, req.body.isbn);

    console.log(req.body);
    res.sendStatus(200);
})

app.post('/delete', (req, res) => {
    console.log(req.body)  
    const stmt = db.prepare(`DELETE FROM books WHERE isbn = ?;`);
    
    const result = stmt.run(req.body.isbn);

    res.sendStatus(200);
})

app.get('/books', (req, res) => {
    const books = db.prepare('SELECT * FROM books').all();

    res.send(books).status(200);
})


app.get("/search", (req, res) => {
    const q = (req.query.q || "");

    const stmt = db.prepare(`
        SELECT * FROM books
        WHERE name LIKE ?
            OR author LIKE ?
            OR shelf like ? 
            OR isbn LIKE ?
    `);

    const query = `%${q}%`;
    let result = stmt.all(query, query, query, query);
    
    console.log(result);

    res.json(result);
});

app.listen(port, () => {
    console.log(`books at port ${port} (client: http://127.0.0.1:8800/)`);
})
