---
author: Roland Broekema
title: Page ready plugin
date: 2022-09-18
description: "The page ready plugin collects multiple events and then signals one time when the page is ready. For
example, waiting on the user page authentication or products displayed."
keywords: [documentation, plugins]
segment: in-depth
---
This plugin collects multiple events and then signals one time when the page is ready. For example, waiting on the user
page authentication or products displayed.

```html

<body data-page-ready="pageMetadata user products"></body>
```

```js
import {ceddl} from '@ceddl/ceddl-polyfill';
import {PageReady} from '@ceddl/ceddl-aditional-inputs/dist/page-ready';

PageReady.run(ceddl);

ceddl.eventbus.on('pageready', function (data) {
  console.log(data);
});
```