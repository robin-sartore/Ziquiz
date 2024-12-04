<?php
// Abilitare la visualizzazione degli errori per il debug
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Thu, 01 Jan 1970 00:00:00 GMT");

// Funzione per ottenere il percorso del file JSON
function getFilePath($categoria, $difficolta) {
    return '../json/record/' . $categoria . '_' . $difficolta . '_dati.json';
}

// Se Ã¨ una richiesta POST (per aggiungere punteggi)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true); // Prende i dati dal corpo della richiesta

    // Controlla se i dati necessari sono presenti
    if ($data && isset($data['nome']) && isset($data['punteggio']) && isset($data['categoria']) && isset($data['difficolta'])) {
        $nome = $data['nome'];
        $punteggio = $data['punteggio'];
        $categoria = $data['categoria'];
        $difficolta = $data['difficolta'];

        // Percorso del file JSON
        $filePath = getFilePath($categoria, $difficolta);

        // Se il file non esiste, crealo con un array vuoto
        if (!file_exists($filePath)) {
            file_put_contents($filePath, json_encode([]));  // Crea un file vuoto
        }

        // Leggi i dati esistenti
        $datiCorrenti = json_decode(file_get_contents($filePath), true);

        // Aggiungi il nuovo punteggio al file JSON
        $datiCorrenti[] = [
            'nome' => $nome,
            'punteggio' => $punteggio
        ];

        // Salva i dati nel file JSON
        $result = file_put_contents($filePath, json_encode($datiCorrenti, JSON_PRETTY_PRINT));

        // Risposta JSON
        if ($result === false) {
            echo json_encode(['status' => 'error', 'message' => 'Errore nella scrittura del file']);
        } else {
            echo json_encode(['status' => 'success', 'message' => 'Punteggio salvato correttamente']);
        }
    } else {
        // Se i dati sono incompleti
        echo json_encode(['status' => 'error', 'message' => 'Dati mancanti o non validi']);
    }
}

// Se Ã¨ una richiesta GET (per recuperare i punteggi)
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : '';
    $difficolta = isset($_GET['difficolta']) ? $_GET['difficolta'] : '';

    // Se i parametri sono validi
    if ($categoria && $difficolta) {
        $filePath = getFilePath($categoria, $difficolta);

        // Se il file esiste, carica i dati
        if (file_exists($filePath)) {
            $datiCorrenti = json_decode(file_get_contents($filePath), true);

            // Ordina i dati per punteggio, decrescente
            usort($datiCorrenti, function($a, $b) {
                return $b['punteggio'] - $a['punteggio'];
            });

            // Rispondi con i dati in formato JSON
            echo json_encode($datiCorrenti);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'File non trovato']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Categoria o difficoltÃ  mancanti']);
    }
}
?>
