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
        var optionsItemValue = $(this).parent().next(),
            hitbox = $(this).find(self.hitbox),
            scale = $(this).find(self.scale),
            initialValue = 50,
            minValue = 1,
            maxValue = 100,
            initialScaleWidth = (initialValue/maxValue)*100;

            //Set the initial scale`s width
            scale.width(initialScaleWidth+'%');


        // Slider mechanics
        hitbox.slider({
            slide: function(event, ui){
                var scaleWidth = (ui.value/maxValue)*100;

                scale.width(scaleWidth+'%');
                optionsItemValue.html(ui.value);
            },
            min: minValue,
            max: maxValue,
            value: initialValue
        });

        optionsItemValue.html( hitbox.slider('value') );
    });
};

// vars
self.element = ".js-scrollbox";
self.scale = ".scale";
self.hitbox = ".hitbox";

}());
