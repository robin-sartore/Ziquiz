import { auth, db } from './firebaseConfig.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { get, ref, set, child } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

if (loginForm) {
    loginForm.addEventListener("submit", logIn);
}
if (signupForm) {
    signupForm.addEventListener("submit", signUp);
}

async function logIn(e) {
    e.preventDefault();
    const email = document.getElementById("login-identifier").value;
    const password = document.getElementById("password").value;
    console.log("Login in corso...");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Recupera il nome utente dal database Firebase
        const userRef = ref(db, 'users/' + user.uid);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        if (userData) {
            const username = userData.username;
            sessionStorage.setItem("1", username);
            // Puoi anche visualizzare il nome utente sulla pagina, ad esempio:
        }
   
        console.log("Login funzionato!");
        window.location.href = "../html/Ziquiz.html"; // Redirige alla pagina principale
    } catch (error) {
        console.error("Errore:", error.message);
        document.getElementById("error-message").textContent = "Errore nel login, inserisci le credenziali corrette.";
    }
}

async function signUp(e) {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        // Controlla se il nome utente esiste già nel database
        const usernameExists = await checkUsernameExist(username);

        if (usernameExists) {
            document.getElementById("error-message").textContent = "Nome utente già esistente, prova con un altro.";
            return;  // Non proseguire con la registrazione se il nome utente esiste già
        }

        // Crea un nuovo utente con email e password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Utente creato");

        // Ottieni l'oggetto dell'utente appena creato
        const user = userCredential.user;
        sessionStorage.setItem("1", username);

        // Autentica l'utente prima di scrivere nel database
        await set(ref(db, "users/" + user.uid), {
            username,
            email
        });
       
        
        console.log("Utente aggiunto nel DB...");

        // Redirige l'utente alla pagina principale dopo la registrazione
        window.location.href = "../html/Ziquiz.html"; 
    } catch (error) {
        console.error("Signup error:", error.message);
        document.getElementById("error-message").textContent = "Errore nella registrazione: " + error.message;
    }
}
// Funzione per controllare se un nome utente esiste già nel database
async function checkUsernameExist(username) {
    const usersRef = ref(db, 'users/');
    const snapshot = await get(usersRef);
    const data = snapshot.val();

    // Controlla se qualche utente ha lo stesso nome utente
    for (const key in data) {
        if (data[key].username === username) {
            return true;  // Il nome utente esiste già
        }
    }
    return false;  // Il nome utente non esiste
}

// Gestisci il logout
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            await signOut(auth);  // Effettua il logout
            console.log("Logout dell'utente...");
            sessionStorage.setItem("1", "");
          
    
            window.location.href = "../html/nickname.html";  // Redirige alla pagina di login
        } catch (error) {
            console.error("Errore nel logout:", error.message);
        }
    });
}
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

// Aggiungi un ascoltatore per il modulo di reset della password
const resetPasswordForm = document.getElementById("reset-password-form");
if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", resetPassword);
}

async function resetPassword(e) {
    e.preventDefault();  // Previeni l'invio del form

    const email = document.getElementById("reset-email").value;
    const auth = getAuth();

    try {
        // Invia la richiesta di reset della password
        await sendPasswordResetEmail(auth, email);
        console.log("Email inviata per il reset della password.");
        document.getElementById("reset-message").textContent = "Controlla la tua email per resettare la password!";
        document.getElementById("reset-message").style.color = "green"; // Messaggio di successo
    } catch (error) {
        console.error("Errore nel reset della password:", error.message);
        document.getElementById("reset-message").textContent = "Errore nell'invio dell'email di reset: " + error.message;
        document.getElementById("reset-message").style.color = "red"; // Messaggio di errore
    }
}
