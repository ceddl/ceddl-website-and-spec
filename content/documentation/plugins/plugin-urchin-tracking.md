---
author: Roland Broekema
title: UTM tracking plugin
date: 2022-09-18
description: "UTM tracking is a method of tracking remote links to see what campaigns are and aren't working."
keywords: [documentation, plugins]
segment: in-depth
---

UTM or Urchin Tracking Module is a method to measure which campaigns and links are and aren't working. Unique codes at
the end of URL(links) contain parameters that let you accurately determine the origin, the impact of your campaigns and
see which marketing initiatives are gaining traction.

Government and web standards organizations are under pressure to do more for consumer privacy To this end, the
HTTP referrer property and possibly these UTM properties can be blocked. This plugin for Ceddl-polyfill allows you to
change the prefix of the parameters if needed. We also advise using link shorteners.

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