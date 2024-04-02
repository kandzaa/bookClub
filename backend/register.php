<?php


include './database.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$username = @$_POST['username'];
$password = @$_POST['password'];

$db = new Database();

$existing_user = $db->execute("SELECT * FROM users WHERE username=?", [$username]);

if ($existing_user) {
    echo json_encode(["error" => "Username already taken"]);
} else {
    $db->execute("INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)", [$username, $password, 0]);
    echo json_encode(["message" => "Registration successful"]);
}
?>
