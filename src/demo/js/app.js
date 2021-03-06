var demo = demo? demo : {};

(function() {

    var Jview = new JsonViewer(document.getElementById('json-container'));

    function setListeners() {
        document.querySelector('.js-clear-cart').addEventListener('click', function() {
            demo.cart.clearCart();
        }, false);
    }

    var rendering = false;
    function renderdataObject(){
        if (!rendering) {
            rendering = true;
            setTimeout(function(){
                var allData = ceddl.getModels();
                allData.events = ceddl.getEvents();
                Jview.set(allData);
                rendering = false;
            }, 150);
        }
    }

    function bindDataObject() {

        ceddl.eventbus.on('ceddl:models', function(data) {
            renderdataObject();
        });

        ceddl.eventbus.on('ceddl:events', function(data) {
            renderdataObject();
        });

    }


    function init() {
        bindDataObject();
        demo.products.renderRandomProduct();
        demo.products.renderRandomProduct();
        demo.products.renderRandomProduct();
        demo.cart.renderCart();
        setListeners();
    }

    init();

})();





