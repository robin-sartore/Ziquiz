<?php
// Ottiene i dati inviati dal JavaScript
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] ==='POST') {
    // Salvataggio dei dati se sono presenti nome e punteggio
    if ($data && isset($data['nome']) && isset($data['punteggio'])) {
        $nome = $data['nome'];
        $punteggio = $data['punteggio'];
        $categoria = $data['categoria'];
        $difficolta = $data['difficolta']
        $filePath = '../json/' . $categoria . $difficolta . 'dati.json';  // Corretto con la concatenazione

        // Legge il contenuto esistente del file
        $datiCorrenti = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : [];

        // Aggiungi il nuovo record alla lista
        $datiCorrenti[] = ['nome' => $nome, 'punteggio' => $punteggio];

        // Ordina la lista in ordine decrescente per punteggio
        usort($datiCorrenti, function($a, $b) {
            return $b['punteggio'] - $a['punteggio']; // Compara i punteggi per ordine decrescente
        });

        // Salva la lista ordinata nel file JSON
        file_put_contents($filePath, json_encode($datiCorrenti, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success', 'message' => 'Leaderboard aggiornata correttamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Dati non validi']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Restituisce i dati salvati nel file JSON (leaderboard ordinata per punteggio)
    $filePath = '../json/' . $categoria . $difficolta . 'dati.json';  // Corretto con la concatenazione
    if (file_exists($filePath)) {
        $dati = json_decode(file_get_contents($filePath), true);

        // Ordina la lista in ordine decrescente per punteggio
        usort($dati, function($a, $b) {
            return $b['punteggio'] - $a['punteggio']; // Compara i punteggi per ordine decrescente
        });

        // Restituisce la leaderboard ordinata
        echo json_encode($dati);
    } else {
        echo json_encode([]);
    }
}
?>
