fun.views.companies = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        "click #create-company-btn": "createCompany",
        "click .company-popup": "companyDetails",
        "click #update-btn": "updateCompany",
        "click #close-btn": "closePopup",
        "click input[name='company_status']": 'updateStatus'
    },

    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.companies = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        console.log('render tasts view');
        var template;
        if (!this.$el.html()){
            template = _.template(fun.utils.getTemplate(fun.conf.templates.companies));
            this.$el.html(template);
            this.account = this.$('#reg_signup_username');
            this.password = this.$('#reg_signup_password');
            this.email = this.$('#reg_signup_email');
            // check this shit out
            this.companyStatus = this.$('#reg_company_status');
            // big ugly form and stuff
            this.companyName = this.$('#reg_company_name');
            this.streetAddress = this.$('#reg_street_address');
            this.cityTown = this.$('#reg_city_town');
            this.stateProvince = this.$('#reg_state_province');
            this.zipPostal = this.$('#reg_zip_postal');
            this.countryCompany = this.$('#reg_country_company');
            this.dba = this.$('#reg_dba');
            this.telephone = this.$('#reg_telephone');
            this.fax = this.$('#reg_fax');
            this.companyEmail = this.$('#reg_company_email');
            this.incorporatedNumber = this.$('#reg_incorporated_number');
            this.legalCompanyName = this.$('#reg_legal_company_name');
            this.dateOfIncorporation = this.$('#reg_date_incorporation');
            this.incorporatedAddress = this.$('#reg_incorporated_address');
            this.incorporatedStateProvince = this.$('#reg_incorporated_state');
            this.incorporatedCountry = this.$('#reg_incorporated_country');
            this.federalTaxId = this.$('#reg_federal_tax_id');
            this.vatTaxIdFileNumber = this.$('#reg_vat_tax_id');
            this.ifCompanySubsidiaryName = this.$('#reg_subsidiary_name');
            this.ifCompanySubsidiaryRegistrationNum = this.$('#reg_subsidiary_reg_num');
        }
        //this.$el.show();
        this.$el.removeClass("hide").addClass("show");
    },

     /*
    * Render companies list
    */
    renderCompaniesList: function(companies){
        'use strict';
        var template,
            allCompanies;
        console.log('render companies list');
        if (companies) {
            this.companies = companies;
        }
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.allCompanies)
        );
        allCompanies = this.$('#all-companies-tab');
        allCompanies.html(template);
        this.tbody = this.$('#companies-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderCompanyRows();
    },

    /*
    * Render company rows
    */
    renderCompanyRows: function(){
        'use strict';
        var length,
            rows,
            template;
        length = this.companies.length;
        console.log('companies length: ',length);
        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.companies.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.companyRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noCompanies();
        }
    },

    /*
    * No companies
    */
    noCompanies: function(){
        'use strict';
        var template,
            noCompanies;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});
        noCompanies = this.$('#no-companies');
        noCompanies.html(template);
    },

    /*
    * Render active companies list
    */
    renderActiveCompaniesList: function(companies){
        'use strict';
        var template,
            activeCompanies;
        console.log('render active companies list');
        if (companies) {
            this.companies = companies;
        }
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.companiesActiveTab)
        );
        activeCompanies = this.$('#active-companies-tab');
        activeCompanies.html(template);
        this.tbody = this.$('#active-companies-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderActiveCompanyRows();
    },

    /*
    * Render active company rows
    */
    renderActiveCompanyRows: function(){
        'use strict';
        var length,
            rows,
            template;
        length = this.companies.length;
        console.log('active companies length: ',length);
        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.companies.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.companyRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noActiveCompanies();
        }
    },

    /*
    * No active companies
    */
    noActiveCompanies: function(){
        'use strict';
        var template,
            noActiveCompanies;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});
        noActiveCompanies = this.$('#no-active-companies');
        noActiveCompanies.html(template);
    },

    /*
    * Render disable companies list
    */
    renderDisableCompaniesList: function(companies){
        'use strict';
        var template,
            disableCompanies;
        console.log('render disable companies list');
        if (companies) {
            this.companies = companies;
        }
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.companiesDisableTab)
        );
        disableCompanies = this.$('#disable-companies-tab');
        disableCompanies.html(template);
        this.tbody = this.$('#disable-companies-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderDisableCompanyRows();
    },

    /*
    * Render disable company rows
    */
    renderDisableCompanyRows: function(){
        'use strict';
        var length,
            rows,
            template;
        length = this.companies.length;
        console.log('disable companies length: ',length);
        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.companies.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.companyRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noDisableCompanies();
        }
    },

    /*
    * No disable companies
    */
    noDisableCompanies: function(){
        'use strict';
        var template,
            noDisableCompanies;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});
        noDisableCompanies = this.$('#no-disable-companies');
        noDisableCompanies.html(template);
    },

    /*
    * Render suspended companies list
    */
    renderSuspendedCompaniesList: function(companies){
        'use strict';
        var template,
            suspendedCompanies;
        console.log('render suspended companies list');
        if (companies) {
            this.companies = companies;
        }
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.companiesSuspendedTab)
        );
        suspendedCompanies = this.$('#suspended-companies-tab');
        suspendedCompanies.html(template);
        this.tbody = this.$('#suspended-companies-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderSuspendedCompanyRows();
    },

    /*
    * Render suspended company rows
    */
    renderSuspendedCompanyRows: function(){
        'use strict';
        var length,
            rows,
            template;
        length = this.companies.length;
        console.log('suspended companies length: ',length);
        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.companies.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.companyRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noSuspendedCompanies();
        }
    },

    /*
    * No suspended companies
    */
    noSuspendedCompanies: function(){
        'use strict';
        var template,
            noSuspendedCompanies;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});
        noSuspendedCompanies = this.$('#no-suspended-companies');
        noSuspendedCompanies.html(template);
    },


    /*
    * Create company
    */
    createCompany: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this,
            account,
            company,
            companyName,
            companyDescription,
            companyLabel,
            companyPayload,
            profile,
            first_name,
            last_name,
            user;
        console.log('create company event');
        this.companyName = this.$('#company_name');
        this.companyDescription = this.$('#company_description');
        this.companyLabel = 'Service Requests';
        account = this.account;
        companyName = this.companyName.val();
        companyDescription = this.companyDescription.val();
        companyLabel = this.companyLabel;

        companyPayload = {
            title: companyName,
            description: companyDescription,
            label: companyLabel
        };
        profile = JSON.parse(localStorage.getItem("profile"));
        user = new fun.models.User(profile);
        user.fetch()
        console.log(user.get('uuid'));
        console.log(user.get('first_name'));
        if (typeof(user.get('first_name')) === 'undefined'){
            first_name = 'Mauricio'
        } else {
            first_name = user.get('first_name');
        }
        if (typeof(user.get('last_name')) === 'undefined'){
            last_name = 'Montero'
        } else {
            last_name = user.get('last_name');
        }
        companyPayload['first_name'] = first_name;
        companyPayload['last_name'] = last_name;
        companyPayload['email'] = user.get('email');
        console.log(JSON.stringify(profile));

        //if (typeof(account) === undefined){
        //    account = false;
        //    companyPayload['public'] = account;
        //}

        //if (account != undefined & companyName != undefined){
        //    companyPayload['account'] = account;
        //    
        //}

        company = new fun.models.Company(companyPayload);
        company.save();

        $('#newCompanyModal').modal({
            'show': true
        });

        // Clear the stuff from the inputs ;)
        view.$('#company_name').val('');
        view.$('#company_description').val('');
    },

    /*
    * Company details
    */
    companyDetails: function(event){
        'use strict';
        event.preventDefault();
        //view cache
        var view = this,
            account,
            password,
            email,
            company,
            name,
            status,
            companyUuid,
            companyName,
            companyStatus,
            streetAddress,
            cityTown,
            stateProvince,
            zipPostal,
            countryCompany,
            dba,
            telephone,
            fax,
            companyEmail,
            incorporatedNumber,
            legalCompanyName,
            dateOfIncorporation,
            incorporatedStateProvince,
            incorporatedAddress,
            incorporatedNumber,
            incorporatedCountry,
            federalTaxId,
            vatTaxIdFileNumber,
            ifCompanySubsidiaryName,
            ifCompanySubsidiaryRegistrationNum,
            companySeverity;

        account = this.account;
        password = this.password;
        email = this.email;

        companyUuid = this.$('#company-uuid');
        companyStatus = this.companyStatus;

        companyName = this.companyName;
        streetAddress = this.streetAddress
        cityTown = this.cityTown;
        stateProvince = this.stateProvince;
        zipPostal = this.zipPostal;
        countryCompany = this.countryCompany;
        dba = this.dba;
        telephone = this.telephone;
        fax = this.fax;
        companyEmail = this.companyEmail;
        incorporatedNumber = this.incorporatedNumber;
        legalCompanyName = this.legalCompanyName;
        dateOfIncorporation = this.dateOfIncorporation;
        incorporatedStateProvince = this.incorporatedStateProvince;
        incorporatedAddress = this.incorporatedAddress;
        incorporatedNumber = this.incorporatedNumber;
        incorporatedCountry = this.incorporatedCountry;
        federalTaxId = this.federalTaxId;
        vatTaxIdFileNumber = this.vatTaxIdFileNumber;
        ifCompanySubsidiaryName = this.ifCompanySubsidiaryName
        ifCompanySubsidiaryRegistrationNum = this.ifCompanySubsidiaryRegistrationNum;

        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        company = new fun.models.Company({'uuid':name});

        company.fetch({
            success: function(response){

                //password = response.get('password');
                //account = response.get('account');
                //email = response.get('email');

                if (typeof(response.get('status')) === 'undefined'){
                    var stuffStatus = 'disable'
                } else {
                    var stuffStatus = response.get('status');
                }

                companyUuid.html(response.get('uuid'));

                account.html(response.get('account'));
                password.html(response.get('password'));
                email.html(response.get('email'));

                companyName.html(response.get('company_name'));

                companyStatus.html(stuffStatus);

                streetAddress.html(response.get('street_address'));
                cityTown.html(response.get('city_town'));
                stateProvince.html(response.get('state_province'));
                zipPostal.html(response.get('zip_postal'));
                countryCompany.html(response.get('country_company'));
                dba.html(response.get('dba'));
                telephone.html(response.get('telephone'));
                fax.html(response.get('fax'));
                companyEmail.html(response.get('company_email'));
                incorporatedNumber.html(response.get('incorporated_number'));
                legalCompanyName.html(response.get('reg_legal_company_name'));
                //dateOfIncorporation.html(response.get(''));
                incorporatedStateProvince.html(response.get('incorporated_state_province'));
                incorporatedAddress.html(response.get('incorporated_address'));
                incorporatedNumber.html(response.get('incorporated_number'));
                incorporatedCountry.html(response.get('incoportated_country'));
                federalTaxId.html(response.get('federal_tax_id'));
                vatTaxIdFileNumber.html(response.get('vat_tax_id_file_number'));
                ifCompanySubsidiaryName.html(response.get('subsidiary_name'));
                ifCompanySubsidiaryRegistrationNum.html(response.get('subsidiary_reg_num'));

                var tempAccount = {'account':response.get('account'), 'password':response.get('password'), 'email':response.get('email')}
                
                localStorage.setItem('tempAccount', JSON.stringify(tempAccount));

                $('#companyModal').modal({
                    'show': true
                });
            },
            error: function(model, status, error){
                console.log(error, status, model);
                console.log('error getting company uuid:' + name);
            }
        });

        //console.log(company.toJSON());
        //console.log(account, email, password);
    },

    updateCompany: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this;

        console.log('update company');
        $('#companyModal').modal('hide');
    },

    closePopup: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this;

        console.log('close company details popup');
        $('#companyModal').modal('hide');
    },


    updateStatus: function(event){
        'use strict';
        //event.preventDefault();
        var view = this,
                   uuid = this.$('#company-uuid'),
                   idVal,
                   label,
                   status,
                   stuff = JSON.parse(localStorage.getItem('tempAccount')),
                   callbacks;

        console.log('update status');
        
        var account_uuid = uuid.html();
        var account_name = stuff['account'];

        // new user account callbacks
        callbacks = {
            success: function(){
                console.log('new account success');
            },

            error: function(model, error){
                console.log('wrong stuff on account create');
            }
        };

        $('input[name="company_status"]:checked').each(function() {
            idVal = $(this).attr("id");

            label = $("label[for='" + idVal + "']").text();

            status = {'status':label};

            if (label === 'active'){
                this.model = new fun.models.Account();
                this.model.save(
                    {
                        account: stuff['account'],
                        password: stuff['password'],
                        email: stuff['email']
                    },
                    callbacks
                );
                // send alert message by email
                this.alert = new fun.models.Alert();
                this.alert.save(
                    {
                        account: stuff['account'],
                        name: 'Jean Chassoul',
                        email: 'chassoul@gmail.com',
                        body: JSON.stringify(stuff)
                    }
                );

                var update = new fun.models.User({'uuid':account_uuid, 'account': account_name});

                var buenaNota = {
                    'status': label,
                    'uuid': account_uuid
                };

                update.save(buenaNota, {patch: true});

                var companyUpdate = new fun.models.Company({'uuid':account_uuid});
                var malaNota = {
                    'status': label,
                    'uuid': account_uuid
                };

                companyUpdate.save(malaNota, {patch:true});
            };

            if (label === 'disable'){
                

                var update = new fun.models.User({'uuid':account_uuid, 'account': account_name});

                var buenaNota = {
                    'status': label,
                    'uuid': account_uuid
                };

                update.save(buenaNota, {patch: true});

                var companyUpdate = new fun.models.Company({'uuid':account_uuid});
                var malaNota = {
                    'status': label,
                    'uuid': account_uuid
                };

                companyUpdate.save(malaNota, {patch:true});
            };

            if (label === 'suspended'){

                var update = new fun.models.User({'uuid':account_uuid, 'account': account_name});

                var buenaNota = {
                    'status': label,
                    'uuid': account_uuid
                };

                update.save(buenaNota, {patch: true});

                var companyUpdate = new fun.models.Company({'uuid':account_uuid});
                var malaNota = {
                    'status': label,
                    'uuid': account_uuid
                };

                companyUpdate.save(malaNota, {patch:true});
            };

        });


    }

});