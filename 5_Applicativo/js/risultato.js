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
        totdomande = ptfinale/10;
    } else if (difficolta === "MEDIO") {
        totdomande = ptfinale/20;
    } else {
        totdomande = ptfinale/30;
    }
    document.getElementById('totdomande').innerHTML = totdomande;
}

function backcat() {
    close();
    var pag = window.open("Ziquiz.html");
}
