<?php
session_start();
include '../includes/connection.php';
include '../includes/form.php';
$UploadDirectory	= '../uploads/'; //Upload Directory, ends with slash & make sure folder exist

// replace with your mysql database details



if (!@file_exists($UploadDirectory)) {
	//destination folder does not exist
	die("Make sure Upload directory exist!");
}

if($_POST)
{	
    
	if(!isset($_FILES['mFile']))
	{
            die("File is Empty");
	}else{

	
	if($_FILES['mFile']['error'])
	{
		//File upload error encountered
		die(upload_errors($_FILES['mFile']['error']));
	}

	$FileName			= strtolower($_FILES['mFile']['name']); //uploaded file name
	$FileTitle			= mysql_real_escape_string($_POST['mName']); // file title
	$ImageExt			= substr($FileName, strrpos($FileName, '.')); //file extension
	$FileType			= $_FILES['mFile']['type']; //file type
	$FileSize			= $_FILES['mFile']["size"]; //file size
	$RandNumber   		= rand(0, 9999999999); //Random number to make each filename unique.
	$uploaded_date		= $_POST['eventdate'];
	
	switch(strtolower($FileType))
	{
		//allowed file types
		case 'image/png': //png file
		case 'image/gif': //gif file 
		case 'image/jpeg': //jpeg file
//		case 'application/pdf': //PDF file
//		case 'application/msword': //ms word file
//		case 'application/vnd.ms-excel': //ms excel file
//		case 'application/x-zip-compressed': //zip file
//		case 'text/plain': //text file
//		case 'text/html': //html file
			break;
		default:
			die('Unsupported File!'); //output error
	}

  
	//File Title will be used as new File name
	$NewFileName = preg_replace(array('/\s/', '/\.[\.]+/', '/[^\w_\.\-]/'), array('_', '.', ''), strtolower($FileTitle));
	$NewFileName = '_'.$RandNumber.$ImageExt;
        
//   Rename and save uploded file to destination folder.
   if(move_uploaded_file($_FILES['mFile']["tmp_name"], $UploadDirectory . $NewFileName ))
   {
	require_once '../imageworkshop/src/PHPImageWorkshop/ImageWorkshop.php';
        chmod($UploadDirectory . $NewFileName, 0777);
        $layer = new ImageWorkshop(array(
            "imageFromPath" => __DIR__.'/../uploads/'.$NewFileName,
        ));
        unlink(__DIR__.'/../uploads/'.$NewFileName);
        $layer->resizeInPixel(400, null, true);
//        $layer->applyFilter(IMG_FILTER_CONTRAST, -16, null, null, null, true);
//        $layer->applyFilter(IMG_FILTER_BRIGHTNESS, 9, null, null, null, true);
        $dirPath ="../uploads/album";
        $filename = "_".$RandNumber.".gif";
        $createFolders = true;
        $backgroundColor = null; // transparent, only for PNG (otherwise it will be white if set null)
        $imageQuality = 100; // useless for GIF, usefull for PNG and JPEG (0 to 100%)
        $layer->save($dirPath, $filename, $createFolders, $backgroundColor, $imageQuality);
        chmod($dirPath ."/".$filename , 0777);
        //connect & insert file record in database
        $query = mysql_query("INSERT INTO photos VALUES ('', '$FileTitle','{$filename}')")or die(mysql_error());
        die("success");
   }else{
   		die('error uploading File!');
   }
}
}

//function outputs upload error messages, http://www.php.net/manual/en/features.file-upload.errors.php#90522
function upload_errors($err_code) {
	switch ($err_code) { 
        case UPLOAD_ERR_INI_SIZE: 
            return 'The uploaded file exceeds the upload_max_filesize directive in php.ini'; 
        case UPLOAD_ERR_FORM_SIZE: 
            return 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form'; 
        case UPLOAD_ERR_PARTIAL: 
            return 'The uploaded file was only partially uploaded'; 
        case UPLOAD_ERR_NO_FILE: 
            return 'No file was uploaded'; 
        case UPLOAD_ERR_NO_TMP_DIR: 
            return 'Missing a temporary folder'; 
        case UPLOAD_ERR_CANT_WRITE: 
            return 'Failed to write file to disk'; 
        case UPLOAD_ERR_EXTENSION: 
            return 'File upload stopped by extension'; 
        default: 
            return 'Unknown upload error'; 
    } 
} 
?>
