<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>ろくまる農園</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/uikit.min.css" />
	<script src="js/uikit.min.js"></script>
	<script src="js/uikit-icons.min.js"></script>
</head>
<body>
	
<?php

try{

$staff_code = $_POST['staffcode'];

$dsn='mysql:dbname=shop;host=localhost;charset=utf8';
$user='root';
$password='';
$dbh=new PDO($dsn,$user,$password);
$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$sql = 'SELECT name FROM `mst_staff` WHERE code=?';
$stmt = $dbh -> prepare($sql);
$data[] = $staff_code;
$stmt -> execute($data);

$rec = $stmt->fetch(PDO::FETCH_ASSOC);
$staff_name = $rec['name'];


//データベース接続を切断
$dbh=null;

}
catch(Exception $e) {
print 'ただいま障害により大変ご迷惑をおかけしております。';
exit();
}

?>

<h2>スタッフ修正</h2>
<p>スタッフコード</p>
<?php print $staff_code; ?>

<form method="post" action="staff_edit_check.php">
<input type="hidden"name="code" value="<?php print $staff_code; ?>">
スタッフ名<br />
<input type="text" name="name" value="<?php print $staff_name; ?>"><br />
パスワードを入力してください。<br />
<input type="password" name="pass"><br />
パスワードをもう1度入力してください。<br />
<input type="password" name="pass2"><br />
<br />
<input type="button" onclick="history.back()" value="戻る">
<input type="submit" value="OK">
</form>

</body>
</html>