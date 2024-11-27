function caricadati(){
    fetch('../php/search.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nickname })
    })
    .then(response => {
        if (!response.ok) {
            // Se la risposta non è ok (errore del server o 404)
            throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Risultati trovati:", data);
        const resultDiv = document.getElementById("results");
        resultDiv.innerHTML = ""; // Svuota i risultati precedenti
        if (data.length > 0) {
            data.forEach(item => {
                const row = document.createElement("div");
                row.textContent = JSON.stringify(item);
                resultDiv.appendChild(row);
            });
        } else {
            resultDiv.textContent = "Nessun risultato trovato.";
        }
    })
    .catch(err => {
        console.error("Errore:", err);
        // Stampa la risposta ricevuta dal server per capire cos'è successo
        err.response.text().then(text => console.log(text));
    });
    
}