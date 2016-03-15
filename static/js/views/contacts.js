fun.views.contacts = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        'change input[type=file]': 'encodeFile',
        'click #upload-csv-btn': 'uploadCSV',
        'click #get-dir-btn': 'getDirectory',
        'click #add-contact-btn': 'addContact',
        'click .contact-popup': 'contactDetails',
        'click #close-contact-btn': 'closeContactDetails',
        'click #update-contact-btn': 'updateContactDetails',
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

    /*
    * Class constructor
    */
    initialize: function(options){
        fun.containers.contacts = this.$el;
    },

    /*
    * Render view
    */
    render: function(){
        'use strict';
        var template;
        console.log('render contacts view');
        if (!this.$el.html()){
            template = _.template(fun.utils.getTemplate(fun.conf.templates.contacts));
            this.$el.html(template);
            // DOM cache stuff on form fields
            this.contactFirstName = this.$('#contact_first_name');
            this.contactLastName = this.$('#contact_last_name');
            this.newPhoneNumber = this.$('#new-phone-number');
            this.newEmail = this.$('#new-email');
            // directory fields
            this.directoryName = this.$('#directory_name');
            this.directoryDescription = this.$('#directory_description');
            // CSV input file
            this.exampleInputFile = this.$('#exampleInputFile');
        }
        this.newPhoneNumber.intlTelInput({
            utilsScript: "static/js/plugins/libphonenumber/utils.js"
        });
        this.$el.removeClass("hide").addClass("show");
        $('#contact-callback').datetimepicker();
    },


    updateContacts: function(){
        'use strict';
        var account = this.account, resource, resources, vonCount = 0, onSuccess;

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

                fun.instances.contacts.renderDirectoryLists(
                    resources.directories
                );
            }
        };

        for (resource in resources){
            resources[resource].fetch({
                success: onSuccess,
                error: function() {
                    console.log('fuck error!');
                }
            });
        }
    },

    /*
    * Render contact lists
    */
    renderContactLists: function(contacts){
        'use strict';
        var template,
            allContacts;
        if (contacts) {
            this.contacts = contacts;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.allContacts)
        );

        allContacts = this.$('#all-contacts-tab');
        allContacts.html(template);

        this.tbody = this.$('#contacts-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderContactRows();
    },

    /*
    * Render contact rows
    */
    renderContactRows: function(){
        'use strict';
        var length,
            rows,
            template;
        length = this.contacts.length;
        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.contacts.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.contactRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noContacts();
        }
    },

    renderContactModalForm: function(){
        'use strict';
        var contactModalTabs;
        var template = _.template(
            fun.utils.getTemplate(fun.conf.templates.contactFormModal)
        );

        contactModalTabs = this.$('#contact-modal-tabs');
        contactModalTabs.html(template);
        contactModalTabs.removeClass("hide").addClass("show");
    },

    /*
    * No contacts
    */
    noContacts: function(){
        'use strict';
        var template,
            noContacts;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noContacts = this.$('#no-contacts');
        noContacts.html(template);
    },

    /*
    * Render directory lists
    */
    renderDirectoryLists: function(directories){
        'use strict';
        var template,
            directoryList;
        if (directories) {
            this.directories = directories;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.directoryList)
        );

        directoryList = this.$('#directories-tab');
        directoryList.html(template);

        this.dtbody = this.$('#directory-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderDirectoryRows();
    },

    /*
    * Render directory rows
    */
    renderDirectoryRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // directory length
        length = this.directories.length;
        if (length > 0){
            rows = this.dtbody.html('');
            _.each(this.directories.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.directoryRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noDirectories();
        }
    },

    /*
    * No directories
    */
    noDirectories: function(){
        'use strict';
        var template,
            noDirectories;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});
        noDirectories = this.$('#no-directories');
        noDirectories.html(template);
    },

    /*
    * Encode File
    */
    encodeFile: function (event) {
        'use strict';
        var file,
            reader;
        file = event.currentTarget.files[0];
        reader = new FileReader();
        this.account = localStorage.getItem("username");
        this.model = new fun.models.Upload();
        reader.onload = function (fileEvent) {
            this.model.set({'data':fileEvent.target.result});
        }.bind(this);
        reader.onerror = function () {
            console.log("error", arguments);
        };
        reader.readAsBinaryString(file);
    },

    /*
    * Upload CSV
    */
    uploadCSV: function(event){
        'use strict';
        var view = this,
            directoryName,
            directoryDescription,
            rules,
            validationRules,
            validForm,
            form,
            upload;

        upload = this.model;
        directoryName = this.directoryName.val();
        directoryDescription = this.directoryDescription.val();

        form = $('#upload-contacts-form');

        rules = {
            rules: {
                directory_name: {
                    minlength: 3,
                    required: true
                },
                uploadFile: {
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){
            // set flag to backend that will handle the upload.
            upload.set({
                'account': fun.utils.format('accounts:%s', this.account),
                'directory_name': fun.utils.format('directories:name:%s', directoryName),
                'directory_description': fun.utils.format('directories:description:%s', directoryDescription),
            });

            upload.save();
            event.preventDefault();
            // clean and handle stuff on background
            view.$('#directory_name').val('');
            view.$('#directory_description').val('');
            view.$('#uploadFile').val('');
        }

    },

    /*
    * Get directory
    */
    getDirectory: function(event){
        event.preventDefault();
        console.log('getDirectory event');
    },

    /*
    * Add contact
    */
    addContact: function(event){
        'use strict';
        event.preventDefault();
        var view = this,
            account = localStorage.getItem("username"),
            firstName,
            lastName,
            newNumber,
            email,
            countryData,
            numberType,
            contact,
            rules,
            validationRules,
            validForm,
            form;

        form = $('#add-contact-form');

        rules = {
            rules: {
                contact_first_name: {
                    minlength: 3,
                    required: true
                },
                contact_last_name: {
                    minlength: 3,
                    required: true
                },
                contact_phone_number: {
                    number: true,
                    required: true
                },
                contact_email: {
                    email: true,
                    minlength: 3,
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){
            firstName = this.contactFirstName.val();
            lastName = this.contactLastName.val();
            email = $('#new-email').val();
            newNumber = this.newPhoneNumber.intlTelInput("getNumber");
            countryData = this.newPhoneNumber.intlTelInput("getSelectedCountryData");
            numberType = this.newPhoneNumber.intlTelInput("getNumberType");

            contact = new fun.models.Contact({
                account: account,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: newNumber,
                number_type: numberType
            });

            contact.save();


            view.listenTo(contact, 'change', view.updateContacts);


            // Clear the stuff from the inputs (=
            view.$('#contact_first_name').val('');
            view.$('#contact_last_name').val('');
            view.$('#new-phone-number').val('');
            view.$('#new-email').val('');
            fun.omnibus.trigger("add:contact");
        }
    },

    /*
    * Contact details
    */
    contactDetails: function(event){
        'use strict';
        event.preventDefault();
        //view cache


        fun.omnibus.trigger("toronja:contact");


        this.renderContactModalForm();
        var view = this,
            name,
            contact,
            contactUuid,
            contactAccount,
            contactFirstName,
            contactLastName,
            contactLocation,
            contactTimezone,
            contactZip,
            contactPhone,
            contactTags,
            contactEmail,
            contactAddress,
            contactCountry,
            contactChecked,
            contactDnd,
            contactCity,
            contactState,
            contactStatus,
            contactDescription,
            contactHistory,
            contactComment,
            contactGender,
            contactAutoPriorityCode,
            autoPriorityCode,
            leadType,
            writingAgent,
            leadSource,
            partner,
            renewalSource2016,
            renewalAgent2016,
            presoldProcessor2016,
            scrubber,
            lastModifiedBy,
            healthWritingAgent,
            healthLeadStatus,
            homeLeadStatus,
            autoLeadStatus,
            floodLeadStatus,
            otherPolicySold,
            dentalLeadStatus,
            federalDoNotCall,
            doYouOwnYourHome,
            renewAsIsEmailReceived,
            languagePreference,
            firstName,
            lastName,
            phone,
            cellPhone,
            clientEmail,
            otherPhone,
            dateOfBirth,
            socialSecurityNumber,
            usCitizenOrLegalPermanentResident,
            mailingAddress,
            state,
            city,
            zipCode,
            mailingAddressDifferent,
            county,
            marketplaceEmail,
            propertyAddress,
            propertyCity,
            propertyState,
            propertyZipCode,
            totalIndividualIncome,
            totalHouseholdIncome,
            primaryApplicantsIncomeSources_income_source,
            primaryApplicantsEmployersName,
            applicantEmployersPhoneNumber,
            maritalStatus,
            numberOfDependentChildrenInHouse,
            spouseFirstName,
            spouseLastName,
            spouseGender,
            spouseDOB,
            doYouHaveASocialSecurityNumber,
            spouseSocial,
            spouseYearlyIncome,
            spouseIncomeSource,
            spouseEmployersName,
            spouseEmployersPhoneNumber,
            child1Name,
            child1Dob,
            child1Gender,
            child1Social,
            child2Name,
            child2Dob,
            child2Gender,
            child2Social,
            child3Name,
            child3Dob,
            child3Gender,
            child3Social,
            child4Name,
            child4Dob,
            child4Gender,
            child4Social,
            leadHasAMarketplaceAccount,
            currentCoverage,
            marketplaceAppID2015,
            currentPremium,
            subsidyAmount,
            currentNetPremium,
            effectiveDate2015,
            applicationId2015,
            healthPremium2015,
            healthCarrier2015,
            subsidy2015,
            adultsOnPlan2015,
            childrenOnPlan2015,
            incomeVerificationNeeded,
            citizenshipDocumentsNeeded,
            username,
            password,
            healthPolicy,
            agentCode,
            wantsToRenewSamePlanFor2016,
            quotedRenewalGrossPremium2016,
            quotedRenewalSubsidy2016,
            quotedRenewalNetPremium2016,
            adultsApplyingForCoverage2016,
            totalHouseholdSize2016,
            cloudGrossPremium2016,
            childrenApplyingForCoverage2016,
            cloudSubsidy2016,
            cloudPremiumAfterSubsidy2016,
            binderPaymentOption2016,
            PaymentChargeRequestDate,
            creditCardType2016,
            nameOnCc2016,
            creditCardNumber2016,
            ccExpirationDate2016,
            ccCvv2016,
            bankAccountType2016,
            bankName2016,
            bankRoutingNumber2016,
            bankAccountNumber2016,

            applicationNumber2016,
            effectiveDate2016,
            marketplacePolicy2016,
            totalIncomeUsedOnApplication,
            finalGrossPremium2016,
            finalSubsidy2016,
            heatlhPlan2016,
            finalPremiumAfterSubsidy2016,
            verificationDocumentsNeeded2016,

            newPurchase,
            homeExpDateClosingDate,
            occupancyStatus,
            typeOfDwelling,
            currentHomeCarrier,
            currentHomePremium,
            currentDwellingCoverage,
            yearBuilt,
            squareFtUnderAir,
            garage,
            constructionType,
            stories,
            ageRoof,
            roofMaterial,
            bathrooms,
            dog,
            pool,
            fenceOrScreenEnclosure,
            bankrupcyOrForeclosureInThePastFiveYears,
            centrallyMonitoredAlarm,
            gatedCommunity,
            howManyClaimsInTheLastFiveYears,
            realtorMortgageBroker,
            amountOfPersonalProperty,
            numberOfStoriesInTheBuilding,
            whatFloorIsCondoOn,
            quoteUpdateRequest,
            homePolicyEffectiveDate,
            fourPointIfApplicable,
            quotedHomeCompany,
            windMit,
            quotedHomePremium,
            quotedHomeNumber,
            homePaymentOption,
            mortgageClauseNew,
            loanNumber,
            homeInsuranceCarrier,
            homeInsurancePremium,
            homeInsurancePolicyNumber,

            currentAutoCarrier,
            expirationDate,
            currentAutoPremium,
            currentResidenceType,
            driverOneLicense,
            vehicleOneVin,
            vehicleOneYear,
            vehicleOneMake,
            vehicleOneModel,
            driverTwoLicense,
            vehicleTwoVin,
            vehicleTwoYear,
            vehicleTwoMake,
            vehicleTwoModel,
            bodilyInjuryLiability,
            propertyDamage,
            uninsuredMotoristLiability,
            medicalPayments,
            vehicleOneCompDed,
            vehicleOneCollisionDed,
            autoOneTowing,
            autoOneRentalCar,
            vehicleTwoCompDed,
            vehicleTwoCollisionDed,
            autoTwoTowing,
            autoTwoRentalCar,
            autoQuoteUpdateRequest,
            autoPolicyEffectiveDate,
            paymentOption,
            autoPaymentInfo,
            quotedAutoCompany,
            quotedAutoPremium,
            quotedAutoNumber,
            autoInsuranceCarrier,
            autoInsurancePremium,
            autoInsurancePolicy;


        contact_uuid = this.$('#contact-uuid');
        contact_account = this.$('#contact-account');
        contact_info_first_name = this.$("#contact-info-first-name");
        contact_info_last_name = this.$("#contact-info-last-name");
        contact_info_phone_number = this.$("#contact-info-phone-number");
        contact_info_cellphone = this.$("#contact-info-cellphone");
        contact_info_email = this.$("#contact-info-email");
        contact_info_other_phone = this.$("#contact-info-other-phone");
        contact_info_date_of_birth = this.$("#contact-info-date-of-birth");
        contact_info_gender = this.$("#contact-info-gender");
        contact_info_marital_status = this.$("#contact-info-marital-status");
        contact_info_number_of_children = this.$("#contact-info-number-of-children");
        contact_info_social_security_number = this.$("#contact-info-social-security-number");
        contact_info_property_address = this.$("#contact-info-property-address");
        contact_info_state = this.$("#contact-info-state");
        contact_info_city = this.$("#contact-info-city");
        contact_info_zip_code = this.$("#contact-info-zip-code");
        contact_info_county = this.$("#contact-info-county");
        contact_info_mailing_address_different = this.$("#contact-info-mailing-address-different");

        contact_mailing_address = this.$("#contact-mailing-address");
        contact_info_mailing_city = this.$("#contact-info-mailing-city");
        contact_info_mailing_state = this.$("#contact-info-mailing-state");
        contact_info_mailing_zipcode = this.$("#contact-info-mailing-zipcode");
        contact_info_marketplace_email = this.$("#contact-info-marketplace-email");
        contact_info_language_preference = this.$("#contact-info-language-preference");
        contact_info_writing_agent = this.$("#contact-info-writing-agent");
        contact_info_lead_source = this.$("#contact-info-lead-source");
        contact_info_partner = this.$("#contact-info-partner");
        contact_info_last_modified_by = this.$("#contact-info-last-modified-by");
        contact_info_health_insurance_checkbox = this.$("#contact-info-health-insurance-checkbox");
        contact_info_home_insurance_checkbox = this.$("#contact-info-home-insurance-checkbox");
        contact_info_auto_insurance_checkbox = this.$("#contact-info-auto-insurance-checkbox");
        contact_info_life_insurance_checkbox = this.$("#contact-info-life-insurance-checkbox");
        contact_info_ancilliary_insurance_checkbox = this.$("#contact-info-ancilliary-insurance-checkbox");
        contact_info_other_policy_sold = this.$("#contact-info-other-policy-sold");
        contact_info_federal_do_not_call = this.$("#contact-info-federal-do-not-call");

        contact_info_renew_as_is_email_received = this.$("#contact-info-renew-as-is-email-received");

        health_us_citizen_or_legal_permanent_resident = this.$("#health-us-citizen-or-legal-permanent-resident");
        spouse_first_name = this.$("#spouse-first-name");
        spouse_last_name = this.$("#spouse-last-name");
        spouse_gender = this.$("#spouse-gender");
        spouse_dob = this.$("#spouse-dob");
        spouse_do_you_have_a_social_security_number = this.$("#spouse-do-you-have-a-social-security-number");
        spouse_social = this.$("#spouse-social");
        spouse_income_source = this.$("#spouse-income-source");
        spouse_yearly_income = this.$("#spouse-yearly-income");
        spouse_employers_name = this.$("#spouse-employers-name");
        spouse_employers_phone_number = this.$("#spouse-employers-phone-number");
        child_1_name = this.$("#child-1-name");
        child_1_dob = this.$("#child-1-dob");
        child_1_gender = this.$("#child-1-gender");
        child_1_social = this.$("#child-1-social");
        child_2_name = this.$("#child-2-name");
        child_2_dob = this.$("#child-2-dob");
        child_2_gender = this.$("#child-2-gender");
        child_2_social = this.$("#child-2-social");
        child_3_name = this.$("#child-3-name");
        child_3_dob = this.$("#child-3-dob");
        child_3_gender = this.$("#child-3-gender");

        child_3_social = this.$("#child-3-social");
        child_4_name = this.$("#child-4-name");
        child_4_dob = this.$("#child-4-dob");
        child_4_gender = this.$("#child-4-gender");
        child_4_social = this.$("#child-4-social");
        health_auto_priority_code = this.$("#health-auto-priority-code");
        health_lead_type = this.$("#health-lead-type");
        health_priority_code = this.$("#health-priority-code");
        health_lead_source = this.$("#health-lead-source");
        health_partner = this.$("#health-partner");
        health_lead_status = this.$("#health-lead-status");
        health_writing_agent = this.$("#health-writing-agent");
        health_scrubber = this.$("#health-scrubber");
        health_total_individual_income = this.$("#health-total-individual-income");
        health_total_household_income = this.$("#health-total-household-income");
        health_primary_applicants_income_source = this.$("#health-primary-applicants-income-source");
        health_primary_applicants_employers_name = this.$("#health-primary-applicants-employers-name");
        health_applicant_employers_phone_number = this.$("#health-applicant-employers-phone-number");
        health_marital_status = this.$("#health-marital-status");
        health_number_of_dependent_children_in_house = this.$("#health-number-of-dependent-children-in-house");
        health_renewal_source_2016 = this.$("#health-renewal-source-2016");
        health_renewal_agent_2016 = this.$("#health-renewal-agent-2016");
        health_presold_processor_2016 = this.$("#health-presold-processor-2016");
        health_application_number_2016_info = this.$("#health-application-number-2016-info");
        health_effective_date_2016 = this.$("#health-effective-date-2016");
        health_presold_processor_2016 = this.$("#health-presold-processor-2016");
        health_total_income_used_on_application = this.$("#health-total-income-used-on-application");
        health_final_gross_premium_2016 = this.$("#health-final-gross-premium-2016");
        health_final_subsidy_2016 = this.$("#health-final-subsidy-2016");
        heatlh_plan_2016 = this.$("#heatlh-plan-2016");
        health_final_premium_after_subsidy_2016 = this.$("#health-final-premium-after-subsidy-2016")
        health_verification_documents_needed_2016 = this.$("#health-verification-documents-needed-2016");
        health_verification_documents_due_date_2016 = this.$("#health-verification-documents-due-date-2016");
        health_application_number_2016_selection = this.$("#health-application-number-2016-selection");
        health_adults_applying_for_coverage_2016 = this.$("#health-adults-applying-for-coverage-2016");
        health_total_household_size_2016 = this.$("#health-total-household-size-2016");
        health_cloud_gross_premium_2016 = this.$("#health-cloud-gross-premium-2016");
        health_children_applying_for_coverage_2016 = this.$("#health-children-applying-for-coverage-2016");
        health_cloud_subsidy_2016 = this.$("#health-cloud-subsidy-2016");
        health_cloud_premium_after_subsidy_2016 = this.$("#health-cloud-premium-after-subsidy-2016");
        health_lead_has_a_marketplace_account = this.$("#health-lead-has-a-marketplace-account");
        health_current_coverage = this.$("#health-current-coverage");
        health_marketplace_app_id_2015 = this.$("#health-marketplace-app-id-2015");
        health_current_premium = this.$("#health-current-premium");
        health_subsidy_amount = this.$("#health-subsidy-amount");
        health_current_net_premium = this.$("#health-current-net-premium");
        health_effective_date_2015 = this.$("#health-effective-date-2015");
        health_application_id_2015 = this.$("#health-application-id-2015");
        health_premium_2015 = this.$("#health-premium-2015");
        health_carrier_2015 = this.$("#health-carrier-2015");
        health_subsidy_2015 = this.$("#health-subsidy-2015");
        health_adult_on_plan_2015 = this.$("#health-adult-on-plan-2015");
        health_children_on_plan_2015 = this.$("#health-children-on-plan-2015");
        health_income_verification_needed_2015 = this.$("#health-income-verification-needed-2015");
        health_citizenship_documents_needed_2015 = this.$("#health-citizenship-documents-needed-2015");
        health_policy = this.$("#health-policy");
        health_contact_code_2015 = this.$("#health-contact-code-2015");
        health_wants_to_renew_same_plan_for_2016 = this.$("#health-wants-to-renew-same-plan-for-2016");
        health_quoted_renewal_gross_premium_2016 = this.$("#health-quoted-renewal-gross-premium-2016");
        health_quoted_renewal_subsidy_2016 = this.$("#health-quoted-renewal-subsidy-2016");
        health_quoted_renewal_net_premium_2016 = this.$("#health-quoted-renewal-net-premium-2016");
        health_username = this.$("#health-username");
        health_password = this.$("#health-password");

        payment_binder_payment_option = this.$("#payment-binder-payment-option");
        payment_payment_charge_request = this.$("#payment-payment-charge-request");
        payment_ccredit_card_type = this.$("#payment-ccredit-card-type");
        payment_name_on_cc = this.$("#payment-name-on-cc");
        payment_credit_card_number = this.$("#payment-credit-card-number");
        payment_cc_expiration_date = this.$("#payment-cc-expiration-date");
        payment_cc_cvv = this.$("#payment-cc-cvv");
        payment_bank_account_type = this.$("#payment-bank-account-type");
        payment_bank_name = this.$("#payment-bank-name");
        payment_bank_routuing_number = this.$("#payment-bank-routuing-number");
        payment_bank_account_number = this.$("#payment-bank-account-number");


        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        contact = new fun.models.Contact({'uuid':name});


        contact.fetch({
            success: function(response){
                contact_uuid.html(response.get('uuid'));
                contact_account.html(response.get('account'));
                contact_info_first_name.val(response.get('first_name'));
                contact_info_last_name.val(response.get('last_name'));
                contact_info_location.val(response.get('location') || '');
                contact_info_timezone.val(response.get('time_zone') || '');
                contact_info_zip.val(response.get('zip') || '');
                contact_info_phone.val(response.get('phone_number'));
                contact_info_tags.html(response.get('tags') || '');
                contact_info_email.val(response.get('email') || '');
                contact_info_address.val(response.get('address') || '');
                contact_info_country.val(response.get('country') || '');
                contact_info_checked.val(response.get('checked') || '');
                contact_info_dnd.val(response.get('do_not_disturb') || '');
                contact_info_city.val(response.get('city') || '');
                contact_info_state.val(response.get('state') || '');
                contact_info_status.val(response.get('status') || '');
                contact_info_description.html(response.get('description') || '');
                contact_info_history.html(response.get('history') || '');
                contact_info_comment.val(response.get('comment') || '');
                contact_info_gender.val(response.get('gender') || '');

                contact_auto_priority_code.val(response.get('auto_priority_code') || 'None');

                $('#contactModal').modal({
                    'show': true
                });
            },
            error: function(error){
                console.log(error);
            }
        });
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

    /*
    * Close contact details
    */
    closeContactDetails: function(){
        'use strict';
        event.preventDefault();
        var view = this;
        $('#contactModal').modal('hide');
    },

    /*
    * Update contact details
    */
    updateContactDetails: function(){
        'use strict';
        event.preventDefault();
        var view = this,
           update,
           address,
           firstName,
           lastName,
           timezone,
           zipcode,
           phoneNumber,
           tags,
           country,
           city,
           callback,
           state,
           status,
           comment,
           contactUuid,
           contactAccount,
           contactStruct,
           newRandomStuff,
           callbacks;

        console.log('update contact details');

        // please cache this stuff for me bb
        this.uuid = this.$('#contact-uuid');
        this.account = this.$('#contact-account');
        this.firstName = this.$('#contact-first-name');
        this.lastName = this.$('#contact-last-name');
        this.timezone = this.$('#contact-timezone');
        this.zipcode = this.$('#contact-zipcode');
        this.phoneNumber = this.$('#contact-phone-number');
        this.tags = this.$('#contact-tags');
        this.country = this.$('#contact-country');
        this.city = this.$('#contact-city');
        this.state = this.$('#contact-state');
        this.status = this.$('#contact-status');
        this.comment = this.$('#contact-comment');
        this.callback = this.$('#contact-callback')

        // now give me the stuff
        contactUuid = this.uuid.text();
        contactAccount = this.account.text();
        lastName = this.lastName.val();
        firstName = this.firstName.val();
        timezone = this.timezone.val();
        zipcode = this.zipcode.val();
        phoneNumber = this.phoneNumber.val();
        // tags = this.tags.val();
        country = this.country.val();
        city = this.city.val();
        state = this.state.val();
        status = this.status.val();
        comment = this.comment.val();
        callback = this.callback.val();

        // put it in a struct
        contactStruct = {
            'uuid': contactUuid,
            'account': contactAccount,
            'first_name': firstName,
            'last_name': lastName,
            'timezone': timezone,
            'zip_code': zipcode,
            'phone_number': phoneNumber,
            // 'tags': tags,
            'country': country,
            'city': city,
            'state': state,
            'status': status,
            'comment': comment,
            'callback': callback
        };

        update = new fun.models.Contact({'uuid':contactUuid});

        // and save!
        update.save(contactStruct, {patch: true});
        $('#contactModal').modal('hide');
    },

    showMailingAddressDifferent: function(event){
        var value = $('#contact-info-mailing-address-different').val();
        if(value===true||value==='true'){
            $('#mailingAddressDifferentDiv').removeClass('hide');
            $('#mailingAddressDifferentDiv').addClass('show');
        } else {
            $('#mailingAddressDifferentDiv').removeClass('show');
            $('#mailingAddressDifferentDiv').addClass('hide');
        }
    },

    changeMaritalStatus: function(event){

        if($('#contact-info-marital-status').val()==='none'||$('#contact-info-marital-status').val()==='single'){
            $('#contactSpouseInfoTab').removeClass('show');
            $('#contactSpouseInfoTab').addClass('hide');
        } else {
            $('#contactSpouseInfoTab').removeClass('hide');
            $('#contactSpouseInfoTab').addClass('show');
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

    changeMaritalStatus: function(event){

        if($('#marital-status').val()==='none'||$('#marital-status').val()==='single'){
            $('#contactSpouseInfoTab').removeClass('show');
            $('#contactSpouseInfoTab').addClass('hide');
        } else {
            $('#contactSpouseInfoTab').removeClass('hide');
            $('#contactSpouseInfoTab').addClass('show');
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
    }
});
