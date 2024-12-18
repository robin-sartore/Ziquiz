<?php
// Abilitare la visualizzazione degli errori per il debug
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Verifica se i dati sono stati inviati via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ottieni i dati dal form
    $nickname = $_POST['nickname'];
    $nomeQuiz = $_POST['nomeQuiz'];
    $publico = $_POST['publico'];
    $difficolta = $_POST['difficolta'];

    // Verifica la validità del valore di difficoltà
    if (empty($difficolta)) {
        echo json_encode(['status' => 'error', 'message' => 'La difficoltà non è stata specificata']);
        exit;
    }

    // Ottieni il file caricato
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        
        // Controlla se il file è un JSON
        if (pathinfo($file['name'], PATHINFO_EXTENSION) != 'json') {
            echo json_encode(['status' => 'error', 'message' => 'Il file deve essere un JSON']);
            exit;
        }
        
        // Determina la destinazione e il nome del file
        if ($publico == 'Pubblico') {
            // Salva con il nome "nickname_nomeQuiz_difficolta.json" nella cartella json/quizUtenti
            $destination = __DIR__ . '/../json/quizUtenti/' . $nickname . '_' . $nomeQuiz . '_' . $difficolta . '.json';
        } else {
            // Crea una nuova cartella per il quiz privato e salva come "nomeQuiz_difficolta.json"
            $folderPath = __DIR__ . '/../json/quizUtenti/' . $nickname;
            if (!is_dir($folderPath)) {
                mkdir($folderPath, 0777, true);
            }
            $destination = $folderPath . '/' . $nomeQuiz . '_' . $difficolta . '.json';
        }

        // Muovi il file caricato nella destinazione corretta
        if (move_uploaded_file($file['tmp_name'], $destination)) {
            echo json_encode(['status' => 'success', 'message' => 'File caricato correttamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Errore nel caricamento del file']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'File non selezionato']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Metodo non valido']);
}
?>
