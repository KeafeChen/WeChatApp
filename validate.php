<?php

	$host = 'localhost';
	$dbname = 'midautumn';
	$user = 'midaut';
	$password = 'ajs(@J21jsDKC';

	try {
		$pdo = new PDO("mysql:dbname=$dbname;host=$host", $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,TRUE);
		echo ('connected');
	}
	catch(PDOException $ex) {
		echo $ex->getMessage();
	}

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$num = $_POST["num"];
	}

	$smt = $pdo -> prepare("SELECT id FROM vote_round1 where id=:ID");
	$smt -> bindValue(":ID", $id);
	$smt -> execute();

	$result = $smt -> fetch();
	$id = $result["id"];

	if ($id != null) {
		$msg = "您已提交投票，感谢参与";
		echo $msg;
	}
	else {
		$msg = "";
		echo $msg;
	}
	exit;
?>
