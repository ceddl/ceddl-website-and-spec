---
author: Roland Broekema
title: Page metadata plugin
date: 2022-09-18
description: "Page metadata plugin that collects primary browser & page information."
keywords: [documentation, plugins]
segment: in-depth
---

This plugin collects primary browser & page information. The resulting set is often combined with other events to do
segmentation.

```js
import {ceddl} from '@ceddl/ceddl-polyfill';
import {PageMetadata} from '@ceddl/ceddl-aditional-inputs/dist/page-metadata';

PageMetadata.run(ceddl);

ceddl.eventbus.on('pageMetadata', function (data) {
  console.log(data);
});

// "pageMetadata": {
// "url": "http://localhost:8080/?foo=true#bar"
// "path": "/"
// "referrer": ""
// "title": "CEDDL-polyfill - Bridging the gap between the spec and the browsers"
// "url_section": []
// "cookie": true
// "touch": false
// "device_pixel_ratio": 1
// "resolution": "1920x1080"
// "width": 1920
// "height": 1080
// "query_string": "?foo=true"
// "hash": "#bar"
// }
```