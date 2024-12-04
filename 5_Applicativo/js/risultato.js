
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
    var pag = window.open("Ziquiz.html");
}
setTimeout(mostraDatiSalvati, 1000); // Aspetta 1 secondo prima di mostrare i dati

// Funzione per recuperare i dati (GET) e mostrarli
function mostraDatiSalvati() {
    const categoria = sessionStorage.getItem("2");
    const difficolta = sessionStorage.getItem("3");

    // Controllo se categoria o difficoltà non sono definiti
    if (!categoria || !difficolta) {
        console.error("Errore: categoria o difficoltà mancanti.");
        return;
    }

    // Esegui la richiesta GET
    fetch(`../php/record.php?categoria=${categoria}&difficolta=${difficolta}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore nella risposta: ${response.status}`);
        }
        return response.text(); // Recupera la risposta come testo
    })
    .then(data => {
        try {
            const jsonData = JSON.parse(data); // Tenta di fare il parsing come JSON
            console.log('Dati salvati:', jsonData);
    
            const container = document.getElementById('datiSalvati');
            container.innerHTML = ''; // Svuota il contenitore
    
            // Mostra i dati
            jsonData.forEach(record => {
                const elemento = document.createElement('div');
                elemento.textContent = `Nome: ${record.nome}, Punteggio: ${record.punteggio}`;
                container.appendChild(elemento);
            });
        } catch (error) {
            console.error('Errore nel parsing della risposta JSON:', error);
            console.error('Risposta ricevuta:', data);
        }
    })
    .catch(error => {
        console.error('Errore nella richiesta:', error);
    });
}


