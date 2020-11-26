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
$dsn='mysql:dbname=shop;host=localhost;charset=utf8';
$user='root';
$password='';
$dbh=new PDO($dsn,$user,$password);
$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$sql = 'SELECT code, name FROM mst_staff WHERE 1';
$stmt = $dbh -> prepare($sql);
$stmt -> execute();


//データベース接続を切断
$dbh=null;

print '<p>スタッフ一覧</p>';

print '<form method="post" action="staff_edit.php">';
while(true){
    $rec = $stmt->fetch(PDO::FETCH_ASSOC);
    if($rec == false){
    break;
    }
    print'<input id="'.$rec['code'].'" type="radio" name="staffcode" value="'.$rec['code'].'">';
    print'<label for="'.$rec['code'].'">';
    print $rec['name'];
    print'</label>';
}

print '<input type="submit" value="修正">';
print '</form>';

}
catch(Exception $e) {
print 'ただいま障害により大変ご迷惑をおかけしております。';
exit();
}

?>


</body>
</html>