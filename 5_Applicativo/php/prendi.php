<?php
// search.php

// Leggi i dati dalla richiesta
$request = json_decode(file_get_contents("php://input"), true);
$name = $request['name'] ?? ''; // Otteniamo il nome dalla richiesta, se non presente sarà vuoto
// Controlla che il nome non sia vuoto
if (empty($name)||$name=="") {
    echo json_encode(['status' => 'error', 'message' => 'Nome non specificato']); // Se non c'è il nome, rispondi con errore
    exit;
}
$results = [];
$directory = __DIR__ . '/../json/record/'; // Percorso della cartella dei file JSON
$files = glob($directory . '*.json'); // Otteniamo tutti i file JSON
// Ciclo attraverso tutti i file
foreach ($files as $file) {
    // Estrai il nome del file senza il percorso e l'estensione
    $fileName = basename($file, '.json');
    // Dividi il nome del file per ottenere categoria e difficoltà
    $fileParts = explode('_', $fileName);
    $categoria = $fileParts[0] ?? '';
    $difficolta = $fileParts[1] ?? '';

    // Carica il contenuto di ciascun file JSON
    $jsonData = json_decode(file_get_contents($file), true); 
    if (is_array($jsonData)) {
        foreach ($jsonData as $row) {
            // Controlla se il nome esiste nel record e se corrisponde (case-sensitive)
            if (isset($row['nome']) && strpos($row['nome'], $name) !== false) {
                // Aggiungi anche la categoria e la difficoltà al record
                $row['categoria'] = $categoria;
                $row['difficolta'] = $difficolta;
                $results[] = $row; // Se corrisponde, aggiungi il record ai risultati
            }
        }
    }
}

// Rispondi con i risultati in formato JSON
header('Content-Type: application/json');
echo json_encode($results);
?>
