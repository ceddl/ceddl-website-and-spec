---
author: Roland Broekema
title: Heatmap plugin
date: 2022-09-18
description: "heat map is a data visualization technique showing where user groups click, scroll, and move on the page."
keywords: [documentation, plugins]
segment: in-depth
image: "/img/heatmap.png"
---

A heat map is a data visualization technique showing where user groups click, scroll, and move on the page.

```js
import {ceddl} from '@ceddl/ceddl-polyfill';
import {Heatmap} from '@ceddl/ceddl-aditional-inputs/dist/heatmap';

Heatmap.run(ceddl);

ceddl.eventbus.on('heatmap:update', function (data) {
  console.log(data);
});
```

{{< rawhtml >}}
<p><img src="/img/heatmap.png" alt="ceddl stickers image"></p>
{{< /rawhtml >}}