/**
 * Created by Administrator on 2015-12-19.
 */
var createXHR = (function () {
    if ("XMLHttpRequest" in window) {
        return function () {
            return new XMLHttpRequest();
        }
    } else {
        return function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    }
})();

var utils = {
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },

    ajax: function (url, callback) {
        var _this = this;
        url += url.indexOf("?") > -1 ? "&_=" + Math.random() : "?_=" + Math.random();
        var xhr = createXHR();
        xhr.open("get", url);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                var val = this.responseText;
                val = _this.toJSON(val);
                typeof callback === "function" ? callback(val) : null;
            }
        };
        xhr.send();
    }
};