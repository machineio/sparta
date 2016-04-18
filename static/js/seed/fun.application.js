// trying to put some new blood and magic to our nonsense combo!
var app = Marionette.Application.extend({
  initialize: function(options) {
    console.log('My containers:', options.containers);
  }
});


// Although applications will not do anything
// with a `container` option out-of-the-box, you
// could build an Application Class that does use
// such an option.
app = new app(fun);


app.addRegions({
  contactForm: '#m-contact-form',
  contactList: '#m-contact-list'
})


app.on("start", function(options){
	fun.instances.router = new fun.Router();
 	if (Backbone.history){
    	Backbone.history.start();
  	}
  	app.contactForm.show(new fun.forms.contactItem());
	app.contactList.show(new fun.views.contactsView());
});
console.log('que dice');

app.start();