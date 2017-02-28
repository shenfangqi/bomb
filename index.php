<?php
header("content-type:text/html; charset=utf-8");

$appId="aid";
$appKey="appkey";

//$backAddr="http://35.160.163.146:7443";
//$sockAddr="http://35.160.163.146:4001";

$backAddr="http://123.206.87.188:7443";
$sockAddr="http://123.206.87.188:4001";

$qq = $_GET['qid'];
$nick = $_GET['qnick'];
$host = $backAddr . '/index/getUser/?qid='.$qq.'&nick='.$nick; 

$ch = curl_init($host) ;  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ; 
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true) ; 

// 结果 
$qqInfo = curl_exec($ch);

curl_close($ch);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Hello Cocos2d-JS</title> 
</head>
<body style="padding:0; margin: 0; background: #000;">

    <script src="src/loading.js"></script>
    <canvas id="gameCanvas" width="854" height="480"></canvas>

    <div id="info_json" style="display:none">
        <?php echo $qqInfo?>
    </div>

</body>
<script type="text/javascript" src="cocos2d-js-v3.8-zip.js" charset="UTF-8"></script>
<script>
var bombmanId = '<?php echo $qq?>';
var bombmanNick = '<?php echo $nick?>';
var backAddr = "<?php echo $backAddr?>";
var sockAddr = "<?php echo $sockAddr?>";

</script>
<script src="main.js"></script>
</html>