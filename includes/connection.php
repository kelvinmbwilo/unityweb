<?php
error_reporting(0);
mysql_connect("localhost", "root", "kevdom") or die('could not connect to the database:'.mysql_error());
 
 mysql_select_db("unity") or die('Could not select a database' . mysql_error());
?>
