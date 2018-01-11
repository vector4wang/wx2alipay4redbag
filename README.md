# wx2alipay4redbag
微信短链接秒进支付宝拆红包


最近支付宝红包风靡全国，真的是谁的群多并且发的比其他人早就能很赚一笔，目前想要拿到红包有以下两种途径

- 复制别人的邀请码，打开支付宝
- 用支付宝扫描别人的红包二维码

有人感觉很麻烦于是就做了*在微信里点击短链接即可自动跳转到支付宝领红包*的方式，理想情况下真的是在1秒以内。下面是一个演示图：
>说明：上周末还可以的，根据短链接直接跳转到支付宝，前几天微信把这个给屏蔽了，所以中间就加了一个额外的步骤，但是本质上还是一样的，下面是我从网上找的一个链接来演示的。

[![演示.gif](https://i.loli.net/2018/01/11/5a57727ea86e8.gif)](https://i.loli.net/2018/01/11/5a57727ea86e8.gif)

网上出现了很多这种帮你生成链接的网站，生成一次链接5~200元不等(到处都是商机)，好了，废话不多说，看看我是如何分析并制作自己的短链接的。

## 你需要

- 一部手机
- 联网的浏览器
- 一台云上服务器


## 游戏开始

当你看到别人发给你的短网址`http://suo.im/o6zDH`时，别着急着点，复制出来待用

---
打开Linux机器准备使用`curl`命令，如果没有，你可以在windows下安装相关软件来使用curl，如Cygwin软件。这里简单讲一下为什么不用浏览器，因为这种跳转一般都是在请求页面内执行跳转程序，如果你在页面打开，它会直接跳转到支付宝的页面上去，相关源码你会看不到的

---
有关curl的介绍，可以点[这里](http://man.linuxde.net/curl)
在终端输入`curl http://suo.im/o6zDH`，会有以下返回
```bash
[root@iZ2zejaebtdc3kosrltpqaZ ~]# curl http://suo.im/o6zDH
<html><head><title>Object moved</title></head><body>
<h2>Object moved to <a href="http://60.205.191.82:8080">here</a>.</h2>
</body></html>
[root@iZ2zejaebtdc3kosrltpqaZ ~]# 
```
返回的是Html源码，很清楚，这个短链接指向的是一个服务器的地址，继续重复上面的操作
```bash
[root@iZ2zejaebtdc3kosrltpqaZ ~]# curl http://60.205.191.82:8080
<!DOCTYPE html>
<html lang="zh-cmn-hans">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge, chrome=1">
<title>正在打开支付宝，请稍候……</title>
</head>
<body>
<script src="util.js"></script>
</body>
</html>[root@iZ2zejaebtdc3kosrltpqaZ ~]# 
```
很嗨皮，这最终页面了，稍微学过一点点Html的人都知道，这里起作用的是引入的js，即util.js,因为写的是相对路径，接下来要继续请求`http://60.205.191.82:8080/util.js`,如果不明白的话可以按照下面方法获得路径，
打开浏览器进入开发者面板(快捷键F12),点开NetWork(网络)，选中`Preserve log`和`All`,然后请求http://60.205.191.82:8080，你会发现有很多请求被列了出来，如下
[![网络面板.png](https://i.loli.net/2018/01/11/5a577cf688d98.png)](https://i.loli.net/2018/01/11/5a577cf688d98.png)

好的，继续在终端操作
```bash
[root@iZ2zejaebtdc3kosrltpqaZ ROOT]# curl http://60.205.191.82:8080/util.js
var _0="https://qr.alipay.com/c1x06861xofamli41ngjja5";var _1="https://qr.alipay.com/c1x06861xofamli41ngjja5";function is_weixin(){if(/MicroMessenger/i.test(navigator.userAgent)){return true}else{return false}}function is_android(){var a=navigator.userAgent.toLowerCase();if(a.match(/(Android|SymbianOS)/i)){return true}else{return false}}function is_ios(){var a=navigator.userAgent.toLowerCase();if(/iphone|ipad|ipod/.test(a)){return true}else{return false}}function android_auto_jump(){WeixinJSBridge.invoke("jumpToInstallUrl",{},function(e){});window.close();WeixinJSBridge.call("closeWindow")}function ios_auto_jump(){if(_0!=""){location.href=_0}else{window.close();WeixinJSBridge.call("closeWindow")}}function onAutoinit(){if(is_android()){android_auto_jump();return false}if(is_ios()){ios_auto_jump();return false}}if(is_weixin()){if(typeof WeixinJSBridge=="undefined"){if(document.addEventListener){document.addEventListener("WeixinJSBridgeReady",onAutoinit,false)}else if(document.attachEvent){document.attachEvent("WeixinJSBridgeReady",onAutoinit);document.attachEvent("onWeixinJSBridgeReady",onAutoinit)}}else{onAutoinit()}}else{if(_1!=""){location.href=_1}else{window.close()}}
[root@iZ2zejaebtdc3kosrltpqaZ ROOT]# 
```

---

乍一看上去，感觉像一段乱码，没干系，打开浏览器，进入`https://tool.lu/js/`
将返回的内容放进去，美化一下，如下图
[![美化.png](https://i.loli.net/2018/01/11/5a577eb98e16e.png)](https://i.loli.net/2018/01/11/5a577eb98e16e.png)
惊不惊喜？意不意外？
到此，整个过程和结果就很清晰了，你只要把红框中的两个链接`https://qr.alipay.com/c1x06861xofamli41ngjja5`中的c1x06861xofamli41ngjja5换成自己的红包二维码里的字符就OK了！！！什么你不知道c1x06861xofamli41ngjja5在哪里，好吧，看清楚了，将自己的红包二维码图片在电脑打开，然后用微信扫一扫，之后会出现一个页面，上面显示着你的“码”

---

整个源码就这么轻松得Get了，我放在了[Github](https://github.com/vector4wang/wx2alipay4redbag),[码云](https://gitee.com/backwxc/wx2alipay4redbag)上，上面还有其他代码，有兴趣可以看看

---

关于制作自己的短链接，需要一台云服务器，即别人可以通过链接访问服务器上的web服务，我这边使用的是Tomcat,将处理好的Html和js文件放在Tomcat里的Root文件下，然后启动tomcat，然后你就可以通过http://ip:port/xxx.html访问了。网上搜索短链接制作，然后将http://ip:port/xxx.html生成一个短链接就大功告成了~


## 总结

现在不仅有微信跳转支付宝还有QQ跳转支付宝，但是万变不离其宗，知道了如何去分析才能以不变应万变，赶快去试试吧~



CSDN：http://blog.csdn.net/qqhjqs?viewmode=list
博客：http://vector4wang.tk/
简书：https://www.jianshu.com/u/223a1314e818
Github:https://github.com/vector4wang
Gitee:https://gitee.com/backwxc

如果感觉有帮助的话，点个赞哦~




