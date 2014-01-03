<?php
session_start();
include_once 'connection.php';
if(isset($_GET['page'])){
if($_GET['page'] == "login"){
            $query = mysql_query("SELECT * FROM user WHERE email = '{$_POST['email']}'");
            if(mysql_num_rows($query) == 0){
                $str = "Incorect Username or Password";
            }
            while ($row = mysql_fetch_array($query)) {
                if(sha1($_POST['pass']) == $row['password']){
                    $_SESSION['user'] = $_POST['email'];
                    $_SESSION['fname'] = $row['first_name'];
                    $_SESSION['lname'] = $row['last_name'];
                    $str = "success";
                }  else {
                    $str ="Incorect Username or Password";
                }
            }
            echo $str;
        }
}
?>
