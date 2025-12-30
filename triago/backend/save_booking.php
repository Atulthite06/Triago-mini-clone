<?php
header("Content-Type: application/json");

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate
if (!isset($data['email']) || empty($data['email'])) {
    echo json_encode(["status" => "error", "message" => "Email is required"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$hotel = $data['hotel'];
$city = $data['city'];
$price = $data['price'];
$checkIn = $data['checkIn'];
$checkOut = $data['checkOut'];

// DB connection
$servername = "localhost";
$username = "root";
$password = ""; // Set your DB password
$dbname = "trivago_clone";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

// Insert booking
$stmt = $conn->prepare("INSERT INTO bookings (name, email, hotel, city, price, checkIn, checkOut) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $name, $email, $hotel, $city, $price, $checkIn, $checkOut);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Booking failed"]);
}

$stmt->close();
$conn->close();
?>
