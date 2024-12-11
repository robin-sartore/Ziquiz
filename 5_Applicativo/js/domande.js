difficolta= sessionStorage.getItem("3");
categoria= sessionStorage.getItem("2");
nickname=sessionStorage.getItem("1");
let r;
var punti=0;
let totdomande;
let posrisposte=[1,2,3,4];
mescola(posrisposte);
let cdomande=1;
if(difficolta=="FACILE"){
    r=10;
}
else if(difficolta=="MEDIO"){
    r=20;
}
else{
    r=30;
}
punti=r;
let nrdomanda=Math.floor(Math.random() * r);
const nrdomande = [];
nrdomande.push(nrdomanda);
console.log(nrdomanda);
let domande;

function backcat() {
    alert("Il tentetivo non verra salvato")
    close();
    var pag = window.open("difficolta.html");
}

console.log('../json/'+categoria+difficolta+'.json');
fetch('https://samtinfo.ch/i22RobinSartore/Ziquiz/json/'+categoria+difficolta+'.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nell\'apertura');
        }
        return response.json();
    })
    .then(data => {

        impostaDomanda(data[nrdomanda].domanda, "domanda");
        impostaDomanda(data[nrdomanda].risposta1, "risposta"+posrisposte[0]);
        impostaDomanda(data[nrdomanda].risposta2, "risposta"+posrisposte[1]);
        impostaDomanda(data[nrdomanda].risposta3, "risposta"+posrisposte[2]);
        impostaDomanda(data[nrdomanda].rispostaGiusta, "risposta"+posrisposte[3]);
        domande=data;
    })
    .catch(error => {
        console.error('Problema con il fetch', error);
    });

sessionStorage.getItem("3"); // da usare per le domande 

