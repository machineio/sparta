// trying to put some new blood and magic to our nonsense combo!
console.log("I thought what I'd do was, I'd pretend I was one of those deaf-mutes.");

var app,
	RootView;

app = Marionette.Application.extend({
  initialize: function(options) {
    console.log('My containers:', options.containers);
  }
});

// Although applications will not do anything
// with a 'container' option out-of-the-box, you
// could build stuff that does use such option.

app = new app(fun);

RootView = Marionette.LayoutView.extend({
  el: 'body'
});

app.rootView = new RootView();

/*
app.addRegions({
  contactForm: '#m-contact-form',
  contactList: '#m-contact-list'
})
*/

app.on("start", function(options){
	fun.instances.router = new fun.Router();
 	if (Backbone.history){
    	Backbone.history.start();
  	}

  	app.contacts = new fun.models.Contacts();
  	app.contacts.fetch()

  	app.contacts.on("add", function(ship) {
	  console.log("Ahoy " + ship.get("first_name") + "!");
	});

  	/*app.contactForm.show(new fun.forms.contactItem({ collection: app.contacts }));
	app.contactList.show(new fun.views.contactsView({ collection: app.contacts }));*/
});

app.start();