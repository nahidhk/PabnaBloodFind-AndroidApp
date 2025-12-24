<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "ndsqltop";
$pass = "(N@hid123$##)";
$db   = "ndsqltop_pabnaBoldFind";

// Connect
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

// Read JSON
$data = json_decode(file_get_contents("php://input"), true);

$phone    = $data["phone"] ?? "";
$whatsapp = $data["whatsapp_number"] ?? null;
$name     = $data["name"] ?? "";
$address  = $data["address"] ?? "";
$blood    = $data["bloodgroup"] ?? "";
$gender   = $data["gender"] ?? "";

// Validation
if (!$phone || !$name || !$address || !$blood || !$gender) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields"
    ]);
    exit;
}

/* 🔍 CHECK: phone already exists or not */
$check = $conn->prepare("SELECT id FROM users WHERE phone = ?");
$check->bind_param("s", $phone);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "এই মোবাইল নম্বর দিয়ে ইতিমধ্যে একটি প্রোফাইল রয়েছে"
    ]);
    exit;
}
$check->close();

/* ✅ INSERT */
$stmt = $conn->prepare(
  "INSERT INTO users 
   (phone, whatsapp_number, name, address, bloodgroup, gender)
   VALUES (?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param(
  "ssssss",
  $phone,
  $whatsapp,
  $name,
  $address,
  $blood,
  $gender
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Profile inserted successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"
    ]);
}

$stmt->close();
$conn->close();