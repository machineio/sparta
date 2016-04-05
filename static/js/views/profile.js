fun.views.profile = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #profile-new-contact': 'newContact',
        'click #act_1': 'oneDay',
        'click #act_2': 'threeDays',
        'click #act_3': 'oneWeek',
        'click #act_4': 'oneMonth',
        'click .view-contact-popup': 'viewContact',
        'click .edit-contact-popup': 'editContact',
        'click .delete-contact-pupup': 'deleteContact',
        'change #profile-contact-modal-mailing-address-different': 'showMailingAddressDifferent',
        'change #profile-contact-modal-marital-status': 'changeMaritalStatus',
        'change #profile-contact-modal-agent-home-insurance-checkbox': 'homeInsuranceTab',
        'change #profile-contact-modal-agent-health-insurance-checkbox': 'healthInsuranceTab',
        'change #profile-contact-modal-agent-auto-insurance-checkbox': 'autoInsuranceTab',
        'change #profile-contact-modal-agent-life-insurance-checkbox': 'lifeInsuranceTab',
        'change #profile-contact-modal-agent-ancilliary-insurance-checkbox': 'ancilliaryInsuranceTab',
        'change #profile-contact-modal-agent-number-of-children': 'changeNumberChildren',
        'change #profile-contact-modal-health-lead-status': 'showPaymentTab',
        'change #profile-contact-modal-home-lead-status': 'showPaymentTab',
        'change #profile-contact-modal-auto-lead-status': 'showPaymentTab',
        'change #profile-contact-modal-life-lead-status': 'showPaymentTab',
        'change #profile-contact-modal-ancilliary-lead-status': 'showPaymentTab'
    },

    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.profile = this.$el;
    },

    viewContact: function(event){
        'use strict';
        event.preventDefault();
        console.log('view contact event');
        // view cache
        var view = this,
            name;
        $('#profileContactModal').modal({
            'show': true
        });
        this.renderContactModalForm();
    },

    editContact:function(event){
        'use strict';
        event.preventDefault();
        console.log('edit contact event');
        // view cache
        var view = this,
            name;
        $('#profileContactModal').modal({
            'show': true
        });
        this.renderContactModalForm();
    },


    deleteContact:function(event){
        'use strict';
        event.preventDefault();
        console.log('delete contact event');
        var confirm,
            name_uuid,
            callbacks;

        name_uuid = $(event.target).data('name');


        var stuff = JSON.parse(localStorage.getItem("profile"));


        console.log(stuff);

        console.log(name_uuid);

        var lolol = {
            'uuid': name_uuid,
            'account':stuff['account']
        };

        console.log(lolol);

        confirm = new fun.models.Contact(lolol);

        callbacks = {
            success: function(){
                console.log("inside success, but we don't see any of this shit.");
            },
            error: function(){
                fun.utils.redirect(fun.conf.hash.home);
            }
        };
        confirm.destroy();
        $('#deleteAccountModal').modal('hide');
        $('#deleteAccountModal').on('hidden.bs.modal', function(e){
            fun.utils.logout(callbacks);
        });

    },

    /**
    * Render view
    */
    render: function(){
        console.log('render profile view');
        var template,
            startDate,
            startTimestamp,
            i,
            total,
            results;

        template = _.template(fun.utils.getTemplate(fun.conf.templates.profile));

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        startDate = new Date(2013, 6, 25);
        startTimestamp = new Date(2013, 6, 1).getTime() / 1000;

        options = {
            events_source: '/stochastics/',
            view: 'day',
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

        $('#profile-task-new-modal-reminder').datetimepicker();

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

        $('#test-calendar').addClass('hide');

        function GAconverter(data) {
            var i, total, results = {};
            for(i = 0, total = data.length; i < total; i++) {
                results[+data[i].Hour * 3600 + startTimestamp] = +data[i].Visits;
            }
            return results;
        }

        $('#profile-task-new-modal-reminder').datepicker();
    },


    /*
    * Render Contact Modal Form
    */
    renderContactModalForm: function(){
        'use strict';
        var contactModalTabs;
        var template = _.template(
            fun.utils.getTemplate(fun.conf.templates.contactFormModal)
        );

        contactModalTabs = this.$('#profile-contact-modal-tabs');
        contactModalTabs.html(template);
        contactModalTabs.removeClass("hide").addClass("show");
    },

    /*
    * Render Inbound Campaign List
    */
    renderInboundCampaignList: function(campaigns){
        'use strict';
        var length,
            rows,
            template;
        if (campaigns) {
            this.inboundCampaigns = campaigns;
        }

        this.inboundListGroup = this.$('#profile-inbound-list');

        // campaigns length
        length = this.inboundCampaigns.length;

        if (length > 0){
            rows = this.inboundListGroup.html('');
            _.each(this.inboundCampaigns.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignItem)
                )(value);
                rows.append(template);
            });
        } else {
            console.log('no inbound campaign list');
            /*this.noCampaigns();*/
        }

        /*this.$el.removeClass("hide").addClass("show");*/

        
    },

    renderAccountInformation: function(account){
        'use strict';
        console.log('now you are getting it');
        // view cache this
        var account = account,
            fullName,
            name = $('#profile-name'),
            email = $('#profile-email'),
            location = $('#profile-location'),
            company = $('#profile-company'),
            username = $('#profile-username'),
            url = $('#profile-url');

        // assign this variable values

        fullName = fun.utils.format('%s %s', account.get('first_name') || 'First', account.get('last_name') || 'Lastname');

        // get stuff from account profile

        name.html(fullName);
        username.html(account.get('account'));
        email.html(account.get('email') || 'Your email')
        location.html(account.get('location') || 'Mars');
        company.html(account.get('company') || 'UAC');
        url.html(account.get('url') || 'example.com');
    },

    renderOutboundCampaignList: function(campaigns){
        'use strict';
        var length,
            rows,
            template;

        // Yes the lol is with this.campaigns but lets see just what happen 
        if (campaigns) {
            this.outboundCampaigns = campaigns;
        }
        // again with this.shit? what is wrong with you!
        this.listgroup = this.$('#profile-outbound-list');

        // campaigns length
        length = this.outboundCampaigns.length;

        if (length > 0) {
            rows = this.listgroup.html('');
            _.each(this.outboundCampaigns.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.outboundCampaignItem)
                )(value);
                rows.append(template);
            });
        } else {
            console.log('no outbound campaign list');
            /*this.noCampaigns();*/
        }

    },

    renderTaskList: function(tasks){
        'use strict';
        var length,
            rows,
            template;

        // Yes the lol is with this.campaigns but lets see just what happen 
        if (tasks) {
            this.profileTasks = tasks;
        }
        // again with this.shit? what is wrong with you!
        this.taskList = this.$('#profile-task-list');
        console.log('render profile tasks list');

        // campaigns length
        length = this.profileTasks.length;

        if (length > 0) {
            rows = this.taskList.html('');
            _.each(this.profileTasks.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.profileTaskItem)
                )(value);
                rows.append(template);
            });
        } else {
            console.log('no profile contact list');
        }
    },

    renderContactList: function(contacts){
        'use strict';
        var length,
            rows,
            template;

        // Yes the lol is with this.campaigns but lets see just what happen 
        if (contacts) {
            this.profileContacts = contacts;
        }
        // again with this.shit? what is wrong with you!
        this.contactList = this.$('#profile-contact-list');

        // campaigns length
        length = this.profileContacts.length;

        if (length > 0) {
            rows = this.contactList.html('');
            _.each(this.profileContacts.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.profileContactItem)
                )(value);
                rows.append(template);
            });
        } else {
            console.log('no profile contact list');
            /*this.noCampaigns();*/
        }
    },

    oneDay: function(event){
        console.log('one day event');
    },

    threeDays: function(event){
        console.log('three days event');
    },

    oneWeek: function(event){
        console.log('one week event');
    },

    oneMonth: function(event){
        console.log('one month event');
    },

    newContact: function(event){
        console.log('new contact and stuff get the popup in here');
        'use strict';
        event.preventDefault();

        //view cache
        var view = this,
            name;

        $('#profileContactModal').modal({
            'show': true
        });


        this.renderContactModalForm();


        /*name = $(event.target).data('name');

        task = new fun.models.Task({'uuid':name});

        task.fetch({
            success: function(response){

                //console.log(response)

                taskUuid.html(response.get('uuid'));
                taskTitle.html(response.get('title') || "Where's the title boy?");
                taskAssigned.html(response.get('assigned'));
                taskLabel.html(response.get('label'));
                taskSource.html(response.get('source'));
                taskStatus.html(response.get('status'));
                taskPriority.html(response.get('priority'));
                taskSeverity.html(response.get('severity'));
                taskDescription.html(response.get('description'));

                $('#taskModal').modal({
                    'show': true
                });
            },
            error: function(error){
                console.log(error);
            }
        });*/
    },

    showMailingAddressDifferent: function(event){
        var value = $('#mailing-address-different').val();
        if(value===true||value==='true'){
            $('#mailingAddressDifferentDiv').removeClass('hide');
            $('#mailingAddressDifferentDiv').addClass('show');
        } else {
            $('#mailingAddressDifferentDiv').removeClass('show');
            $('#mailingAddressDifferentDiv').addClass('hide');
        }
    },

    changeMaritalStatus: function(event){

        if($('#marital-status').val()==='none'||$('#marital-status').val()==='single'){
            $('#contactSpouseInfoTab').removeClass('show');
            $('#contactSpouseInfoTab').addClass('hide');
        } else {
            $('#contactSpouseInfoTab').removeClass('hide');
            $('#contactSpouseInfoTab').addClass('show');
        }
    },

    healthInsuranceTab: function(event){
        console.log('IN HEALTH INSURANCE!!!',$('#agent-health-insurance-checkbox').val());
        if($('#agent-health-insurance-checkbox').val()==="true"){
            $('#healthInsuranceTab').removeClass('hide');
            $('#healthInsuranceTab').addClass('show');
        } else {
            $('#healthInsuranceTab').removeClass('show');
            $('#healthInsuranceTab').addClass('hide');
        }
    },

    homeInsuranceTab: function(event){
        if($('#agent-home-insurance-checkbox').val()==="true"){
            $('#homeOwnersInsuranceTab').removeClass('hide');
            $('#homeOwnersInsuranceTab').addClass('show');
        } else {
            $('#homeOwnersInsuranceTab').removeClass('show');
            $('#homeOwnersInsuranceTab').addClass('hide');
        }
    },

    autoInsuranceTab: function(event){
        if($('#agent-auto-insurance-checkbox').val()==="true"){
            $('#automobileInsuranceTab').removeClass('hide');
            $('#automobileInsuranceTab').addClass('show');
        } else {
            $('#automobileInsuranceTab').removeClass('show');
            $('#automobileInsuranceTab').addClass('hide');
        }
    },

    lifeInsuranceTab: function(event){
        if($('#agent-life-insurance-checkbox').val()==="true"){
            $('#lifeInsuranceTab').removeClass('hide');
            $('#lifeInsuranceTab').addClass('show');
        } else {
            $('#lifeInsuranceTab').removeClass('show');
            $('#lifeInsuranceTab').addClass('hide');
        }
    },

    ancilliaryInsuranceTab: function(event){
        if($('#agent-ancilliary-insurance-checkbox').val()==="true"){
            $('#ancilliaryInsuranceTab').removeClass('hide');
            $('#ancilliaryInsuranceTab').addClass('show');
        } else {
            $('#ancilliaryInsuranceTab').removeClass('show');
            $('#ancilliaryInsuranceTab').addClass('hide');
        }
    },

    changeNumberChildren: function(event){
        switch($('#agent-number-of-children').val()){

            case '0':
                $('#childrenInfoTab').removeClass('show');
                $('#childrenInfoTab').addClass('hide');
                $('#childrenInfoGroup-1').removeClass('show');
                $('#childrenInfoGroup-1').addClass('hide');
                $('#childrenInfoGroup-2').removeClass('show');
                $('#childrenInfoGroup-2').addClass('hide');
                $('#childrenInfoGroup-3').removeClass('show');
                $('#childrenInfoGroup-3').addClass('hide');
                $('#childrenInfoGroup-4').removeClass('show');
                $('#childrenInfoGroup-4').addClass('hide');
                break;

            case '1':
                $('#childrenInfoTab').removeClass('hide');
                $('#childrenInfoTab').addClass('show');
                $('#childrenInfoGroup-1').removeClass('hide');
                $('#childrenInfoGroup-1').addClass('show');
                break;

            case '2':
                $('#childrenInfoTab').removeClass('hide');
                $('#childrenInfoTab').addClass('show');
                $('#childrenInfoGroup-2').removeClass('hide');
                $('#childrenInfoGroup-2').addClass('show');
                break;

            case '3':
                $('#childrenInfoTab').removeClass('hide');
                $('#childrenInfoTab').addClass('show');
                $('#childrenInfoGroup-3').removeClass('hide');
                $('#childrenInfoGroup-3').addClass('show');
                break;

            case '4':
                $('#childrenInfoTab').removeClass('hide');
                $('#childrenInfoTab').addClass('show');
                $('#childrenInfoGroup-4').removeClass('hide');
                $('#childrenInfoGroup-4').addClass('show');
                break;
        }
    },

    showPaymentTab: function(event){
        if(event.currentTarget.value === 'sold'){
            $('#paymentInfoTab').removeClass('hide');
            $('#paymentInfoTab').addClass('show');
        } else {
            $('#paymentInfoTab').removeClass('show');
            $('#paymentInfoTab').addClass('hide');
        }
    }
});