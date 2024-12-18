<?php
// Impostazioni per evitare caching
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Thu, 01 Jan 1970 00:00:00 GMT");
// Funzione per ottenere il percorso del file JSON
function prendiFilePath($categoria, $difficolta) {
    return __DIR__ . '/../json/record/' . $categoria . '_' . $difficolta . '_dati.json';
}
// Se è una richiesta POST (per aggiungere punteggi)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true); // Prende i dati dal corpo della richiesta
    // Controlla se i dati necessari sono presenti
    if ($data && isset($data['nome']) && isset($data['punteggio']) && isset($data['categoria']) && isset($data['difficolta'])) {
        $nome = $data['nome'];
        $punteggio = $data['punteggio'];
        $categoria = $data['categoria'];
        $difficolta = $data['difficolta'];
        // Percorso del file JSON
        $filePath = prendiFilePath($categoria, $difficolta);

        // Crea la directory se non esiste
        $dirPath = dirname($filePath);
        if (!is_dir($dirPath)) {
            mkdir($dirPath, 0777, true);
        }

        // Crea il file se non esiste
        if (!file_exists($filePath)) {
            $created = file_put_contents($filePath, json_encode([]));  // Crea un file vuoto
            if ($created === false) {
                echo json_encode(['status' => 'error', 'message' => 'Errore nella creazione del file']);
                exit;
            }
        }

        // Leggi i dati esistenti
        $datiCorrenti = json_decode(file_get_contents($filePath), true);
        if (!is_array($datiCorrenti)) {
            $datiCorrenti = [];
        }

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
            exit;
        }
    } else {
        // Se i dati sono incompleti
        echo json_encode(['status' => 'error', 'message' => 'Dati mancanti o non validi']);
    }
}

?>