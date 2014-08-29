/* 
 * Set up behaviour of slider.
 */

;(function($) {

    var app = {

        initialize: function () {
            this.setUpListeners();
        },

        setUpListeners: function () {
            $( ".scrollbox" ).slider({
                range: "min",
                value: 50,
                min: 1,
                max: 100,
                slide: function( event, ui ) {
                    $( ".item__value" ).val( "$" + ui.value );
                }
            });
            $( ".item__value" ).val( "$" + $( ".item__value" ).slider( ".item__value" ) );
        }
    };

    app.initialize();

}(jQuery));


SCF = {};

$(document).ready(function() {
    // Init scrollbox
    SCF.Scrollbox.init();
});


(function() {
function Scrollbox() {
}

var klass = Scrollbox.prototype;
var self = Scrollbox;
SCF.Scrollbox = Scrollbox;

self.init = function() {
    self.bindEvents();
};

self.bindEvents = function() {
    $(self.element).each(function() {
        // Get a default value for all bars
        var scaleInitialWidth = $(this).find(self.scale).width();
        var scrollboxWidth = $(this).find(self.hitbox).width();

        // Slider mechanics
        $(this).find(self.hitbox).slider({
            slide: function(event, ui){
                var scaleWidth = ui.value;

                $(this).next(self.scale).css({
                    'width': scaleWidth
                });
            },
            max: scrollboxWidth,
            value: scaleInitialWidth
        });
    });
};

// vars
self.element = ".js-scrollbox";
self.scale = ".scale";
self.hitbox = ".hitbox";

}());
