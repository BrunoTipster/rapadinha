<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numbers = json_decode($_POST['numbers']);
    $uniqueNumbers = array_unique($numbers);
    
    if (count($uniqueNumbers) <= 2) {
        echo 'Parabéns! Você ganhou!';
    } else {
        echo 'Tente novamente!';
    }
}
?>
