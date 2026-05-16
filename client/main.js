Papa.parse(window.location.origin+"/books", {
    download: true,
    complete: results => {
        for (i = 1; i < results.data.length; i++) {
            let elem = results.data[i];
            if (elem.length !== 0) {
                let p = document.createElement("p");
                p.innerHTML = `${elem[1]} (${elem[0]})`;
                console.log(elem);
                document.getElementById(elem[2]).appendChild(p);
            }
        }
    }
})
