// Funzione per caricare i dati salvati
console.log(sessionStorage.getItem("catlead"));
console.log(sessionStorage.getItem("diflead"));

function mostraDatiSalvati() {
    const categoria = sessionStorage.getItem("catlead");
    const difficolta = sessionStorage.getItem("diflead");

    // Controllo che categoria e difficoltà siano definiti
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
        return response.json(); // Recupera la risposta come JSON
    })
    .then(data => {
        console.log('Dati salvati:', data);

        const container = document.getElementById('datiSalvati');
        container.innerHTML = ''; // Svuota il contenitore

        if (data.length > 0) {
            data.forEach(record => {
                const elemento = document.createElement('div');
                elemento.textContent = `Nome: ${record.nome}, Punteggio: ${record.punteggio}`;
                container.appendChild(elemento);
            });
        } else {
            container.textContent = "Nessun risultato trovato.";
        }
    })
    .catch(error => {
        console.error('Errore nella richiesta:', error);
    });
}
