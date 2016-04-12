fun.views.footer = Backbone.View.extend({

    events: {
        'change #contact-info-mailing-address-different': 'showMailingAddressDifferent',
        'change #contact-info-marital-status': 'changeMaritalStatus',
        'change #contact-info-home-insurance-checkbox': 'homeInsuranceTab',
        'change #contact-info-health-insurance-checkbox': 'healthInsuranceTab',
        'change #contact-info-auto-insurance-checkbox': 'autoInsuranceTab',
        'change #contact-info-life-insurance-checkbox': 'lifeInsuranceTab',
        'change #contact-info-ancilliary-insurance-checkbox': 'ancilliaryInsuranceTab',
        'change #contact-info-number-of-children': 'changeNumberChildren',
        'change #health-lead-status': 'showPaymentTab',
        'change #home-lead-status': 'showPaymentTab',
        'change #auto-lead-status': 'showPaymentTab',
        'change #life-lead-status': 'showPaymentTab',
        'change #ancilliary-lead-status': 'showPaymentTab'
    },

    initialize : function(options) {
        fun.containers.footer = this.$el;
        fun.omnibus.on("obelix:message", function(){
            console.log('lol con uli');
        }, this);

        fun.omnibus.on("toronja:contact", function(){
            console.log('on footer reacting to fun.omnibus on toronja:contact');                // WTF IS THIS SHIT YOU ??????
        }, this);

        fun.omnibus.on("call:contact", function(){
            this.callActiveContact();
        }, this);
    },

    callActiveContact: function(){
        'use strict';
        var activeContact = JSON.parse(sessionStorage.getItem("active_contact")),
            currentAccount = JSON.parse(localStorage.getItem("profile")),
            outbound,
            struct;

        struct = {
            phone_number: activeContact['phone_number'],
            account: currentAccount['account'],
            caller_id: currentAccount['phone_number'],
            extension: currentAccount['extension']
        };

        console.log(struct);

        $('#callingModal').modal('show');
        this.renderContactModalForm();

        //outbound = new fun.models.Outbound(struct);
        //outbound.save();

    },

    renderContactModalForm: function(){
        'use strict';
        console.log('render contact form');
        var contactModalTabs;
        var template = _.template(
            fun.utils.getTemplate(fun.conf.templates.contactFormModal)
        );
        contactModalTabs = this.$('#hot-contact-modal-tabs');
        contactModalTabs.html(template);
        contactModalTabs.removeClass("hide").addClass("show");
    },

    render: function(){
        var template = _.template(
            fun.utils.getTemplate(fun.conf.templates.footer)
        );

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");
    },

    showIncomingForm: function(event){
        if($('#tabsView').hasClass('hide')){
            $('#tabsView').removeClass('hide');
            $('#tabsView').addClass('show');
            $('#formRegularView').removeClass('show');
            $('#formRegularView').addClass('hide');
        } else {
            $('#tabsView').removeClass('show');
            $('#tabsView').addClass('hide');
            $('#formRegularView').removeClass('hide');
            $('#formRegularView').addClass('show');
        }
    },

    /*
    * Lead Type function
    */
    leadTypeChange: function(event){
        console.log('Contact Type',$('#lead-type').val());
        switch($('#lead-type').val()){
            case 'healthinsurance':
                $('#healthInsuranceTab').removeClass('hide');
                $('#healthInsuranceTab').addClass('show');
                $('#homeOwnersInsuranceTab').removeClass('show');
                $('#homeOwnersInsuranceTab').addClass('hide');
                $('#automobileInsuranceTab').removeClass('show');
                $('#automobileInsuranceTab').addClass('hide');
                $('#healthInsurance').addClass('show');
                $('#healthInsurance').removeClass('hide');
                $('#homeOwnersInsurance').addClass('hide');
                $('#homeOwnersInsurance').removeClass('show');
                $('#automobileInsurance').addClass('hide');
                $('#automobileInsurance').removeClass('show');
                $('#lifeInsuranceTab').addClass('hide');
                $('#lifeInsuranceTab').removeClass('show');
                break;

            case 'homeownersInsurance':
                $('#homeOwnersInsuranceTab').removeClass('hide');
                $('#homeOwnersInsuranceTab').addClass('show');
                $('#healthInsuranceTab').removeClass('show');
                $('#healthInsuranceTab').addClass('hide');
                $('#automobileInsuranceTab').removeClass('show');
                $('#automobileInsuranceTab').addClass('hide');
                $('#homeOwnersInsurance').addClass('show');
                $('#homeOwnersInsurance').removeClass('hide');
                $('#healthInsurance').addClass('hide');
                $('#healthInsurance').removeClass('show');
                $('#automobileInsurance').addClass('hide');
                $('#automobileInsurance').removeClass('show');
                $('#lifeInsuranceTab').addClass('hide');
                $('#lifeInsuranceTab').removeClass('show');
                break;

            case 'autoInsurance':
                $('#automobileInsuranceTab').removeClass('hide');
                $('#automobileInsuranceTab').addClass('show');
                $('#healthInsuranceTab').removeClass('show');
                $('#healthInsuranceTab').addClass('hide');
                $('#homeOwnersInsuranceTab').removeClass('show');
                $('#homeOwnersInsuranceTab').addClass('hide');
                $('#automobileInsurance').addClass('show');
                $('#automobileInsurance').removeClass('hide');
                $('#homeOwnersInsurance').addClass('hide');
                $('#homeOwnersInsurance').removeClass('show');
                $('#healthInsurance').addClass('hide');
                $('#healthInsurance').removeClass('show');
                $('#lifeInsuranceTab').addClass('hide');
                $('#lifeInsuranceTab').removeClass('show');
                break;

            case 'lifeInsurance':
                $('#lifeInsuranceTab').addClass('show');
                $('#lifeInsuranceTab').removeClass('hide');
                $('#automobileInsuranceTab').removeClass('show');
                $('#automobileInsuranceTab').addClass('hide');
                $('#healthInsuranceTab').removeClass('show');
                $('#healthInsuranceTab').addClass('hide');
                $('#homeOwnersInsuranceTab').removeClass('show');
                $('#homeOwnersInsuranceTab').addClass('hide');
                $('#automobileInsurance').addClass('hide');
                $('#automobileInsurance').removeClass('show');
                $('#homeOwnersInsurance').addClass('hide');
                $('#homeOwnersInsurance').removeClass('show');
                $('#healthInsurance').addClass('hide');
                $('#healthInsurance').removeClass('show');
                break;

            case 'indemnity':
                $('#automobileInsuranceTab').removeClass('show');
                $('#automobileInsuranceTab').addClass('hide');
                $('#healthInsuranceTab').removeClass('show');
                $('#healthInsuranceTab').addClass('hide');
                $('#homeOwnersInsuranceTab').removeClass('show');
                $('#homeOwnersInsuranceTab').addClass('hide');
                $('#automobileInsurance').addClass('hide');
                $('#automobileInsurance').removeClass('show');
                $('#homeOwnersInsurance').addClass('hide');
                $('#homeOwnersInsurance').removeClass('show');
                $('#healthInsurance').addClass('hide');
                $('#healthInsurance').removeClass('show');
                $('#lifeInsuranceTab').addClass('hide');
                $('#lifeInsuranceTab').removeClass('show');
                break;

            case 'none':
                $('#automobileInsuranceTab').removeClass('show');
                $('#automobileInsuranceTab').addClass('hide');
                $('#healthInsuranceTab').removeClass('show');
                $('#healthInsuranceTab').addClass('hide');
                $('#homeOwnersInsuranceTab').removeClass('show');
                $('#homeOwnersInsuranceTab').addClass('hide');
                $('#automobileInsurance').addClass('hide');
                $('#automobileInsurance').removeClass('show');
                $('#homeOwnersInsurance').addClass('hide');
                $('#homeOwnersInsurance').removeClass('show');
                $('#healthInsurance').addClass('hide');
                $('#healthInsurance').removeClass('show');
                $('#lifeInsuranceTab').addClass('hide');
                $('#lifeInsuranceTab').removeClass('show');
                break;
        }
    },

    showMailingAddressDifferent: function(event){
        var value = $('#contact-info-mailing-address-different').val();
        if(value===true||value==='true'){
            $('#contact-info-mailingAddressDifferentDiv').removeClass('hide');
            $('#contact-info-mailingAddressDifferentDiv').addClass('show');
            $('#contact-info-mailingAddressDifferentDiv-city').removeClass('hide');
            $('#contact-info-mailingAddressDifferentDiv-city').addClass('show');
            $('#contact-info-mailingAddressDifferentDiv-state').removeClass('hide');
            $('#contact-info-mailingAddressDifferentDiv-state').addClass('show');
            $('#contact-info-mailingAddressDifferentDiv-zipcode').removeClass('hide');
            $('#contact-info-mailingAddressDifferentDiv-zipcode').addClass('show');
        } else {
            $('#contact-info-mailingAddressDifferentDiv').removeClass('show');
            $('#contact-info-mailingAddressDifferentDiv').addClass('hide');
            $('#contact-info-mailingAddressDifferentDiv-city').removeClass('show');
            $('#contact-info-mailingAddressDifferentDiv-city').addClass('hide');
            $('#contact-info-mailingAddressDifferentDiv-state').removeClass('show');
            $('#contact-info-mailingAddressDifferentDiv-state').addClass('hide');
            $('#contact-info-mailingAddressDifferentDiv-zipcode').removeClass('show');
            $('#contact-info-mailingAddressDifferentDiv-zipcode').addClass('hide');
        }
    },

    changeMaritalStatus: function(event){
        if($('#contact-info-marital-status').val()==='married'){
            $('#contactSpouseInfoTab').removeClass('hide');
            $('#contactSpouseInfoTab').addClass('show');
        } else {
            $('#contactSpouseInfoTab').removeClass('show');
            $('#contactSpouseInfoTab').addClass('hide');
        }
    },

    healthInsuranceTab: function(event){
        if(($('#contact-info-health-insurance-checkbox').val()==="true")||($('#contact-info-health-insurance-checkbox').val()===true)){
            $('#healthInsuranceTab').removeClass('hide');
            $('#healthInsuranceTab').addClass('show');
        } else {
            $('#healthInsuranceTab').removeClass('show');
            $('#healthInsuranceTab').addClass('hide');
        }
    },

    homeInsuranceTab: function(event){
        if(($('#contact-info-home-insurance-checkbox').val()==="true")||($('#contact-info-home-insurance-checkbox').val()===true)){
            $('#homeOwnersInsuranceTab').removeClass('hide');
            $('#homeOwnersInsuranceTab').addClass('show');
        } else {
            $('#homeOwnersInsuranceTab').removeClass('show');
            $('#homeOwnersInsuranceTab').addClass('hide');
        }
    },

    autoInsuranceTab: function(event){
        if(($('#contact-info-auto-insurance-checkbox').val()==="true")||($('#contact-info-auto-insurance-checkbox').val()===true)){
            $('#automobileInsuranceTab').removeClass('hide');
            $('#automobileInsuranceTab').addClass('show');
        } else {
            $('#automobileInsuranceTab').removeClass('show');
            $('#automobileInsuranceTab').addClass('hide');
        }
    },

    lifeInsuranceTab: function(event){
        if(($('#contact-info-life-insurance-checkbox').val()==="true")||($('#contact-info-life-insurance-checkbox').val()===true)){
            $('#lifeInsuranceTab').removeClass('hide');
            $('#lifeInsuranceTab').addClass('show');
        } else {
            $('#lifeInsuranceTab').removeClass('show');
            $('#lifeInsuranceTab').addClass('hide');
        }
    },

    ancilliaryInsuranceTab: function(event){
        if(($('#contact-info-ancilliary-insurance-checkbox').val()==="true")||($('#contact-info-ancilliary-insurance-checkbox').val()===true)){
            $('#ancilliaryInsuranceTab').removeClass('hide');
            $('#ancilliaryInsuranceTab').addClass('show');
        } else {
            $('#ancilliaryInsuranceTab').removeClass('show');
            $('#ancilliaryInsuranceTab').addClass('hide');
        }
    },

    changeTabs: function(event){

        switch(event.target.id){
            case 'home-insurance-checkbox':
                if(event.target.checked===true){
                    $('#homeOwnersInsuranceTab').removeClass('hide');
                    $('#homeOwnersInsuranceTab').addClass('show');
                } else {
                    $('#homeOwnersInsuranceTab').removeClass('show');
                    $('#homeOwnersInsuranceTab').addClass('hide');
                }
                break;

            case 'health-insurance-checkbox':
                if(event.target.checked===true){
                    $('#healthInsuranceTab').removeClass('hide');
                    $('#healthInsuranceTab').addClass('show');
                } else {
                    $('#healthInsuranceTab').removeClass('show');
                    $('#healthInsuranceTab').addClass('hide');
                }
                break;

            case 'auto-insurance-checkbox':
                if(event.target.checked===true){
                    $('#automobileInsuranceTab').removeClass('hide');
                    $('#automobileInsuranceTab').addClass('show');
                } else {
                    $('#automobileInsuranceTab').removeClass('show');
                    $('#automobileInsuranceTab').addClass('hide');
                }
                break;

            case 'life-insurance-checkbox':
                if(event.target.checked===true){
                    $('#lifeInsuranceTab').removeClass('hide');
                    $('#lifeInsuranceTab').addClass('show');
                } else {
                    $('#lifeInsuranceTab').removeClass('show');
                    $('#lifeInsuranceTab').addClass('hide');
                }
                break;

            case 'ancilliary-insurance-checkbox':
                if(event.target.checked===true){
                    $('#ancilliaryInsuranceTab').removeClass('hide');
                    $('#ancilliaryInsuranceTab').addClass('show');
                } else {
                    $('#ancilliaryInsuranceTab').removeClass('show');
                    $('#ancilliaryInsuranceTab').addClass('hide');
                }
                break;
        }
    },

    changeNumberChildren: function(event){
        console.log('KIDS!!',$('#contact-info-number-of-children').val(),typeof $('#contact-info-number-of-children').val());
        switch($('#contact-info-number-of-children').val()){

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