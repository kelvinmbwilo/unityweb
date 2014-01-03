<?php
include_once '../includes/connection.php';
include '../includes/form.php';
if(isset($_GET['page'])){
    
    /////////////////////////////////////////////////////////
    //////////////// Volunteering Activities ////////////////
    /////////////////////////////////////////////////////////
    if($_GET['page'] == "addteam"){
       ?>

<h3>Add Team Member</h3>
<form class="form-horizontal" action="uploader.php" id="FileUploader" enctype="multipart/form-data" method="post">
    <input type="hidden" id="hidd" name="descr" />
    
  <div class="control-group">
    <label class="control-label" for="inputEmail">first name</label>
    <div class="controls text-left">
        <?php echo form::generalDropdown("titl","Title",array("Prof","Dr","Mr","Ms"),"") ?>
    </div>
  </div>
    
  <div class="control-group">
    <label class="control-label" for="inputEmail">first name</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" placeholder="first name" class="span12" required/>
    </div>
  </div>
  <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Middle Name</label>
    <div class="controls">
      <input type="text" name="mname" id="from" placeholder="Middle Name" class="span12" >
    </div>
  </div>
  <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Last Name</label>
    <div class="controls">
        <input type="text" name="lname" id="to" placeholder="Last Name" class="span12" required>
    </div>
  </div>
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Title On Project</label>
    <div class="controls">
        <input type="text" name="ptitle" id="chances" placeholder="Title On Project" class="span12" required>
    </div>
  </div>
    <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Contacts</label>
    <div class="controls">
        <textarea id="" name="contacts"  rows="7" class="span12" required placeholder="address, phone and email"></textarea>
    </div>
  </div>
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Other Titles(CV)</label>
    <div class="controls">
        <textarea id="description" name="description"  rows="7" ></textarea>
    </div>
  </div>
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword">Image</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
        <span class="help-block">allowed extensions: jpg, png,jpeg,gif</span>
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
    }
    
    if($_GET['page'] == "editteam"){
        $query= mysql_query("SELECT * FROM team WHERE id='{$_POST['id']}'");
        while ($row = mysql_fetch_array($query)) {
       ?>
<h3>Edit Team Member</h3>
<form class="form-horizontal" action="editteam.php" id="FileUploader" enctype="multipart/form-data" method="post">
    <input type="hidden" id="hidd" name="descr" />
    <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
  <div class="control-group">
    <label class="control-label" for="inputEmail">first name</label>
    <div class="controls text-left">
        <?php echo form::generalDropdown("titl","Title",array("Prof","Dr","Mr","Ms"),$row['titl']) ?>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="inputEmail">first name</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" value="<?php echo $row['fname'] ?>" class="span12" required/>
    </div>
  </div>
  <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Middle Name</label>
    <div class="controls">
      <input type="text" name="mname" id="from" value="<?php echo $row['mname'] ?>" class="span12" >
    </div>
  </div>
  <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Last Name</label>
    <div class="controls">
        <input type="text" name="lname" id="to" value="<?php echo $row['lname'] ?>" class="span12" required>
    </div>
  </div>
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Title On Project</label>
    <div class="controls">
        <input type="text" name="ptitle" id="chances" value="<?php echo $row['project_title'] ?>" class="span12" required>
    </div>
  </div>
    <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Contacts</label>
    <div class="controls">
        <textarea id="" name="contacts"  rows="7" class="span12" required><?php echo $row['address'] ?></textarea>
    </div>
  </div>
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Other Titles(CV)</label>
    <div class="controls">
        <textarea id="description" name="description"  rows="7" ><?php echo $row['other_title'] ?></textarea>
    </div>
  </div>
  <div class="control-group text-left">
     <label class="control-label" for="inputPassword"><img src="../uploads/team/<?php echo $row['image'] ?>" class="img-rounded" style="height: 70px; width: 70px" > Change</label>
     <div class="controls">
        <input type="file" name="mFile" id="mFile" />
        <span class="help-block">allowed extensions: jpg, png,jpeg,gif</span>
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php    
        }
    }
    
    if($_GET['page'] == "deleteteam"){
      $query = mysql_query("DELETE FROM team WHERE id='{$_POST['id']}'");
    }
    
    if($_GET['page'] == "manageteam"){
        
        $query = mysql_query("SELECT * FROM team");
        ?>
<h3>Manage Team Members</h3>

<table id="myTable" class="display tablesorter table-bordered"> 
    <thead>
    <tr>
        <th style="width:50px">#</th><th class="">Name</th> <th class="">Title</th> <th class="">Actions</th>
    </tr>
    </thead>
    <tbody>
       <?php
       $counter = 0;
        while ($row = mysql_fetch_array($query)) {
            
            ?>
        <tr id="<?php echo $row['id'] ?>">
            <td><img src='../uploads/team/<?php echo $row['image'] ?>' style="width: 50px;height: 50px"></td>
        <td><?php echo $row['fname']." ".$row['mname']. " ".$row['lname']?></td>
        <td><?php echo $row['project_title']?></td>
        <td>
            <!--<a href='#' class='btn btn-info btn-mini view' id="<?php echo $row['id'] ?>"><i class='icon-th-large'></i></a>-->
            <a href='#' class='btn btn-warning btn-mini edit' id="<?php echo $row['id'] ?>"><i class='icon-pencil'></i></a>
            <a href='#' class='btn btn-danger btn-mini delete'><i class='icon-trash'></i> </a>
        </td>
    </tr>
    
           <?php
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
        <th style="width:50px">#</th><th class="">Name</th> <th class="">Title</th> <th class="">Actions</th>
    </tfoot>
</table>
<?php 
    }

    if($_GET['page'] == "editVolunteeracti"){
        echo $_POST['id'];
        $query = mysql_query("SELECT * FROM resource WHERE id='{$_POST['id']}'");
        while ($row = mysql_fetch_array($query)) {
       ?>

<h3>Edit Resources</h3>
<form class="form-horizontal" action="editResources.php" id="FileUploader" enctype="multipart/form-data" method="post">
    <input type="hidden" name="id" value="<?php echo $row['id'] ?>" class="span12"/>
  <div class="control-group">
    <label class="control-label" for="inputEmail">Title</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" value="<?php echo $row['title'] ?>" class="span12" required/>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="inputEmail">Type<?php echo $row['type'] ?></label>
    <div class="controls text-left">
        <?php echo form::generalDropdown("type","Resource Type",array("Presentation","Publication","Manuals","Documentations","Reports"),$row['type']) ?>
       
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="inputEmail">Resource Url</label>
    <div class="controls text-left">
        <input type="text" name="url" id="mName" value="<?php echo $row['url'] ?>" class="span12"/>
    </div>
  </div>
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword">Change File</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
        }
    }
    
    if($_GET['page'] == "manageactivites"){
        $query = mysql_query("SELECT * FROM resource");
        
        
        ?>
<h3>Manage Resources</h3>

<table id="myTable" class="display tablesorter table-bordered"> 
    <thead>
    <tr>
        <th style="width:30px">#no</th><th class="">Title</th><th>type</th><th>Url/File</th><th>Date Added</th><th class="">Actions</th>
    </tr>
    </thead>
    <tbody>
       <?php
       $counter = 0;
        while ($row = mysql_fetch_array($query)) {
            
            $num = mysql_num_rows($query1);
            $counter++;
            $from = date("M,j Y".strtotime($row['upload_date ']));
            $srt =$from;
            ?>
        <tr id="<?php echo $row['id'] ?>">
            <td><?php echo $counter ?></td>
        <td><?php echo $row['title']?></td>
        <td><?php echo $row['type']?></td>
        <td><?php echo $row['url'] ?></td>
        <td><?php echo $srt ?></td>
        <td>
            <!--<a href='#' class='btn btn-info btn-mini view' id="<?php //echo $row['id'] ?>"><i class='icon-th-large'></i></a>-->
            <a href='#' class='btn btn-warning btn-mini edit' id="<?php echo $row['id'] ?>"><i class='icon-pencil'></i></a>
            <a href='#' class='btn btn-danger btn-mini delete'><i class='icon-trash'></i> </a>
        </td>
    </tr>
    
           <?php
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
        <th style="width:30px">#no</th><th class="">Title</th><th>type</th><th>Url/File</th><th>Date Added</th><th class="">Actions</th>
    </tr>
    </tfoot>
</table>
<?php 
    }
    
    if($_GET['page'] == "deleteactivity"){
       
      $query = mysql_query("DELETE FROM resource WHERE id='{$_POST['id']}'");
    }
    
    if($_GET['page'] == "deleteevent"){
      $query = mysql_query("DELETE FROM event WHERE id='{$_POST['id']}'");
    }
    
    if($_GET['page'] == "viewvolunteactivity"){
      $query = mysql_query("SELECT * FROM volunteer_activity WHERE id='{$_POST['id']}'");
      while ($row6 = mysql_fetch_array($query)) {
          ?>
<h3><?php echo $row6['title'] ?></h3>
<p class="lead"><b>From: </b> <?php echo date("M,j Y",  strtotime($row6['from_date'])) ?> <b>To: </b><?php echo date("M,j Y",  strtotime($row6['to_date'])) ?></p>
<p>
    <img src="../uploads/volunteer/<?php echo $row6['image'] ?>" class="img-rounded pull-left" style="height: 150px;width: 150px">
    <?php echo $row6['discr'] ?>
</p>
          <?php
      }
    }
    
    

    /////////////////////////////////////////////////////////
    ////////////////// Project Resources ////////////////////
    /////////////////////////////////////////////////////////
if($_GET['page'] == "addResource"){
       ?>

<h3>Add Resources </h3>
<form class="form-horizontal" action="addResources.php" id="FileUploader" enctype="multipart/form-data" method="post">
    
  <div class="control-group">
    <label class="control-label" for="inputEmail">Title</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" placeholder="Title" class="span12" required/>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="inputEmail">Type</label>
    <div class="controls text-left">
        <select name="type">
            <option>Presentation</option>
            <option>Publication</option>
            <option>Manuals</option>
            <option>Documentations</option>
            <option>Reports</option>
        </select>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="inputEmail">Resource Url</label>
    <div class="controls text-left">
        <input type="text" name="url" id="mName" placeholder="Resource Url" class="span12"/>
    </div>
  </div>
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword">File</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
    }

    

    //////////////////////////////////////////////////////////
    ////////////////Photo Album //////////////////////////////
    /////////////////////////////////////////////////////////
    if($_GET['page'] == "addPhoto"){
       ?>

<h3>Add Photo to Photo Album </h3>
<form class="form-horizontal" action="addPhoto.php" id="FileUploader" enctype="multipart/form-data" method="post">
    
  <div class="control-group">
    <label class="control-label" for="inputEmail">Title</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" placeholder="Title" class="span12" required/>
    </div>
  </div>
  
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword">Image</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
        <span class="help-block">allowed extensions: jpg, png,jpeg,gif</span>
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
    }

    
    if($_GET['page'] == "managePhoto"){
        $query = mysql_query("SELECT * FROM photos");
        ?>
<h3>Manage Accommodations</h3>

<table id="myTable" class="display tablesorter table-bordered"> 
    <thead>
    <tr>
        <th style="width:50px">#</th><th class="">Title</th><th class="">Actions</th>
    </tr>
    </thead>
    <tbody>
       <?php
       $counter = 0;
        while ($row = mysql_fetch_array($query)) {
            
            ?>
        <tr id="<?php echo $row['id'] ?>">
            <td><img src='../uploads/album/<?php echo $row['image'] ?>' style="width: 50px;height: 50px"></td>
        <td><?php echo $row['title']?></td>
        <td>
            <a href='#' class='btn btn-info btn-mini view' id="<?php echo $row['id'] ?>"><i class='icon-th-large'> view</i></a>
            <a href='#' class='btn btn-danger btn-mini delete'><i class='icon-trash'></i> Delete</a>
        </td>
    </tr>
    
           <?php
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
        <th style="width:50px">#</th><th class="">Title</th><th class="">Actions</th>
    </tfoot>
</table>
<?php 
    }

    if($_GET['page'] == "viewphoto"){
        $query = mysql_query("SELECT * FROM photos WHERE id='{$_POST['id']}'");
        while ($row = mysql_fetch_array($query)) {
            ?>
<p class="lead"> <?php echo $row['title'] ?></p>
<img src="../uploads/album/<?php echo $row['image'] ?>" class="img-rounded" style="height: 350px;width: 400px">

            <?php
        }
    }

    if($_GET['page'] == "deletephoto"){
      $query = mysql_query("DELETE FROM photos WHERE id='{$_POST['id']}'");
    }
   
    
    ///////////////////////////////////////////////////////////////
    ////////////////////////Projects///////////////////////////////
    //////////////////////////////////////////////////////////////
    if($_GET['page'] == "addeprojects"){
       ?>

<h3>Add Projects </h3>
<form class="form-horizontal" action="addProject.php" id="FileUploader" enctype="multipart/form-data" method="post">
    <input type="hidden" id="hidd" name="descr" />
  <div class="control-group">
    <label class="control-label" for="inputEmail">Title</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" placeholder="Title" class="span12" required/>
    </div>
  </div>
  
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Description</label>
    <div class="controls">
        <textarea id="description" name="description"  rows="7" required=""></textarea>
    </div>
  </div>
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword">Image(logo)</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
        <span class="help-block">allowed extensions: jpg, png,jpeg,gif</span>
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
    }

    if($_GET['page'] == "manageproject"){
        $query = mysql_query("SELECT * FROM projects");
        ?>
<h3>Manage Accommodations</h3>

<table id="myTable" class="display tablesorter table-bordered"> 
    <thead>
    <tr>
        <th style="width:50px">#</th><th class="">Title</th><th class="">Actions</th>
    </tr>
    </thead>
    <tbody>
       <?php
       $counter = 0;
        while ($row = mysql_fetch_array($query)) {
            
            ?>
        <tr id="<?php echo $row['id'] ?>">
            <?php if($row['image'] == ""){
    echo "<td><img src='http://placehold.it/50x50'></td><td>";
} else{?>
            <td><img src='../uploads/project/<?php echo $row['image'] ?>' style="width: 50px;height: 50px"></td>
        <td><?php } echo $row['title']?></td>
        <td>
            <a href='#' class='btn btn-info btn-mini view' id="<?php echo $row['id'] ?>"><i class='icon-th-large'></i></a>
            <a href='#' class='btn btn-warning btn-mini edit' id="<?php echo $row['id'] ?>"><i class='icon-pencil'></i></a>
            <a href='#' class='btn btn-danger btn-mini delete'><i class='icon-trash'></i> </a>
        </td>
    </tr>
    
           <?php
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
        <th style="width:50px">#</th><th class="">Title</th><th class="">Actions</th>
    </tfoot>
</table>
<?php 
    }

    if($_GET['page'] == "deleteproject"){
      $query = mysql_query("DELETE FROM projects WHERE id='{$_POST['id']}'");
    }
    
     if($_GET['page'] == "viewproject"){
        $query = mysql_query("SELECT * FROM projects WHERE id='{$_POST['id']}'");
        while ($row = mysql_fetch_array($query)) {
            ?>
<p class="lead"> <?php echo $row['title'] ?></p>
<?php if($row['image'] == ""){
    
} else{?>
<img src="../uploads/project/<?php echo $row['image'] ?>" class="pull-left img-rounded" style="height: 120px;width: 150px;">
<?php } echo $row['discr'] ?>
            <?php
        }
    }
    
    if($_GET['page'] == "editproject"){
         $query = mysql_query("SELECT * FROM projects WHERE id='{$_POST['id']}'");
         while ($row = mysql_fetch_array($query)) {
             
       ?>

<h3>Edit Project </h3>
<form class="form-horizontal" action="editproject.php" id="FileUploader" enctype="multipart/form-data" method="post">
    <input type="hidden" id="hidd" name="descr" />
    <input type="hidden" id="ids" name="id" value="<?php echo $row['id'] ?>" />
    <input type="hidden" id="imag" name="imag" value="<?php echo $row['image'] ?>" />
  <div class="control-group">
    <label class="control-label" for="inputEmail">Title</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" value="<?php echo $row['title'] ?>" class="span12" required/>
    </div>
  </div>
  
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Description</label>
    <div class="controls">
        <textarea id="description" name="description"  rows="7" required=""><?php echo $row['discr'] ?></textarea>
    </div>
  </div>
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword"><img src="../uploads/project/<?php echo $row['image'] ?>" class="img-rounded" style="height: 70px; width: 70px" > Change</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
        <span class="help-block">allowed extensions: jpg, png,jpeg,gif</span>
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
         }
    }
    ////////////////////////////////////////////////////////////////
    ////////////////////////Events ////////////////////////////////
    //////////////////////////////////////////////////////////////
     if($_GET['page'] == "addeventss"){
       ?>

<h3>Add News Or Event </h3>
<form class="form-horizontal" action="addEvent.php" id="FileUploader" enctype="multipart/form-data" method="post">
    <input type="hidden" id="hidd" name="descr" />
  <div class="control-group">
    <label class="control-label" for="inputEmail">Title</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" placeholder="Title" class="span12" required/>
    </div>
  </div>
  
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Description</label>
    <div class="controls">
        <textarea id="description" name="description"  rows="7" required=""></textarea>
    </div>
  </div>
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword">Image</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
        <span class="help-block">allowed extensions: jpg, png,jpeg,gif</span>
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
    }

     if($_GET['page'] == "editnews"){
         $query = mysql_query("SELECT * FROM news_event WHERE id='{$_POST['id']}'");
         while ($row = mysql_fetch_array($query)) {
             
       ?>

<h3>Edit News Or Event </h3>
<form class="form-horizontal" action="editEvent.php" id="FileUploader" enctype="multipart/form-data" method="post">
    <input type="hidden" id="hidd" name="descr" />
    <input type="hidden" id="ids" name="id" value="<?php echo $row['id'] ?>" />
    <input type="hidden" id="imag" name="imag" value="<?php echo $row['image'] ?>" />
  <div class="control-group">
    <label class="control-label" for="inputEmail">Title</label>
    <div class="controls text-left">
        <input type="text" name="mName" id="mName" value="<?php echo $row['title'] ?>" class="span12" required/>
    </div>
  </div>
  
   <div class="control-group text-left">
    <label class="control-label" for="inputPassword">Description</label>
    <div class="controls">
        <textarea id="description" name="description"  rows="7" required=""><?php echo $row['discr'] ?></textarea>
    </div>
  </div>
  <div class="control-group text-left">
      <label class="control-label" for="inputPassword"><img src="../uploads/news/<?php echo $row['image'] ?>" class="img-rounded" style="height: 70px; width: 70px" > Change</label>
    <div class="controls">
        <input type="file" name="mFile" id="mFile" />
        <span class="help-block">allowed extensions: jpg, png,jpeg,gif</span>
    </div>
  </div>
    <h3 id="output" ></h3>
    <div class="control-group text-left">
    <div class="controls">
      <button type="submit" class="btn btn-primary" id="uploadButton">Submit</button>
    </div>
  </div>
    
</form>
        <?php
         }
    }

    if($_GET['page'] == "managenews"){
        $query = mysql_query("SELECT * FROM news_event");
        ?>
<h3>Manage Accommodations</h3>

<table id="myTable" class="display tablesorter table-bordered"> 
    <thead>
    <tr>
        <th style="width:50px">#</th><th class="">Title</th><th class="">Actions</th>
    </tr>
    </thead>
    <tbody>
       <?php
       $counter = 0;
        while ($row = mysql_fetch_array($query)) {
            
            ?>
        <tr id="<?php echo $row['id'] ?>">
            <?php if($row['image'] == ""){
    echo "<td><img src='http://placehold.it/50x50'></td><td>";
} else{?>
            <td><img src='../uploads/news/<?php echo $row['image'] ?>' style="width: 50px;height: 50px"></td>
        <td><?php } echo $row['title']?></td>
        <td>
            <a href='#' class='btn btn-info btn-mini view' id="<?php echo $row['id'] ?>"><i class='icon-th-large'></i></a>
            <a href='#' class='btn btn-warning btn-mini edit' id="<?php echo $row['id'] ?>"><i class='icon-pencil'></i></a>
            <a href='#' class='btn btn-danger btn-mini delete'><i class='icon-trash'></i> </a>
        </td>
    </tr>
    
           <?php
        }
        ?>
    </tbody>
    <tfoot>
        <tr>
        <th style="width:50px">#</th><th class="">Title</th><th class="">Actions</th>
    </tfoot>
</table>
<?php 
    }

    if($_GET['page'] == "deletenews"){
      $query = mysql_query("DELETE FROM news_event WHERE id='{$_POST['id']}'");
    }
    
    if($_GET['page'] == "viewnews"){
        $query = mysql_query("SELECT * FROM news_event WHERE id='{$_POST['id']}'");
        while ($row = mysql_fetch_array($query)) {
            ?>
<p class="lead"> <?php echo $row['title'] ?></p>
<?php if($row['image'] == ""){
    
} else{?>
<img src="../uploads/news/<?php echo $row['image'] ?>" class="pull-left img-rounded" style="height: 120px;width: 150px;">
<?php } echo $row['discr'] ?>
            <?php
        }
    }

    
}

    ?>
