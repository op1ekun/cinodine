(function($) {
    // module is reserved in node.js
    module = QUnit.module;

    //fake tests for mockups
    module("mockup1", {
        setup : function() {
            // window is global in browser,
            // node has its own global object
            // that is why window is necessary
            this.mockup     = window.Some.namespace.mockup;
            this.para       = $("#wrapper").find("p");
        }
    });
    
    test("some fake test case", function() {
    	expect(1);
    	
    	ok(false, "this is not true!");
    });
    
    test("soem DOM test", function() {
        expect(2);
        this.mockup.changeTexts();
        
        this.para.each(function(index, elem) {
            equal(elem.innerHTML, 
                    "new paragraph " + (index + 1), 
                    "new text for paragraph " + (index + 1));
        });
    });

}(jQuery));