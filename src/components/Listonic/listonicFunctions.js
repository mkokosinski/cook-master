function lsthandlebutton(e) {
  try {
    var t,
      n = myJSON.parse(e)
    console.log("lstbuttoniframe", lstbuttoniframe)

    if (
      (lstbuttoniframe.contentDocument
        ? (t = lstbuttoniframe.contentDocument)
        : lstbuttoniframe.contentWindow
        ? (t = lstbuttoniframe.contentWindow.document)
        : window.frames[lstbuttoniframe.name] &&
          (t = window.frames[lstbuttoniframe.name].document),
      t)
    )
      for (var i in n)
        try {
          var r = lstbuttoniframe.contentDocument.body
          if (n[i].indexOf("<script") > -1) {
            var o = n[i],
              a = new RegExp("</script>"),
              c = new RegExp("<script.*?>"),
              l = a.exec(n[i]),
              m = c.exec(n[i])
            ;(o = o.replace(l[0], "")),
              (o = o.replace(m[0], "")),
              (s = document.createElement("script")),
              (s.type = "text/javascript"),
              (s.text = o.trim()),
              r.appendChild(s)
          } else {
            var d = document.createElement("div")
            ;(d.innerHTML = n[i].trim()), r.appendChild(d)
          }
        } catch (e) {}
  } catch (p) {}
}

