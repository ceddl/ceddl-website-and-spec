The core global API functions are attached to the ceddl object. These core functions are useful for low level JavaScript operations within your application.

<div id="initialize"> </div>
### ceddl.initialize()

The initialize function makes it possible to do async loading of the model definitions and initialize the html interface when ready. The initialize also clears the events and models stored allowing ceddl to be used in single page applications.


```js
ceddl.initialize();
```

<div id="emitevent"> </div>
### ceddl.emitEvent(key, data)

* ***Arguments:***
    - key [string] A name for the custom event.
    - data [object] A plain javascript object.

A call to emitEvent will add the event to the event store and process the event onto the eventbus. If you have a large number of different events on a page, the convention is to use colons to namespace them: "poll:start", or "change:selection".

* ***Example:***
```js
ceddl.emitEvent('poll:start', {
   url: window.location.href,
   trigger: 'shipping view more than 5s'
});
```

<div id="emitmodel"> </div>
### ceddl.emitModel(key, data)

* ***Arguments:***
    - key [string] A key of a root data model.
    - data [object] A plain javascript object structured according the ceddl model.

A call to emitModel will perform the following sequance:

* Validate the data input against the a root model definitions.
* Store the data in the model store.
* Send main event on the eventbus.
* Recursively moves through the delta to publish the smallest changes under a specific eventName. The dot "page.title" will be used as a namespace separator.

* ***Example:***
```js
ceddl.emitModel('funnel', {
   category: 'single_sign_on',
   name: 'register',
   stepName: password set,
   step: 2
});
```
* ***Note:***
In many cases where this function used the [html interface](html-interface) will give you a more maintanable / testable solution.

<div id="getevents"> </div>
### ceddl.getEvents()

* ***Returns:*** A deep clone of the array containing the events.

This function will return the current state of the event store.

<div id="getmodels"> </div>
### ceddl.getModels()

* ***Returns:*** A deep clone of the js data objects in the models.

This function will return the current state of the model store.

<div id="eventbus"> </div>
### ceddl.eventbus.on(name, callback, scope)

Bind a callback function to an object. The callback will be invoked whenever the event is fired.

* ***Example:***
```js
ceddl.eventbus.on('page_metadata', function(data) {
    console.log(data);
});
```

### ceddl.eventbus.once(name, callback, scope)

Just like on, but causes the bound callback to fire only once before being removed. Handy for saying "the next time that X happens, do this".

* ***Example:***
```js
ceddl.eventbus.once('page', function(data) {
   console.log(data);
});
```

### ceddl.eventbus.off(name, callback, scope)

Remove a previously-bound callback function from an object. If no context is specified, all of the versions of the callback with different contexts will be removed. If no callback is specified, all callbacks for the event will be removed.

* ***Example:***
```js
ceddl.eventbus.on('update', updateAdditions);
ceddl.eventbus.off('update', updateAdditions);
```

### ceddl.eventbus.emit(name, *args)

Trigger callbacks for the given event. Subsequent arguments to trigger will be passed along to the event callbacks. This function is usefull for comunication between injected tags of from a tag back to the application modules.

* ***Example:***
```js
ceddl.eventbus.emit('chatservice:open', {test: 'testdata'});
```

<div id="modelfactory"> </div>
### ceddl.modelFactory.fields

There are currently 5 supported field types that allow you to describe a json data structure.

* StringField
* BooleanField
* NumberField
* ModelField
* ListField

### ceddl.modelFactory.create(modelArgs)

Create a new model so that the html inteface can be created and for validating incomming data against. Details on data models can be found [here](data-models).

* ***Arguments:***
    - modelArgs [object]

ModelField and ListField allow for the creation of nested data structures and require foreignModel to be set.

* ***Example:***
```js
ceddl.modelFactory.create({
    key: 'trainingDetails',
    extends: 'user', // We are extending the user model.
    root: true, // Root of a data structure.
    fields: { // fields definitions.
        trainingType: { // field name
            type: ceddl.modelFactory.fields.StringField, // Field type.
            pattern: '^(business|consumer)$', // forcing business or consumer.
            required: true // Is a manditory field to be a valid model.
        },
        trainingGroup: { // field name.
            type: ceddl.modelFactory.fields.Model, //  Field type.
            foreignModel: 'usergroup' // Reference to the key of the sub model.
        }
    }
});
```


