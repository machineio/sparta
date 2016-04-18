
fun.views.contactItem = Marionette.ItemView.extend({

  template : function(serialized_model) {
    var name = serialized_model.name;
    return _.template(fun.utils.getTemplate(fun.conf.templates.contactItem))({
        name : name,
        some_custom_attribute : some_custom_key
    });
  }
});