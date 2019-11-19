<?php
header("Content-Type:text/html;charset=utf-8");
$a=$_GET["a"];//接收并检验传过来的参数
if($a=="mochengli"){
$con=mysql_connect('','typecho','BbJEFdzs'); //连接数据库
$db=mysql_select_db('typecho'); //选择数据库
$today =time();   //获取当前时间戳
$t1=$_GET["text1"]; 
$query="insert into typecho_comments (cid,created,text,ownerId,author,authorId) values(52,$today,'$t1',1,'不是李小程',1)";
mysql_query($query,$con);
  echo $t1;
  
}


?>
