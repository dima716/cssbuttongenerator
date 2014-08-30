;(function($) {

    var app = {
        borderRadiusItem : $('.js-border-radius'),
        borderSizeItem : $('.js-border-size'),
        buttonTextItem: $('.js-button-text>input'),
        resultButton : $('.result__button'),
        codeHtmlResult: $('.code__html'),
        codeCssResult: $('.code__css'),
        app : this,

        initialize: function () {
            app.setUpSlider({element: app.borderRadiusItem,callback: app.changeBorderRadius, minValue: 0, maxValue: 50, initialValue: 0});
            app.setUpSlider({element: app.borderSizeItem, callback: app.changeBorderSize,  minValue: 1, maxValue: 50, initialValue: 0});
            app.setUpListeners();
        },

        setUpListeners: function() {   
            app.buttonTextItem.change(app.changeButtonText);
        },

        setUpSlider: function (options) {

            var element = options.element,
                elementValue =  element.next(),
                hitbox = element.find('.hitbox'),
                scale = hitbox.next('.scale'),
                initialScaleWidth = (options.initialValue/options.maxValue)*100;

            //Set the initial scale`s width
            scale.width(initialScaleWidth+'%');

            // Slider mechanics
            hitbox.slider({
                slide: function(event, ui){
                    var scaleWidth = (ui.value/options.maxValue)*100;

                    scale.width(scaleWidth+'%');
                    elementValue.html(ui.value);
                    options.callback();
                },
                min: options.minValue,
                max: options.maxValue,
                value: options.initialValue
            });

            elementValue.html( hitbox.slider('value') );
        },

        changeBorderRadius: function () {
            var newRadius = app.borderRadiusItem.next().html();

            app.resultButton.css({
                'border-radius' : parseInt(newRadius)
            });

            app.updateCssCodeResult();
        },

        changeBorderSize: function () {
            var newSize = app.borderSizeItem.next().html();

            app.resultButton.css({
                'border-width' : parseInt(newSize)
            });

            app.updateCssCodeResult();
        },

        changeButtonText: function () {
            var newText = app.buttonTextItem.val();
            app.resultButton.html(newText);
            app.updateHtmlCodeResult(newText); 
        },

        updateCssCodeResult: function () {
            var borderRadius = app.resultButton.css('border-radius'),
                border = app.resultButton.css('border-width');

            app.codeCssResult.text(
                '.result__button {' + '\n' +
                '\tborder-width: ' + border + ';\n' +
                '\t-moz-border-radius: ' + borderRadius + ';\n' +
                '\t-webkit-border-radius: ' + borderRadius + ';\n' +
                '\tborder-radius: ' + borderRadius + ';\n' +
                '}'
            );
        },


        updateHtmlCodeResult: function (buttonTextValue) {
            var html = '<div class="result__button">'+ buttonTextValue + '</div>';
            app.codeHtmlResult.text(html);
        }

    };

    app.initialize();

}(jQuery));

