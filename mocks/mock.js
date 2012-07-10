(function($) {
    var changeTexts = function() {
        this.para    = $("#wrapper").find("p");
        this.para.text(function(index) {
            return "new paragraph " + (index + 1); 
        });
    }
    
    // exports.Some = global.window.Some;
    
    $.extend(true, window, {
        Some : {
            namespace : {
                mockup : {
                    changeTexts : changeTexts
                }
            }    
        }    
    });

}(jQuery));