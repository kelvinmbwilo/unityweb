/* 
 * This file will define all admin tasks
 * and open the template in the editor.
 */
$(document).ready(function(){
    ////////////////////////////
    /////////RESource////////////
    $("#addevent").click(function(){
       $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
       $("#adminContents").load("admin_process.php?page=addResource",function(){
           
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                target: '#output',
                success:  afterSuccess //call function after success
                });
            });
        });
    });
   
   
   
   $("#manageActivity").click(function(){
       $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=manageactivites",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
           $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deleteactivity",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
       
           $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Volunteer Activity Information</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewvolunteactivity",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
        
           $(".edit").click(function(){
               var id1 = $(this).attr("id");
               $("#adminContents").html("<img src='../img/loading.gif'>Please Wait");
               $("#adminContents").load("admin_process.php?page=editVolunteeracti",{id:id1},function(){
                   
                     $('#FileUploader').on('submit', function(e) {
                          e.preventDefault();
                          $('#uploadButton').attr('disabled', ''); // disable upload button
                          //show uploading message
                          $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                          $(this).ajaxSubmit({
                          target: '#output',
                          success:  function(){
                             $("#manageActivity").trigger("click"); 
                          }//call function after success
                          });
                      });
               })
            });
        }});
        });
   });
   
   
   ////////////////////////////////////////////////////
   /////////////// Language Programs //////////////////
   ////////////////////////////////////////////////////
   $("#addlanguageprog").click(function(){
       $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
       $("#adminContents").load("admin_process.php?page=addteam",function(){
           CKEDITOR.replace( 'description' );
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                var editor_data = CKEDITOR.instances.description.getData();
                $("#hidd").attr("value",editor_data);
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                target: '#output',
                success:  afterSuccess //call function after success
                });
            });
        });
   });
   
   $("#managelanguageprog").click(function(){
        $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
        $("#adminContents").load("admin_process.php?page=manageTeam",function(){
            $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
            $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Volunteer Activity Information</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewlanguageprog",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
      
            $(".edit").click(function(){
               var id1 = $(this).attr("id");
               $("#adminContents").html("<img src='../img/loading.gif'>Please Wait");
               $("#adminContents").load("admin_process.php?page=editlangprogr",{id:id1},function(){
                   
                     CKEDITOR.replace( 'description' );
                     $('#FileUploader').on('submit', function(e) {
                          e.preventDefault();
                          var editor_data = CKEDITOR.instances.description.getData();
                          $("#hidd").attr("value",editor_data);
                          $('#uploadButton').attr('disabled', ''); // disable upload button
                          //show uploading message
                          $("#output").html("<img src='../img/loading.gif'><span>Submiting Data...</span></div>");
                          $(this).ajaxSubmit({
                          target: '#output',
                          success:  function(){
                             $("#managelanguageprog").trigger("click"); 
                          }//call function after success
                          });
                      });
               })
            });
        
            $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deletelanguageproc",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
        
                    }});
        });
    });

   


