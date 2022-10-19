---
author: Roland Broekema
title: Performance timing plugin
date: 2022-09-18
description: "The performance timing plugin gathers metrics regarding document navigation."
keywords: [documentation, plugins]
segment: in-depth
---

This plugin gathers metrics regarding document navigation. For example, this interface can be used to determine how much
time it took to load the page for a group of users/device types.

```js
import {ceddl} from '@ceddl/ceddl-polyfill';
import {PerformanceTiming} from '@ceddl/ceddl-aditional-inputs/dist/performance-timing';

PerformanceTiming.run(ceddl);

ceddl.eventbus.on('performanceTiming', function (data) {
  console.log(data);
});

// "performanceTiming": {
//     "redirecting": 2
//     "dnsconnect": 18
//     "request": 2
//     "response": 5
//     "domprocessing": 525
//     "load": 50
//     "transferbytes": 366533
//     "transferrequests": 37
// }
```