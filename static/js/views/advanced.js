fun.views.advanced = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },

    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.advanced = this.$el;
    },

    /*
    * Render the advanced view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.advanced));
            this.$el.html(template);
        }
        $('#date-created-between').datepicker();
        $('#date-created-and').datepicker();
        $('#date-created-within').datepicker();

        $('#date-modified-between').datepicker();
        $('#date-modified-and').datepicker();
        $('#date-modified-within').datepicker();

        $('#date-close-between').datepicker();
        $('#date-close-and').datepicker();
        $('#date-close-within').datepicker();
        this.$el.removeClass("hide").addClass("show");
    }

});