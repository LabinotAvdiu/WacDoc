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
        this.before('<nav>' +
            '<div class="nav-wrapper">' +
            '<ul id="wysiwyg-nav">' +
            '<li><a href="sass.html">Sass</a></li>' +
            '</ul>' +
            '</div>' +
            '</nav>');

        // Title function
        function titleReplace() {
            self.on('mouseup', function () {
                var selectedText = window.getSelection().toString();
                var replace = '<h1>' + selectedText + '</h1>';
                var text = self.text();
                self.html(text.replace(selectedText, replace));
            });
        }

        // Underline function
        function underlineReplace() {
            self.on('mouseup', function () {
                var selectedText = window.getSelection().toString();
                var replace = '<span class="underline">' + selectedText + '</span>';
                var text = self.text();
                self.html(text.replace(selectedText, replace));

                $('.underline').css({'text-decoration': 'underline'})
            });
        }

        // Test
        // titleReplace(this);
    }
})(jQuery);