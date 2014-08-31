;(function($) {

    var app = {
        borderRadiusItem : $('.js-border-radius'),
        borderSizeItem : $('.js-border-size'),
        buttonTextItem: $('.js-button-text>input'),
        resultButton : $('.result__button'),
        codeHtmlResult: $('.code__html'),
        codeCssResult: $('.code__css'),
        form: $('form'),
        app : this,

        initialize: function () {
            app.setUpSlider({element: app.borderRadiusItem,callback: app.changeBorderRadius, minValue: 0, maxValue: 50, initialValue: 0});
            app.setUpSlider({element: app.borderSizeItem, callback: app.changeBorderSize,  minValue: 1, maxValue: 50, initialValue: 0});
            app.setUpListeners();
            app.updateCssCodeResult();
            app.updateHtmlCodeResult();
        },

        setUpListeners: function() {   
            app.buttonTextItem.change(app.changeButtonText);
            app.form.on('submit', app.submitForm);
            app.form.on('keydown', 'input', app.removeError);
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
            app.updateHtmlCodeResult(); 
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


        updateHtmlCodeResult: function () {
            var outerHtml = '<div class="result__button">'+ app.resultButton.html() + '</div>';
            app.codeHtmlResult.text(outerHtml);
        },

        submitForm: function (e) {
            e.preventDefault();

            var submitButton = app.form.find('button[type="submit"]');
            var emailField = app.form.find('.email');

            if( app.validateForm(app.form) === false) {return false;}
            submitButton.attr('disabled', 'disabled');

            var str = app.form.serialize();

            $.ajax({
                url: 'php/contact_form/contact_process.php',
                type: 'POST',
                data: str
            })
            .done(function(msg) {
                if(msg === 'OK') {
                    var result = '<div class="alert alert-success">Success, bro:) Check your mailbox. The code should be there.</div>';

                    submitButton.parents('.row').remove();
                    emailField.parents('.row').remove();
                    app.form.append(result); 
                }
                else {
                    emailField.after(msg);
                }
            })
            .always(function() {
                submitButton.removeAttr('disabled');
            });
                
        },

        validateForm: function (form) {
            var inputs = form.find('input'),
                valid = true;

            inputs.tooltip('destroy');

            $.each(inputs, function(index, val) {
                var input = $(val),
                    value = input.val(),
                    name = input.attr('name'),
                    textError = 'Enter ' + name +', bro:)';

                if(value.length === 0) {
                    input.tooltip({
                        trigger: 'manual',
                        placement: 'bottom',
                        title: textError
                    }).tooltip('show');
                    valid = false;
                }
 
             });

            return valid;
        },

        removeError: function () {
            $(this).tooltip('destroy');

            var alert = $('.alert-danger');

            if(alert) {
                alert.remove();
            }
        }

    };

    app.initialize();

}(jQuery));

