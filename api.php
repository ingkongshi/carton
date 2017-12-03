<?php
    header("Content-Type:text/html;charset=UTF-8");
    date_default_timezone_set("PRC");
    
    //api.php?type=category  
    function getUrl($type){
        $showapi_appid = '50618'; 
        $showapi_secret = 'fc989d08947d4286a7d085e61bcfcafe';
        $time = time()*1000;
        if($type=='category'){
           return 'http://route.showapi.com/958-1?showapi_appid='.$showapi_appid.'&showapi_timestamp='.$time.'&showapi_sign='.$showapi_secret; 
       }else{
           return 'http://route.showapi.com/958-2?showapi_appid='.$showapi_appid.'&showapi_timestamp='.$time.'&showapi_sign='.$showapi_secret; 
       }
        
    }

    //api.php?type=list&catid=/category/weimanhua/kbmh&page=1
    function getList(){
        $catid = $_GET['catid'];
        $page = $_GET['page'];
        $url = getUrl('category').'&type=/'.$catid.'&page='.$page;
        return file_get_contents($url);
    }

    //api.php?type=show&id=/weimanhua/kbmh/94584.html
    function getShow(){
        $id = $_GET['id'];
        $url = getUrl('show').'&id='.$id;
        return file_get_contents($url);
    }
    
    //api.php?type=category
    $category = Array(
        "categorys"=>Array(
            Array(
                'catid'=>'category/weimanhua/gushimanhua',
                'catname'=>'故事'
            ),
            Array(
                'catid'=>'category/weimanhua/kbmh',
                'catname'=>'恐怖'
            ),
            Array(
                'catid'=>'category/qiqu', 
                'catname'=>'奇趣'
            ),
            Array(
                'catid'=>'category/dianying', 
                'catname'=>'电影'
            ),
            Array(
                'catid'=>'category/lengzhishi',
                'catname'=>'知识'
            ),
            Array(
                'catid'=>'category/sheying',
                'catname'=>'摄影'
            ),
            Array(
                'catid'=>'category/xinqi', 
                'catname'=>'新奇'
            ),
            Array(
                'catid'=>'category/wanyi',
                'catname'=>'玩艺'
            ),
            Array(
                'catid'=>'category/chahua', 
                'catname'=>'插画'
            ),
            Array(
                'catid'=>'category/duanzishou',
                'catname'=>'段子'
            )   
        )
    );


    $type = $_GET['type'];

    switch ($type) {
        case 'category':
            echo json_encode($category);
            break;
        case 'list':
            echo getList();
            break;
        case 'show':
            echo getShow();
            break;
        default:
            echo json_encode(Array('error'=>'错误'));
            break;
    }
?>