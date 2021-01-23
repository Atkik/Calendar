<?php

//データベース接続用の情報を代入
$dbname='heroku_eecf5ac830e1d0f';
$dsn = 'mysql:dbname='.$dbname.';host=us-cdbr-east-02.cleardb.com';
$user = 'b94fd4abf6b46b';
$password = 'b0e7c029';
	
try{
    $dbh = new PDO($dsn, $user, $password);
}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}

//データ挿入SQL文
$sql = 'UPDATE '.$dbname.'.schedule SET date = :date, start = :start, end = :end, schedule = :schedule WHERE No = :No';
//実行準備
$stmt = $dbh -> prepare($sql);

$stmt -> bindValue(':No', $_POST['dataNo']);
$stmt -> bindValue(':date', $_POST['date']);
$stmt -> bindValue(':start', $_POST['start']);
$stmt -> bindValue(':end', $_POST['end']);
$stmt -> bindValue(':schedule', $_POST['schedule']);

//sqlを実行
$stmt -> execute();

$dbh = null;

?>