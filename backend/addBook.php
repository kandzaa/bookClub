<?php

require "Database.php";

$db = new Database( );


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $title = isset($json_obj["title"]) ? $json_obj["title"] : null;
    $author = isset($json_obj["author"]) ? $json_obj["author"] : null;
    $release_year = isset($json_obj["year"]) ? $json_obj["year"] : null;
    $DESCRIPTION = isset($json_obj["DESCRIPTION"]) ? $json_obj["DESCRIPTION"] : null;
    $image = isset($json_obj["image"]) ? $json_obj["image"] : null;

    $query_string = "INSERT INTO books (title, author, release_year, DESCRIPTION, image) VALUES (:title, :author, :release_year, :DESCRIPTION, :image)";
    $params = array(":title" => $title, ":author" => $author, ":release_year" => $release_year, ":DESCRIPTION" => $DESCRIPTION, ":image" => $image);

    $result = $db->execute($query_string, $params);

    if ($result) {
        $books = $db->execute("SELECT * FROM books", []);
        if ($books !== false) {
            echo json_encode($books);
        }
    } 
} 