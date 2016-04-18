
fun.views.contactItem = Marionette.ItemView.extend({

    /*
    * Init function
    */
    initialize: function(options) {

        console.log(options);

        this.model = new fun.models.Contact();
    },


    /*
    * Bind event functions to the different HTML elements
    */
    events: {
        'click .test-btn': 'testEvent',
    },
    
    /*
    * Some marionette magic
    */
    template: function(serialized_model) {
        var name = serialized_model.name;
        return _.template(fun.utils.getTemplate(fun.conf.templates.contactItem))({
            first_name : name,
        });
    },

    testEvent: function(event){
        console.log('test event');
    }
});


fun.views.contactsView = Marionette.CollectionView.extend({
  childView: fun.views.contactItem
});