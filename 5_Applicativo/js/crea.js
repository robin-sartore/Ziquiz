function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function crea(){
    let nickname=sessionStorage.getItem("1");
    let nomeQuiz=document.getElementById('nomeQuiz').value;
    let scelta= document.querySelector('input[name="pub"]:checked');
    let file=document.getElementById('file').files[0];   
    let difficolta=document.querySelector('input[name="difficolta"]:checked');
    if(nomeQuiz==null||nomeQuiz==""){
        alert("Nome obbligatorio");
    }
    if(scelta==null){
        alert("scegliere se rendere publico o privato");
        return
    }
    if(difficolta==null){
        alert("scegliere la difficolota");
        return
    }
    if(file==undefined){
        alert("Selezionare un file json");
    }
    if(!(file.name.endsWith('.json'))){
        alert("Il file deve essere json");
    }

    // Crea un oggetto FormData per inviare i dati
    let formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('nomeQuiz', nomeQuiz);
    formData.append('publico', publico.value);
    formData.append('file', file);
    formData.append('difficolta', difficolta.value);


    // Invia i dati al server tramite fetch
    fetch('../php/salvaQuiz.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Quiz salvato con successo!");
        } else {
            alert("Errore nel salvataggio del quiz: " + data.message);
        }
    })
    .catch(error => {
        console.error('Errore nella connessione con il server:', error);
        alert("Errore nella connessione con il server.");
    });
}
function info(){
    close();
    var pag=window.open("InfoCrea.html");
        
}