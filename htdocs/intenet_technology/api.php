<?php
// Assuming you have already established a connection to the MySQL database
// You'll need to replace 'your_database', 'your_username', 'your_password', and 'bookings' with your actual database details

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "itlab";
    $table = "bookings";
    
    // Create a new connection
    $conn = new mysqli($servername, $username, $password, $database);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Prepare the SQL statement
    $sql = "INSERT INTO $table (name, city, address, telephone, zip) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    // Bind the values from $_POST to the statement parameters
    $stmt->bind_param("sssss", $_POST['name'], $_POST['city'], $_POST['address'], $_POST['telephone'], $_POST['zip']);
    
    // Execute the statement
    if ($stmt->execute() === TRUE) {
        echo "Data added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    // Close the connection
    $stmt->close();
    $conn->close();
// }
?>
