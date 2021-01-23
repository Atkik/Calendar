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
$sql = 'DELETE FROM '.$dbname.'.schedule WHERE No = :dataNo';
//実行準備
$stmt = $dbh -> prepare($sql);

$stmt -> bindValue(':dataNo', $_POST['dataNo']);

//sqlを実行
$stmt -> execute();

$dbh = null;

?>