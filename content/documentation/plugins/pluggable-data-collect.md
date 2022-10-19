---
author: Roland Broekema
title: Pluggable Data Collection
date: 2022-09-19
description: "have a pluggable ceddl data collect solutions at an arm's length."
keywords: [documentation, plugins]
segment: in-depth
---

The additional input repository for Ceddl-polyfill contains plugins. You will find solutions to common data acquisition
requirements. Allowing businesses to take back control of their analytics and marketing data footprint. Do not hesitate
to provide us with an excellent input solution of your
own at [ceddl-aditional-inputs git repository](https://github.com/ceddl/ceddl-aditional-inputs).

```html
<!--Using html script tags-->
<script src="/node_modules/@ceddl/ceddl-polyfill/dist/index.js"></script>
<script src="/node_modules/@ceddl/ceddl-aditional-inputs/dist/page-metadata.js"></script>
<script src="/node_modules/@ceddl/ceddl-aditional-inputs/dist/performance-timing.js"></script>
<script src="/node_modules/@ceddl/ceddl-aditional-inputs/dist/page-ready.js"></script>
<script src="/node_modules/@ceddl/ceddl-aditional-inputs/dist/heatmap.js"></script>
<script src="/node_modules/@ceddl/ceddl-aditional-inputs/dist/urchin-tracking.js"></script>
```

```js
/** Using Javascript or typescript imports */
import {ceddl} from '@ceddl/ceddl-polyfill';
import {PageMetadata} from '@ceddl/ceddl-aditional-inputs/dist/page-metadata';
import {PageReady} from '@ceddl/ceddl-aditional-inputs/dist/page-ready';
import {Heatmap} from '@ceddl/ceddl-aditional-inputs/dist/heatmap';
import {PerformanceTiming} from '@ceddl/ceddl-aditional-inputs/dist/performance-timing';
import {UrchinTracking} from '@ceddl/ceddl-aditional-inputs/dist/urchin-tracking';


PageReady.run(ceddl);
PageMetadata.run(ceddl);
Heatmap.run(ceddl);
PerformanceTiming.run(ceddl);
UrchinTracking.run(ceddl);
```

