(function() {
    var changeTexts = function() {
        this.wrapper    = document.getElementById("wrapper");
        this.para       = this.wrapper.getElementsByTagName("p");
        // this.span       = this.wrapper.getElementsByTagName("span");
        
        this.para[0].innerHTML = "new paragraph 1";
        this.para[1].innerHTML = "new paragraph 2";
    }
    
    console.log('global in mock.js ', global);
    
    global.window.Some = {
        namespace : {
            mockup : {
                changeTexts : changeTexts
            }
        }
    };
    
    // $.extend(true, window, {
        // Some : {
            // namespace : {
                // mockup : {
                    // changeTexts : changeTexts
                // }
            // }
        // }
    // })
})();
