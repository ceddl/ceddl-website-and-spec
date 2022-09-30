---
author: Roland Broekema
title: Pluggable Data Collection
date: 2022-08-31
description: "have a pluggable ceddl data collect solutions at an arm's length."
keywords: [documentation, plugins]
---

Many of the inputs / data objects you need in a web datalayer are not part of the spec. But it is nice to have plug and
play inputs at an arm's length. Please do not hesitate to provide us with a great input solution of your own
at [ceddl-aditional-inputs git repository](https://github.com/ceddl/ceddl-aditional-inputs).</a>

<div>
    <a class="technology" href="https://github.com/ceddl/ceddl-aditional-inputs/blob/master/src/page-ready.js">
        <img src="/img/input-page-ready.jpg" alt="page-ready" width="175" height="110">
    </a>
    <a class="technology" href="https://github.com/ceddl/ceddl-aditional-inputs/blob/master/src/page-metadata.js">  <img src="/img/input-page-metadata.jpg" alt="page-metadata" width="175" height="110">
    </a>
    <a class="technology" href="https://github.com/ceddl/ceddl-aditional-inputs/blob/master/src/performance-timing.js">
        <img src="/img/input-performance-timing.jpg" alt="performance-timing" width="175" height="110">
    </a>
    <a class="technology" href="https://github.com/ceddl/ceddl-aditional-inputs/blob/master/src/heatmap.js">
        <img src="/img/input-heatmap.jpg" alt="heatmap" width="175" height="110">
    </a>
</div>

```js
import {ceddl} from '@ceddl/ceddl-polyfill'
import {PageMetadata} from '@ceddl/ceddl-aditional-inputs/dist/page-metadata';

PageMetadata.run(ceddl);
```
