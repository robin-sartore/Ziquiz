difficolta= sessionStorage.getItem("3");
categoria= sessionStorage.getItem("2");
let r;
var punti=0;

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
    close();
    var pag = window.open("difficolta.html");
}

console.log('../json/'+categoria+difficolta+'.json');
fetch('../json/'+categoria+difficolta+'.json')
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
    mescola(posrisposte);
    cdomande++

    if(difficolta=="FACILE"){
        document.getElementById("nrdomande").innerHTML= cdomande+"/10";

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
    }
    else if(difficolta=="MEDIO"){
        document.getElementById("nrdomande").innerHTML= cdomande+"/20";
        
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
    }
    else{
        document.getElementById("nrdomande").innerHTML= cdomande+"/30";
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
    }
       
}

function verificaDomanda(x){
    if(x==posrisposte[3]){
        document.getElementById("punteggio").innerHTML =punti;
        punti+=10;

    }
    domandaSuccesiva();
}

function mescola(arr) {
    arr.sort(() => Math.random() - 0.5);
  //questo metodo è meno funzionale pero per qualche motivo va
  //se utilizzo questo metodo che è piu funzionale:
  /*for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
}*/
    //non rimescola quando richiamo la funzione
        
    }



