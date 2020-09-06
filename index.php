<?php
	include_once("index.html");

    $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

    $server = $url["us-cdbr-east-02.cleardb.com"];
    $username = $url["b94fd4abf6b46b"];
    $password = $url["b0e7c029"];
    $db = substr($url["heroku_eecf5ac830e1d0f"], 1);

    $link = mysqli_connect($server, $username, $password, $db);
    $result = mysqli_query($link, "select * from test_table");

    while($user = mysqli_fetch_array($result)) {
      echo $user['key_no'], " : ", $user['text'], "<br>";
    }
?>