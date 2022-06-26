<?php
session_start();
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'ipfs_test';

$conn = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ( mysqli_connect_errno() ) {
	exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}

$sql = "SELECT file_name, cid FROM files WHERE user = 'john'"; //Switch back to prepared SQL statement & get user field from active session
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    echo "File name: " . $row["file_name"]. " - CID: " . $row["cid"]. "<br>";
  }
} else {
  echo "0 results";
}

$conn->close();
 ?>
