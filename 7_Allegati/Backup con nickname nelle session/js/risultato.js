
function refreshpt() {
    let ptfinale = sessionStorage.getItem("4"); // Recupera il punteggio
    let difficolta = sessionStorage.getItem("3"); // Recupera la difficoltà

    if (!ptfinale || !difficolta) {
        console.error("Errore: punteggio o difficoltà mancanti.");
        return;
    }

    document.getElementById('risultato').innerHTML = ptfinale;

    let totdomande;
    if (difficolta === "FACILE") {
        totdomande = `${ptfinale / 10}/10`;
    } else if (difficolta === "MEDIO") {
        totdomande = `${ptfinale / 20}/20`;
    } else {
        totdomande = `${ptfinale / 30}/30`;
    }
    document.getElementById('totdomande').innerHTML = totdomande;
}


function backcat() {
    close();
    var pag = window.open("difficolta.html");
}
function mostraDatiSalvati() {
    const categoria = sessionStorage.getItem("2");
    const difficolta = sessionStorage.getItem("3");

    if (!categoria || !difficolta) {
        console.error("Errore: categoria o difficoltà mancanti.");
        return;
    }

    fetch(`../php/record.php?categoria=${categoria}&difficolta=${difficolta}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dati salvati:', data);

        const container = document.getElementById('datiSalvati');
        container.innerHTML = ''; // Svuota il contenitore

        data.forEach(record => {
            const elemento = document.createElement('div');
            elemento.textContent = `Nome: ${record.nome}, Punteggio: ${record.punteggio}`;
            container.appendChild(elemento);
        });
    })
    .catch(error => {
        console.error('Errore nella richiesta:', error);
    });
}
