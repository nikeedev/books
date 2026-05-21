let input = document.getElementById("search");
let output = document.getElementById("search-output");

let search_button = document.getElementById("search_button");

let reg_books = 0;

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        search_button.click();
    }
});

fetch(window.location.origin+"/books")
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
            return response.json(); // returns a promise
        })
    .then(results => {
        console.log(results)
    
        for (const elem of results) {
            reg_books += 1;

            let p = document.createElement("p");
            p.innerHTML = `${elem.author}: ${elem.name} (${elem.isbn})`;
            console.log(elem);
            document.getElementById(elem.shelf).appendChild(p);
        }

        document.getElementById("reg_books").innerHTML = `${reg_books}`;
    });

function shelf(id) {
    switch (id) {
        case "one-one": return "1 - 1"; break;
        case "one-two": return "1 - 2"; break;
        case "one-three": return "1 - 3"; break;
        case "two-one": return "2 - 1"; break;
        case "two-two": return "2 - 2"; break;
        case "two-three": return "3 - 2"; break;
        case "three-one": return "3 - 1"; break;
        case "three-two": return "3 - 2"; break;
        case "three-three": return "3 - 3"; break;
        case "four-one": return "4 - 1"; break;
        case "four-two": return "4 - 2"; break;
        case "four-three": return "4 - 3"; break;
    }
}

search_button.onclick = () => {
    fetch(`${window.location.origin}/search?q=${input.value}`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
            return response.json(); // returns a promise
        })
    .then(data => {
        output.innerHTML = "";
        data.forEach(elem => {
            output.innerHTML += `${elem["author"]}: <b>${elem["name"]}</b> (${elem["isbn"]}): <b>Полка ${shelf(elem["shelf"])}</b><br><br>`;
        })
    })
    .catch(error => console.error('Error:', error));
}
