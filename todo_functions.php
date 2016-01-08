<?php
	$todo = file_get_contents('js/todo.json');
	if (isset($_GET['dowhat'])) {
		if ($_GET['dowhat'] == 'getList') {
			header('Content-Type: application/json');
			header('Cache-Control: no-cache');
			echo $todo;
		} elseif ($_GET['dowhat'] == 'getCheckedState') {
			$todoId = $_GET['id'];
			$todoDecoded = json_decode($todo, true);
			$reqdKey = findToDoItem($todoDecoded, $todoId);
			echo $todoDecoded[$reqdKey]['selected'];
		}
	} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['dowhat']) && $_POST['dowhat'] == 'changeCBox') {
			$todoId = $_POST['id'];
			$todoDecoded = json_decode($todo, true);
			$reqdKey = findToDoItem($todoDecoded, $todoId);
			$todoDecoded[$reqdKey]['selected'] = !$todoDecoded[$reqdKey]['selected'];
			$todo = json_encode($todoDecoded, JSON_PRETTY_PRINT);
			file_put_contents('js/todo.json', $todo);
			echo $todoDecoded[$reqdKey]['selected'];
			//print_r($todoDecoded[$reqdKey]);
		} else {
			$todoDecoded = json_decode($todo, true);
			$todoDecoded[] = [
				'key'		=> round(microtime(true) * 1000),
				'selected'	=> false,
				'text'		=> $_POST['text']
			];
			$todo = json_encode($todoDecoded, JSON_PRETTY_PRINT);
			file_put_contents('js/todo.json', $todo);
			header('Content-Type: application/json');
			header('Cache-Control: no-cache');
			echo $todo;
		}
	} else {
		header('location: /');
	}

	function findToDoItem($toDoList, $id) {
		foreach ($toDoList as $key => $toDoItem) {
			if ($toDoItem['key'] == $id) {
				return $key;
			}
		}
	}
?>