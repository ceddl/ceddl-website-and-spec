A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.

When pages views are controlled by a javascript router, content is loaded via AJAX or the site handles multi-step forms within a single page the polyfill will by default only recognize the single containing page. Depending on the type of page and the intentions you can Decide to either generate in-page events to which tags can be linked (e.g. “User Viewed a Video”) or generate virtual-pageviews as if the page was actually reloaded.

If you are using a router framework in your application we advise to implement virtual-pageviews. frontend frameworks emit events or have a callback function on route change. On page change tell the datalayer to initialize.

```js
// Clean datalayer in re-initialize on page change (virtual-pageview).
ceddl.initialize();
```

There are many single page application frameworks out there. No standard exists on how pagechanges are handled. Look at the documentation of the framework you are using to find out how to detect a page change.

A example with [backbone](https://backbonejs.org/#Router) router
```js
router.on("route", (page) => {
    // Clean datalayer in re-initialize on page change (virtual-pageview).
    ceddl.initialize();
});
```

* [Director](https://github.com/flatiron/director) router [example](https://github.com/ceddl/ceddl-with-vue/blob/master/src/js/routes.js)
* [Angular](https://angular.io/guide/router) event [example](https://github.com/ceddl/ceddl-with-angular/blob/master/src/app/app.component.ts)

With virtual-pageviews there should be no need to change web analytics, tag management code. The initialize / virtual pageview will do the following.

* Clear the data in the datalayer including history of events.
* Restart collecting data from the DOM. Filling the datalayer.
* Emit events on the eventbus as if the browser window was reloaded.
