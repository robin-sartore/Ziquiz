function mostraDatiSalvati() {
    // Ottieni il nickname da sessionStorage
    let nickname = sessionStorage.getItem("1");

    // Verifica se il nickname è valido
    if (!nickname) {
        console.error("Errore: il nickname non è stato fornito.");
        return;
    }

    // Esegui la richiesta POST per cercare il nome nel JSON
    fetch('../php/search.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nickname })  // Invia il nome nel corpo della richiesta
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore nella risposta: ${response.status}`);
        }
        return response.json(); // Recupera la risposta come JSON
    })
    .then(data => {
        console.log("Risultati trovati:", data);
        const resultDiv = document.getElementById("results");
        resultDiv.innerHTML = ""; // Svuota i risultati precedenti

        if (data.length > 0) {
            let currentCategory = "";
            let currentDifficulty = "";

            data.forEach(item => {
                // Mostra il titolo per ogni nuova categoria e difficoltà
                if (item.categoria !== currentCategory || item.difficolta !== currentDifficulty) {
                    const categoryTitle = document.createElement("h3");
                    categoryTitle.textContent = `Categoria: ${item.categoria}, Difficoltà: ${item.difficolta}`;
                    resultDiv.appendChild(categoryTitle);

                    // Aggiorna le variabili per tenere traccia della categoria e difficoltà
                    currentCategory = item.categoria;
                    currentDifficulty = item.difficolta;
                }

                // Aggiungi i record sotto la categoria e difficoltà
                const recordRow = document.createElement("div");
                recordRow.textContent = `Nome: ${item.nome}, Punteggio: ${item.punteggio}`;
                resultDiv.appendChild(recordRow);
            });
        } else {
            resultDiv.textContent = "Nessun risultato trovato.";
        }
    })
    .catch(error => {
        console.error('Errore nella richiesta:', error);
    });
}
