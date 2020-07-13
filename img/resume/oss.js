;(function () {
    if (window.performance && window.performance.getEntriesByType && window.addEventListener && navigator.userAgent) {
        var B = {};
        var C = navigator.userAgent.toLowerCase();
        var s;
        (s = C.match(/rv:([\d.]+)\) like gecko/)) ? B.ie = s[1] : (s = C.match(/msie ([\d.]+)/)) ? B.ie = s[1] : (s = C.match(/firefox\/([\d.]+)/)) ? B.firefox = s[1] : (s = C.match(/chrome\/([\d.]+)/)) ? B.chrome = s[1] : (s = C.match(/opera.([\d.]+)/)) ? B.opera = s[1] : (s = C.match(/version\/([\d.]+).*safari/)) ? B.safari = s[1] : 0;
        windows = (C.indexOf("windows", 0) != -1) ? 1 : 0;
        mac = (C.indexOf("mac", 0) != -1) ? 1 : 0;
        linux = (C.indexOf("linux", 0) != -1) ? 1 : 0;
        unix = (C.indexOf("x11", 0) != -1) ? 1 : 0;
        var D = '';
        var E = '';
        if (windows) D = "MS Windows"; else if (mac) D = "Apple mac"; else if (linux) D = "Linux"; else if (unix) D = "Unix"; else D = 'other';
        if (B.ie) E = ('IE: ' + B.ie);
        if (B.firefox) E = ('Firefox: ' + B.firefox);
        if (B.chrome) E = ('Chrome: ' + B.chrome);
        if (B.opera) E = ('Opera: ' + B.opera);
        if (B.safari) E = ('Safari: ' + B.safari);
        var F = 0;
        window.onerror = function (a, b, c, d, e) {
            var f;
            F = F + 1;
            try {
                f = e.stack.replace(/\s+/g, ' ')
            } catch (err) {
                f = e
            }
            var g = '?u=' + location.pathname + '&em=' + a + '&su=' + b + '&ln=' + c + '&cm=' + d + '&eo=' + f + '&os=' + D + '&bs=' + E;
            if (F < 50) {
                loadXMLDoc('/upload/ltm/oss.html' + g + "&t=" + (+new Date()))
            }
        };
        var G = {};
        window.addEventListener('error', function (a) {
            if (a.srcElement) {
                lname = a.srcElement.localName;
                if (lname == 'script' || lname == 'img') {
                    G[a.srcElement.src] = a.timeStamp
                } else if (lname == 'link') {
                    G[a.srcElement.href] = a.timeStamp
                }
            }
        }, true);
        var H = function () {
        };
        H.prototype.ping = function (b, c) {
            this.img = new Image();
            var d = new Date();
            this.img.onload = this.img.onerror = pingCheck;

            function pingCheck() {
                var a = new Date() - d;
                if (typeof c === "function") {
                    c(a)
                }
            }

            this.img.src = b + "?" + (+new Date())
        };
        window.addEventListener("load", function (d) {
            var f = window.performance.timing;
            if (f.domainLookupEnd > 0 && f.domainLookupStart > 0 && f.responseStart > 0 && f.connectStart > 0 && f.responseEnd > 0 && f.domInteractive > 0 && f.domLoading > 0 && f.loadEventStart > 0 && f.domComplete > 0 && f.fetchStart > 0) {
                var g = f.domainLookupEnd - f.domainLookupStart;
                var h = f.responseStart - f.connectStart;
                var j = f.responseEnd - f.connectStart;
                var k = f.domInteractive - f.domLoading;
                var m = f.loadEventStart - f.domInteractive;
                var n = f.domComplete - f.fetchStart;
                j = (j > 0) ? j : '0';
                k = (k > 0) ? k : '0';
                h = (h > 0) ? h : '0';
                if (n > 5000) {
                    var o = performance.getEntriesByType("resource");
                    var r;
                    var e = [];
                    var q = '';
                    var s = [];
                    var t = Object.keys(G);
                    var u = 0;
                    for (var i = 0, l = o.length; i < l; i++) {
                        r = o[i];
                        var v = r.name;
                        var w = r.initiatorType;
                        var x = r.duration;
                        x = (x >= 0) ? x : 0;
                        if (K(t, v)) {
                            delete G[v];
                            u = 1
                        } else {
                            u = 0
                        }
                        if (x > 1000 && x < 100000000) {
                            e.push({'n': urlsplit(v), 'v': x.toFixed(2), 'err': u})
                        }
                    }
                    t = Object.keys(G);
                    var y = 0;
                    for (var z = 0, el = t.length; z < el; z++) {
                        y = G[t[z]] - j;
                        if (y > 1000 && y < 100000000) {
                            e.push({'n': urlsplit(t[z]), 'v': y.toFixed(2), 'err': 1})
                        }
                    }
                    e.sort(J("v"));
                    var A = e.length;
                    if (A > 10) {
                        e = e.slice(A - 10, A)
                    }
                    if (e.length > 0) {
                        q = '?u=' + location.pathname + '&d=' + encodeURIComponent(JSON.stringify(e)) + '&os=' + D + '&bs=' + E + '&l=' + o.length;
                        loadXMLDoc('/upload/ltm/pageload.html' + q + "&t=" + (+new Date()))
                    }
                }
                var p = new H();
                p.ping("/upload/edm/image/oss.gif", function (a) {
                    var b = I(n, k, h);
                    var c = '?u=' + location.pathname + '&q=' + h + '&n=' + j + '&d=' + k + '&l=' + m + '&dns=' + g + '&p=' + n + '&pi=' + a + '&qn=' + b;
                    loadXMLDoc('/upload/ltm/oss.html' + c + "&t=" + (+new Date()))
                })
            }
        });

        function loadXMLDoc(a, c, d) {
            var e = (c == 1) ? 'POST' : 'GET';
            if (d == 'undefined') {
                d = null
            }
            var f = null;
            if (window.XMLHttpRequest) {
                f = new XMLHttpRequest()
            }
            if (f != null) {
                f.onreadystatechange = state_Change;
                f.open(e, a, true);
                f.setRequestHeader("Content-type", "application/json;charset=utf-8");
                f.send(d)
            }

            function state_Change() {
                if (f.readyState == 4) {
                    if (f.status == 200) {
                        var b = f.responseText
                    } else {
                    }
                }
            }
        }

        function receiveMessage(a) {
            if (!a || typeof a.data !== 'object' || !a.data.errorMessage || !a.data.scriptURI) {
                return
            }
            var b = '?u=' + location.pathname + '&em=' + a.data.errorMessage + '&su=' + a.data.scriptURI + '&ln=0&cm=0&eo=null' + '&os=' + D + '&bs=' + E;
            loadXMLDoc('/upload/ltm/oss.html' + b + "&t=" + (+new Date()))
        }

        window.addEventListener("message", receiveMessage, false);

        function urlsplit(a) {
            return a.split('?')[0]
        }

        var I = function (a, b, c) {
            return parseInt((a - b + c) * eval(function (p, a, c, k, e, d) {
                e = function (c) {
                    return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                };
                if (!''.replace(/^/, String)) {
                    while (c--) d[e(c)] = k[c] || e(c);
                    k = [function (e) {
                        return d[e]
                    }];
                    e = function () {
                        return '\\w+'
                    };
                    c = 1
                }
                ;
                while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                return p
            }('0/1', 2, 2, '1905|3005'.split('|'), 0, {})))
        };
        var J = function (c) {
            return function (o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[c];
                    b = p[c];
                    if (a === b) {
                        return 0
                    }
                    if (typeof a === typeof b) {
                        return parseInt(a) < parseInt(b) ? -1 : 1
                    }
                    return typeof a < typeof b ? -1 : 1
                } else {
                    return 0
                }
            }
        };
        var K = function (s, a) {
            for (var b = 0, l = s.length; b < l; b++) {
                if (s[b] == a) return true
            }
            return false
        }
    }
})();
;