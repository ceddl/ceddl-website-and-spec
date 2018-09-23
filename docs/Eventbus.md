Using a local message bus can enable you to de-couple your web application's components in a way not possible with other 'eventing' approaches. In addition, strategically adopting messaging at the 'seams' of your application (e.g. - between modules, at entry/exit points for browser data and storage) can not only help enforce better overall architectural design but also insulate you from the risks of tightly coupling your application to 3rd party libraries.

Below an example of a conversation that modules running within a webpage could be having.

<br />
<p><a href="/img/docs/eventbus-conversation.png" target="_blank"><img id="example_conversation" src="/img/docs/eventbus-conversation.png" alt="example conversation eventbus"></a></p>
<br />

Some important thing to note:

* The eventbus used is very minimalistic and performant. This resulted in a single channel - which can lead to event name collision.
* We strongly discourage publishing behavior (functions/methods) in the envelope! This is an anti-pattern when it comes to messaging. A postal envelope should be serializable and then de-serializable with no loss of fidelity.

### Subscribing to events
```js
CEDDL.eventbus.on('update', function(data) {
    console.log(data);
});

CEDDL.eventbus.once('update', function(data) {
   console.log('once', data);
});

CEDDL.eventbus.on('application:update', function(data, emitScope) {
   console.log('data', data);
   console.log('originalScope', this);
   console.log('emitScope', emitScope);
}, {scope: 'scope'});
```

### Publishing
```js
CEDDL.eventbus.emit('update', {test: 'testdata'});

CEDDL.eventbus.emit('application:update', {test: 'testdata'}, emitScope);
```

### Removing subscriptions
```js
// Create listener
CEDDL.eventbus.on('update', updateAdditions);

// Remove listener
CEDDL.eventbus.off('update', updateAdditions);
```

<div class="text-right">
<a style="display: inline-block; margin-bottom: 20px; line-height:20px;" href="/single-page-applications">Single Page Applications <i class="icon-arrow-right"></i></a>
</div>
