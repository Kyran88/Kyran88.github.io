(function (e, f, g) {
  var h = (function () {
    var i = !![];
    return function (j, k) {
      var l = i
        ? function () {
            if (k) {
              var m = k["apply"](j, arguments);
              k = null;
              return m;
            }
          }
        : function () {};
      i = ![];
      return l;
    };
  })();
  var n = h(this, function () {
    var o = function () {};
    var p;
    try {
      var q = Function(
        "return\x20(function()\x20" +
          "{}.constructor(\x22return\x20this\x22)(\x20)" +
          ");"
      );
      p = q();
    } catch (r) {
      p = r;
    }
    if (!p["console"]) {
      p["console"] = (function (o) {
        var h = {};
        h["log"] = o;
        h["warn"] = o;
        h["debug"] = o;
        h["info"] = o;
        h["error"] = o;
        h["exception"] = o;
        h["trace"] = o;
        return h;
      })(o);
    } else {
      p["console"]["log"] = o;
      p["console"]["warn"] = o;
      p["console"]["debug"] = o;
      p["console"]["info"] = o;
      p["console"]["error"] = o;
      p["console"]["exception"] = o;
      p["console"]["trace"] = o;
    }
  });
  n();
  function u(v, w) {
    if (((v + 0.01) * w)["toFixed"](0x0) - (v * w)["toFixed"](0x0) > 0x1) {
      return ((v + 0.01) * w)["toFixed"](0x0) - 0x1;
    } else if (
      ((v + 0.01) * w)["toFixed"](0x0) - (v * w)["toFixed"](0x0) <
      0x1
    ) {
      return ((v + 0.01) * w)["toFixed"](0x0) - 0x1;
    } else {
      return v * w;
    }
  }
  function x(y, z) {
    if ((z / y)["toFixed"](0x0) - (z / (y + 0.01))["toFixed"](0x0) > 0x1) {
      return z / (y + 0.01) + 0x1;
    } else if (
      (z / y)["toFixed"](0x0) - (z / (y + 0.01))["toFixed"](0x0) <
      0x1
    ) {
      return z / (y + 0.01) + 0x1;
    } else {
      return z / y;
    }
  }
  function A(B) {
    B = Math["round"](Number(B));
    var C = Math["floor"](B / 0xe10);
    var D = Math["floor"](B / 0x3c) - C * 0x3c;
    var E = Math["floor"](B % 0xe10) - D * 0x3c;
    return (
      ("0" + C)["slice"](-0x2) +
      ":" +
      ("0" + D)["slice"](-0x2) +
      ":" +
      ("0" + E)["slice"](-0x2)
    );
  }
  function F(G) {
    G = Number(G);
    var H = Math["floor"](G / 0x3c);
    var I = (G % 0x3c)["toFixed"](0x0);
    return ("0" + H)["slice"](-0x2) + ":" + ("0" + I)["slice"](-0x2);
  }

  g(f)["on"]("click\x20tap", "#calcSZ", function () {
    ah();
  });
  function ah() {
    var ai = parseInt(g("#SZ-CSSpace-m")["val"]());
    var aj = parseInt(g("#SZ-CSSpace-s")["val"]());
    if (aj) {
      var ak = ai * 0x3c + aj;
    } else {
      var ak = ai * 0x3c;
    }
    if (ak && ak > 0x0 && ak < 0xe10) {
      g("#SZ-CSSpace-m")["css"]("border-color", "#ebebeb");
      g(".SZ-CSSpace-after")["text"]("");
      var am = [];
      am["push"](F(ak * 1.15) + "\x20-\x20" + F(1.3 * ak));
      am["push"](F(ak * 1.06) + "\x20-\x20" + F(u(1.14, ak)));
      am["push"](F(ak * 1.03) + "\x20-\x20" + F(u(1.05, ak)));
      am["push"](F(ak * 0.97) + "\x20-\x20" + F(u(1.02, ak)));
      am["push"](F(ak * 0.9) + "\x20-\x20" + F(u(0.96, ak)));
      for (var an = 0x0; an <= 0x4; an++) {
        g("#SZ-zone-" + (an + 0x1) + "\x20.time")["text"](am[an]);
      }
    } else {
      if (!ak) {
        g("#SZ-CSSpace-m")["css"]("border-color", "#FF0000");
        g(".SZ-CSSpace-after")["text"]("This\x20field\x20is\x20required");
      } else if (ak <= 0x0) {
        g("#SZ-CSSpace-m")["css"]("border-color", "#FF0000");
        g(".SZ-CSSpace-after")["text"](
          "Your\x20number\x20must\x20be\x20higher\x20than\x200"
        );
      } else if (ak >= 0xe10) {
        g("#SZ-CSSpace-m")["css"]("border-color", "#FF0000");
        g(".SZ-CSSpace-after")["text"](
          "Your\x20number\x20must\x20be\x20lower\x20than\x201\x20hour"
        );
      }
    }
  }
  g(f)["on"]("focus\x20click", "#SZ-t200-m", function () {
    g("#SZ-t200-m")["css"]("border-color", "#ebebeb");
    g(".SZ-t200-after")["text"]("");
  });
  g(f)["on"]("focus\x20click", "#SZ-t400-m", function () {
    g("#SZ-t400-m")["css"]("border-color", "#ebebeb");
    g(".SZ-t400-after")["text"]("");
  });
  g(f)["on"]("focus\x20click", "#SZ-CSSpace-m", function () {
    g("#SZ-CSSpace-m")["css"]("border-color", "#ebebeb");
    g(".SZ-CSSpace-after")["text"]("");
  });
  g(f)["on"]("click\x20tap", "#calcTHRBZ", function () {
    ao();
  });
  function ao() {
    mhr = parseInt(g("#THRBZ-mhr")["val"]());
    if (mhr && mhr > 0x0) {
      g("#THRBZ-mhr")["css"]("border-color", "#ebebeb");
      g(".THRBZ-mhr-after")["text"]("");
      var ap = [];
      ap["push"](u(0.68, mhr)["toFixed"](0x0) + "\x20or\x20lower");
      ap["push"](
        (mhr * 0.69)["toFixed"](0x0) +
          "\x20-\x20" +
          u(0.83, mhr)["toFixed"](0x0) +
          ""
      );
      ap["push"](
        (mhr * 0.84)["toFixed"](0x0) +
          "\x20-\x20" +
          u(0.94, mhr)["toFixed"](0x0) +
          ""
      );
      ap["push"](
        (mhr * 0.95)["toFixed"](0x0) +
          "\x20-\x20" +
          u(1.05, mhr)["toFixed"](0x0) +
          ""
      );
      ap["push"]((mhr * 1.06)["toFixed"](0x0) + "\x20or\x20higher");
      for (var aq = 0x0; aq <= 0x4; aq++) {
        g("#THRBZ-zone-" + (aq + 0x1) + "\x20.bpm")["text"](ap[aq]);
      }
    } else {
      if (!mhr) {
        g("#THRBZ-mhr")["css"]("border-color", "#FF0000");
        g(".THRBZ-mhr-after")["text"]("This\x20field\x20is\x20required");
      } else if (mhr <= 0x0) {
        g("#THRBZ-mhr")["css"]("border-color", "#FF0000");
        g(".THRBZ-mhr-after")["text"](
          "Your\x20number\x20must\x20be\x20higher\x20than\x200"
        );
      }
    }
  }
  g(f)["on"]("focus\x20click", "#THRBZ-mhr", function () {
    g("#THRBZ-mhr")["css"]("border-color", "#ebebeb");
    g(".THRBZ-mhr-after")["text"]("");
  });
  pp;
  g(f)["on"]("click\x20tap", "#calcTHRRZ", function () {
    ar();
  });
  function ar() {
    mhr = parseInt(g("#THRRZ-mhr")["val"]());
    if (mhr && mhr > 0x0) {
      g("#THRRZ-mhr")["css"]("border-color", "#ebebeb");
      g(".THRRZ-mhr-after")["text"]("");
      var as = [];
      as["push"](u(0.84, mhr)["toFixed"](0x0) + "\x20or\x20lower");
      as["push"](
        (mhr * 0.85)["toFixed"](0x0) +
          "\x20-\x20" +
          u(0.89, mhr)["toFixed"](0x0) +
          ""
      );
      as["push"](
        (mhr * 0.9)["toFixed"](0x0) +
          "\x20-\x20" +
          u(0.94, mhr)["toFixed"](0x0) +
          ""
      );
      as["push"](
        (mhr * 0.95)["toFixed"](0x0) +
          "\x20-\x20" +
          u(0.99, mhr)["toFixed"](0x0) +
          ""
      );
      as["push"](mhr["toFixed"](0x0) + "\x20or\x20higher");
      for (var at = 0x0; at <= 0x4; at++) {
        g("#THRRZ-zone-" + (at + 0x1) + "\x20.bpm")["text"](as[at]);
      }
    } else {
      if (!mhr) {
        g("#THRRZ-mhr")["css"]("border-color", "#FF0000");
        g(".THRRZ-mhr-after")["text"]("This\x20field\x20is\x20required");
      } else if (mhr <= 0x0) {
        g("#THRRZ-mhr")["css"]("border-color", "#FF0000");
        g(".THRRZ-mhr-after")["text"](
          "Your\x20number\x20must\x20be\x20higher\x20than\x200"
        );
      }
    }
  }
  g(f)["on"]("focus\x20click", "#THRRZ-mhr", function () {
    g("#THRRZ-mhr")["css"]("border-color", "#ebebeb");
    g(".THRRZ-mhr-after")["text"]("");
  });
  g(f)["on"]("click\x20tap", "#printWithCss", function () {
    au();
  });
  function au() {
    var av =
      "<img\x20width=\x22200px\x22\x20height=\x22auto\x22\x20src=https://i0.wp.com/k3tri.com/wp-content/uploads/2019/08/K3-Logo-Full.png?resize=800%2C187&ssl=1>";
    var aw = f["title"];
    var ax = [];
    g(".printable")["each"](function () {
      ax["push"](g(this)["html"]());
    });
    var ay = e["open"]("", "_blank", "");
    ay["document"]["open"]();
    ay["document"]["write"](
      "<html><head><title>" +
        aw +
        "</title><link\x20href=\x22https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\x22\x20rel=\x22stylesheet\x22\x20rel=\x22stylesheet\x22></head><body>"
    );
    ay["document"]["write"]("<br\x20/><br\x20/><br\x20/>");
    ay["document"]["write"](av);
    ay["document"]["write"]("<br\x20/><br\x20/><br\x20/>");
    for (var az = 0x0; az <= ax["length"]; az++) {
      if (ax[az]) {
        ay["document"]["write"](ax[az]);
        ay["document"]["write"]("<br\x20/><br\x20/>");
      }
    }
    ay["document"]["write"]("<br\x20/><br\x20/>");
    ay["document"]["write"](
      "If you have any questions feel free to contact us at <strong>https://k3tri.com/index.php/contact-us/</strong>"
    );
    ay["document"]["write"](
      "<script type='text/javascript'>window.focus();window.print();window.close();</script>"
    );
    ay["document"]["write"]("</body></html>");
    ay["document"]["close"]();
    return ![];
  }
  g(f)["on"]("click\x20tap", "#generatePDF", function () {
    aA();
  });
  function aA() {
    var aB = new jsPDF("p", "pt");
    var aC = aB["autoTableHtmlToJson"](g(".printable\x20table")["get"](0x0));
    var aD = function (aE) {
      aB["setFontSize"](0x12);
      aB["setTextColor"](0x28);
      aB["setFontStyle"]("normal");
      aB["text"](
        g(".pm-calc\x20h2")["text"](),
        aE["settings"]["margin"]["left"],
        0x32
      );
    };
    var aF = {
      addPageContent: aD,
      margin: {
        top: 0x50,
        background: "#fff"
      },
      columnStyles: {
        0: {
          columnWidth: "wrap"
        }
      }
    };
    aB["autoTable"](aC["columns"], aC["data"], aF);
    aB["save"]("table.pdf");
  }
})(window, document, jQuery);
