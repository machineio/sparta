fun.views.navbar = Backbone.View.extend({

	events: {
        'click #details-report-btn': 'detailsReport',
        'click input[name="current_account"]': 'setAccountContext',
        'click #current_account_0': 'goProfile',
        'click #current_account_admin': 'goDashboard',
        'click #search': 'toggleMenu'
	},

    initialize: function(options) {
        fun.containers.navbar = this.$el;
        // get account and context from local and session storages.
        this.account = localStorage.getItem("username");
        this.context = sessionStorage.getItem("context");

        fun.messages.on("change:context", function(){
            this.renderContext();
        }, this);

        fun.messages.on("change:system_admin", function(){
            this.renderContext();
        }, this);
    },

    render: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.navbar));

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        if(fun.utils.loggedIn()){
            console.log('Just enter the dungeon!');
            this.renderDashboard();
        } else {
            console.log('Out of the dungeon');
            this.renderLanding();
        }
    },

    renderContext: function(){
        'use strict';
        var account = localStorage.getItem("username"),
            context = sessionStorage.getItem("context");

        if (context !== null && context.trim() === 'System Admin') {
            this.$('#nav-new-account').removeClass('hide').addClass('show');
            //this.$('#nav-new-cube').removeClass('hide').addClass('show');
            this.$('#nav-new-resource').removeClass('hide').addClass('show');
            this.$('#nav-new-gateway').removeClass('hide').addClass('show');
            this.$('#nav-new-contact').removeClass('show').addClass('hide');
            this.$('#nav-new-campaign').removeClass('show').addClass('hide');
            this.$('#nav-new-org').removeClass('show').addClass('hide');
            this.$('#nav-new-team').removeClass('show').addClass('hide');
            this.$('#nav-new-member').removeClass('show').addClass('hide');
        } else {
            if (account !== context && context !== null){
                this.$('#nav-new-resource').removeClass('show').addClass('hide');
                this.$('#nav-new-account').removeClass('show').addClass('hide');
                this.$('#nav-new-gateway').removeClass('show').addClass('hide');
                this.$('#nav-new-org').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('hide').addClass('show');
                this.$('#nav-new-member').removeClass('hide').addClass('show');
                this.$('#nav-new-contact').removeClass('hide').addClass('show');
                this.$('#nav-new-campaign').removeClass('hide').addClass('show');
                
            } else {
                this.$('#nav-new-resource').removeClass('show').addClass('hide');
                this.$('#nav-new-account').removeClass('show').addClass('hide');
                this.$('#nav-new-gateway').removeClass('show').addClass('hide');
                this.$('#nav-new-member').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('show').addClass('hide');
                this.$('#nav-new-org').removeClass('hide').addClass('show');
                this.$('#nav-new-contact').removeClass('hide').addClass('show');
                this.$('#nav-new-campaign').removeClass('hide').addClass('show');
            }
        }
    },

    renderLanding: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.navLanding));

        var navLanding = this.$('#fun-nav-landing');
        navLanding.html(template);
        
        if ($("#brand-n-stuff").hasClass("fun-brand")){
            $("#brand-n-stuff").removeClass("fun-brand");
        }
    },

    renderDashboard: function(){
        'use strict';
        var template,
            navDashboard,
            account,
            context;

        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.navDashboard)
        )({'account':account});

        navDashboard = this.$('#fun-nav-dashboard');
        navDashboard.html(template);

        if (!$("#brand-n-stuff").hasClass("fun-brand")){
            $("#brand-n-stuff").addClass("fun-brand");
        }

        // first we check for system admin
        if (context !== null && context.trim() === 'System Admin') {
            this.$('#nav-new-account').removeClass('hide').addClass('show');
            //this.$('#nav-new-cube').removeClass('hide').addClass('show');
            this.$('#nav-new-resource').removeClass('hide').addClass('show');
            this.$('#nav-new-gateway').removeClass('hide').addClass('show');
            this.$('#nav-new-contact').removeClass('show').addClass('hide');
            this.$('#nav-new-campaign').removeClass('show').addClass('hide');
            this.$('#nav-new-org').removeClass('show').addClass('hide');
        } else {
            // if not admin, we check for user or organization accounts
            if (account !== context && context !== null){
                // check if context !== null fix the stuff
                this.$('#nav-new-org').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('hide').addClass('show');
                this.$('#nav-new-member').removeClass('hide').addClass('show');
            } else {
                this.$('#nav-new-member').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('show').addClass('hide');
                this.$('#nav-new-org').removeClass('hide').addClass('show');  
            }
        }
    },

    renderAdmin: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.navAdmin));

        var navAdmin = this.$('#fun-nav-admin');
        navAdmin.html(template);
    },

    detailsReport: function() {
        console.log('navbar detail reports')
    },

    renderDropdown: function(){
        // Render dropdown
        'use strict';
        // counter starts on 1 by design.
        var vonCount = 1,
            account,
            accountList,
            length,
            orgData,
            itemData,
            itemTemplate;

        account = JSON.parse(localStorage.getItem("profile"));

        if (account) {
            this.orgs = account["orgs"] || []; 
        } else {
            this.orgs = [];
        }

        accountList = this.$('#account-list-ul');

        if (this.orgs.length > 0){

            _.each(this.orgs, function(o) {

                itemData = {'org': o,'account': account['account'],'counter': vonCount};

                vonCount = vonCount + 1;

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountListItem)
                )(itemData);

                accountList.append(itemTemplate);
            });
        }
    },

    renderAccountDropdown: function(account){
        // Render account dropdown
        'use strict';
        // this can or will receive a backbone model
        // so we're going to stringify the shit of it first
        var vonCount = 0,
            account = account,
            accountObj = JSON.stringify(account),
            accountList,
            length,
            orgData,
            itemData,
            itemTemplate;

        console.log('render account for ... ', account.get('account'));

        // Can I get the list from localStorage?, pretty please. or not?

        if (account) {
            this.orgs = account.get("orgs") || []; 
        } else {
            this.orgs = [];
        }

        accountList = this.$('#account-list-ul');

        if (this.orgs.length > 0){

            _.each(this.orgs, function(o) {

                itemData = {'org': o,'account': account['account'],'counter': vonCount + 1};

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountListItem)
                )(itemData);

                accountList.append(itemTemplate);
            });
        }
    },

    setAccountContext: function(event){
        'use strict';
        $('input[name="current_account"]:checked').each(function() {
            var idVal = $(this).attr("id");
            var label = $("label[for='" + idVal + "']").text();

            if (idVal === 'current_account_admin'){
                // Check browser support
                if (typeof(Storage) != "undefined") {
                    // Store
                    sessionStorage.setItem("is_admin", true);
                }
                fun.messages.trigger("change:system_admin");
            }
            // Check browser support
            if (typeof(Storage) != "undefined") {
                // Store selected context
                sessionStorage.setItem("context", label.trim());
            }
        });

        fun.messages.trigger("change:context");
    },

    goProfile: function(event){
        'use strict';
        window.location = fun.conf.hash.profile;
    },

    goDashboard: function(event){
        'use strict';
        window.location = fun.conf.hash.dashboard;
    },

    toggleMenu: function(event){
        $("#searchInput").focus();
    }
});
