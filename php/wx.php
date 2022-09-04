<?php
error_reporting(E_ERROR); 

ini_set("display_errors","Off");
header("Content-Type:text/html;charset=utf-8");
$con=mysql_connect('','数据库用户名','数据库密码');
$db=mysql_select_db('数据库名');
$cid=52;
$today =time();   //当前时间戳


switch($_POST["md5"]){
  case 'submit': //发表说说的函数分支 md5的值和小程序端保持一致
    $t1=$_POST["content"]; //说说内容
    if($_POST["status"]=="waiting"){
		//$_POST["status"]=="waiting" 是否把说说设置为待审核 即仅自己可见
      $query="insert into typecho_comments (cid,created,text,ownerId,author,authorId,status) values(52, '$today','$t1',1,'不是李小程',1,'waiting')"; 
    }else{
		//公开说说
	$query="insert into typecho_comments (cid,created,text,ownerId,author,authorId) values(52, '$today','$t1',1,'不是李小程',1)"; 
    }
	mysql_query($query,$con);
  echo $t1;
    break;
  case 'getinfo': //获取当前发表的说说内容
   $pindex=max(1,intval($_POST["page"])); //获取页数
    $psize=$_POST["size"]?$_POST["size"]:20; //获取每页显示多少条
    $query="select count(*) as count from typecho_comments where cid=".$cid; //cid 
 	$count=mysql_fetch_assoc(mysql_query($query)); //获取说说总条数
        $sql="select created,text,status  from typecho_comments where cid=52 order by created desc limit ".($pindex-1)*$psize.",".$psize;
    if ($res=mysql_query($sql)){
        while($row=mysql_fetch_assoc($res)){ 
       $row4=preg_split("/<img/",$row['text']);
       $row3['created']=$row['created'];
       $row3['status']=$row['status'];
       $row3['text']=array_filter(preg_split("/\s/",$row4[0]));
       $row3['img']=preg_replace_callback('/src=\/(.*?)\/>/',function($m){
       return str_replace(' ','',$m[1]);
          },$row4[1]);
      $row3['img']=str_replace(' ','',$row3['img']);
      $result[]= $row3;
    }
    }
    
    $res=[
    'total'=>$count['count'],
    'list'=>$result];
echo(json_encode($res));
 
    break;
}

?>