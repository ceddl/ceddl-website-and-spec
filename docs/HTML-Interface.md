The choice for an HTML interface might sound strange given how web development has a strong preference for JavaScript. Let's have a quick look at a definition of HTML attributes by Mozilla: "Elements in HTML have attributes. These are additional values that configure the elements, add semantic value or adjust their behavior in various ways to meet the criteria the users want."

If we look at this definition we find a lot of similarities to what we aim to achieve with the ceddl technical spec. With this in mind, Using attributes have benefits that are lost in a purely JavaScript solution. By enriching your existing DOM structure with data attributes you're adding semantic meaning and behavior to your elements, which in our experience makes it easier for the analytics and development team to keep an overview on what is being tracked and decouples tracking logic from the rest of the website in a way that feels natural.

The polyfill will introduce 3 new attributes. These attributes in combination with the HTML 5 data attributes will send data into the data layer. If you have never used data-* attributes have a look at some tutorials online before you continue.

Html attributes that are used by ceddl:

* **ceddl-observe**: observes the HTML and sends structured data to the predifined data models
* **ceddl-click**: listeners for clicks and sends free format data to the events object.
* **ceddl-submit**: listeners for submits and sends free format data to the events object.

<div style="float:right">
<a href="/img/docs/attribute-position.png" target="_blank"><img id="attribute_position" src="/img/docs/attribute-position.png" alt="example attribute position"></a>
</div>

### Setting and updating data in the data layer

Where to place these attributes in the DOM? In almost all cases there is a visual element in the page that used a dataset to define the way it is displayed on a page. This would be the location to place the data attributes.

<div style="clear:both"></div>

```html
<!-- HTML user model -->
<div ceddl-observe="user"
     data-username="test@myusername.com"
     data-id="1658945649"
     data-type="consumer">
    <!-- ... -->

    <span ceddl-observe="location"
          data-longitude="36.204824"
          data-latitude="138.252924"
          data-country="Japan"
          data-state-province="tokyo">
          <!-- ... -->
    </span>
</div>
```

When a data attribute is changed or the page loads this would yield the following event and payload:

```js
CEDDL.eventbus.on('user', function (data) {
    console.log(data);
});
/* Logs:
 *   {
 *       "user": {
 *           "username": "test@myusername.com",
 *           "id": 1658945649,
 *           "location": {
 *               "longitude": 36.204824,
 *               "latitude": 138.252924,
 *               "country": "Japan",
 *                stateProvince: "tokyo"
 *           }
 *   }
 */
```

### Click Events

Without any setup, all clicks on anchor and button tags will trigger an event on the event bus with a default payload.

payload:

* **xtag**: A string identifying the exact element that was clicked using Xpath. <a href="https://www.w3.org/TR/1999/REC-xpath-19991116/">Read more</a>
* **action**: The kind of action that triggered the event, which is always 'click' for click events.
* **tag**: The tag that was clicked by the user.
* **href**: If the clicked element contains a href attribute it is added to the event payload.
* **id**: If the clicked element has an id it is added to the event payload.

Adding a click event on a tag and using a custom event namespace is possible by using the **cedd-click** attribute.

```html
<!-- HTML click with namespace and aditional data -->
<div ceddl-click="addtocart" id="176-73-black"
   data-name="Pencil words - Orange"
   data-sale="false">Home</a>
   <!-- ... -->
</div>
```

Clicking on the addtocart would yield the following event and payload:

```js
CEDDL.eventbus.on('addtocart', function (data) {
    console.log(data);
});
/* Logs:
 * {
 *     xtag:  "//*[@id="klaas"]",
 *     action: "click",
 *     tag: "div",
 *     id: "176-73-black",
 *     name: "Pencil words - Orange",
 *     sale: "false"
 * }
 */
```

### Form Submit Events

Forms on the page that submitted will be picked up by ceddl-polyfill, and in turn trigger an event on the event bus with some information about the event. Just like the click events, it is possible to give the submit a namespace using the **cedd-submit** attribute


```html
<!-- HTML click with namespace and aditional data -->
<form ceddl-submit="contactform" id="demosubmit" action="/" method="post"
   data-funnel-step="1-5-7"
   data-time-on-site="10/11">
   <!-- ... -->
   <input type="submit">
</form>
```


Enter on the form of Clicking the submit button would yield the following event and payload:

```js
CEDDL.eventbus.on('contactform', function (data) {
    console.log(data);
});
/* Logs:
    {
        "name": "submit",
        "data": {
            "xtag": "//*[@id=\"demosubmit\"]",
            "action": "submit",
            "tag": "form",
            "url": "http://ceddlbyexample.com/html-interface",
            "id": "demosubmit",
            "href": "/",
            "funnelStep": "1-5-7",
            "timeOnSite": "10/11"
        }
    }
 */
```
