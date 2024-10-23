function backcat() {
    close();
    var pag = window.open("difficolta.html");
}

fetch('../json/storiaFacile.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nell\'apertura');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        impostaDomanda(data[0].domanda, "domanda");
        impostaDomanda(data[0].risposta1, "risposta1");
        impostaDomanda(data[0].risposta2, "risposta2");
        impostaDomanda(data[0].risposta3, "risposta3");
        impostaDomanda(data[0].rispostaGiusta, "risposta4");

        console.log(data[0].risposta1);
        console.log(domanda);
    })
    .catch(error => {
        console.error('Problema con il fetch', error);
    });

sessionStorage.getItem("3"); // da usare per le domande 

function impostaDomanda(x, y) {
    console.log(y);
    document.getElementById(y).innerHTML = x;
}


