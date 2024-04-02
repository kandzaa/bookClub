<?php

$config = require "config.php";
require "Database.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$db = new Database($config);

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $json_obj["Nosaukums"];
    $author = $json_obj["Autors"];
    $year = $json_obj["Gads"];
    $description = $json_obj["description"];

    $query_string = "INSERT INTO katalogs (Nosaukums, Autors, Gads, Apraksts) VALUES (:Nosaukums, :Autors, :Gads, :Apraksts)";
    $params = [":Nosaukums" => $title, ":Autors" => $author, ":Gads" => $year, ":Apraksts" => $description];

    $db->execute($query_string, $params);
    echo JSON_encode(['status' => 'success']);
} else {
    $query_string = "SELECT * FROM katalogs";
    $params = [];

    if (isset($json_obj["Nosaukums"]) && $json_obj["Nosaukums"] != "") {
      $query_string .= " WHERE Nosaukums=:Nosaukums";
      $params[":Nosaukums"] = $json_obj["Nosaukums"];
    }

    if (isset($json_obj["Autors"]) && $json_obj["Autors"] != "") {
      $query_string .= " AND Autors=:Autors";
      $params[":Autors"] = $json_obj["Autors"];
    }

    if (isset($json_obj["Gads"]) && $json_obj["Gads"] != "") {
      $query_string .= " AND Gads=:Gads";
      $params[":Gads"] = $json_obj["Gads"];
    }

    $books = $db->execute($query_string, $params);
    echo JSON_encode($books);
}
?>
