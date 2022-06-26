<?php
if(isset($_POST['submit'])) {
    $upload_dir = 'uploads'.DIRECTORY_SEPARATOR; //specify upload directory

    if(!empty(array_filter($_FILES['files']['name']))) {

  		foreach ($_FILES['files']['tmp_name'] as $key => $value) {

        $file_tmpname = $_FILES['files']['tmp_name'][$key];
        $file_name = $_FILES['files']['name'][$key];
        $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
        $filepath = $upload_dir.$file_name; //image upload path

        if( move_uploaded_file($file_tmpname, $filepath)) {
          echo 'Upload successful.';
          echo "</br>";
          echo $filepath;

          //file encryption
          $tmp = escapeshellcmd("py encryptionTest.py $filepath -e");
          //echo "</br>";
          //echo $tmp;
          $output = shell_exec($tmp);
          echo "</br>";
          echo $output;

          //file upload to IPFS
          $apiCall = escapeshellcmd("curl -X POST -F file=@$filepath http://192.168.50.249:9095/api/v0/add");
          //echo "</br>";
          //echo $apiCall;
          echo "</br>";
          $apiOutput = shell_exec($apiCall);
          echo $apiOutput;
        }
        else {
          echo 'Upload failed.';
        }
      }
    }
}
?>
