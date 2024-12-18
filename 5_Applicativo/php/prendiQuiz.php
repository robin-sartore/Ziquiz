<?php
// Funzione per ottenere il percorso dei file pubblici
function getPublicQuizzes() {
    $dir = __DIR__ . '/../json/quizUtenti';  // Percorso della cartella che contiene i quiz pubblici
    $quizzes = [];

    if (is_dir($dir)) {
        $files = array_diff(scandir($dir), array('..', '.'));  // Ottieni tutti i file dalla cartella

        foreach ($files as $file) {
            if (is_dir($dir . '/' . $file)) {  // Se è una cartella (un quiz)
                $quizzes[] = [
                    'name' => $file,  // Nome della cartella (es. il nome del quiz)
                    'type' => 'folder'  // Tipo di file (cartella)
                ];
            } else {
                $quizzes[] = [
                    'name' => $file,  // Nome del file JSON
                    'type' => 'file'   // Tipo di file
                ];
            }
        }
    }

    return $quizzes;
}

// Recupera i quiz pubblici
$quizzes = getPublicQuizzes();
echo json_encode($quizzes);  // Rispondi con la lista dei quiz in formato JSON
?>