/////////////////////////////////////////////////////////
////////////accomodations //////////////////////////////
////////////////////////////////////////////////////////
$("#addteam").click(function(){
    $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
       $("#adminContents").load("admin_process.php?page=addRoomSpace",function(){
           CKEDITOR.replace( 'description' );
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                var editor_data = CKEDITOR.instances.description.getData();
                $("#hidd").attr("value",editor_data);
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                target: '#output',
                success:  afterSuccess //call function after success
                });
            });
        });
    });
    $("#manageRoomSpace").click(function(){
        $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=manageRoomSpace",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
           $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deleteroomspace",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
       
           $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Accommodation Space Information</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewroomspace",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
        
           $(".edit").click(function(){
               var id1 = $(this).attr("id");
               $("#adminContents").html("<img src='../img/loading.gif'>Please Wait");
               $("#adminContents").load("admin_process.php?page=editroomspace",{id:id1},function(){
                   
                     CKEDITOR.replace( 'description' );
                     $('#FileUploader').on('submit', function(e) {
                          e.preventDefault();
                          var editor_data = CKEDITOR.instances.description.getData();
                          $("#hidd").attr("value",editor_data);
                          $('#uploadButton').attr('disabled', ''); // disable upload button
                          //show uploading message
                          $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                          $(this).ajaxSubmit({
                          target: '#output',
                          success:  function(){
                             $("#manageRoomSpace").trigger("click"); 
                          }//call function after success
                          });
                      });
               })
            });
                    }});
        });
    });

    $("#manageroomguest").click(function(){
       $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=manageroomguest",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
          //delete event
          $(".delete").click(function(){
            $(".delete").show("slow").parent().parent().find("span").remove();
            var btn = $(this).parent().parent();
            var id = $(this).parent().parent().attr("id");
            $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
            $("#no").click(function(){
                $(this).parent().parent().find(".delete").show("slow");
                $(this).parent().parent().find("span").remove();
            });
            $("#yes").click(function(){
                $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                $.post("admin_process.php?page=deleteroomguest",{id:id},function(data){
                  btn.hide("slow").next("hr").hide("slow");
               });
            });

        });
    
          $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Volunteer Information</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewroomguest",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
    
    
          $(".confirm").click(function(){
            $(".confirm").show("slow").parent().parent().find("span").remove();
            var btn = $(this);
            var id = $(this).parent().parent().attr("id");
            $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
            $("#no").click(function(){
                $(this).parent().parent().find(".confirm").show("slow");
                $(this).parent().parent().find("span").remove();
            });
            $("#yes").click(function(){
                $(this).parent().html("<span><br><i class='icon-spinner icon-spin'></i>confirming...</span>");
                var btn1 = $(this).parent().parent().find(".confirm");
                $.post("admin_process.php?page=confirmroomguest",{id:id},function(data){
                  btn.html("<i class='icon-thumbs-up icon-white'></i>Confirmed").show("slow").removeClass("confirm").removeClass("btn-warning").addClass("btn-success");
                  btn.parent().parent().find("span").remove();
               });
            });
 
          });
            
            $(".edit").click(function(){
        var id = $(this).parent().parent().attr("id");
        $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
        $("#adminContents").load("admin_process.php?page=editeventform",{id:id},function(){
           $( "#datepicker" ).datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat:"yy-mm-dd"
            });
           
           CKEDITOR.replace( 'description' ); 
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                var editor_data = CKEDITOR.instances.description.getData();
                $("#hidd").attr("value",editor_data);
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<i class='icon-spinner icon-spin icon-2x'></i><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                beforeSerialize: function(){ ; },
                target: '#output',
                success:  afterEdit //call function after success
                });
            });
        });
    });
                    }});
       });
    });

    ////////////////////////////////////////////////////////
    /////////////////////  Safari //////////////////////
    //////////////////////////////////////////////////////
    $("#addsafari").click(function(){
        $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
         $("#adminContents").load("admin_process.php?page=addSafari",function(){
           CKEDITOR.replace( 'description' );
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                var editor_data = CKEDITOR.instances.description.getData();
                $("#hidd").attr("value",editor_data);
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                target: '#output',
                success:  afterSuccess //call function after success
                });
            });
        });
    });

    $("#manageSafari").click(function(){
        $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=manageSafari",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
           $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deletesafari",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
       
           $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Accommodation Space Information</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewsafari",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
        
           $(".edit").click(function(){
               var id1 = $(this).attr("id");
               $("#adminContents").html("<img src='../img/loading.gif'>Please Wait");
               $("#adminContents").load("admin_process.php?page=editsafari",{id:id1},function(){
                   
                     CKEDITOR.replace( 'description' );
                     $('#FileUploader').on('submit', function(e) {
                          e.preventDefault();
                          var editor_data = CKEDITOR.instances.description.getData();
                          $("#hidd").attr("value",editor_data);
                          $('#uploadButton').attr('disabled', ''); // disable upload button
                          //show uploading message
                          $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                          $(this).ajaxSubmit({
                          target: '#output',
                          success:  function(){
                             $("#manageSafari").trigger("click"); 
                          }//call function after success
                          });
                      });
               })
            });
        
                    }});
        });
    });

    $("#managesafariguest").click(function(){
       $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=managesafariguest",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
          //delete event
          $(".delete").click(function(){
            $(".delete").show("slow").parent().parent().find("span").remove();
            var btn = $(this).parent().parent();
            var id = $(this).parent().parent().attr("id");
            $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
            $("#no").click(function(){
                $(this).parent().parent().find(".delete").show("slow");
                $(this).parent().parent().find("span").remove();
            });
            $("#yes").click(function(){
                $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                $.post("admin_process.php?page=deletesafariguest",{id:id},function(data){
                  btn.hide("slow").next("hr").hide("slow");
               });
            });

        });
    
          $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Volunteer Information</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewsafariguest",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
    
    
          $(".confirm").click(function(){
            $(".confirm").show("slow").parent().parent().find("span").remove();
            var btn = $(this);
            var id = $(this).parent().parent().attr("id");
            $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
            $("#no").click(function(){
                $(this).parent().parent().find(".confirm").show("slow");
                $(this).parent().parent().find("span").remove();
            });
            $("#yes").click(function(){
                $(this).parent().html("<span><br><i class='icon-spinner icon-spin'></i>confirming...</span>");
                var btn1 = $(this).parent().parent().find(".confirm");
                $.post("admin_process.php?page=confirmsafariguest",{id:id},function(data){
                  btn.html("<i class='icon-thumbs-up icon-white'></i>Confirmed").show("slow").removeClass("confirm").removeClass("btn-warning").addClass("btn-success");
                  btn.parent().parent().find("span").remove();
               });
            });
 
          });
            
                    }});

       });
    });

    //////////////////////////////////////////////////////////
    ///////////////////////////Photo Album ///////////////////
    //////////////////////////////////////////////////////////
    $("#addphoto").click(function(){
        $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
         $("#adminContents").load("admin_process.php?page=addPhoto",function(){
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                target: '#output',
                success:  function(){
                     $('#FileUploader').resetForm(); 
                    $("#output").html("<i class='icon-ok'></i> Added Successfull, You can contunue to do other things");
                    setTimeout(function(){
                        $("#output").html("");
                      }, 3000); 
                }//call function after success
                });
            });
        });
    });

    $("#managePhoto").click(function(){
        $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=managePhoto",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
           $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deletephoto",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
       
           $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Accommodation Space Information</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewphoto",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
        
                    }});
        });
    });

    $("#addeventss").click(function(){
        $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
         $("#adminContents").load("admin_process.php?page=addeventss",function(){
           CKEDITOR.replace( 'description' );
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                var editor_data = CKEDITOR.instances.description.getData();
                $("#hidd").attr("value",editor_data);
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                target: '#output',
                success:  afterSuccess //call function after success
                });
            });
        });
    });

    $("#manageteam").click(function(){
        $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=manageteam",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
           $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deleteteam",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
       
           $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>News & Event</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewnews",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
        
           $(".edit").click(function(){
               var id1 = $(this).attr("id");
               $("#adminContents").html("<img src='../img/loading.gif'>Please Wait");
               $("#adminContents").load("admin_process.php?page=editteam",{id:id1},function(){
                   
                     CKEDITOR.replace( 'description' );
                     $('#FileUploader').on('submit', function(e) {
                          e.preventDefault();
                          var editor_data = CKEDITOR.instances.description.getData();
                          $("#hidd").attr("value",editor_data);
                          $('#uploadButton').attr('disabled', ''); // disable upload button
                          //show uploading message
                          $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                          $(this).ajaxSubmit({
                          target: '#output',
                          success:  function(){
                              $("#manageteam").trigger("click"); 
                          }//call function after success
                          });
                      });
               })
            });
                    }});
        });
    });

    $("#managenews").click(function(){
        $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=managenews",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
           $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deletenews",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
       
           $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>News & Event</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewnews",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
        
           $(".edit").click(function(){
               var id1 = $(this).attr("id");
               $("#adminContents").html("<img src='../img/loading.gif'>Please Wait");
               $("#adminContents").load("admin_process.php?page=editnews",{id:id1},function(){
                   
                     CKEDITOR.replace( 'description' );
                     $('#FileUploader').on('submit', function(e) {
                          e.preventDefault();
                          var editor_data = CKEDITOR.instances.description.getData();
                          $("#hidd").attr("value",editor_data);
                          $('#uploadButton').attr('disabled', ''); // disable upload button
                          //show uploading message
                          $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                          $(this).ajaxSubmit({
                          target: '#output',
                          success:  function(){
                             $("#managenews").trigger("click"); 
                          }//call function after success
                          });
                      });
               })
            });
                    }});
        });
    });
    
    $("#addeprojects").click(function(){
        $("#adminContents").html("<img src='../img/loading.gif'> Loading Form");
         $("#adminContents").load("admin_process.php?page=addeprojects",function(){
           CKEDITOR.replace( 'description' );
           $('#FileUploader').on('submit', function(e) {
                e.preventDefault();
                var editor_data = CKEDITOR.instances.description.getData();
                $("#hidd").attr("value",editor_data);
                $('#uploadButton').attr('disabled', ''); // disable upload button
                //show uploading message
                $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                $(this).ajaxSubmit({
                target: '#output',
                success:  afterSuccess //call function after success
                });
            });
        });
    });

     $("#manageprojects").click(function(){
        $("#adminContents").html("<i class='icon-spinner icon-spin icon-4x'></i>");
       $("#adminContents").load("admin_process.php?page=manageproject",function(){
           $("#myTable").dataTable({
                    "fnDrawCallback": function( oSettings ) {
           $(".delete").click(function(){
                $(".delete").show("slow").parent().parent().find("span").remove();
                var btn = $(this).parent().parent();
                var id = $(this).parent().parent().attr("id");
                $(this).hide("slow").parent().append("<span><br>Are You Sure <br /> <a href='#' id='yes'><i class='icon-ok'></i> Yes</a> <a href='#' id='no'> <i class='icon-remove'></i> No</a></span>");
                $("#no").click(function(){
                    $(this).parent().parent().find(".delete").show("slow");
                    $(this).parent().parent().find("span").remove();
                });
                $("#yes").click(function(){
                    $(this).parent().html("<br><i class='icon-spinner icon-spin'></i>deleting...");
                    $.post("admin_process.php?page=deleteproject",{id:id},function(data){
                      btn.hide("slow").next("hr").hide("slow");
                   });
                });
            });
       
           $(".view").click(function(){
              var id1 = $(this).attr("id");
               var modal = "";
                modal +="<div id='addUser' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='false'>";
                modal += "<div class='modal-header'>";
                modal += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
                modal += "<h3>Projects</h3>";
                modal += "</div>";
                modal += "<div class='modal-body'>";
                modal += "</div>";
                $("body").append(modal);
                $('#addUser').modal("show");
                $(".modal-body").html("<img src='../img/loading.gif'> Please Wait...");
                $(".modal-body").load("admin_process.php?page=viewproject",{id:id1},function(){
                   
                });
                
                $("#close").click(function(){
                    $('#addUser').modal("hide");
                })
                $('#addUser').on('hidden', function () {
                    $('#addUser').remove();
                });
          });
        
           $(".edit").click(function(){
               var id1 = $(this).attr("id");
               $("#adminContents").html("<img src='../img/loading.gif'>Please Wait");
               $("#adminContents").load("admin_process.php?page=editproject",{id:id1},function(){
                   
                     CKEDITOR.replace( 'description' );
                     $('#FileUploader').on('submit', function(e) {
                          e.preventDefault();
                          var editor_data = CKEDITOR.instances.description.getData();
                          $("#hidd").attr("value",editor_data);
                          $('#uploadButton').attr('disabled', ''); // disable upload button
                          //show uploading message
                          $("#output").html("<img src='../img/loading.gif'><span>Uploading...</span></div>");
                          $(this).ajaxSubmit({
                          target: '#output',
                          success:  function(){
                             $("#manageprojects").trigger("click"); 
                          }//call function after success
                          });
                      });
               })
            });
                    }});
        });
    });
});
function afterSuccess()
{     
    if($("#output").html() !== "success"){
    $('#uploadButton').removeAttr('disabled');
}else{
      $('#FileUploader').resetForm();  // reset form
    $('#uploadButton').removeAttr('disabled'); //enable submit button
    CKEDITOR.instances.description.setData( '' );
       $("#output").html("<i class='icon-ok'></i> Added Successfull, You can contunue to do other things");
     setTimeout(function(){
         $("#output").html("");
       }, 3000); 
}
}

function afterEdit()
{     
    if($("#output").html() !== "success"){
    $('#uploadButton').removeAttr('disabled');
}else{
    $("#output").html("<i class='icon-ok'></i> Edited Successfull, Redirecting please wait....");
     setTimeout(function(){
         $("#manageEvent").trigger("click");
       }, 3000); 
}
    
    

}
