<?php

$_POST = json_decode(file_get_contents("php://input"), true);

$username = @$_POST['username'];
$password = @$_POST['password'];

include './database.php';
$db = new Database();

$user = $db->execute("SELECT * FROM users WHERE username=? AND password=?", [$username, $password]);

if (!empty($user)) {
    // Check if the user is an admin
    if ($user[0]['is_admin'] == 1) {
        echo json_encode(["message" => "Login successful", "is_admin" => true]);
    } else {
        echo json_encode(["message" => "Login successful", "is_admin" => false]);
    }
} else {
    echo json_encode(["error" => "Invalid username or password"]);
}
?>