function impostaDomanda(x, y,z) {
    document.getElementById(y).innerHTML = x;

}
function domandaSuccesiva(){   
    document.body.style.backgroundColor = "#52C5A6";
    mescola(posrisposte);
    cdomande++;
    document.getElementById("risposta1").disabled = false;
    document.getElementById("risposta2").disabled = false;
    document.getElementById("risposta3").disabled = false;
    document.getElementById("risposta4").disabled = false;

    if(difficolta=="FACILE"){
        if(cdomande<=10){
            totdomande=cdomande+"/10";
        }
        document.getElementById("nrdomande").innerHTML= totdomande;

        if(nrdomande.length<10){
            nrdomanda=Math.floor(Math.random() * 10);
            if(!nrdomande.includes(nrdomanda)){
                nrdomande.push(nrdomanda);
            }
            else{
                while(nrdomande.includes(nrdomanda)){
                    nrdomanda=Math.floor(Math.random() * 10);
                }
                nrdomande.push(nrdomanda);
            }
            impostaDomanda(domande[nrdomanda].domanda, "domanda");
            impostaDomanda(domande[nrdomanda].risposta1, "risposta"+posrisposte[0]);
            impostaDomanda(domande[nrdomanda].risposta2, "risposta"+posrisposte[1]);
            impostaDomanda(domande[nrdomanda].risposta3, "risposta"+posrisposte[2]);
            impostaDomanda(domande[nrdomanda].rispostaGiusta, "risposta"+posrisposte[3]);
            
        }
        else{
            salvaPunteggio()

            setTimeout(risultato,1000);

        }
    }
    else if(difficolta=="MEDIO"){
        if(cdomande<=20){
            totdomande=cdomande+"/20";
        }

        document.getElementById("nrdomande").innerHTML= totdomande;

        if(nrdomande.length<20){
            nrdomanda=Math.floor(Math.random() * 20);
            if(!nrdomande.includes(nrdomanda)){
                nrdomande.push(nrdomanda);
            }
            else{
                while(nrdomande.includes(nrdomanda)){
                    nrdomanda=Math.floor(Math.random() * 20);
                }
                nrdomande.push(nrdomanda);
            }
            impostaDomanda(domande[nrdomanda].domanda, "domanda");
            impostaDomanda(domande[nrdomanda].risposta1, "risposta"+posrisposte[0]);
            impostaDomanda(domande[nrdomanda].risposta2, "risposta"+posrisposte[1]);
            impostaDomanda(domande[nrdomanda].risposta3, "risposta"+posrisposte[2]);
            impostaDomanda(domande[nrdomanda].rispostaGiusta, "risposta"+posrisposte[3]);
            
        }
        else{
            salvaPunteggio()

            setTimeout(risultato,1000);


        }
    }
    else{
        if(cdomande<=30){
            totdomande=cdomande+"/30";
        }

        document.getElementById("nrdomande").innerHTML=totdomande;
        if(nrdomande.length<30){
            nrdomanda=Math.floor(Math.random() * 30);
            console.log(nrdomanda);
            if(!nrdomande.includes(nrdomanda)){
                nrdomande.push(nrdomanda);
            }
            else{
                while(nrdomande.includes(nrdomanda)){
                    nrdomanda=Math.floor(Math.random() * 30);
                }
                nrdomande.push(nrdomanda);
            }
            console.log(nrdomanda);
            impostaDomanda(domande[nrdomanda].domanda, "domanda");
            impostaDomanda(domande[nrdomanda].risposta1, "risposta"+posrisposte[0]);
            impostaDomanda(domande[nrdomanda].risposta2, "risposta"+posrisposte[1]);
            impostaDomanda(domande[nrdomanda].risposta3, "risposta"+posrisposte[2]);
            impostaDomanda(domande[nrdomanda].rispostaGiusta, "risposta"+posrisposte[3]);
            
        }
        else{
            salvaPunteggio()

            setTimeout(risultato,1000);
           

        }
    }
       
}
function risultato(){
    close();
    var nuova=window.open("risultato.html");

}
function verificaDomanda(x){
    if(x==posrisposte[3]){
        document.body.style.backgroundColor = "green";
        document.getElementById("punteggio").innerHTML =punti;
        sessionStorage.setItem(4,punti);
        if(difficolta=="FACILE"){
           if(cdomande<10) {
            punti+=10;
           }
        }
        else if(difficolta=="MEDIO"){
                if(cdomande<20) {
                 punti+=20;
                }
            }
        else{
            if(cdomande<30) {
                punti+=30;
               }
        }

    }
    else{
        document.body.style.backgroundColor = "red";

    }
    document.getElementById("risposta1").disabled = true;
    document.getElementById("risposta2").disabled = true;
    document.getElementById("risposta3").disabled = true;
    document.getElementById("risposta4").disabled = true;

    setTimeout(domandaSuccesiva,1000);
   
}
function mescola(arr) {
    arr.sort(() => Math.random() - 0.5);
  
    }
    //questo metodo è meno funzionale pero per qualche motivo va
  //se utilizzo questo metodo che è piu funzionale:
  /*for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
}*/
    //non rimescola quando richiamo la funzione


    function salvaPunteggio() {
        // Verifica se le variabili sono impostate correttamente
        if (!nickname || !punti || !categoria || !difficolta) {
            alert("Errore: dati incompleti.");
            return;
        }
    
        // Dati da inviare
        const dati = {
            nome: nickname,
            punteggio: punti,
            categoria: categoria,
            difficolta: difficolta
        };
    
        console.log('Dati inviati al server:', dati); // Log dei dati
    
        // Invia la richiesta POST
        fetch('../php/record.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dati)  // Invia i dati come JSON
        })
        .then(response => {
            // Verifica se la risposta è valida e se è un JSON
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            return response.text(); // Ricevi il testo grezzo per verificare
        })
        .then(text => {
            try {
                // Tenta di convertire la risposta in JSON
                const data = JSON.parse(text);
                console.log('Risposta dal server:', data);
                if (data.status === 'success') {
                    alert("Punteggio salvato con successo!");
                } else {
                    alert("Errore nel salvataggio del punteggio: " + data.message);
                }
            } catch (error) {
                // Se la risposta non è JSON valido, segnala l'errore
                console.error('Errore nella conversione JSON:', error, 'Risposta ricevuta:', text);
                alert("Errore: Risposta non valida dal server.");
            }
        })
        .catch(error => {
            console.error('Errore nella richiesta:', error);
            alert("Errore nella connessione con il server.");
        });
    }
    