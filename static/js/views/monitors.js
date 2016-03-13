fun.views.monitors = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.monitors = this.$el;
    },
    
    /*
    * Render the monitors view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.monitors));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