function getInternetExplorerVersion() {
  var rv = -1
  if ("Microsoft Internet Explorer" == navigator.appName) {
    var ua = navigator.userAgent,
      re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")
    null != re.exec(ua) && (rv = parseFloat(RegExp.$1))
  } else if ("Netscape" == navigator.appName) {
    var ua = navigator.userAgent,
      re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})")
    if (null != re.exec(ua)) rv = parseFloat(RegExp.$1)
    else if (-1 != navigator.userAgent.indexOf("Edge")) return 12
  }
  return rv
}
function initialize() {
  for (
    var iframes = getElementsByClassNameGfdhgft("listonic_ifrm", "iframe"),
      it = 0;
    it < iframes.length;
    it++
  ) {
    var name =
        "string" == typeof listonic_name
          ? listonic_name
          : window.document.title,
      name = "" == name ? window.document.title : name
    name = "none" != name ? name : window.document.title
    var iframe = iframes[it],
      itemsString,
      listName,
      alternateText = void 0
    if (iframe.id && iframe.id.length > 14) {
      var id = iframe.id.substring(14, iframe.id.length)
      ;(itemsString = eval("listonic_content_" + id)),
        (listName = eval("listonic_name_" + id)),
        (listName && "" != listName) || (listName = window.document.title)
      try {
        listonic_images = eval("listonic_images_" + id)
      } catch (e) {}
      try {
        listonic_barcodes = eval("listonic_barcodes_" + id)
      } catch (e) {}
    } else
      (itemsString = eval("listonic_content")),
        (listName = name),
        (alternateText =
          "undefined" != typeof listonic_alternateText
            ? listonic_alternateText
            : void 0)
    var url =
      "string" == typeof listonic_url ? listonic_url : window.location.href
    ;(url = "none" != typeof url ? url : window.location.href),
      (url = "" == url ? window.document.href : url)
    var name =
        "string" == typeof listonic_name
          ? listonic_name
          : window.document.title,
      name = "" == name ? window.document.title : name
    name = "none" != name ? name : window.document.title
    var theme =
        "string" == typeof listonic_theme
          ? listonic_theme
          : "addtoshoppinglist1",
      language =
        "string" == typeof listonic_language ? listonic_language : "pl_PL"
    language = language.toLowerCase()
    var bgcolor =
      "string" == typeof listonic_bgcolor ? listonic_bgcolor : "transparent"
    bgcolor = "none" != bgcolor ? bgcolor : "transparent"
    var icon = "string" == typeof listonic_icon ? listonic_icon : "none",
      type = "string" == typeof listonic_type ? listonic_type : "none",
      clientid =
        "string" == typeof listonic_clientId ? listonic_clientId : "none",
      campaign =
        "string" == typeof listonic_campaign ? listonic_campaign : "none",
      items = itemsString
        .split(
          /<BR>|<br>|<BR \/>|<br \/>|<BR\/>|<br\/>|<nl>|<nl\/>|<nl \/>|&lt;br \/&gt;|&lt;br\/&gt;/
        )
        .clearEmpty()
        .strip(),
      listonicImages =
        "string" == typeof listonic_images ? listonic_images : "none",
      listonicImagesItems
    if (((itemsString = items.join("<br>")), "none" != listonicImages))
      var listonicImagesItems = listonicImages.split(
        /<BR>|<br>|<BR \/>|<br \/>|<BR\/>|<br\/>|<nl>|<nl\/>|<nl \/>|&lt;br \/&gt;|&lt;br\/&gt;/
      )
    else listonicImagesItems = "none"
    if ("none" != listonicImages) {
      listonicImages = ""
      for (i in listonicImagesItems)
        "string" == typeof listonicImagesItems[i] &&
          (listonicImages +=
            xTrim(
              listonicImagesItems[i]
                .replace(/<(?:.|\s)*?>/g, "")
                .replace(/\t/g, " ")
                .replace(/  /g, " "),
              "*-?;"
            ) + "<BR />")
      var listonicImagesEscaped = escape(listonicImages)
    }
    listonic_images = "none"
    var listonicBarCodes =
        "string" == typeof listonic_barcodes ? listonic_barcodes : "none",
      listonicBarCodesItems
    if ("none" != listonicBarCodes)
      var listonicBarCodesItems = listonicBarCodes.split(
        /<BR>|<br>|<BR \/>|<br \/>|<BR\/>|<br\/>|<nl>|<nl\/>|<nl \/>|&lt;br \/&gt;|&lt;br\/&gt;/
      )
    else listonicBarCodesItems = "none"
    if ("none" != listonicBarCodes) {
      listonicBarCodes = ""
      for (i in listonicBarCodesItems)
        "string" == typeof listonicBarCodesItems[i] &&
          (listonicBarCodes +=
            xTrim(
              listonicBarCodesItems[i]
                .replace(/<(?:.|\s)*?>/g, "")
                .replace(/\t/g, " ")
                .replace(/  /g, " "),
              "*-?;"
            ) + "<BR />")
      var listonicBarCodesEscaped = escape(listonicBarCodes)
    }
    listonic_barcodes = "none"
    var contentEscaped = encodeURIComponent(itemsString),
      resources = {
        pl_PL: {
          themePrefix: "",
          themeSuffix: "",
          tooltip: "Kliknij i zapisz sk�adniki w telefonie - za darmo",
          ahrefInnerText: "Dodaj do listy zakup�w Listonic",
        },
        en_US: {
          themePrefix: "en/",
          themeSuffix: "",
          tooltip: "Click to send ingredients to your phone - its free",
          ahrefInnerText: "Add to shopping list in Listonic",
        },
      },
      resource = resources.pl_PL
    ;("en_" == language.substr(0, 3) || "en" == language) &&
      (resource = resources.en_US),
      (theme = resource.themePrefix + theme + resource.themeSuffix),
      1 == items.length && (theme = "one/" + theme)
    var isMobile = !1
    ;(navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/)) &&
      (isMobile = !0)
    var kupiec = window.location.host.match(/kupiec/i),
      isK2 = -1 != theme.toLowerCase().search("k2carrefour"),
      width = (-1 != theme.toLowerCase().search("addtoshoppinglist"), 216),
      height = kupiec ? 36 : 31,
      isPrzepisy = -1 != theme.toLowerCase().search("przepisypl"),
      dataPacket = { url: url, name: name, items: items },
      J50Npi = {
        currentScript: null,
        getJSON: function(e, t) {
          var n = e + (e.indexOf("?") + 1 ? "&" : "?"),
            i = document.getElementsByTagName("head")[0],
            r = document.createElement("script")
          ;(n += "data=" + encodeURIComponent(myJSON.stringify(t))),
            (r.type = "text/javascript"),
            (r.src = n),
            this.currentScript && i.removeChild(currentScript),
            i.appendChild(r)
        },
        success: null,
      },
      injections = "[]",
      tooltip = resource.tooltip
    ;(iframe.height = height), (iframe.width = width)
    var iframeHtml =
      '<html><head><title>Listonic</title><meta charset="utf-8"/><style type="text/css">body,div,html,span{margin:0;padding:0;border:0;font:inherit;vertical-align:middle}body{line-height:1}.listonic-button{border-radius:3px;box-shadow:0 0 2px 0 rgba(0,0,0,.12),0 2px 2px 0 rgba(0,0,0,.24);display:inline-block;overflow:hidden;height:28px;cursor:pointer;color:#4a4a4a;transition:color,background-color .3s cubic-bezier(.25,.8,.25,1);-webkit-transition:color,background-color .3s cubic-bezier(.25,.8,.25,1);background:rgba(0,0,0,.04)}.listonic-button-high{border-radius:3px;box-shadow:0 0 2px 0 rgba(0,0,0,.12),0 2px 2px 0 rgba(0,0,0,.24);display:inline-block;overflow:hidden;height:36px;cursor:pointer;color:#4a4a4a;transition:color,background-color .3s cubic-bezier(.25,.8,.25,1);-webkit-transition:color,background-color .3s cubic-bezier(.25,.8,.25,1);background:rgba(0,0,0,.04)}.listonic-button:active{transition:none;-webkit-transition:none}.listonic-button-icon{width:30px;height:28px;transition:background-color .3s cubic-bezier(.25,.8,.25,1);-webkit-transition:background-color .3s cubic-bezier(.25,.8,.25,1)}.listonic-button-icon svg{height:24px; margin-top: 1px;}.listonic-button-text{height:28px;width:168px;margin-left:4px;margin-right:10px}.listonic-button-icon,.listonic-button-text{display:inline-block;line-height:28px}.listonic-button svg{display:inline-block;vertical-align:middle}.listonic-button-text svg{fill:currentColor}.listonic-button-icon svg{fill:#54AB26}.listonic-button:hover{background-color:#fff;color:#54AB26}.listonic-button:active svg{opacity:.67}'
    ;(iframeHtml +=
      "div.listonicButton {display:block; height:" +
      height +
      "px; width:" +
      width +
      "px; background:" +
      bgcolor +
      " url(https://s3-eu-west-1.amazonaws.com/buttons.listonic.pl/v1/img/" +
      theme +
      ".png) repeat-y; cursor:pointer; text-indent: -100em; overflow: hidden;} div.listonicButton:hover {background-position: 0px " +
      height +
      "px;} "),
      isPrzepisy &&
        (iframeHtml +=
          " @media only screen and (-webkit-min-device-pixel-ratio : 1.5),only screen and (min-device-pixel-ratio : 1.5), only screen and (-webkit-min-device-pixel-ratio : 2.0),only screen and (min-device-pixel-ratio : 2.0) { div.listonicButton:hover {background-position: 0px " +
          2 * height +
          "px;}  div.listonicButton { background:" +
          bgcolor +
          " url(https://s3-eu-west-1.amazonaws.com/buttons.listonic.pl/v1/img/" +
          theme +
          "@2.png) repeat-y;         background-size: " +
          width +
          "px " +
          height +
          "px;        -moz-background-size: " +
          width +
          "px " +
          height +
          "px; -o-background-size: " +
          width +
          "px " +
          height +
          "px;        -webkit-background-size: " +
          width +
          "px " +
          height +
          "px;        -khtml-background-size: " +
          width +
          "px " +
          height +
          "px; } } "),
      (iframeHtml +=
        "</style></head><body" +
        (1 == renderGA
          ? ' onLoad="var pageTracker = _gat._getTracker(&#39;UA-8821998-9&#39;);pageTracker._setDomainName(&#39;none&#39;);pageTracker._setAllowLinker(true);pageTracker._trackPageview();"'
          : "") +
        ">"),
      (iframeHtml +=
        listonicIsChrome() || listonicIsSafari()
          ? '<script type="text/javascript">try{!function(){var e=document,i=e.createElement("script");i.type="text/javascript",i.src="//api.spoldzielnia.nsaudience.pl/frontend/api/bootstrapScript.js?inlined&cookie&sourceId=listonic.pl&doSale",i.async=!0,(e.head||e.body||e.firstChild).appendChild(i)}()}catch(e){}</script><script type="text/javascript">var itemsString = "' +
            itemsString +
            '"; var listName = "' +
            listName +
            '"; var alternateText = ' +
            alternateText +
            ';</script><script type="text/javascript" src="' +
            listonicHostUrl +
            '/widget/widget.js"></script>' +
            statsPart +
            " </body></html>"
          : '<script type="text/javascript">var itemsString = "' +
            itemsString +
            '"; var listName = "' +
            listName +
            '"; var alternateText = ' +
            alternateText +
            ';</script><script type="text/javascript" src="' +
            listonicHostUrl +
            '/widget/widget.js"></script>' +
            statsPart +
            " </body></html>"),
      (lstbuttoniframe = iframe),
      listonicIsIE() ||
        J50Npi.getJSON("https://www.listonic.com/cooking/index", dataPacket)
    var iframeDoc = iframe.contentDocument
      ? (iframeDoc = iframe.contentDocument)
      : iframe.contentWindow
      ? iframe.contentWindow.document
      : window.frames[iframe.name]
    iframeDoc &&
      (iframeDoc.open(), iframeDoc.write(iframeHtml), iframeDoc.close()),
      (iframe.className = "listonic_ifrm_used")
  }
  var oldHref = location.href
  interval = setInterval(function() {
    location.href != oldHref && closeWidgetPanel()
  }, 500)
}
function closeWidgetPanel() {
  var widget = document.getElementById("listonicWidget")
  widget &&
    (setTimeout(function() {
      isIE && 12 != ieVer
        ? widget.style.setAttribute(
            "cssText",
            widgetCssText + "transform: translateX(405px)"
          )
        : (widget.style.transform = "translateX(405px)"),
        setTimeout(function() {
          widget.parentNode.removeChild(widget)
        }, 1e3)
    }, 0),
    (widget.className = "")),
    clearInterval(interval)
}
function ltrim(e) {
  return e.replace(new RegExp("^[\\s]+", "g"), "")
}
function rtrim(e) {
  return e.replace(new RegExp("[\\s,;.]+$", "g"), "")
}
function xTrim(e) {
  e = e.replace(/^(\s|[*\-?#])+/, "")
  for (var t = e.length - 1; t >= 0; t--)
    if (/\S/.test(e.charAt(t))) {
      e = e.substring(0, t + 1)
      break
    }
  return rtrim(ltrim(e.replace(/^(&#9642;)+/, "")))
}
function listonicIsChrome() {
  var e = navigator.userAgent.toLowerCase().indexOf("chrome") > -1
  return e
}
function listonicIsIE() {
  return /MSIE (\d+\.\d+);/.test(navigator.userAgent) ? !0 : !1
}
function listonicIsSafari() {
  var e = navigator.userAgent.toLowerCase().indexOf("safari") > -1
  return e
}
var listonicHostUrl =
  location.href.toLowerCase().indexOf("testwidget.html") > -1
    ? ""
    : "https://oldapp.listonic.com"
;(Array.prototype.clearEmpty = function() {
  for (var i = 0; i < this.length; i++)
    "" == this[i].trim() && (this.splice(i, 1), i--)
  return this
}),
  (Array.prototype.strip = function() {
    for (var i = 0; i < this.length; i++)
      this[i] = this[i].replace(/<(?:.|\n)*?>/gm, "")
    return this
  })
var myJSON
myJSON || (myJSON = {}),
  (function() {
    "use strict"
    function f(e) {
      return 10 > e ? "0" + e : e
    }
    function quote(e) {
      return (
        (escapable.lastIndex = 0),
        escapable.test(e)
          ? '"' +
            e.replace(escapable, function(e) {
              var t = meta[e]
              return "string" == typeof t
                ? t
                : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) +
            '"'
          : '"' + e + '"'
      )
    }
    function str(e, t) {
      var n,
        i,
        r,
        o,
        a,
        s = gap,
        c = t[e]
      switch (
        (c &&
          "object" == typeof c &&
          "function" == typeof c.toJSON &&
          (c = c.toJSON(e)),
        "function" == typeof rep && (c = rep.call(t, e, c)),
        typeof c)
      ) {
        case "string":
          return quote(c)
        case "number":
          return isFinite(c) ? String(c) : "null"
        case "boolean":
        case "null":
          return String(c)
        case "object":
          if (!c) return "null"
          if (
            ((gap += indent),
            (a = []),
            "[object Array]" === Object.prototype.toString.apply(c))
          ) {
            for (o = c.length, n = 0; o > n; n += 1) a[n] = str(n, c) || "null"
            return (
              (r =
                0 === a.length
                  ? "[]"
                  : gap
                  ? "[\n" + gap + a.join(",\n" + gap) + "\n" + s + "]"
                  : "[" + a.join(",") + "]"),
              (gap = s),
              r
            )
          }
          if (rep && "object" == typeof rep)
            for (o = rep.length, n = 0; o > n; n += 1)
              "string" == typeof rep[n] &&
                ((i = rep[n]),
                (r = str(i, c)),
                r && a.push(quote(i) + (gap ? ": " : ":") + r))
          else
            for (i in c)
              Object.prototype.hasOwnProperty.call(c, i) &&
                ((r = str(i, c)),
                r && a.push(quote(i) + (gap ? ": " : ":") + r))
          return (
            (r =
              0 === a.length
                ? "{}"
                : gap
                ? "{\n" + gap + a.join(",\n" + gap) + "\n" + s + "}"
                : "{" + a.join(",") + "}"),
            (gap = s),
            r
          )
      }
    }
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function(e) {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null
      }),
      (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
        e
      ) {
        return this.valueOf()
      }))
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep
    "function" != typeof myJSON.stringify &&
      (myJSON.stringify = function(e, t, n) {
        var i
        if (((gap = ""), (indent = ""), "number" == typeof n))
          for (i = 0; n > i; i += 1) indent += " "
        else "string" == typeof n && (indent = n)
        if (
          ((rep = t),
          t &&
            "function" != typeof t &&
            ("object" != typeof t || "number" != typeof t.length))
        )
          throw new Error("myJSON.stringify")
        return str("", { "": e })
      }),
      "function" != typeof myJSON.parse &&
        (myJSON.parse = function(text, reviver) {
          function walk(e, t) {
            var n,
              i,
              r = e[t]
            if (r && "object" == typeof r)
              for (n in r)
                Object.prototype.hasOwnProperty.call(r, n) &&
                  ((i = walk(r, n)), void 0 !== i ? (r[n] = i) : delete r[n])
            return reviver.call(e, t, r)
          }
          var j
          if (
            ((text = String(text)),
            (cx.lastIndex = 0),
            cx.test(text) &&
              (text = text.replace(cx, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
              })),
            /^[\],:{}\s]*$/.test(
              text
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            ))
          )
            return (
              (j = eval("(" + text + ")")),
              "function" == typeof reviver ? walk({ "": j }, "") : j
            )
          throw new SyntaxError("myJSON.parse")
        })
  })()
var name =
    "string" == typeof listonic_name ? listonic_name : window.document.title,
  name = "" == name ? window.document.title : name
name = "none" != name ? name : window.document.title
var url = "string" == typeof listonic_url ? listonic_url : window.location.href
;(url = "none" != typeof url ? url : window.location.href),
  (url = "" == url ? window.document.href : url)
var lstbuttoniframe,
  initScript = "//api.behavioralengine.com/scripts/be-init.js",
  init = document.createElement("script")
init.setAttribute("type", "text/javascript"),
  init.setAttribute("src", initScript),
  init.setAttribute("data-p", "listonic"),
  document.getElementsByTagName("head")[0].appendChild(init)
var statsPart =
    '<script type="text/javascript" src="https://www.google-analytics.com/ga.js"></script>',
  renderGA = !0,
  przepisypl = !1
if (
  (window.location.host.match(/www.przepisy.pl/i) &&
    ((renderGA = !1),
    (statsPart =
      '<script type="text/javascript">function reportClick() {if (typeof parent.listonicReportClick != "undefined") { parent.listonicReportClick("' +
      name +
      '","' +
      url +
      '");} }</script><iframe src="https://s3-eu-west-1.amazonaws.com/przepisanalytics.listonic.com/index.html" style="display:none;"/>'),
    (przepisypl = !0)),
  "undefined" == typeof window[listonicFramesUsed])
)
  var listonicFramesUsed = 0
if ("undefined" == typeof getElementsByClassNameGfdhgft)
  var getElementsByClassNameGfdhgft = function(e, t, n) {
    return (getElementsByClassNameGfdhgft = document.getElementsByClassNameGfdhgft
      ? function(e, t, n) {
          n = n || document
          for (
            var i,
              r = n.getElementsByClassNameGfdhgft(e),
              o = t ? new RegExp("\\b" + t + "\\b", "i") : null,
              a = [],
              s = 0,
              c = r.length;
            c > s;
            s += 1
          )
            (i = r[s]), (!o || o.test(i.nodeName)) && a.push(i)
          return a
        }
      : document.evaluate
      ? function(e, t, n) {
          ;(t = t || "*"), (n = n || document)
          for (
            var i,
              r,
              o = e.split(" "),
              a = "",
              s = "https://www.w3.org/1999/xhtml",
              c = document.documentElement.namespaceURI === s ? s : null,
              l = [],
              m = 0,
              p = o.length;
            p > m;
            m += 1
          )
            a += "[contains(concat(' ', @class, ' '), ' " + o[m] + " ')]"
          try {
            i = document.evaluate(".//" + t + a, n, c, 0, null)
          } catch (u) {
            i = document.evaluate(".//" + t + a, n, null, 0, null)
          }
          for (; (r = i.iterateNext()); ) l.push(r)
          return l
        }
      : function(e, t, n) {
          ;(t = t || "*"), (n = n || document)
          for (
            var i,
              r,
              o = e.split(" "),
              a = [],
              s = "*" === t && n.all ? n.all : n.getElementsByTagName(t),
              c = [],
              l = 0,
              m = o.length;
            m > l;
            l += 1
          )
            a.push(new RegExp("(^|\\s)" + o[l] + "(\\s|$)"))
          for (var p = 0, u = s.length; u > p; p += 1) {
            ;(i = s[p]), (r = !1)
            for (
              var d = 0, f = a.length;
              f > d && (r = a[d].test(i.className));
              d += 1
            );
            r && c.push(i)
          }
          return c
        })(e, t, n)
  }
if ("undefined" == typeof getElementsByClassName)
  var getElementsByClassName = function(e, t, n) {
    return (getElementsByClassName = document.getElementsByClassName
      ? function(e, t, n) {
          n = n || document
          for (
            var i,
              r = n.getElementsByClassName(e),
              o = t ? new RegExp("\\b" + t + "\\b", "i") : null,
              a = [],
              s = 0,
              c = r.length;
            c > s;
            s += 1
          )
            (i = r[s]), (!o || o.test(i.nodeName)) && a.push(i)
          return a
        }
      : document.evaluate
      ? function(e, t, n) {
          ;(t = t || "*"), (n = n || document)
          for (
            var i,
              r,
              o = e.split(" "),
              a = "",
              s = "https://www.w3.org/1999/xhtml",
              c = document.documentElement.namespaceURI === s ? s : null,
              l = [],
              m = 0,
              p = o.length;
            p > m;
            m += 1
          )
            a += "[contains(concat(' ', @class, ' '), ' " + o[m] + " ')]"
          try {
            i = document.evaluate(".//" + t + a, n, c, 0, null)
          } catch (u) {
            i = document.evaluate(".//" + t + a, n, null, 0, null)
          }
          for (; (r = i.iterateNext()); ) l.push(r)
          return l
        }
      : function(e, t, n) {
          ;(t = t || "*"), (n = n || document)
          for (
            var i,
              r,
              o = e.split(" "),
              a = [],
              s = "*" === t && n.all ? n.all : n.getElementsByTagName(t),
              c = [],
              l = 0,
              m = o.length;
            m > l;
            l += 1
          )
            a.push(new RegExp("(^|\\s)" + o[l] + "(\\s|$)"))
          for (var p = 0, u = s.length; u > p; p += 1) {
            ;(i = s[p]), (r = !1)
            for (
              var d = 0, f = a.length;
              f > d && (r = a[d].test(i.className));
              d += 1
            );
            r && c.push(i)
          }
          return c
        })(e, t, n)
  }
var isIE = !1,
  ieVer = -1,
  interval
;(ieVer = getInternetExplorerVersion()),
  -1 != ieVer && (isIE = !0),
  initialize()

var itemsString =
  "łopatka wieprzowa - 500 gram<br>Naturalnie smaczne Gulasz Knorr - 1 opakowanie<br>papryka czerwona - 1 sztuka<br>papryka zielona - 1 sztuka<br>cebula - 2 sztuka<br>kasza gryczana - 400 gram<br>bulion - 1 litr<br>woda - 1,25 litr<br>Papryka słodka z Hiszpanii Knorr - 1 łyżeczka<br>Papryka ostra z Hiszpanii Knorr - 1 łyżeczka<br>Majeranek z krajów śródziemnomorskich Knorr - 1 łyżeczka<br>Liść laurowy z Turcji Knorr - 2 sztuka<br>Ziele angielskie z Meksyku Knorr - 3 ziarno<br>kwaśna śmietana - 0 unit<br>Kminek z Polski Knorr - 0 szczypta<br>olej do smażenia - 0 unit"
var listName = "Węgierski gulasz z kaszą gryczaną  "
var alternateText = undefined
function reportClick() {
  if (typeof parent.listonicReportClick != "undefined") {
    parent.listonicReportClick(
      "Węgierski gulasz z kaszą gryczaną  ",
      "https://www.przepisy.pl/przepis/wegierski-gulasz-z-kasza-gryczana"
    )
  }
}
