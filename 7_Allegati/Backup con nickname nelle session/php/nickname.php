<?php
session_start(); // Avvia la sessione

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($data && isset($data['nome'])) {
        $nome = $data['nome'];
        $filePath = '../json/nickname.json';

        // Leggi il file JSON esistente
        $datiCorrenti = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : [];

        // Controlla se il nickname esiste già
        foreach ($datiCorrenti as $record) {
            if ($record['nome'] === $nome) {
                echo json_encode(['status' => 'error', 'message' => 'Il nickname esiste già.']);
                exit;
            }
        }

        // Salva il nickname nella sessione
        $_SESSION['nickname'] = $nome;

        // Aggiungi il nuovo nickname
        $datiCorrenti[] = ['nome' => $nome];

        // Salva i dati aggiornati nel file JSON
        file_put_contents($filePath, json_encode($datiCorrenti, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success', 'message' => 'Nickname salvato correttamente.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Dati non validi.']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Controlla se esiste un nickname nella sessione
    if (isset($_SESSION['nickname'])) {
        echo json_encode(['status' => 'success', 'nickname' => $_SESSION['nickname']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nessun nickname salvato nella sessione.']);
    }
}
?>
