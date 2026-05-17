let reader = document.getElementById("reader");

let shelf = document.getElementById("shelf");
let isbn = document.getElementById("isbn");
let name = document.getElementById("name");
let author = document.getElementById("author");

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    isbn.value = decodedText;
    reader.style.display = "none";
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error: ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 750, height: 450} },
/* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);

function add() {
    if (isbn.value.trim() == "" || name.value.trim() == "" || shelf.value.trim() == "" || author.value.trim() == "")
	return;

    fetch(window.location.origin+"/add", {
        method: "POST",
        body: `${isbn.value},\"${name.value}\",${shelf.value},\"${author.value}\"\n`
    });
    
    isbn.value = "";
    name.value = "";
    author.value = "";

    reader.style.display = "block";
}
