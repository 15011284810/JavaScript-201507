/**
 * Created by Administrator on 2015-12-19.
 */
var list=document.getElementById("list");
var page=document.getElementById("page");
var pageList=document.getElementById("pageList");

var total = 0, totalPage = 0, pageNum = 10, curPage = 1;
list.style.height = pageNum * 30 + "px";

function changeBg(){
    var oLis=pageList.getElementsByTagName("li");
    for(var i=0;i<oLis.length;i++){
        oLis[i].className=i===(curPage-1)?"select":null;
    }
}

utils.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);
    bindData(curPage, data);
    bindPage();

    page.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.tagName.toLowerCase() === "li") {

            var page = Number(tar.innerHTML);
            curPage = page;
        } else if (tar.id === "first") {
            curPage = 1;
        } else if (tar.id === "last") {
            curPage = totalPage;
        } else if (tar.id === "prev") {
            if (curPage === 1) {
                return;
            }
            curPage--;
        } else if (tar.id === "next") {
            if (curPage === totalPage) {
                return;
            }
            curPage++;
        } else if (tar.id === "search") {
            return;
        }
        bindData(curPage, data);
        changeBg();
    };

    var search = document.getElementById("search");
    search.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            var val = this.value.replace(/(^ +| +$)/g, "");
            if (/^(\d|([1-9]\d+))$/.test(val)) {
                if (val < 1 || val > totalPage) {
                    this.value = totalPage;
                    val = totalPage;
                }

                curPage = val;
                bindData(curPage, data);
                changeBg();
            } else {
                this.value = "";
                this.focus();
            }
        }
    };
});


function bindPage() {
    var str = "";
    for (var i = 1; i <= totalPage; i++) {
        var c = i === curPage ? "select" : null;
        str += "<li class='" + c + "'>" + i + "</li>";
    }
    pageList.innerHTML = str;
}


function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, eIndex = page * pageNum - 1;
    var str = "";
    for (var i = sIndex; i <= eIndex; i++) {
        var cur = data[i];
        if (cur) {
            var c = i % 2 === 1 ? "even" : null;
            str += "<li class='" + c + "' num='" + cur["num"] + "'>";
            for (var key in cur) {
                var val = key === "sex" ? (cur[key] === 1 ? "男" : "女") : cur[key];
                str += "<span>" + val + "</span>"
            }
            str += "</li>";
        }
    }
    list.innerHTML = str;

}