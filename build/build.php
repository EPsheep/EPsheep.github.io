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
    "motto"                     => "写写代码，吐吐苦水，睡睡懒觉",
    "url"                       => "http://eps.ink",
    "baseurl"                   => "/",
    "cdnUrl"                    => "https://cdn.jsdelivr.net/gh/EPsheep/epsheep.github.io",
    "timezone"                  => "Asia/Shanghai",
    "encoding"                  => "utf-8",

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
    "permalink"                 => "/posts/:title",
    "paginate"                  => 10,
    "exclude"                   => [
        "build",
        "css",
        "img",
        "js",
        "CNAME",
        "LICENSE",
        "package.json",
        "README.md",
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
];


// 1. 调取每日必应壁纸接口
try {
    $client               = new Client();
    $response             = $client->request('GET', 'http://fly.atlinker.cn/api/bing/cn.php');
    $imageInfo            = json_decode($response->getBody(), true);
    $config['header-img'] = 'https://cn.bing.com' . $imageInfo['images'][0]['url'];
    echo '调取每日必应壁纸接口成功!' . PHP_EOL;
} catch (GuzzleException $e) {
    echo '调取每日必应壁纸接口失败!' . PHP_EOL;
}

// 2. 随机生成签名
$motto           = [
    "写写代码，吐吐苦水，睡睡懒觉",
    "非淡泊无以明志，非宁静无以致远",
    "抛弃时间的人，时间也抛弃他",
    "合理安排时间，就等于节约时间",
    "既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去",
    "A man's life is short, but it will be too long if he spends it despicably",
    "No matter how long the night is, the day will come",
    "十年饮冰，难凉热血",
    "在等待的日子里，刻苦读书，谦卑做人，养得根深，日后才能枝繁叶茂",
    "故人笑比中庭树，一日秋风一日疏",
];
$config['motto'] = $motto[mt_rand(0, count($motto) - 1)];
echo '随机生成签名成功!';

// 3. 写入配置文件
file_put_contents('../_config.yml', yaml_emit($config, YAML_UTF8_ENCODING));
echo '写入配置文件成功!' . PHP_EOL;