<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "raspadinha";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numbers = $_POST['numbers'];
    $attempts = $_POST['attempts'];

    $sql = "INSERT INTO resultados (numeros, raspagens) VALUES ('$numbers', '$attempts')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
