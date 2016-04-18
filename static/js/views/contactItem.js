
fun.views.contactItem = Marionette.ItemView.extend({

    /*
    * Init function
    */
    initialize: function(options) {
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

fun.views.noContact = Marionette.ItemView.extend({
    /*
    * Some marionette magic
    */
    template: function() {
        return _.template(fun.utils.getTemplate(fun.conf.templates.noContact));
    },
})


fun.views.contactsView = Marionette.CollectionView.extend({
    /*
    * trying to make sense of marionette!
    */
    childView: fun.views.contactItem,
    emptyView: fun.views.noContact
});