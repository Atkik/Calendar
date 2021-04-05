<?php

require('db_info.php');

try{
    $dbh = new PDO($dsn, $user, $password);
}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}


//scheduleテーブルがなければ作成するsql
$sql ='CREATE TABLE IF NOT EXISTS '.$dbname.'.schedule (
	No INT AUTO_INCREMENT,
	date DATE NOT NULL,
	start TIME NOT NULL,
	end TIME NOT NULL,
	schedule VARCHAR(300),
	PRIMARY KEY (No)
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci';

//sqlを実行
$stmt = $dbh->query($sql);

$dbh = null;

//index.htmlを読み込む
include_once("index.html");

?>