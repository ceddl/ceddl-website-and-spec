---
author: Roland Broekema
title: About Ceddl-polyfill
date: 2022-10-01
description: About the bennefits of Ceddl-polyfill
keywords: [about, creator]
segment: general
---

### Increased data quality

While software vendors do an increasingly good job at processing Big Data, some errors are not always caught gracefully
before they end up on a dashboard or report. The ability to catch data issues before they end up on a live server can be
invaluable to your business. ceddl-polyfill makes it possible to define the data structure you expect your site to
produce. Just like defining a table in a database. It will validate the data stream in the development process and
report while testing your analytics suite.

Having a unidirectional data stream means that all data in your analytics follows the same lifecycle pattern, making the
logic more predictable and easier to understand. It also encourages data normalization, so that you don't end up with
multiple, independent copies of the same data that are unaware of one another.

### Solves Timing issues

If you have some experience with web analytics you are likely to have encountered timing errors. A website loading is
not static. It loads files, content, and data depending on user input or API calls. If you look at it from this angle
you could imagine a web page as a timeline of events. Events have become a major part of ceddl. It makes it possible to
listen for data, updating your analytics as soon as data is available.

### Facilitate A/B testing and personalization

We use an EventBus that allows publish-subscribe-style communication between components without requiring the components
to explicitly register with one another (and thus be aware of each other).

### Easy data exchange between 3rd-party scripts

The EventBus enables 3rd-party scripts to communicate without a chance of creating errors while transferring the data.
The eventbus makes it possible to upgrade 3rd-party scripts interdependently.

### Cleaner code

Every marketing tool provides its own API for events and data tracking. While actually all of this marketing tags
require the same data, but in a different format, ceddl-polyfill allows to collect customer data from attributes in your
HTML or one Javascript API and send it to many tools for analytics, marketing, and data warehousing. This means that
your analytics can be operating without the need for tagging code inside every app module.

### Vendor independent with an easy migration path

Replace any third-party system to another or run A/B test between them? Vendor migration will take you no more than 5
minutes. No change on the site server is required since all data stream is done through a standardized data layer.
