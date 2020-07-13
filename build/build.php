<?php

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

require "vendor/autoload.php";

$config = [

    // 网站设置
    "title"                     => "胡荣的博客",
    "SEOTitle"                  => "胡荣的博客",
    "header-img"                => "",
    "email"                     => "epsmail@126.com",
    "description"               => "胡荣的个人博客, 分享个人经历",
    "keyword"                   => "开发, 后端, PHP, Java, 架构, 中间件",
    "url"                       => "http://eps.ink",
    "baseurl"                   => "/",
    "cdnUrl"                    => "https://cdn.jsdelivr.net/gh/EPsheep/epsheep.github.io",

    // 侧边栏设置
    "sidebar"                   => true,
    "sidebar-about-description" => "凡世间一俗人尔",
    "sidebar-avatar"            => "https://s1.ax1x.com/2020/07/05/UpyY9A.jpg",

    // SNS
    "RSS"                       => false,
    "weibo_username"            => "5857402266",
    "zhihu_username"            => "jing-hao-75-45",
    "github_username"           => "EPsheep",
    "netease_username"          => "328086810",
    "bilibili_username"         => "255717391",

    // 友情链接
    'friends'                   => [
        ["title" => "WDNMD", "href" => "https://chrischan13.github.io/wdnmd/"]
    ],

    // 标签
    "featured-tags"             => true,
    "featured-condition-size"   => 1,

    // 构建设置
    "highlighter"               => "rouge",
    "permalink"                 => "pretty",
    "paginate"                  => 10,
    "exclude"                   => [
        "less",
        "node_modules",
        "Gruntfile.js",
        "package.json",
        "README.md"
    ],
    "anchorjs"                  => true,

    // GEMS
    "gems"                      => ["jekyll-paginate"],

    // Markdown
    // document: http://jekyllrb.com/docs/configuration/#kramdown
    "markdown"                  => "kramdown",
    "kramdown"                  => [
        "input" => "GFM"
    ],

    // 图片管理

    //
];


// 调取每日必应壁纸接口
try {
    $client = new Client();
    $response             = $client->request('GET', 'http://fly.atlinker.cn/api/bing/cn.php');
    $imageInfo            = json_decode($response->getBody(), true);
    $config['header-img'] = 'https://cn.bing.com' . $imageInfo['images'][0]['url'];
    echo '调取每日必应壁纸接口成功!' . PHP_EOL;
} catch (GuzzleException $e) {
    echo '调取每日必应壁纸接口失败!' . PHP_EOL;
}


file_put_contents('../_config.yml', yaml_emit($config, YAML_UTF8_ENCODING));
echo '写入配置文件成功!' . PHP_EOL;