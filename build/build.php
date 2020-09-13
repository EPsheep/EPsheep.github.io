<?php

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

require "vendor/autoload.php";

// 读取图库数据
$images = yaml_parse_file("../_data/images.yml");

try {
    // 文档: https://blog.csdn.net/weixin_38815505/article/details/103025893
    $client = new Client();
    $url    = "https://www.bing.com/HPImageArchive.aspx?" . http_build_query(['format' => 'js', 'idx' => 0, 'n' => 3, 'mkt' => 'zh-CN']);
    // 发起请求
    $response = $client->request('GET', $url);
    // 解析JSON
    $imageInfo = json_decode($response->getBody(), true);
    // 首页更换为今日壁纸
    $images['site-header-img'] = 'https://cn.bing.com' . $imageInfo['images'][0]['url'];
    // 关于我页面更换为昨日壁纸
    $images['about-header-img'] = 'https://cn.bing.com' . $imageInfo['images'][1]['url'];
    // 标签页更换为前日壁纸
    $images['tag-header-img'] = 'https://cn.bing.com' . $imageInfo['images'][2]['url'];
    echo '调取每日必应壁纸接口成功!' . PHP_EOL;
    file_put_contents('../_data/images.yml', yaml_emit($images, YAML_UTF8_ENCODING));
    echo '写入图库数据成功!' . PHP_EOL;

} catch (Exception $e) {
    echo 'random_int 函数出错!' . PHP_EOL;
    echo $e->getMessage();
    exit();
} catch (GuzzleException $e) {
    echo '调取每日必应壁纸接口失败!' . PHP_EOL;
    exit();
}
