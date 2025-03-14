!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], e)
      : e((t.WHATWGFetch = {}));
})(this, function (t) {
  'use strict';
  var e = 'URLSearchParams' in self,
    r = 'Symbol' in self && 'iterator' in Symbol,
    o =
      'FileReader' in self &&
      'Blob' in self &&
      (function () {
        try {
          return new Blob(), !0;
        } catch (t) {
          return !1;
        }
      })(),
    n = 'FormData' in self,
    i = 'ArrayBuffer' in self;
  if (i)
    var s = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]'
      ],
      a =
        ArrayBuffer.isView ||
        function (t) {
          return t && s.indexOf(Object.prototype.toString.call(t)) > -1;
        };
  function h(t) {
    if (
      ('string' != typeof t && (t = String(t)),
      /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))
    )
      throw new TypeError('Invalid character in header field name');
    return t.toLowerCase();
  }
  function u(t) {
    return 'string' != typeof t && (t = String(t)), t;
  }
  function f(t) {
    var e = {
      next: function () {
        var e = t.shift();
        return { done: void 0 === e, value: e };
      }
    };
    return (
      r &&
        (e[Symbol.iterator] = function () {
          return e;
        }),
      e
    );
  }
  function d(t) {
    (this.map = {}),
      t instanceof d
        ? t.forEach(function (t, e) {
            this.append(e, t);
          }, this)
        : Array.isArray(t)
          ? t.forEach(function (t) {
              this.append(t[0], t[1]);
            }, this)
          : t &&
            Object.getOwnPropertyNames(t).forEach(function (e) {
              this.append(e, t[e]);
            }, this);
  }
  function c(t) {
    if (t.bodyUsed) return Promise.reject(new TypeError('Already read'));
    t.bodyUsed = !0;
  }
  function p(t) {
    return new Promise(function (e, r) {
      (t.onload = function () {
        e(t.result);
      }),
        (t.onerror = function () {
          r(t.error);
        });
    });
  }
  function y(t) {
    var e = new FileReader(),
      r = p(e);
    return e.readAsArrayBuffer(t), r;
  }
  function l(t) {
    if (t.slice) return t.slice(0);
    var e = new Uint8Array(t.byteLength);
    return e.set(new Uint8Array(t)), e.buffer;
  }
  function b() {
    return (
      (this.bodyUsed = !1),
      (this._initBody = function (t) {
        var r;
        (this._bodyInit = t),
          t
            ? 'string' == typeof t
              ? (this._bodyText = t)
              : o && Blob.prototype.isPrototypeOf(t)
                ? (this._bodyBlob = t)
                : n && FormData.prototype.isPrototypeOf(t)
                  ? (this._bodyFormData = t)
                  : e && URLSearchParams.prototype.isPrototypeOf(t)
                    ? (this._bodyText = t.toString())
                    : i && o && (r = t) && DataView.prototype.isPrototypeOf(r)
                      ? ((this._bodyArrayBuffer = l(t.buffer)),
                        (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                      : i && (ArrayBuffer.prototype.isPrototypeOf(t) || a(t))
                        ? (this._bodyArrayBuffer = l(t))
                        : (this._bodyText = t =
                            Object.prototype.toString.call(t))
            : (this._bodyText = ''),
          this.headers.get('content-type') ||
            ('string' == typeof t
              ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
              : this._bodyBlob && this._bodyBlob.type
                ? this.headers.set('content-type', this._bodyBlob.type)
                : e &&
                  URLSearchParams.prototype.isPrototypeOf(t) &&
                  this.headers.set(
                    'content-type',
                    'application/x-www-form-urlencoded;charset=UTF-8'
                  ));
      }),
      o &&
        ((this.blob = function () {
          var t = c(this);
          if (t) return t;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error('could not read FormData body as blob');
          return Promise.resolve(new Blob([this._bodyText]));
        }),
        (this.arrayBuffer = function () {
          return this._bodyArrayBuffer
            ? c(this) || Promise.resolve(this._bodyArrayBuffer)
            : this.blob().then(y);
        })),
      (this.text = function () {
        var t,
          e,
          r,
          o = c(this);
        if (o) return o;
        if (this._bodyBlob)
          return (
            (t = this._bodyBlob),
            (e = new FileReader()),
            (r = p(e)),
            e.readAsText(t),
            r
          );
        if (this._bodyArrayBuffer)
          return Promise.resolve(
            (function (t) {
              for (
                var e = new Uint8Array(t), r = new Array(e.length), o = 0;
                o < e.length;
                o++
              )
                r[o] = String.fromCharCode(e[o]);
              return r.join('');
            })(this._bodyArrayBuffer)
          );
        if (this._bodyFormData)
          throw new Error('could not read FormData body as text');
        return Promise.resolve(this._bodyText);
      }),
      n &&
        (this.formData = function () {
          return this.text().then(v);
        }),
      (this.json = function () {
        return this.text().then(JSON.parse);
      }),
      this
    );
  }
  (d.prototype.append = function (t, e) {
    (t = h(t)), (e = u(e));
    var r = this.map[t];
    this.map[t] = r ? r + ', ' + e : e;
  }),
    (d.prototype.delete = function (t) {
      delete this.map[h(t)];
    }),
    (d.prototype.get = function (t) {
      return (t = h(t)), this.has(t) ? this.map[t] : null;
    }),
    (d.prototype.has = function (t) {
      return this.map.hasOwnProperty(h(t));
    }),
    (d.prototype.set = function (t, e) {
      this.map[h(t)] = u(e);
    }),
    (d.prototype.forEach = function (t, e) {
      for (var r in this.map)
        this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this);
    }),
    (d.prototype.keys = function () {
      var t = [];
      return (
        this.forEach(function (e, r) {
          t.push(r);
        }),
        f(t)
      );
    }),
    (d.prototype.values = function () {
      var t = [];
      return (
        this.forEach(function (e) {
          t.push(e);
        }),
        f(t)
      );
    }),
    (d.prototype.entries = function () {
      var t = [];
      return (
        this.forEach(function (e, r) {
          t.push([r, e]);
        }),
        f(t)
      );
    }),
    r && (d.prototype[Symbol.iterator] = d.prototype.entries);
  var m = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
  function w(t, e) {
    var r,
      o,
      n = (e = e || {}).body;
    if (t instanceof w) {
      if (t.bodyUsed) throw new TypeError('Already read');
      (this.url = t.url),
        (this.credentials = t.credentials),
        e.headers || (this.headers = new d(t.headers)),
        (this.method = t.method),
        (this.mode = t.mode),
        (this.signal = t.signal),
        n || null == t._bodyInit || ((n = t._bodyInit), (t.bodyUsed = !0));
    } else this.url = String(t);
    if (
      ((this.credentials = e.credentials || this.credentials || 'same-origin'),
      (!e.headers && this.headers) || (this.headers = new d(e.headers)),
      (this.method =
        ((r = e.method || this.method || 'GET'),
        (o = r.toUpperCase()),
        m.indexOf(o) > -1 ? o : r)),
      (this.mode = e.mode || this.mode || null),
      (this.signal = e.signal || this.signal),
      (this.referrer = null),
      ('GET' === this.method || 'HEAD' === this.method) && n)
    )
      throw new TypeError('Body not allowed for GET or HEAD requests');
    this._initBody(n);
  }
  function v(t) {
    var e = new FormData();
    return (
      t
        .trim()
        .split('&')
        .forEach(function (t) {
          if (t) {
            var r = t.split('='),
              o = r.shift().replace(/\+/g, ' '),
              n = r.join('=').replace(/\+/g, ' ');
            e.append(decodeURIComponent(o), decodeURIComponent(n));
          }
        }),
      e
    );
  }
  function E(t, e) {
    e || (e = {}),
      (this.type = 'default'),
      (this.status = void 0 === e.status ? 200 : e.status),
      (this.ok = this.status >= 200 && this.status < 300),
      (this.statusText = 'statusText' in e ? e.statusText : 'OK'),
      (this.headers = new d(e.headers)),
      (this.url = e.url || ''),
      this._initBody(t);
  }
  (w.prototype.clone = function () {
    return new w(this, { body: this._bodyInit });
  }),
    b.call(w.prototype),
    b.call(E.prototype),
    (E.prototype.clone = function () {
      return new E(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new d(this.headers),
        url: this.url
      });
    }),
    (E.error = function () {
      var t = new E(null, { status: 0, statusText: '' });
      return (t.type = 'error'), t;
    });
  var A = [301, 302, 303, 307, 308];
  (E.redirect = function (t, e) {
    if (-1 === A.indexOf(e)) throw new RangeError('Invalid status code');
    return new E(null, { status: e, headers: { location: t } });
  }),
    (t.DOMException = self.DOMException);
  try {
    new t.DOMException();
  } catch (e) {
    (t.DOMException = function (t, e) {
      (this.message = t), (this.name = e);
      var r = Error(t);
      this.stack = r.stack;
    }),
      (t.DOMException.prototype = Object.create(Error.prototype)),
      (t.DOMException.prototype.constructor = t.DOMException);
  }
  function _(e, r) {
    return new Promise(function (n, i) {
      var s = new w(e, r);
      if (s.signal && s.signal.aborted)
        return i(new t.DOMException('Aborted', 'AbortError'));
      var a = new XMLHttpRequest();
      function h() {
        a.abort();
      }
      (a.onload = function () {
        var t,
          e,
          r = {
            status: a.status,
            statusText: a.statusText,
            headers:
              ((t = a.getAllResponseHeaders() || ''),
              (e = new d()),
              t
                .replace(/\r?\n[\t ]+/g, ' ')
                .split(/\r?\n/)
                .forEach(function (t) {
                  var r = t.split(':'),
                    o = r.shift().trim();
                  if (o) {
                    var n = r.join(':').trim();
                    e.append(o, n);
                  }
                }),
              e)
          };
        r.url =
          'responseURL' in a ? a.responseURL : r.headers.get('X-Request-URL');
        var o = 'response' in a ? a.response : a.responseText;
        n(new E(o, r));
      }),
        (a.onerror = function () {
          i(new TypeError('Network request failed'));
        }),
        (a.ontimeout = function () {
          i(new TypeError('Network request failed'));
        }),
        (a.onabort = function () {
          i(new t.DOMException('Aborted', 'AbortError'));
        }),
        a.open(s.method, s.url, !0),
        'include' === s.credentials
          ? (a.withCredentials = !0)
          : 'omit' === s.credentials && (a.withCredentials = !1),
        'responseType' in a && o && (a.responseType = 'blob'),
        s.headers.forEach(function (t, e) {
          a.setRequestHeader(e, t);
        }),
        s.signal &&
          (s.signal.addEventListener('abort', h),
          (a.onreadystatechange = function () {
            4 === a.readyState && s.signal.removeEventListener('abort', h);
          })),
        a.send(void 0 === s._bodyInit ? null : s._bodyInit);
    });
  }
  (_.polyfill = !0),
    self.fetch ||
      ((self.fetch = _),
      (self.Headers = d),
      (self.Request = w),
      (self.Response = E)),
    (t.Headers = d),
    (t.Request = w),
    (t.Response = E),
    (t.fetch = _),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
