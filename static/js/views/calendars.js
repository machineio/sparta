fun.views.calendars = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.calendars = this.$el;
    },
    
    /*
    * Render the calendars view
    */
    render : function(){
        "use strict";
        var calendar,
            options,
            list;

        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.calendars));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");

        options = {
            events_source: '/stochastics/',
            view: 'month',
            tmpl_path: '/static/tmpls/',
            tmpl_cache: false,
            // day: '2013-03-12',
            onAfterEventsLoad: function(events) {
                if(!events) {
                    return;
                }
                list = $('#eventlist');
                list.html('');

                $.each(events, function(key, val) {
                    $(document.createElement('li'))
                        .html('<a href="' + val.url + '">' + val.title + '</a>')
                        .appendTo(list);
                });
            },
            onAfterViewLoad: function(view) {
                $('.page-header h3').text(this.getTitle());
                $('.btn-group button').removeClass('active');
                $('button[data-calendar-view="' + view + '"]').addClass('active');
            },
            classes: {
                months: {
                    general: 'label'
                }
            }
        };

        calendar = $('#test-calendar').calendar(options);

        $('.btn-group button[data-calendar-nav]').each(function() {
            var $this = $(this);
            $this.click(function() {
                calendar.navigate($this.data('calendar-nav'));
            });
        });

        $('.btn-group button[data-calendar-view]').each(function() {
            var $this = $(this);
            $this.click(function() {
                calendar.view($this.data('calendar-view'));
            });
        });
    }

});
