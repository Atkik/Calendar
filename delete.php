<?php

require('db_info.php');
	
try{
    $dbh = new PDO($dsn, $user, $password);
}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}

//データ挿入SQL文
$sql = 'DELETE FROM '.$dbname.'.schedule WHERE No = :dataNo';
//実行準備
$stmt = $dbh -> prepare($sql);

$stmt -> bindValue(':dataNo', $_POST['dataNo']);

//sqlを実行
$stmt -> execute();

$dbh = null;

?>