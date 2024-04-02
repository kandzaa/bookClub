<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    exit();
}

require "Database.php";

$db = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Extract the book ID from the request URL
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if ($id) {
        // Execute the DELETE query to remove the book with the given ID
        $result = $db->execute("DELETE FROM books WHERE id = :id", [":id" => $id]);
        if ($result !== false) {
            // Return success message if the book is successfully deleted
            echo json_encode(["message" => "Book deleted successfully"]);
        } else {
            // Return error message if there's an issue deleting the book
            echo json_encode(["error" => "Error deleting book"]);
        }
    } else {
        // Return error message if book ID is not provided in the request
        echo json_encode(["error" => "Book ID is required for deletion"]);
    }
    exit();
}

// Handle other requests (GET, POST) for fetching and adding books
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$title = isset($json_obj["title"]) ? $json_obj["title"] : null;
$author = isset($json_obj["author"]) ? $json_obj["author"] : null;
$release_year = isset($json_obj["year"]) ? $json_obj["year"] : null;

$query_string = "SELECT * FROM books";

$conditions = array();
$params = array();

if ($title) {
    $conditions[] = " title LIKE :title";
    $params[":title"] = '%' . $title . '%';
}
if ($author) {
    $conditions[] = " author LIKE :author";
    $params[":author"] = '%' . $author . '%';
}
if ($release_year) {
    $conditions[] = " release_year = :release_year";
    $params[":release_year"] = $release_year;
}

if (!empty($conditions)) {
    $query_string .= " WHERE " . implode(" AND ", $conditions);
}

// Execute the query to fetch books based on the provided criteria
$books = $db->execute($query_string, $params);
if ($books !== false) {
    // Return the fetched books as JSON response
    echo json_encode($books);
} else {
    // Return error message if there's an issue fetching books
    echo json_encode(["error" => "Error fetching books"]);
}
?>
