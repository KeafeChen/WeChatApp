<?php

	$host = 'localhost';
	$dbname = 'midautumn';
	$user = 'midaut';
	$password = 'ajs(@J21jsDKC';

	try {
		$pdo = new PDO("mysql:dbname=$dbname;host=$host", $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,TRUE);
		// echo ('connected');
	}
	catch(PDOException $ex) {
		echo $ex->getMessage();
	}

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$num = $_POST["id"];
	}
<<<<<<< HEAD
	// echo $num;
=======
	//echo $num;
	$id=$_POST['id'];
	$group1_male=$_POST['group1_male'];
	$group2_male=$_POST['group2_male'];
	$group3_male=$_POST['group3_male'];
	$group1_female=$_POST['group1_female'];
	$group2_female=$_POST['group2_female'];
	$group3_female=$_POST['group3_female'];
>>>>>>> 03332af04ee33f5beef468ea0eb5bfd18ae3c690

	$sql = "INSERT INTO vote_round1((id, group1_male, group2_male, group3_male, group1_female, group2_female, group3_female) VALUES ('{$id}','{$group1_male}','{$group2_male}','{$groupe_male}','{$group1_female}','{$group2_female}','{$group3_female}')";
	if($pdo->query($sql)){
		echo "<script type= 'text/javascript'>alert('New Record Inserted Successfully');</script>";
	}
	else{
		echo "<script type= 'text/javascript'>alert('Data not successfully Inserted.');</script>";
	}


	$smt = $pdo -> prepare("SELECT id, group1_male, group2_male, group3_male, group1_female, group2_female, group3_female FROM vote_round1 where id=:ID, group1_male=:male1, group2_male=:male2, group3_male=male3, group1_female=:female1, group2_female=:female2, group3_female=:female3");
	$smt -> bindValue(":ID", $id);
	$smt -> bindValue(":male1", $group1_male);
	$smt -> bindValue(":male2", $group2_male);
	$smt -> bindValue(":male3", $group3_male);
	$smt -> bindValue(":female1", $group1_female);
	$smt -> bindValue(":female2", $group2_female);
	$smt -> bindValue(":female3", $group3_female);
	$smt -> execute();


	$result = $smt -> fetch();
	$id = $result["id"];

	if ($id != null) {
		$msg = "您已过提交投票，感谢参与";
		echo $msg;
	}
	else {
		$msg = "";
		echo $msg;
	}
	exit;
?>
