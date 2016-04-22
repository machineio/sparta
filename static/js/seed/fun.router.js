/*
Get your fucking house in order.
*/

fun.Router = Marionette.AppRouter.extend({

    /*
     Seed routes
    */
    routes: {
        "": "home",
        "home": "home",
        "landing": "landing",
        "calendars": "calendars",
        "monitors": "monitors",
        "dashboard": "dashboard",
        "dashboard/a:account": "dashboard",
        "dashboard/a:account/o:org": "dashboard",
        "signup": "signup",
        "login": "login",
        "features": "features",
        "enterprise": "enterprise",
        "pricing": "pricing",
        "terms": "terms",
        "security": "security",
        "privacy": "privacy",
        "status": "status",
        "help": "help",
        "contacts": "contacts",
        "contacts/p:page": "contacts",
        "tasks": "tasks",
        "tasks/p:page": "tasks",
        "companies": "companies",
        "companies/p:page": "companies",
        "campaigns": "campaigns",
        "orgs": "orgs",
        "profile": "profile",
        "members": "members",
        "teams": "teams",
        "reports": "reports",
        "reports/p:page": "reports",
        "phone": "phone",
        "accounts":"accounts",
        "advanced": "advanced",
        "messages": "messages",
        "resources": "resources",
        "recordings": "recordings",
        "gateways": "gateways",
        "settings": "settings",
        "logout": "logout"
    },

    initialize: function(){
        'use strict';
        // navigation bar
        fun.instances.navbar = new fun.views.navbar({
            el:"#fun-navbar"
        });
        // sub header
        fun.instances.subheader = new fun.views.subheader({
            el:"#fun-subheader"
        });
        // landing
        fun.instances.landing = new fun.views.landing({
            el:"#fun-landing"
        });
        // features
        fun.instances.features = new fun.views.features({
            el:"#fun-features"
        });
        // enterprise
        fun.instances.enterprise = new fun.views.enterprise({
            el:"#fun-enterprise"
        });
        // calendars
        fun.instances.calendars = new fun.views.calendars({
            el:"#fun-calendars"
        });
        // advanced
        fun.instances.advanced = new fun.views.advanced({
            el:"#fun-advanced"
        });
        // monitors
        fun.instances.monitors = new fun.views.monitors({
            el:"#fun-monitors"
        });
        // pricing
        fun.instances.pricing = new fun.views.pricing({
            el:"#fun-pricing"
        });
        // terms
        fun.instances.terms = new fun.views.terms({
            el:"#fun-terms"
        });
        // privacy
        fun.instances.privacy = new fun.views.privacy({
            el:"#fun-privacy"
        });
        // security
        fun.instances.security = new fun.views.security({
            el:"#fun-security"
        });
        // status
        fun.instances.status = new fun.views.status({
            el:"#fun-status"
        });
        // help
        fun.instances.help = new fun.views.help({
            el:"#fun-help"
        });
        // login
        fun.instances.login = new fun.views.login({
            el:"#fun-login"
        });
        // dashboard
        fun.instances.dashboard = new fun.views.dashboard({
            el:"#fun-dashboard"
        });
        // orgs
        fun.instances.orgs = new fun.views.orgs({
            el:"#fun-orgs"
        });
        // profile
        fun.instances.profile = new fun.views.profile({
            el:"#fun-profile"
        });
        // members
        fun.instances.members = new fun.views.members({
            el:"#fun-members"
        });
        // teams
        fun.instances.teams = new fun.views.teams({
            el:"#fun-teams"
        });
        // phone
        fun.instances.phone = new fun.views.phone({
            el:"#fun-phone"
        });
        // gateways
        fun.instances.gateways = new fun.views.gateways({
            el:"#fun-gateways"
        });
        // tasks
        fun.instances.tasks = new fun.views.tasks({
            el:"#fun-tasks"
        });
        // companies
        fun.instances.companies = new fun.views.companies({
            el:"#fun-companies"
        });
        // campaigns
        fun.instances.campaigns = new fun.views.campaigns({
            el:"#fun-campaigns"
        });
        // contacts
        fun.instances.contacts = new fun.views.contacts({
            el:"#fun-contacts"
        });

        // contactItem
        fun.instances.contactItem = new fun.views.contactItem({
            el:"#fun-contact-item"
        });

        // recordings
        fun.instances.recordings = new fun.views.recordings({
            el:"#fun-recordings"
        });
        // accounts
        fun.instances.accounts = new fun.views.accounts({
            el:"#fun-accounts"
        });
        // resources
        fun.instances.resources = new fun.views.resources({
            el:"#fun-resources"
        });
        // messages
        fun.instances.messages = new fun.views.messages({
            el:"#fun-messages"
        });
        // reports
        fun.instances.reports = new fun.views.reports({
            el:"#fun-reports"
        });
        // signup
        fun.instances.signup = new fun.views.signup({
            el:"#fun-signup"
        });
        // settings
        fun.instances.settings = new fun.views.settings({
            el:"#fun-settings"
        });
        // extra
        fun.instances.extra = new fun.views.extra({
            el:"#fun-extra"
        });
        // footer
        fun.instances.footer = new fun.views.footer({
            el:"#fun-footer"
        });
    },

    home: function(){
        'use strict';
        // Welcome home, get account and context
        console.log('getting account and context');
        this.account = localStorage.getItem("username");
        this.context = sessionStorage.getItem("context");
        console.log(this.account, this.context);
        // cognitive, i don't know car engine by account and context.
        if (this.account === this.context){
            console.log('account same as context');
        } else {
            console.log('missing or different context');
        }
        // Are you inside the dungeon or out of the dungeon?
        if(fun.utils.loggedIn()){
            fun.utils.redirect(fun.conf.hash.profile);
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
    },

    landing: function(){
        'use strict';
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.landing.render();
        fun.instances.extra.render();
        fun.instances.footer.render();
    },

    features: function(){
        'use strict';
        var features = translate('features');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        //fun.instances.subheader.render(features);
        fun.instances.features.render();
        fun.instances.footer.render();
    },

    enterprise: function(){
        'use strict';
        var enterprise = translate('enterprise');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        //fun.instances.subheader.render(enterprise);
        fun.instances.enterprise.render();
        fun.instances.footer.render();
    },

    calendars: function(){
        'use strict';
        var calendars = translate('calendars');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.subheader.render(calendars);
        fun.instances.subheader.renderHeadNavCalendars();
        fun.instances.calendars.render();
        fun.instances.footer.render();
    },

    monitors: function(){
        'use strict';
        var monitor = translate('systemMonitor');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.subheader.render(monitor);
        fun.instances.subheader.renderHeadNavProfile();
        fun.instances.monitors.render();
        fun.instances.footer.render();
    },

    pricing: function(){
        'use strict';
        var pricing = translate('pricing');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        //fun.instances.subheader.render(enterprise);
        fun.instances.pricing.render();
        fun.instances.footer.render();
    },

    terms: function(){
        'use strict';
        var terms = translate('terms');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.subheader.render(terms);
        fun.instances.terms.render();
        fun.instances.footer.render();
    },

    tasks: function(){
        'use strict';
        var tasks = translate('tasks'),
            account,
            context,
            vonCount = 0,
            resources,
            resource,
            onSuccess;

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        console.log(
            fun.utils.format('username: %s, context: %s', account, context)
        );

        resources = {
            user: new fun.models.User({'account':account}),
            tasks: new fun.models.TasksContainer(), // <!----------------------- HERE IS THE FUCKING TEST WITH THE NEW TYPE OF COLLECTION CONTAINER AND SUPPORT FUCKING PAGINATIONS AND METADATA
            now: new fun.models.TasksNow(),
            later: new fun.models.TasksLater(),
            done: new fun.models.TasksDone(),
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                fun.instances.tasks.renderTasksList(
                    resources.tasks
                );

                fun.instances.settings.setProfileInformation(
                    resources.user
                );

                fun.instances.tasks.renderNowTasksList(
                    resources.now
                );

                fun.instances.tasks.renderLaterTasksList(
                    resources.later
                );

                fun.instances.tasks.renderDoneTasksList(
                    resources.done
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(tasks);
            fun.instances.subheader.renderHeadNav();
            
            fun.instances.tasks.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }

        fun.instances.footer.render();
    },

    companies: function(){
        'use strict';
        var companies = translate('companies'),
            account,
            context,
            vonCount = 0,
            resources,
            resource,
            onSuccess;

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        console.log(
            fun.utils.format('username: %s, context: %s', account, context)
        );

        resources = {
            //account: new fun.models.Account({'account':account}),
            user: new fun.models.User({'account':account}),
            companies: new fun.models.Companies(),
            active: new fun.models.CompaniesActive(),
            disable: new fun.models.CompaniesDisable(),
            suspended: new fun.models.CompaniesSuspended()
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');
                fun.instances.companies.renderCompaniesList(
                    resources.companies
                );
                fun.instances.settings.setProfileInformation(
                    resources.user
                );
                fun.instances.companies.renderActiveCompaniesList(
                    resources.active
                );
                fun.instances.companies.renderDisableCompaniesList(
                    resources.disable
                );
                fun.instances.companies.renderSuspendedCompaniesList(
                    resources.suspended
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(companies);
            fun.instances.subheader.renderHeadNav();
            
            fun.instances.companies.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }

        fun.instances.footer.render();
    },

    privacy: function(){
        'use strict';
        var privacy = translate('privacy');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.subheader.render(privacy);
        fun.instances.privacy.render();
        fun.instances.footer.render();
    },

    security: function(){
        'use strict';
        var security = translate('security');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.subheader.render(security);
        fun.instances.security.render();
        fun.instances.footer.render();
    },

    status: function(){
        'use strict';
        var status = translate('status');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.subheader.render(status);
        fun.instances.status.render();
        fun.instances.footer.render();
    },

    help: function(){
        'use strict';
        var help = translate('help');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.navbar.renderDropdown();
        fun.instances.subheader.render(help);
        fun.instances.subheader.renderHeadNavHelp();
        fun.instances.help.render();
        fun.instances.footer.render();
    },

    teams: function(){
        'use strict';
        var vonCount = 0,
            resources,
            resource,
            account,
            context,
            teams,
            onSuccess;

        teams = translate('teams');

        context = sessionStorage.getItem("context");

        console.log(context);
        // Yeah resources bitch! fucking missing since years ago...
        resources = {
            org: new fun.models.Org({'account':context})
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');
                fun.instances.teams.render(
                    resources.org
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.subheader.render(teams);
            fun.instances.subheader.renderHeadNav();
            //fun.instances.teams.render();
            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }

        fun.instances.footer.render();
    },

    members: function(){
        'use strict';
        var vonCount = 0,
            resources,
            resource,
            account,
            context,
            members,
            onSuccess;

        members = translate('members');

        context = sessionStorage.getItem("context");

        resources = {
            org: new fun.models.Org({'account':context})
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                fun.instances.members.render(
                    resources.org
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.subheader.render(members);
            fun.instances.subheader.renderHeadNav();

            // render memberss view
            //fun.instances.members.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }

        fun.instances.footer.render();
    },

    contacts: function(page){
        'use strict';
        var contacts,
            vonCount,
            resources,
            resource,
            onSuccess;

        contacts = translate('contacts');
        // and now for something completely different
        vonCount = 0;
        
        resources = {
            contacts: new fun.models.Contacts(),
            directories: new fun.models.Directories()
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                fun.instances.contacts.renderContactLists(
                    resources.contacts
                );

                /*fun.instances.contacts.renderDirectoryLists(
                    resources.directories
                );*/
            }
        };

        if (isNaN(page)) {
            page = 1;
        }

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(contacts);
            fun.instances.subheader.renderHeadNav();
            // render contacts view
            fun.instances.contacts.render();


            // something new that looks exacly the same.
            //fun.layouts.contacts.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        fun.instances.footer.render();
    },

    signup: function(){
        'use strict';
        var signUp = translate('signUp');
        if(fun.utils.loggedIn()){
            fun.utils.redirect(fun.conf.hash.profile);
        } else {
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.subheader.render(signUp);
            fun.instances.signup.render();
        }
        fun.instances.footer.render();
    },

    login: function(){
        'use strict';
        var login = translate('signIn');
        if(fun.utils.loggedIn()){
            fun.utils.redirect(fun.conf.hash.profile);
        } else {
            fun.utils.hideAll();
            fun.instances.navbar.render();
            // fun.instances.subheader.render(login);
            fun.instances.login.render();
        }

        fun.instances.footer.render();
    },

    dashboard: function(account, org){
        'use strict';
        var account,
            vonCount = 0,
            models,
            onSuccess,
            dashboard,
            message;

        console.log(
            fun.utils.format('account: %s, organization: %s', account, org)
        );

        if (!account){
            account = localStorage.getItem("username");
        } else {
            if (account.substring(0, 1) === ':') { 
                account = account.substring(1);
            }
        }
        
        models = {
            user: new fun.models.User({'account':account}),
            records: new fun.models.Records(),
            billing: new fun.models.Billing(),
            summary: new fun.models.Summary(),
            lapseSummary: new fun.models.LapseSummary({
                lapse: 'hours'
            })
        };

        if (org) {
            models.org = new fun.models.Org({'account': org});
            
            // Set custom url tree, it's not a tree but you got it...
            // window.history.pushState('orgDashboard', 'Dashboard', '/orgs/iofun/dashboard');
        }

        onSuccess = function(){
            if(++vonCount === _.keys(models).length){
                console.log('spawn daemon success!');

                fun.instances.navbar.renderAccountDropdown(
                    models.user
                );

                fun.instances.dashboard.renderTodaySummary(
                    models.summary, models.billing
                );

                fun.instances.dashboard.renderLatestRecords(
                    models.records
                );

                fun.instances.dashboard.renderTodayActivityChart(
                    models.lapseSummary
                );

                // need to pass stuff to renderRecordType()                   
                fun.instances.dashboard.renderRecordType();

                // set profile info
                fun.instances.settings.setProfileInformation(
                    models.user
                );
            }
        };

        if(fun.utils.loggedIn()){

            dashboard = translate('dashboard');

            fun.utils.hideAll();
            fun.instances.navbar.render();

            fun.instances.subheader.render(dashboard);
            fun.instances.subheader.renderHeadNav();

            fun.instances.dashboard.render();
            for (message in models){
                models[message].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        fun.instances.footer.render();
    },

    campaigns: function(){
        'use strict';
        var campaigns,
            account,
            context,
            vonCount = 0,
            resources,
            resource,
            onSuccess;

        campaigns = translate('campaigns');

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        console.log(
            fun.utils.format('username: %s, context: %s', account, context)
        );

        resources = {
            user: new fun.models.User({'account':account}),
            //campaigns: new fun.models.Campaigns(),
            //active: new fun.models.CampaignsActive(),
            //paused: new fun.models.CampaignsPaused(),
            inbound: new fun.models.CampaignsInbound(),
            outbound: new fun.models.CampaignsOutbound()
        };

        // but, onSuccess we're rendering multiple times the same campaigns.render()
        // and that stuff is bananas. ok

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                // set navbar account dropdown
                fun.instances.navbar.renderAccountDropdown(
                    resources.user
                );

                // set profile info
                fun.instances.settings.setProfileInformation(
                    resources.user
                );

                //fun.instances.campaigns.renderCampaignsList(
                //    resources.campaigns
                //);

                //fun.instances.campaigns.renderActiveCampaignsList(
                //    resources.active
                //);

                //fun.instances.campaigns.renderPausedCampaignsList(
                //    resources.paused
                //);
                fun.instances.campaigns.renderInboundCampaignList(
                   resources.inbound
                );

                fun.instances.campaigns.renderOutboundCampaignList(
                   resources.outbound
                );

            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(campaigns);
            fun.instances.subheader.renderHeadNav();
            
            fun.instances.campaigns.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }

        fun.instances.footer.render();
    },

    gateways: function(){
        'use strict';
        var accounts = translate('accounts'),
            account,
            context,
            vonCount = 0,
            resources,
            gateways = translate('gateways'),
            resource,
            onSuccess;

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        resources = {
            user: new fun.models.User({'account':account}),
            all: new fun.models.Gateways(),
            active: new fun.models.GatewaysActive(),
            monitored: new fun.models.GatewaysMonitored(),
            inbound: new fun.models.GatewaysInbound(),
            outbound: new fun.models.GatewaysOutbound(),
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                fun.instances.gateways.renderAllGatewaysList(
                    resources.all
                );

                fun.instances.gateways.renderActiveGatewaysList(
                    resources.active
                );

                fun.instances.gateways.renderMonitoredGatewaysList(
                    resources.monitored
                );

                fun.instances.gateways.renderInboundGatewaysList(
                    resources.inbound
                );

                fun.instances.gateways.renderOutboundGatewaysList(
                    resources.outbound
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(gateways);
            fun.instances.subheader.renderHeadNav();

            fun.instances.gateways.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        fun.instances.footer.render();
    },

    accounts: function(){
        'use strict';

        var accounts = translate('accounts'),
            account,
            context,
            vonCount = 0,
            resources,
            resource,
            onSuccess;

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        console.log(
            fun.utils.format('username: %s, context: %s', account, context)
        );

        resources = {
            user: new fun.models.User({'account':account}),
            all: new fun.models.Users(),
            active: new fun.models.UsersActive(),
            users: new fun.models.Users(),
            orgs: new fun.models.Orgs(),
            disable: new fun.models.UsersDisable(),
            suspended: new fun.models.UsersSuspended(),
        };


        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                // fun.instances.accounts.renderAccountsList(
                //     resources.users
                // );

                fun.instances.accounts.renderAllAccountsList(
                    resources.all
                );

                fun.instances.accounts.renderActiveAccountsList(
                    resources.active
                );

                fun.instances.accounts.renderUsersAccountsList(
                    resources.users
                );

                fun.instances.accounts.renderOrganizationsAccountsList(
                    resources.orgs
                );

                fun.instances.accounts.renderDisableAccountsList(
                    resources.disable
                );

                fun.instances.accounts.renderSuspendedAccountsList(
                    resources.suspended
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(accounts);
            fun.instances.subheader.renderHeadNav();
            fun.instances.accounts.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }

        fun.instances.footer.render();
    },

    advanced: function(){
        'use strict';

        var advancedSearch = translate('advancedSearch'),
            account,
            context,
            resource,
            resources,
            onSuccess,
            vonCount = 0;

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        resources = {
            user: new fun.models.User({'account':account}),
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');
                fun.instances.settings.setProfileInformation(
                    resources.user
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(advancedSearch);
            fun.instances.subheader.renderHeadNav();
            fun.instances.subheader.renderHeadNavProfile();

            fun.instances.advanced.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        fun.instances.footer.render();
    },

    messages: function(){
        'use strict';

        var messages = translate('messages'),
            account,
            context,
            vonCount = 0,
            resources,
            resource,
            onSuccess;

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        resources = {
            user: new fun.models.User({'account':account}),
            /*all: new fun.models.Messages(),
            unread: new fun.models.MessagesUnread(),*/
            notifications: new fun.models.Notifications(),
            alerts: new fun.models.Alerts(),
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                /*fun.instances.messages.renderAllMessagesList(
                    resources.all
                );*/

                fun.instances.settings.setProfileInformation(
                    resources.user
                );

                /*fun.instances.messages.renderUnreadMessagesList(
                    resources.unread
                );*/

                fun.instances.messages.renderNotificationsMessagesList(
                    resources.notifications
                );

                fun.instances.messages.renderAlertsMessagesList(
                    resources.alerts
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(messages);
            fun.instances.subheader.renderHeadNav();

            fun.instances.messages.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        fun.instances.footer.render();
    },

    recordings: function(){
        'use strict';

        var recordings = translate('recordings'),
            account,
            context,
            vonCount = 0,
            resources,
            resource,
            onSuccess;

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        resources = {
            user: new fun.models.User({'account':account}),
            // All recordings
            all: new fun.models.Recordings(),
            inbound: new fun.models.RecordingsInbound(),
            outbound: new fun.models.RecordingsOutbound(),
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');

                fun.instances.recordings.renderAllRecordingsList(
                    resources.all
                );

                fun.instances.settings.setProfileInformation(
                    resources.user
                );

                fun.instances.recordings.renderInboundRecordingsList(
                    resources.inbound
                );

                fun.instances.recordings.renderOutboundRecordingsList(
                    resources.outbound
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(recordings);
            fun.instances.subheader.renderHeadNav();
            fun.instances.subheader.renderHeadNavProfile();

            fun.instances.recordings.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        fun.instances.footer.render();
    },

    resources: function(){
        'use strict';

        var accounts = translate('accounts'),
            account,
            context,
            vonCount = 0,
            resources,
            resource,
            onSuccess;

        var resourcesTitle = translate('resourcesTitle');

        // get account and context
        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        resources = {
            user: new fun.models.User({'account':account}),
            all: new fun.models.Resources(),
            imps: new fun.models.ResourcesImps(),
            nodes: new fun.models.ResourcesNodes(),
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');
                fun.instances.resources.renderAllResourcesList(
                    resources.all
                );
                fun.instances.resources.renderImpsResourcesList(
                    resources.imps
                );
                fun.instances.resources.renderNodesResourcesList(
                    resources.nodes
                );
            }
        };

        if(fun.utils.loggedIn()){
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(resourcesTitle);
            fun.instances.subheader.renderHeadNav();

            fun.instances.resources.render();

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('fuck error!');
                    }
                });
            }
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        fun.instances.footer.render();
    },

    orgs: function(){
        'use strict';
        var organizations = translate('organizations');
        
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.navbar.renderDropdown();
        fun.instances.subheader.render(organizations);
        fun.instances.subheader.renderHeadNav();
        fun.instances.orgs.render();
        
        fun.instances.footer.render();
    },

    profile: function(){
        'use strict';
        var profile = translate('profile'),
            vonCount = 0,
            account = localStorage.getItem("username"),
            stuff,
            resources,
            onSuccess,
            message;

        if (account){
            if (account.substring(0, 1) === ':') { 
                account = account.substring(1);
            }
        }

        resources = {
            user: new fun.models.User({'account':account}),
            campaignsInbound: new fun.models.CampaignsInbound(),
            campaignsOutbound: new fun.models.CampaignsOutbound(),
            tasks: new fun.models.Tasks(),
            contacts: new fun.models.Contacts(),
        };
        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                console.log('get resources success!');
                fun.instances.settings.setProfileInformation(
                    resources.user
                );
                fun.instances.profile.renderAccountInformation(
                    resources.user
                );
                fun.instances.profile.renderInboundCampaignList(
                    resources.campaignsInbound
                );
                fun.instances.profile.renderOutboundCampaignList(
                    resources.campaignsOutbound
                );
                fun.instances.profile.renderTaskList(
                    resources.tasks
                );
                fun.instances.profile.renderContactList(
                    resources.contacts
                );
            }
        };

        for (stuff in resources){
            resources[stuff].fetch({
                success: onSuccess,
                error: function() {
                    console.log('fuck error!');
                }
            });
        }

        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.navbar.renderDropdown();
        fun.instances.subheader.render(profile);
        fun.instances.subheader.renderHeadNavProfile();
        
        //fun.instances.contactItem.render();

        fun.instances.profile.render();
        fun.instances.footer.render();
    },

    phone: function(){
        'use strict';
        var phone = translate('phone');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.navbar.renderDropdown();
        fun.instances.subheader.render(phone);
        fun.instances.phone.render();
        fun.instances.footer.render();
    },

    reports: function(page){
        'use strict';
        if(fun.utils.loggedIn()){
            var reports = translate('reports');
            fun.utils.hideAll();
            fun.instances.navbar.render();
            fun.instances.navbar.renderDropdown();
            fun.instances.subheader.render(reports);
            fun.instances.subheader.renderHeadNavReports();

            fun.instances.reports.render();
        } else {
            fun.utils.redirect(fun.conf.hash.login);
        }
        
        fun.instances.footer.render();
    },

    settings: function(){
        'use strict';
        this.account = localStorage.getItem("username");
        var settings = translate('settings');
        fun.utils.hideAll();
        fun.instances.navbar.render();
        fun.instances.navbar.renderDropdown();
        fun.instances.subheader.render(settings);
        fun.instances.subheader.renderHeadNav();
        fun.instances.settings.render(this.account);
        fun.instances.footer.render();
    },

    logout: function(){
        'use strict';
        var goodBye = translate('goodBye'),
            onSuccess;

        // the stupid shit with the navbar on logout is probably related to this.

        onSuccess = function(){
            fun.instances.navbar.render()
            fun.instances.navbar.renderDropdown();
        };

        fun.utils.hideAll();

        fun.utils.logout({
            success: function() {
                console.log('fuck error with kika and success!');
            },
            error: onSuccess
        });

        fun.instances.subheader.render(goodBye);      
        fun.instances.login.render();
        fun.instances.footer.render();
    }
});