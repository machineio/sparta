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

        function GAconverter(data) {
            var i, total, results = {};
            for(i = 0, total = data.length; i < total; i++) {
                results[+data[i].Hour * 3600 + startTimestamp] = +data[i].Visits;
            }
            return results;
        }
    },


    renderCampaignInboundList: function(campaigns){
        'use strict';
        console.log(campaigns.length);
        console.log('render this campaign inbound list');

        /*var template,
            inboundCampaigns;
        if (campaigns) {
            this.campaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.inboundCampaigns)
        );

        inboundCampaigns = this.$('#inbound-campaigns-tab');

        inboundCampaigns.html(template);*/

        this.listgroup = this.$('#tabs4-pane-inbound > listgroup');

        console.log(this.listgroup);

        /*this.$el.removeClass("hide").addClass("show");*/

        
    },

    renderCampaignOutboundList: function(campaigns){
        console.log('render this campaigns outbound list');
    },

    renderTaskList: function(tasks){
        console.log('render profile tasks list');
    },

    renderContactList: function(contacts){
        console.log('render profile contacts list');
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

        name = $(event.target).data('name');

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
        });
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