<?php
// search.php

// Leggi i dati dalla richiesta
$request = json_decode(file_get_contents("php://input"), true);
$name = $request['name'] ?? '';

// Controlla che il nome non sia vuoto
if (empty($name)) {
    echo json_encode([]); // Risposta vuota se il nome è vuoto
    exit;
}

$results = [];
$directory = __DIR__ . '../json/record/'; // Directory con i file JSON
$files = glob($directory . '*.json'); // Ottieni tutti i file JSON

foreach ($files as $file) {
    $jsonData = json_decode(file_get_contents($file), true);
    if (is_array($jsonData)) {
        foreach ($jsonData as $row) {
            if (isset($row['nome']) && stripos($row['nome'], $name) !== false) {
                $results[] = $row;
            }
        }
    }
}

// Restituisci i risultati in formato JSON
header('Content-Type: application/json');
echo json_encode($results);
?>
