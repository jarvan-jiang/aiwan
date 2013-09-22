(function () {
    var all = [
       { "name": "����20���", "id": "199" },
       { "name": "����40���", "id": "199" },
       { "name": "������������ע��Ҫ��1��ң���", "id": "214" }
    ];
    //��������
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
        dv.innerHTML = "ѡ����Ҫˢ�������";
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
        dv.innerHTML = "<input type='button' id='btnOk' value='ȷ��' /><input style='margin-left:60px' type='button' id='btnCancel' value='ȡ��' /><input type='checkbox' id='bossMode' style='margin-left:10px'/>�ϰ�ģʽ����ѡ����ҳ��αװ��qq���䣩";
        dv.style.paddingLeft = "30px";
        dvSelect.appendChild(dv);
        document.body.appendChild(dvSelect);
    }
    //��ʼǰ�Ȳ���
    function TestFirst() {
        if (!window.webkitNotifications) {
            alert("��ʹ��chrome�������");
            document.getElementById("AiWan").removeNode(true);
            return false;
        }
        if (window.webkitNotifications.checkPermission() == 0) {
            $.get("http://iwan.qq.com/fuli/check?id=214&rd=" + new Date().getTime(),
            function (data) {
                var s = $.parseJSON(data).success;
                if (s == 3) {
                    alert("����ȥ��¼�˺ţ�");
                    return false;
                }
                CreateOption();
                BindEvent();
                return true;
            });
        }
        else {
            alert("δ��������֪ͨ���ڵ�ַ������ chrome://settings/content,�ҵ� ֪ͨ ��һ�ѡ�� ����������վ��ʾ����֪ͨ��������½� ��ɣ�Ȼ��ˢ�±�ҳ���ԣ�");
            return false;
        }
    }
    //���¼�
    function BindEvent() {
        document.getElementById("btnCancel").onclick = function () {
            document.body.removeChild(document.getElementById("AiWan"));
        }
        document.getElementById("btnOk").onclick = function () {
            var allCb = document.getElementsByName("cbSelect");
            if (allCb.length == 0) {
                alert("һ��Ҳûѡ��");
                return false;
            }
            var arrInterval = [];
            for (var i = 0; i < allCb.length; i++) {
                if (allCb[i].checked) {
                    arrInterval[i] = setInterval(function (item, interval) {
                        $.get("http://iwan.qq.com/fuli/check?id=" + item.id + "&rd=" + new Date().getTime(), function (data) {
                            var s = $.parseJSON(data).success;
                            if (s != 2) {
                                var notification_test = window.webkitNotifications.createNotification("http://ossweb-img.qq.com/images/igame/act/a20130905dzs/img4_4.jpg", 'ò��ˢ�����', '������ͣ�' + item.name + ',�����������');
                                notification_test.onclick = function () { window.open('http://iwan.qq.com/act/dzs20130829/index.htm'); }
                                notification_test.show();
                                clearInterval(interval);
                            }
                        });
                    }, 2000, all[i], arrInterval[i]);
                }
            }
            if (document.getElementById("bossMode").checked) {
                window.document.title = "QQ����";
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
            alert("�Ѿ���ʼˢ�ű����벻Ҫ�ر��������������С����");
            document.body.removeChild(document.getElementById("AiWan"));
        }
    }
    TestFirst();
})();