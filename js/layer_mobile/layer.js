/*! layer mobile-v2.0 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */ ;
! function(a) { "use strict"; var b = document,
        c = "querySelectorAll",
        d = "getElementsByClassName",
        e = function(a) { return b[c](a) },
        f = { type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: "scale" },
        g = { extend: function(a) { var b = JSON.parse(JSON.stringify(f)); for (var c in a) b[c] = a[c]; return b }, timer: {}, end: {} };
    g.touch = function(a, b) { a.addEventListener("click", function(a) { b.call(this, a) }, !1) }; var h = 0,
        i = ["layui-m-layer"],
        j = function(a) { var b = this;
            b.config = g.extend(a), b.view() };
    j.prototype.view = function() { var a = this,
            c = a.config,
            f = b.createElement("div");
        a.id = f.id = i[0] + h, f.setAttribute("class", i[0] + " " + i[0] + (c.type || 0)), f.setAttribute("index", h); var g = function() { var a = "object" == typeof c.title; return c.title ? '<h3 style="' + (a ? c.title[1] : "") + '">' + (a ? c.title[0] : c.title) + "</h3>" : "" }(),
            j = function() { "string" == typeof c.btn && (c.btn = [c.btn]); var a, b = (c.btn || []).length; return 0 !== b && c.btn ? (a = '<span yes type="1">' + c.btn[0] + "</span>", 2 === b && (a = '<span no type="0">' + c.btn[1] + "</span>" + a), '<div class="layui-m-layerbtn">' + a + "</div>") : "" }(); if (c.fixed || (c.top = c.hasOwnProperty("top") ? c.top : 100, c.style = c.style || "", c.style += " top:" + (b.body.scrollTop + c.top) + "px"), 2 === c.type && (c.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (c.content || "") + "</p>"), c.skin && (c.anim = "up"), "msg" === c.skin && (c.shade = !1), f.innerHTML = (c.shade ? "<div " + ("string" == typeof c.shade ? 'style="' + c.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (c.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (c.skin ? "layui-m-layer-" + c.skin + " " : "") + (c.className ? c.className : "") + " " + (c.anim ? "layui-m-anim-" + c.anim : "") + '" ' + (c.style ? 'style="' + c.style + '"' : "") + ">" + g + '<div class="layui-m-layercont">' + c.content + "</div>" + j + "</div></div></div>", !c.type || 2 === c.type) { var k = b[d](i[0] + c.type),
                l = k.length;
            l >= 1 && layer.close(k[0].getAttribute("index")) }
        document.body.appendChild(f); var m = a.elem = e("#" + a.id)[0];
        c.success && c.success(m), a.index = h++, a.action(c, m) }, j.prototype.action = function(a, b) { var c = this;
        a.time && (g.timer[c.index] = setTimeout(function() { layer.close(c.index) }, 1e3 * a.time)); var e = function() { var b = this.getAttribute("type");
            0 == b ? (a.no && a.no(), layer.close(c.index)) : a.yes ? a.yes(c.index) : layer.close(c.index) }; if (a.btn)
            for (var f = b[d]("layui-m-layerbtn")[0].children, h = f.length, i = 0; h > i; i++) g.touch(f[i], e); if (a.shade && a.shadeClose) { var j = b[d]("layui-m-layershade")[0];
            g.touch(j, function() { layer.close(c.index, a.end) }) }
        a.end && (g.end[c.index] = a.end) }, a.layer = { v: "2.0", index: h, open: function(a) { var b = new j(a || {}); return b.index }, close: function(a) { var c = e("#" + i[0] + a)[0];
            c && (c.innerHTML = "", b.body.removeChild(c), clearTimeout(g.timer[a]), delete g.timer[a], "function" == typeof g.end[a] && g.end[a](), delete g.end[a]) }, closeAll: function() { for (var a = b[d](i[0]), c = 0, e = a.length; e > c; c++) layer.close(0 | a[0].getAttribute("index")) } }, "function" == typeof define ? define(function() { return layer }) : function() { var a = document.scripts,
            c = a[a.length - 1],
            d = c.src,
            e = d.substring(0, d.lastIndexOf("/") + 1);
        c.getAttribute("merge") || document.head.appendChild(function() { var a = b.createElement("link"); return a.href = e + "need/layer.css?2.0", a.type = "text/css", a.rel = "styleSheet", a.id = "layermcss", a }()) }() }(window);