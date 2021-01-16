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
$sql = 'SELECT * FROM '.$dbname.'.schedule WHERE date=:date ORDER BY start';
//実行準備
$stmt = $dbh -> prepare($sql);

$stmt -> bindValue(':date', $_POST['date']);

//sqlを実行
$stmt -> execute();

$selectAray = $stmt -> fetchAll(PDO::FETCH_ASSOC);

header('Content-type: application/json');
echo json_encode($selectAray);

$dbh = null;

?>