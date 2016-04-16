(function ($) {
    $.fn.wacDocWysiwyg = function (options) {

        /*
         // Default Parameters
         var defaultParameters =
         {

         },
         parameters = $.extend(defaultParameters, options);
         */

        /* TODO : Toolbar generation */

        var self = this;

        // Sets current element contentEditable to true
        this[0].contentEditable = true;

        // Removes default contentEditable css
        this.focus(function () {
            $(this).css({
                outline: 'none'
            })
        });

        // Toolbar generation
        var tools = {
            title: {icon: 'title', function: titleReplace},
            underline: {icon: 'format_underlined', function: underlineReplace}
        };

        function GenerateToolbar() {
            this.create = function () {
                self.before('<nav>' +
                    '<div class="nav-wrapper">' +
                    '<ul id="wysiwyg-nav">' +
                    '</ul>' +
                    '</div>' +
                    '</nav>');

                $.each(tools, function (key, val) {
                    $('#wysiwyg-nav').append('<a id="' + key + '"><i class="material-icons">' + val.icon + '</i></a>');
                    $('#' + key).on('click', val.function);
                });
            };
            this.create();
        }
        new GenerateToolbar();

        var text = this.text(),
            selectedText = '';

        // Get selected text
        this.on('mouseup', function () {
            selectedText = window.getSelection().toString();
        });

        // Title function
        function titleReplace() {
            if (selectedText !== '') {
                var replace = '<h1>' + selectedText + '</h1>';
                text = text.replace(selectedText, replace);
                self.html(text);
                selectedText = '';
            }
        }

        // Underline function
        function underlineReplace() {
            if (selectedText !== '') {
                var replace = '<span class="underline">' + selectedText + '</span>';
                text = text.replace(selectedText, replace);
                self.html(text);
                selectedText = '';

                $('.underline').css({'text-decoration': 'underline'});
            }
        }

        // Test
        // titleReplace(this);
    }
})(jQuery);