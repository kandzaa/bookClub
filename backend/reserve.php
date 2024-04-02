<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require "Database.php";

$db = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $bookId = isset($_GET['id']) ? $_GET['id'] : null;
    $userId = isset($json_obj["userId"]) ? $json_obj["userId"] : null;

    if ($bookId && $userId) {
        $book = $db->execute("SELECT * FROM reserved_books WHERE book_id = :bookId", [":bookId" => $bookId]);
        if (!empty($book)) {
            echo json_encode(["success" => false]);
            exit();
        }

        // Reserve the book
        $result = $db->execute("INSERT INTO reserved_books (book_id, user_id) VALUES (:bookId, :userId)", [":bookId" => $bookId, ":userId" => $userId]);
        if ($result !== false) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}
?>
