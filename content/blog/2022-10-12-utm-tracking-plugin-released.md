---
draft: false
author: Roland Broekema
title: UTM plugin released.
date: 2022-10-19
description : "UTM (Urchin Tracking Module) is a method to measure which campaigns and links are and aren't working."
image: "/img/utm-link-tracking.png"
author: "Roland Broekema"
keywords: [blog, news]
segment: general
myType: Coding
---

UTM stands for Urchin tracking parameters. The Urchin company added little pieces of data to our URLs to see where
traffic originates from. Introduced way back in 1995, Somewhere along the way, this technique became the industry
default for tracking links and campaigns across online networks. No official standard exists, but most analytics tools,
marketing apps, marketing automation tools, and CRMs look for these parameters. There are five main parameters.
***Medium, Source, Campaign, Content and Term***

{{< rawhtml >}}
<p><img src="/img/utm-link-tracking.png" alt="Urchin tracking parameter illustration"></p>
{{< /rawhtml >}}

Organizations are under pressure to do more for consumer privacy. To this end, the HTTP classic referrer property and,
lately, these UTM properties are removed navigating between web pages. When asked what my strategy is for dealing with
these changes. My answer, focus on what you control. URL structure is definitely in your control and a core web
technology. Not going anywhere soon.

### Running the plugin.

```js 
import {ceddl} from '@ceddl/ceddl-polyfill';
import {UrchinTracking} from '@ceddl/ceddl-aditional-inputs/dist/urchin-tracking';

UrchinTracking.run(ceddl, {
  prefix: 'utm',
  removeOnLoad: true
});
ceddl.eventbus.on('hurchinTracking', function (data) {
  console.log(data);
});

// "urchinTracking": {
//   "source": "hubspot"
//   "medium": "email"
//   "campaign": "main"
//   "content": "A123"
//   "term": "main"
// }
```

### Making UTM parameters reliable

A long link can be confusing to your audience or look messy. Even for the initiated, seeing a long coded URL can take
them out of the flow. You can combat this by creating branded links. This displays a much shorter URL to users,
rather than a long string of words and numbers. It visually appealing and often customizable. Many businesses host a
open source open shortener like [Kutt.it](https://kutt.it/) or [shlink](https://shlink.io/). But even if you do not have
the opportunity to host your own services like bitly or lnnkin are valid option.

```
https://www.ceddlbyexample.com/?utm_source=site&utm_medium=blog&utm_campaign=main&utm_content=a01
-->
https://lnnk.in/bMgc
```