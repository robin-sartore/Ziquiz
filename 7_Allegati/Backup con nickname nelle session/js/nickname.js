function insert() {
    const prendinickname = document.getElementById("insertnickname").value;

    if (prendinickname == "") {
        alert("Inserire nickname");
    } else {
        // Prova a salvare il nickname sul server
        salvaNickname(prendinickname)
            .then(success => {
                if (success) {
                    // Salvataggio riuscito
                    sessionStorage.setItem("1", prendinickname);

                    var cat = window.open("Ziquiz.html");
                    close(); // Chiude la finestra attuale
                }
            })
            .catch(error => {
                // Mostra un alert in caso di errore, incluso se il nickname esiste già
                alert(error);
            });
    }
}


function refresh() {
    const nick = sessionStorage.getItem("1");
    if (nick) {
        // Se il nickname è presente nel sessionStorage, lo mostra
        document.getElementById("nicknamefinal").innerHTML = nick;
        
    } else {
        // Se non è presente, lo recupera dalla sessione sul server
        fetch('../php/nickname.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Salva il nickname nel sessionStorage e lo mostra
                    sessionStorage.setItem("1", data.nickname);
                    document.getElementById("nicknamefinal").innerHTML = data.nickname;
                } else {
                    console.warn('Nessun nickname salvato nella sessione:', data.message);
                }
            })
            .catch(error => {
                console.error('Errore durante la verifica della sessione:', error);
            });
    }
}


function salvaNickname(nickname) {
    return new Promise((resolve, reject) => {
        // Dati da inviare
        const dati = { nome: nickname };

        // Invia i dati a PHP usando fetch
        fetch('../php/nickname.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dati)
        })
            .then(response => response.json()) // Assumiamo che il server ritorni una risposta JSON
            .then(data => {
                if (data.status === 'success') {
                    console.log('Nickname salvato con successo:', data.message);
                    resolve(true); // Risolve la Promise con successo
                } else if (data.status === 'error') {
                    console.warn('Errore dal server:', data.message);
                    reject(data.message); // Rifiuta la Promise con il messaggio di errore del server
                } else {
                    reject("Risposta sconosciuta dal server."); // Rifiuta la Promise per un errore imprevisto
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta:', error);
                reject('Errore nella connessione al server.'); // Rifiuta la Promise con un errore generico
            });
    });
}