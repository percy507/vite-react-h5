(window._iconfont_svg_string_3856972 =
  '<svg><symbol id="icon-phone" viewBox="0 0 1024 1024"><path d="M736 0 288 0c-52.8 0-96 43.2-96 96l0 832c0 52.8 43.2 96 96 96l448 0c52.8 0 96-43.2 96-96L832 96C832 43.2 788.8 0 736 0zM384 48l256 0 0 32L384 80 384 48zM512 960c-35.346 0-64-28.654-64-64s28.654-64 64-64 64 28.654 64 64S547.346 960 512 960zM768 768 256 768 256 128l512 0L768 768z" fill="#000000" ></path></symbol><symbol id="icon-yanzhengma" viewBox="0 0 1024 1024"><path d="M891.306667 279.04c-2.133333-37.546667-29.44-68.693333-66.133334-75.946667-47.786667-7.253333-95.146667-18.346667-141.653333-32-44.8-17.92-86.613333-41.813333-124.586667-71.253333-30.72-20.48-71.68-18.773333-100.693333 4.693333-35.84 31.146667-78.08 54.613333-123.733333 67.84-43.52 17.92-89.173333 29.44-136.106667 33.706667-37.546667 4.693333-66.133333 35.84-67.84 73.813333v238.506667c3.413333 208.64 247.893333 420.693333 383.146667 420.693333 132.693333 0 342.613333-147.626667 374.613333-416.426666 5.546667-81.493333 6.4-162.56 2.986667-243.626667z m-70.4 236.8c-29.013333 235.946667-212.053333 354.56-306.773334 354.56-40.533333 0-119.893333-38.4-192.853333-111.786667-76.373333-76.8-120.746667-164.693333-122.453333-241.066666V281.6c0.426667-4.266667 3.84-7.68 7.68-8.106667 51.626667-5.12 102.4-17.493333 150.613333-37.12 52.906667-16.213333 102.826667-43.52 144.213333-79.786666 3.413333-2.56 7.253333-3.413333 9.813334-3.413334 2.133333 0 5.12 0.426667 8.106666 2.133334 42.24 32.426667 88.746667 58.88 138.24 78.506666l2.986667 1.28 2.986667 0.853334c48.64 14.506667 98.56 26.026667 148.906666 34.133333 5.973333 1.28 9.813333 6.4 10.666667 12.373333 3.413333 77.653333 2.56 156.16-2.133333 233.386667z" fill="#4C4C4C" ></path><path d="M493.653333 637.866667c-13.226667 13.226667-34.986667 13.226667-48.213333 0l-120.746667-120.746667c-13.226667-13.226667-13.226667-34.986667 0-48.213333 13.226667-13.226667 34.986667-13.226667 48.213334 0l120.746666 120.746666c13.226667 13.226667 13.226667 34.986667 0 48.213334z" fill="#4C4C4C" ></path><path d="M699.733333 432.213333l-206.506666 206.506667c-12.8 12.8-33.706667 12.8-46.933334 0-12.8-12.8-12.8-33.706667 0-46.933333L652.8 385.28c12.8-12.8 33.706667-12.8 46.933333 0 12.8 12.8 12.8 33.706667 0 46.933333z" fill="#4C4C4C" ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg');
    if (!t) {
      var i,
        o,
        c,
        l,
        d,
        a = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (i = function () {
        var t,
          e = document.createElement('div');
        (e.innerHTML = n._iconfont_svg_string_3856972),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild ? a(e, t.firstChild) : t.appendChild(e));
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener('DOMContentLoaded', o, !1), i();
              }),
              document.addEventListener('DOMContentLoaded', o, !1))
          : document.attachEvent &&
            ((c = i),
            (l = n.document),
            (d = !1),
            r(),
            (l.onreadystatechange = function () {
              'complete' == l.readyState && ((l.onreadystatechange = null), s());
            }));
    }
    function s() {
      d || ((d = !0), c());
    }
    function r() {
      try {
        l.documentElement.doScroll('left');
      } catch (t) {
        return void setTimeout(r, 50);
      }
      s();
    }
  })(window);
