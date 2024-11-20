<?php
// Ottiene i dati inviati dal JavaScript
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Salvataggio dei dati se sono presenti nome e punteggio
    if ($data && isset($data['nome']) && isset($data['punteggio']) && isset($data['categoria']) && isset($data['difficolta'])) {
        $nome = $data['nome'];
        $punteggio = $data['punteggio'];
        $categoria = $data['categoria'];
        $difficolta = $data['difficolta'];
        $filePath = '../json/' . $categoria . '_' . $difficolta . '_dati.json';

        // Legge il contenuto esistente del file
        $datiCorrenti = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : [];

        // Aggiungi il nuovo record alla lista
        $datiCorrenti[] = ['nome' => $nome, 'punteggio' => $punteggio];

        // Ordina la lista in ordine decrescente per punteggio
        usort($datiCorrenti, function ($a, $b) {
            return $b['punteggio'] - $a['punteggio'];
        });

        // Salva la lista ordinata nel file JSON
        file_put_contents($filePath, json_encode($datiCorrenti, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success', 'message' => 'Leaderboard aggiornata correttamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Dati non validi']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $categoria = $_GET['categoria'] ?? null;
    $difficolta = $_GET['difficolta'] ?? null;

    if ($categoria && $difficolta) {
        $filePath = '../json/' . $categoria . '_' . $difficolta . '_dati.json';
        if (file_exists($filePath)) {
            $dati = json_decode(file_get_contents($filePath), true);

            // Ordina la lista in ordine decrescente per punteggio
            usort($dati, function ($a, $b) {
                return $b['punteggio'] - $a['punteggio'];
            });

            echo json_encode($dati);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Parametri mancanti']);
    }
}
?>
