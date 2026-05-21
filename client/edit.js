let shelf = document.getElementById("shelf");
let isbn = document.getElementById("isbn");
let isbn_del = document.getElementById("delete");
let new_isbn = document.getElementById("new_isbn");
let name = document.getElementById("name");
let author = document.getElementById("author");

let status = document.getElementById("status");

let editbook = document.getElementById("editbook");
let delbook = document.getElementById("delbook");

function edit() {
    fetch(window.location.origin+"/edit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isbn: isbn.value, new_isbn: new_isbn.value, name: name.value, shelf: shelf.value, author: author.value })
    }) 
    .then(res => {
        if (!res.ok) {
            status.innerHTML = `${res.status} - ${res.statusText}` 
            throw new Error(`Request failed: ${res.status}`);
        }
        status.innerHTML = "готово!";
    })
    .catch(err => {
        console.error('Fetch error:', err);
        status.innerHTML += err;
    });
    
    isbn.value = "";
    new_isbn.value = "";
    name.value = "";
    author.value = "";

}

editbook.onclick = edit;

function delete_book() {
    if (confirm("Действительно удалить?")) {
        fetch(window.location.origin+"/delete", { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isbn: isbn_del.value })
        }) 
        .then(res => {
            if (!res.ok) {
                status.style.color = "red";
                status.innerHTML = `${res.status}: ${res.statusText} - ` 
                throw new Error(`Request failed: ${res.status}`);
            }
            status.innerHTML = "готово!";
        })
        .catch(err => {
            console.error('Fetch error:', err);
            status.style.color = "red";
            status.innerHTML += err;
        });

        isbn_del.value = "";
    }
}

delbook.onclick = delete_book;
