
var app = Marionette.Application.extend({
  initialize: function(options) {
    console.log('My container:', options.container);
  }
});


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


console.log('yeah alex');