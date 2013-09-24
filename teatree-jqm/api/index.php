<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/teas', 'getTeas');
$app->get('/teas/:id',	'getTea');
/*$app->get('/teas/search/:query', 'findByName');*/
/*$app->post('/teas', 'addTea');
$app->put('/teas/:id', 'updateTea');
$app->delete('/teas/:id',	'deleteTea');*/

$app->run();

function getTeas() {
	$sql = "select * FROM ct_tbl_tea ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$teas = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($teas);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getTea($id) {
	$sql = "SELECT * FROM ct_tbl_tea WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$tea = $stmt->fetchObject();  
		$db = null;
		echo json_encode($tea); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function addTea() {
	error_log('addTea\n', 0); //3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$tea = json_decode($request->getBody());
	$sql = "INSERT INTO `ct_tbl_tea` (`name`, `brand`, `serving`, `servings`, "
	         . "`ingredients`, `description`, `picture`) VALUES (:name, :brand, "
             . " :serving, :servings, :ingredients, :description, :picture)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $tea->name, PDO::PARAM_STR);
		$stmt->bindParam("brand", $tea->brand, PDO::PARAM_STR);
		$stmt->bindParam("serving", $tea->serving, PDO::PARAM_STR);
		$stmt->bindParam("servings", $tea->servings, PDO::PARAM_INT);
		$stmt->bindParam("ingredients", $tea->ingredients, PDO::PARAM_STR);
		$stmt->bindParam("description", $tea->description, PDO::PARAM_STR);
		$stmt->bindParam("picture", $tea->picture, PDO::PARAM_STR);
		//echo json_encode($stmt->queryString);
		$stmt->execute();
		$tea->id = $db->lastInsertId();
		$db = null;
		echo json_encode($tea); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 0); // 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateTea($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$tea = json_decode($body);
	$sql = "UPDATE ct_tbl_tea SET name=:name, brand=:brand, serving=:serving," 
			. " servings=:servings, ingredients=:ingredients, description=:description, "
			. " picture=:picture WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $tea->name);
		$stmt->bindParam("brand", $tea->brand);
		$stmt->bindParam("serving", $tea->serving);
		$stmt->bindParam("servings", $tea->servings);
		$stmt->bindParam("ingredients", $tea->ingredients);
		$stmt->bindParam("description", $tea->description);
		$stmt->bindParam("picture", $tea->picture);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($tea); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteTea($id) {
	$sql = "DELETE FROM ct_tbl_tea WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM ct_tbl_tea WHERE UPPER(name) LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$teas = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($teas);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="";
	$dbname="ebiz-ct";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>