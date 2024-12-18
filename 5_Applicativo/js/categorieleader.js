let cat;
function back(){
    close();
    var pag=window.open("Ziquiz.html");
    
}
function dif(){
    close();
    var pag=window.open("difficoltaleader.html");
} 
function categoria(x){
    const prendicategoria = document.getElementById("categoria"+x).innerHTML;
    sessionStorage.setItem("catlead",prendicategoria);


    
   
}
function refreshCat(){
    cat = sessionStorage.getItem("catlead");
    document.getElementById("cat").innerHTML= cat;
  
}
function prendiQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const nickname = sessionStorage.getItem("1"); // Recupera il nickname dalla sessionStorage
    
    // Pulisci il contenitore per aggiornare i bottoni
    if (quizContainer) quizContainer.innerHTML = '';

    // Funzione per creare i bottoni
    function creaBottoni(quizzes, startingIndex) {
        quizzes.forEach((quiz, index) => {
            const quizName = quiz.name.replace('.json', '');
            const [quizOwner, nomeQuiz, difficolta] = quizName.split('_');

            const button = document.createElement('button');
            button.textContent = nomeQuiz;
            button.classList.add('categoria');
            button.id = `categoria${startingIndex + index}`;

            // Onclick
            button.setAttribute('onclick', `categoria(${startingIndex + index}); startPer('${quizOwner},${difficolta}');`);

            quizContainer.appendChild(button);
        });
    }

    // Fetch dei quiz pubblici
    fetch('../php/prendiQuiz.php')
        .then(response => response.json())
        .then(quizzes => {
            creaBottoni(quizzes, 4); // ID parte da 4
        })
        .catch(error => console.error('Errore nei quiz pubblici:', error));

    // Fetch dei quiz personali, se il nickname è presente
    if (nickname) {
        fetch(`../php/prendiQuizPersonali.php?nickname=${nickname}`)
            .then(response => response.json())
            .then(personalQuizzes => {
                creaBottoni(personalQuizzes, 100); // ID separati per i quiz personali
            })
            .catch(error => console.error('Errore nei quiz personali:', error));
        }
    }
