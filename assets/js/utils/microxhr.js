/**
 *  Usage ::
 *  const url = 'http://httpbin.org/post',
 *        body = JSON.stringify({foo: 'bar'}),
 *        timeout = 5000; // 5 seconds
 *
 *  new MicroXhr(url, {m:'POST', b:body, t:timeout})
 *  .then(function(xhr) {
 *      console.log(xhr.response);
 *  }).catch(function(xhr) {
 *      console.log('Failed to load: ' + xhr.status);
 *  });
 */

/*eslint-disable */
class MicroXhr {

  constructor(u, opts, x) {
    return this.rq(u, opts, x);
  }

  rq(u, opts, x) {
    x = new XMLHttpRequest;
    x.open(opts.m || 'GET', u);
    x.responseType = opts.r || '';
    x.timeout = opts.t || 0;
    Object.keys(opts.h || 0).forEach(h => x.setRequestHeader(h, opts.h[h]));

    return new Promise((y, n) => {
      x.onreadystatechange = _ => {
        x.readyState == 4 && [n, y][(!!x.response && (x.status / 200 | 0) == 1) | 0](x);
      };
      x.ontimeout = _ => n(x);
      x.send(opts.b || undefined);
    })
  }
}

/*eslint-enable */
export default MicroXhr;
