<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class Database {

    private $connection;
    public function __construct( ) {
      $config = require "config.php";
      $connection_string = "mysql:" . http_build_query($config, "", ";");
      $this->connection = new PDO($connection_string);
      $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    public function execute($query_string, $params) {
      $query = $this->connection->prepare($query_string);
      $success = $query->execute($params);
      return $success ? $query->fetchAll() : false;
    }
}
?>
