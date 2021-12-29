<?php
//header("Content-Type:text/html;charset=utf-8");

if($_POST["md5"]=="submit"){
  $imgname = $_FILES['file']['name'];
  $tmp = $_FILES['file']['tmp_name'];
  $filepath = '存放图片地址路径/wxphoto/';
      if(move_uploaded_file($tmp,$filepath.$imgname)){
        echo $imgname;
        
    }else{
        echo "上传失败";
       
    }
}
?>