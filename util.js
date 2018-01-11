var _0 = "https://qr.alipay.com/c1x06861xofamli41ngjja5";
var _1 = "https://qr.alipay.com/c1x06861xofamli41ngjja5";

function is_weixin() {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

function is_android() {
    var a = navigator.userAgent.toLowerCase();
    if (a.match(/(Android|SymbianOS)/i)) {
        return true
    } else {
        return false
    }
}

function is_ios() {
    var a = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(a)) {
        return true
    } else {
        return false
    }
}

function android_auto_jump() {
    WeixinJSBridge.invoke("jumpToInstallUrl", {}, function (e) {});
    window.close();
    WeixinJSBridge.call("closeWindow")
}

function ios_auto_jump() {
    if (_0 != "") {
        location.href = _0
    } else {
        window.close();
        WeixinJSBridge.call("closeWindow")
    }
}

function onAutoinit() {
    if (is_android()) {
        android_auto_jump();
        return false
    }
    if (is_ios()) {
        ios_auto_jump();
        return false
    }
}
if (is_weixin()) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onAutoinit, false)
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onAutoinit);
            document.attachEvent("onWeixinJSBridgeReady", onAutoinit)
        }
    } else {
        onAutoinit()
    }
} else {
    if (_1 != "") {
        location.href = _1
    } else {
        window.close()
    }
}