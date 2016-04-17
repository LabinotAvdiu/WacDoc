(function ($) {
    $.fn.wacDocWysiwyg = function () {

        var self = this;

        // Sets current element contentEditable to true
        this[0].contentEditable = true;

        // Removes default contentEditable css
        this.focus(function () {
            $(this).css({
                outline: 'none'
            })
        });

        this.mousemove(function (event) {
            var target = $(event.target);
            if (target.is("a")) {
                target[0].contentEditable = false;
            }
        });

        // Adds colorpicker and file input
        this.after('<input type="color" value="#000000" id="wysiwyg-colorPicker">');
        var $colorPicker = $('#wysiwyg-colorPicker');
        $colorPicker.css({position: 'absolute', left: '1000%'});
        this.after('<input type="file" id="wysiwyg-fileInput">');
        var $fileInput = $('#wysiwyg-fileInput');
        $fileInput.hide();

        // Toolbar generation
        var tools = {
            title: {icon: 'title', function: title},
            underline: {
                icon: 'format_underlined', function: function () {
                    document.execCommand('underline');
                }
            },
            bold: {
                icon: 'format_bold', function: function () {
                    document.execCommand('bold');
                }
            },
            italic: {
                icon: 'format_italic', function: function () {
                    document.execCommand('italic');
                }
            },
            insertOrderedList: {
                icon: 'format_list_numbered', function: function () {
                    document.execCommand('insertOrderedList');
                }
            },
            insertUnorderedList: {
                icon: 'format_list_bulleted', function: function () {
                    document.execCommand('insertUnorderedList');
                    self.css({'list-style-type': 'square'});
                }
            }, photo: {
                icon: 'insert_photo', function: getImage
            },
            link: {
                icon: 'insert_link', function: getLink
            },
            fontColor: {
                icon: 'format_color_text', function: function () {
                    $colorPicker[0].click();
                    $colorPicker.on('change', function () {
                        document.execCommand('foreColor', false, this.value);
                    });
                }
            },
            undo: {
                icon: 'undo', function: function () {
                    document.execCommand('undo');
                }
            }, redo: {
                icon: 'redo', function: function () {
                    document.execCommand('redo');
                }
            }
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

        $('#wysiwyg-nav').on('mousedown', function (event) {
            event.preventDefault();
        });

        var text = this.text(),
            selectedText = '';

        // Get selected text
        this.on('mouseup', function () {
            selectedText = window.getSelection().toString();
        });

        // Title function
        function title() {
            if (selectedText !== '') {
                var replace = '<h1>' + selectedText + '</h1>';
                text = text.replace(selectedText, replace);
                self.html(text);
                selectedText = '';
            }
        }

        function getLink() {
            var tmpSelectedText = selectedText;
            self.after('<div id="link-background"><input id="wysiwyg-link" type="text" value="http://"></div>');
            $('#link-background').css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.2)',
                'z-index': 1
            }).hide().fadeIn('slow');
            $('#wysiwyg-link')[0].focus();

            $('#wysiwyg-link').css({
                position: 'absolute',
                top: '50%',
                left: '40%',
                width: '20%',
                color: '#FFF'
            });

            $('#wysiwyg-link').keypress(function (event) {
                if (event.which == 13) {
                    var link = $(this).val();
                    $('#link-background').fadeOut('slow', function () {
                        $(this).remove();
                        if (tmpSelectedText !== '') {
                            var replace = '<a href="' + link + '">' + tmpSelectedText + '</a>';
                            text = text.replace(tmpSelectedText, replace);
                            self.html(text);
                            selectedText = '';
                        }
                    });
                }
            });
        }

        function getImage() {
            $fileInput[0].click();
            $fileInput.on('change', function (e) {
                if ((/\.(png|jpeg|jpg|gif)$/i).test(e.target.files[0].name)) {
                    var image = new Image;
                    image.src = URL.createObjectURL(e.target.files[0]);
                    image.className = 'resize';
                    self.append(image);
                    $('.resize').css({
                        'max-width': self.width(),
                        overflow: 'auto',
                        '-moz-resize': 'both',
                        '-webkit-resize': 'both',
                        resize: 'both'
                    });
                } else {
                    alert('Please upload an image file');
                }
            });
        }
    }
})(jQuery);