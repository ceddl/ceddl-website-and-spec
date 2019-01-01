
### What is CEDDL-polyfill?

Customer Experience Digital Data Layer polyfill provides a way for surfacing data for web analytics, website personalization, and DMP implementations.

Set analytics data into templating engine / mvc framework and it will do the job. CEDDL-polyfill is designed from the ground up to be implemented in the browser. This means the data layer implementation will remain independent of vendors and will not enforce specific data structures. Analytics and personalization functionality will reference a standard data structure improving maintainability and quality, yield savings in terms of time and money.

The current state of the polyfill is to incubate on ideas, assist in writing a technical specification. Wondering what a polyfill is? <a href="https://www.w3.org/2001/tag/doc/polyfills/">Read more here</a>.
<br /><br />


> Note:
>
> This guide currently assumes intermediate level knowledge of Web analytics, HTML, and JavaScript. If you are totally new to Web analytics development, it might not be the best idea to start at ceddl-polyfill as your first step - grasp the basics concepts used to send data to an analytics backend service, then come back!.

### Getting Started

The easiest way to try out ceddl-polyfill is using the <a href="https://codepen.io/broekema/pen/PdgQqv?editors=1010#0">Hello World</a> example on codepen. Feel free to open it in another tab and follow along as we go through some basic examples. Or, you can create an index.html file that includes the polyfill:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ceddl hello world</title>
  <script src="https://unpkg.com/@ceddl/ceddl-polyfill/dist/index.min.js"></script>
</head>
<body ceddl-observe="page" data-framework="vanilla">
  <pre id="result" />
  <script>
        ceddl.modelFactory.create({
            key: 'page',
            root: true,
            fields: {
                framework: {
                    type: ceddl.modelFactory.fields.StringField
                }
            }
        });

        ceddl.initialize();

        ceddl.eventbus.on('page', function(pageData) {
            var string = JSON.stringify(pageData, null, 4);
            document.querySelector('#result').innerHTML = string;
        });
  </script>
</body>
</html>
```

We have already created our very first Implementation! The steps we took to get data in the datalayer are:

1. Define a model with fields.
2. Add (data-*)attributes to the HTML.
3. Call initialize.
4. Listen to events on the eventbus.

### The "dynamic" in dynamic Data Layer.

Attributes are bound to the datalayer resulting in direct updates as soon as they are changed. Let's add a new modal that will a count of clicks on a button.

```js
ceddl.modelFactory.create({
    key: 'button',
    root: true,
    fields: {
        clicks: {
            type: ceddl.modelFactory.fields.NumberField
        }
    }
});
```

Now we add a button to the page that will update the (data-*)attributes when clicked.

```html
<button ceddl-observe="button" data-clicks="0"
      onclick="this.setAttribute('data-clicks', Number(this.getAttribute('data-clicks')) + 1);">
click here
</button>
```

Let's update the listener namespace to `ceddl:models` so that we get the full datalayer in the event callback

```js
ceddl.eventbus.on('ceddl:models', function(pageData) {
  ...
});
```
You now have the <a href="https://codepen.io/broekema/pen/yxrvJV?editors=1010#0">dymanic hello world</a>.

### Improve and monitor data quality.

You may have noted we need to define the data structure the site will produce. Just like defining a table in a database. It will validate the data stream and report errors to the console and on the eventbus. This improves testing your analytics suite and allows monitoring of errors on live systems.

Let's add a new required field called frameworkVersion to the page model and restrict the data entered.

```js
    frameworkVersion: {
      type: ceddl.modelFactory.fields.StringField,
      required: true,
      pattern: '^(0\.9\.[1-9]|1)$',
    }
```

> Note:
>
> The page modal is no longer available now and a warning is displayed in the console. `ceddl:warn page.frameworkVersion: Required field frameworkVersion not set`

Add the data attribute to the page and make sure that the data-framework-version is set according to the regex pattern.

### Click Events

Events Allow more free data flow. There is no data model or validation involved. Add the `ceddl-click` atribute to the button with a value of `myclick`

```HTML
  <button ceddl-click="myclick"
          data-clicks="0"
          id="myclick"
          onclick="this.setAttribute('data-clicks', Number(this.getAttribute('data-clicks')) + 1);">
   click here
  </button>
```

To listen for the click event we can listen to all the events with namespace `ceddl:events` or listen to the single event named `myclick`

```js
ceddl.eventbus.on('myclick', function(pageData) {
  ...
});
```

You now have the <a href="https://codepen.io/broekema/pen/qMwxew?editors=1010#0">hello world Events example</a>

### Ready for More?
We’ve briefly introduced the most basic features of CEDDL-polyfill. The rest of this guide will cover them and other features with finer details, so make sure to read through it all!

<div class="text-right">
<a style="display: inline-block; margin-bottom: 20px; line-height:20px;" href="/data-models">Data Models <i class="icon-arrow-right"></i></a>
</div>
