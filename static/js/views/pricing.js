fun.views.pricing = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.pricing = this.$el;
    },
    
    /*
    * Render the pricing view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.pricing));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
