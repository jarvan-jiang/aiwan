(function () {
    var all = [
       { "name": "爱玩20礼包", "id": "199" },
       { "name": "爱玩40礼包", "id": "199" },
       { "name": "爱玩宠物礼包（注意要有1金币！）", "id": "214" }
    ];
    //创建主体
    function CreateOption() {
        var dvSelect = document.createElement("DIV");
        dvSelect.style.position = "absolute";
        dvSelect.style.border = "solid 1px black";
        dvSelect.style.height = "210px";
        dvSelect.style.width = "350px";
        dvSelect.style.top = "35%";
        dvSelect.style.left = "35%";
        dvSelect.id = "AiWan";
        dvSelect.style.backgroundColor = "white";
        var dv = document.createElement("div");
        dv.innerHTML = "选择你要刷的礼包：";
        dv.style.paddingLeft = "30px";
        dv.style.height = "40px";
        dv.style.lineHeight = "40px";
        dvSelect.appendChild(dv);
        for (var i = 0; i < all.length; i++) {
            var dv = document.createElement("DIV");
            dv.style.height = "40px";
            dv.style.lineHeight = "40px";
            dv.style.verticalAlign = "middle";
            dv.style.paddingLeft = "50px";
            dv.innerHTML = "<input type='checkbox' name='cbSelect' style='vertical-align:middle' /> <span style='margin-left:20px;vertical-align:middle'>" + all[i].name + "</span>";
            dvSelect.appendChild(dv);
        }
        var dv = document.createElement("div");
        dv.innerHTML = "<input type='button' id='btnOk' value='确定' /><input style='margin-left:60px' type='button' id='btnCancel' value='取消' /><input type='checkbox' id='bossMode' style='margin-left:10px'/>老板模式（勾选后网页会伪装成qq邮箱）";
        dv.style.paddingLeft = "30px";
        dvSelect.appendChild(dv);
        document.body.appendChild(dvSelect);
    }
    //开始前先测试
    function TestFirst() {
        if (!window.webkitNotifications) {
            alert("请使用chrome浏览器！");
            document.getElementById("AiWan").removeNode(true);
            return false;
        }
        if (window.webkitNotifications.checkPermission() == 0) {
            $.get("http://iwan.qq.com/fuli/check?id=214&rd=" + new Date().getTime(),
            function (data) {
                var s = $.parseJSON(data).success;
                if (s == 3) {
                    alert("请先去登录账号！");
                    return false;
                }
                CreateOption();
                BindEvent();
                return true;
            });
        }
        else {
            alert("未开启桌面通知！在地址栏输入 chrome://settings/content,找到 通知 这一项，选择 允许所有网站显示桌面通知，点击右下角 完成，然后刷新本页再试！");
            return false;
        }
    }
    //绑定事件
    function BindEvent() {
        document.getElementById("btnCancel").onclick = function () {
            document.body.removeChild(document.getElementById("AiWan"));
        }
        document.getElementById("btnOk").onclick = function () {
            var allCb = document.getElementsByName("cbSelect");
            if (allCb.length == 0) {
                alert("一个也没选！");
                return false;
            }
            var arrInterval = [];
            for (var i = 0; i < allCb.length; i++) {
                if (allCb[i].checked) {
                    arrInterval[i] = setInterval(function (item, interval) {
                        $.get("http://iwan.qq.com/fuli/check?id=" + item.id + "&rd=" + new Date().getTime(), function (data) {
                            var s = $.parseJSON(data).success;
                            if (s != 2) {
                                var notification_test = window.webkitNotifications.createNotification("http://ossweb-img.qq.com/images/igame/act/a20130905dzs/img4_4.jpg", '貌似刷出礼包', '礼包类型：' + item.name + ',点我领礼包！');
                                notification_test.onclick = function () { window.open('http://iwan.qq.com/act/dzs20130829/index.htm'); }
                                notification_test.show();
                                clearInterval(interval);
                            }
                        });
                    }, 2000, all[i], arrInterval[i]);
                }
            }
            if (document.getElementById("bossMode").checked) {
                window.document.title = "QQ邮箱";
                var iframe = document.createElement("iframe");
                iframe.src = "https://mail.qq.com";
                iframe.style.position = "absolute";
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.style.top = 0;
                iframe.style.left = 0;
                iframe.style.zIndex = 99999;
                document.body.appendChild(iframe);
            }
            alert("已经开始刷脚本，请不要关闭浏览器，可以最小化！");
            document.body.removeChild(document.getElementById("AiWan"));
        }
    }
    TestFirst();
})();