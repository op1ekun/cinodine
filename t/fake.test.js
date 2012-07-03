module = QUnit.module;

//fake tests for mockups
module("mockup1", {
    setup : function() {
        // this.mockup     = Some.namespace.mockup;
        
        // this should be replace by some nitty witty templates
        // eg. dustjs this way one can use the same template in browser and in nodejs
        // this.wrapper    = document.getElementById("wrapper");
        // this.para       = this.wrapper.getElementsByTagName("p");
        // this.span       = this.wrapper.getElementsByTagName("span");
    }
});

test("some fake test case", function() {
	expect(1);
	
	ok(false, "this is not true!");
});

test("soem DOM test", function() {
    expect(2);
    this.mockup     = global.window.Some.namespace.mockup;
    this.mockup.changeTexts();
    
    this.wrapper    = global.window.document.getElementById("wrapper");
        this.para       = this.wrapper.getElementsByTagName("p");
        this.span       = this.wrapper.getElementsByTagName("span");
    
    equal(this.para[0].innerHTML, "new paragraph 1", "new text for paragraph 1");
    equal(this.para[1].innerHTML, "new paragraph 2", "new text for paragraph 2");
});


