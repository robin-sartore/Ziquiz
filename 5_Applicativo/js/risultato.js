let ptfinale;    
difficolta= sessionStorage.getItem("3");

function refreshpt(){
    ptfinale = sessionStorage.getItem("4");
    document.getElementById('risultato').innerHTML= ptfinale;
    if(difficolta=="FACILE"){
        totdomande = ptfinale/10+"/10";

    }
    else if(difficolta=="MEDIO"){
        totdomande = ptfinale/20+"/20";

        }
    else{
        totdomande = ptfinale/30+"/30";

    }
    document.getElementById('totdomande').innerHTML= totdomande;


}


function backcat() {
    close();
    var pag = window.open("difficolta.html");
}
function mostraDatiSalvati() {
    fetch('../php/record.php', {
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