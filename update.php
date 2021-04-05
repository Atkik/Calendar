<?php

require('db_info.php');
	
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