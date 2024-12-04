<?php
// record.php

// Leggi i parametri dalla query string
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : '';
$difficolta = isset($_GET['difficolta']) ? $_GET['difficolta'] : '';

// Se i parametri sono validi
if ($categoria && $difficolta) {
    $filePath = __DIR__ . "/../json/record/{$categoria}_{$difficolta}_dati.json"; // Costruisci il percorso del file

    // Se il file esiste, carica i dati
    if (file_exists($filePath)) {
        $datiCorrenti = json_decode(file_get_contents($filePath), true); // Carica i dati dal file JSON

        // Ordina i dati per punteggio in ordine decrescente
        usort($datiCorrenti, function($a, $b) {
            return $b['punteggio'] - $a['punteggio'];
        });

        // Rispondi con i dati in formato JSON
        echo json_encode($datiCorrenti);
    } else {
        // Rispondi con errore se il file non esiste
        echo json_encode(['status' => 'error', 'message' => 'File non trovato']);
    }
} else {
    // Se categoria o difficoltà non sono specificati, rispondi con errore
    echo json_encode(['status' => 'error', 'message' => 'Categoria o difficoltà mancanti']);
}
?>
