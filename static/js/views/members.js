fun.views.members = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #signup-btn': 'signup',
        'click .delete-member-popup': 'deleteMember',
    },

    /*
    * Class constructor
    */
    initialize: function(options){
        fun.containers.members = this.$el;
        this.account = localStorage.getItem("username");
        this.context = sessionStorage.getItem("context");
    },

    /*
    * Render view
    */
    render: function(org){
        'use strict';
        var data,
            context,
            template;

        console.log('render members view');

        context = this.context;

        if (org) {
            this.members = org.get("members");
        }

        data = {
            'org': context,
            'name': false,
            'description': false,
            'email': 'example@example.com',
            'location': 'Jupyter',
            'uri': 'http://iofun.io'
        };

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.members)
        )(data);

        this.$el.html(template);
        this.membersList = this.$('#members-list');
        this.$el.removeClass("hide").addClass("show");
        this.renderMemberRows();
    },

    /*
    * Render member rows
    */
    renderMemberRows: function(){
        'use strict';
        
        var i = 0,
            length,
            memberData,
            itemData,
            itemTemplate;

        length = this.members.length;

        if (length > 0){

            // da fuq dude?
            for ( i; i < length; ++i ) {

                memberData = {
                    'member': this.members[i]
                };

                itemData = _.extend(memberData, {i:i+1});

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.memberRow)
                )(itemData);

                this.membersList.append(itemTemplate);
            }
        }
    },

    /*
    * Add member
    */
    addMember: function(event){
        'use strict';
        event.preventDefault();
        var view = this,
            account,
            context,
            membership,
            addUsername,
            membershipPayload,
            rules,
            validationRules,
            validForm,
            form;

        console.log("new member event");
        form = $('#add-member-form');

        rules = {
            rules: {
                add_username: {
                    minlength: 3,
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);
        form.validate(validationRules);
        validForm = form.valid();
        if(validForm){
            this.addUsername = this.$('#add_username');
            account = this.account;
            context = this.context;
            addUsername = this.addUsername.val();
            console.log(account, context, addUsername);
            
            membershipPayload = {
                username: addUsername,
                role: 'member'
            };

            if (account != undefined & addUsername != undefined){
                membershipPayload['account'] = account;
            }

            membership = new fun.models.PutMembership({org:this.context});
            membership.save(membershipPayload, {put: true});

            // Clear the stuff from input
            view.$('#add_username').val('');


        }
    },

    /*
    * Delete member
    */
    deleteMember: function(event){
        'use strict';
        event.preventDefault();
        var username,
            uuid,
            membership;

        // get the name of the element targeted by this event
        username = $(event.target).data('name');

        uuid = $(event.target).data('uuid');

        console.log('antes', username, uuid);

        membership = new fun.models.Membership({
            uuid: uuid,
            username: username,
            org: this.context
        });

        membership.destroy();

        console.log('despues');
    },

    signup: function(event){
        'use strict';
        var signupError,
            account,
            password,
            confirmPassword,
            location = window.location.hostname,
            email,
            view,
            rules,
            validationRules,
            callbacks,
            validForm;
        event.preventDefault();
        signupError = this.$('#signupError');
        account = this.$('#signup_username').val();
        password = this.$('#signup_password').val();
        confirmPassword = this.$('#signup_confirm_password').val();
        email = this.$('#signup_email').val();
        // check if this view stuff is really needed
        view = this;
        // form validation rules
        rules = {
            rules: {
                signup_username: {
                    minlength: 2,
                    required: true
                },
                signup_email: {
                    required: true,
                    email: true
                },
                signup_password: {
                    minlength: 8,
                    required: true
                },
                signup_confirm_password: {
                    required: true,
                    minlength: 8,
                    equalTo: '#signup_password'
                }
            }
        };
        validationRules = $.extend (rules, fun.utils.validationRules);

        $('#signup-form').validate(validationRules);

        // new user account callbacks
        callbacks = {
            success: function(){
                // Clear the stuff from the inputs ;)
                view.$('#signup_username').val('');
                view.$('#signup_email').val('');
                view.$('#signup_password').val('');
                view.$('#signup_confirm_password').val('');
                signupError.removeClass('hide').addClass('show');
                signupError.find('p').html('Employee created!');
                setTimeout(function(){
                    signupError.removeClass('show').addClass('hide');
                    signupError.find('p').html('');
                },3000);
            },

            error: function(model, error){
                // Catch duplicate errors or some random stuff
                signupError.removeClass("hide").addClass("show");
                // TODO: on error add class error and label to the input field
                if (error.responseText.indexOf('account') != -1){
                    signupError.find('p').html('Username is already taken.');
                }
                else if (error.responseText.indexOf('email') != -1){
                    signupError.find('p').html('Email is invalid or already taken.');
                }
                else {
                    signupError.find('p').html('what daa!?');
                }
            }
        };

        // check for a valid form and create the new user account
        validForm = $('#signup-form').valid();
        if (validForm){
            //event.preventDefault();
            this.model = new fun.models.Account();
            this.model.save(
                {
                    account: account,
                    password: password,
                    location: location,
                    email: email
                },
                callbacks
            );
        }
    }
});