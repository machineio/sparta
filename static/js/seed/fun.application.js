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
var app = new app(fun);/*


var my_template_html = '<div><%= args.name %></div>'
var MyView = Marionette.View.extend({
  template : function(serialized_model) {
    var name = serialized_model.name;
    return _.template(my_template_html)({
        name : name,
        some_custom_attribute : some_custom_key
    });
  }
});
*/

console.log('lol')

app.on("start", function(options){
	fun.instances.router = new fun.Router();
 	if (Backbone.history){
    	Backbone.history.start();
  	}
});

app.start();