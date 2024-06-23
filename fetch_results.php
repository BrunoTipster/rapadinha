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

$sql = "SELECT * FROM resultados ORDER BY id DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<p>Numeros: " . $row["numeros"]. " - Raspagens: " . $row["raspagens"]. "</p>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
