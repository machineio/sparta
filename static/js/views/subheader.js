fun.views.subheader = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    events : {
        'click #call-btn': 'call',
        'click #current_break_0': 'takeAbreak',
        'click #current_break_1': 'goToLunch',
        'click #current_break_2': 'otherBreak',
        'click #current_break_3': 'backToWork'
    },
    
    /**
     * Class constructor
     */
    initialize : function(options) {
        fun.containers.subheader = this.$el;

        // get account and context
        this.account = localStorage.getItem("username");
        this.context = sessionStorage.getItem("context");

        fun.messages.on("change:context", function(){
            this.renderHeadNav();
        }, this);
    },
    
    /**
     * Render the subheader view
     */
    render : function(header){
        'use strict';
        var data, template;
        
        if(header){
            this.header = header;
        } else {
            this.header = 'nonsense';
        }

        data = {
            header:this.header
        };

        template = _.template(fun.utils.getTemplate(fun.conf.templates.subheader))(data);

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");
    },

    renderHeadNav : function(){
        'use strict';
        var template,
            headNav,
            account, 
            context;
        // get template for render head navbar
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.headNav)
        );
        // define head navigation
        headNav = this.$('#fun-head-nav');
        headNav.html(template);
        // account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");
        // logging some shit bro!
        console.log(
            fun.utils.format('username: %s, context: %s', account, context)
        );
        // and then the filters
        if (account !== context && typeof(context) !== 'undefined' && context !== null){
            this.$('#head-nav-phone').removeClass('show').addClass('hide');
            this.$('#head-nav-members').removeClass('hide').addClass('show');
            this.$('#head-nav-teams').removeClass('hide').addClass('show');
            this.$('#head-nav-contacts').removeClass('show').addClass('hide');
            this.$('#head-nav-companies').removeClass('show').addClass('hide');
            this.$('#head-nav-gateways').removeClass('show').addClass('hide');
            this.$('#head-nav-cubes').removeClass('show').addClass('hide');
            this.$('#head-nav-activity').removeClass('hide').addClass('show');
            this.$('#head-nav-recordings').removeClass('show').addClass('hide');
            this.$('#head-nav-resources').removeClass('show').addClass('hide');
            this.$('#head-nav-accounts').removeClass('show').addClass('hide');
            this.$('#head-nav-tasks').removeClass('show').addClass('hide');
        } else {
            this.$('#head-nav-phone').removeClass('show').addClass('hide');
            this.$('#head-nav-members').removeClass('show').addClass('hide');
            this.$('#head-nav-resources').removeClass('show').addClass('hide');
            this.$('#head-nav-accounts').removeClass('show').addClass('hide');
            this.$('#head-nav-gateways').removeClass('show').addClass('hide');
            this.$('#head-nav-contacts').removeClass('hide').addClass('show');
            this.$('#head-nav-teams').removeClass('show').addClass('hide');
            this.$('#head-nav-activity').removeClass('show').addClass('hide');
        }
        // this guy can see admin stuff?
        if (context !== 'undefined' && context !== null && context.trim() === 'System Admin'){
            this.$('#head-nav-phone').removeClass('show').addClass('hide');
            this.$('#head-nav-teams').removeClass('show').addClass('hide');
            this.$('#head-nav-members').removeClass('show').addClass('hide');
            this.$('#head-nav-gateways').removeClass('hide').addClass('show');
            this.$('#head-nav-recordings').removeClass('show').addClass('hide');
            this.$('#head-nav-campaigns').removeClass('show').addClass('hide');
            this.$('#head-nav-resources').removeClass('hide').addClass('show');
            this.$('#head-nav-accounts').removeClass('hide').addClass('show');
            this.$('#head-nav-tasks').removeClass('show').addClass('hide');
            //this.$('#head-nav-cubes').removeClass('hide').addClass('show');
        }
    },

    renderHeadNavAdmin: function(){
        'use strict';
    },

    renderHeadNavCampaigns : function(){
        'use strict';
        var template, headNav;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.headNavCampaigns)
        );

        headNav = this.$('#fun-head-nav');

        headNav.html(template);
    },

    renderHeadNavCalendars : function(){
        'use strict';
        var template, headNav;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.headNavCalendars)
        );

        headNav = this.$('#fun-head-nav');

        headNav.html(template);
    },

    renderHeadNavReports : function(){
        'use strict';
        var template, headNav;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.headNavReports)
        );

        headNav = this.$('#fun-head-nav');

        headNav.html(template);
    },

    renderHeadNavHelp: function(){
        'use strict';
        var template,
            headNav;

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.headNavHelp)
        );

        headNav = this.$('#fun-head-nav');

        headNav.html(template);

    },

    renderHeadNavProfile: function(){
        'use strict';
        var template,
            headNav;

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.headNavProfile)
        );

        headNav = this.$('#fun-head-nav');
        headNav.html(template);

    },

    call: function(event) {
        'use strict';
        event.preventDefault();
        console.log('call some fucking one');
    },

    takeAbreak: function(event){
        
        console.log('take a break my friend');
    },

    goToLunch: function(event){
        
        console.log('go to lunch');
    },

    otherBreak: function(event){
        
        console.log('other break');
    },

    backToWork: function(event){

        console.log('back to work');
    }

});
