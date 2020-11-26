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
	
	<h2>スタッフ追加</h2>
	<form method="post" action="staff_add_check.php">
		<label class="uk-label" for="name">スタッフ名を入力してください</label>
		<input type="text" name="name">
		<label class="uk-label" for="pass">パスワードを入力してください</label>
		<input type="password" name="pass">
		<label class="uk-label" for="pass2">パスワードをもう一度入力してください</label>
		<input type="password" name="pass2">
		<input class="uk-button uk-button-default" type="button" onclick="history.back()" value="戻る">
		<input class="uk-button uk-button-default" type="submit" value="OK">
	</form>
	
</body>
</html>