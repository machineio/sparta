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
        'click .healthInsuranceTab': 'maeTons',
        'click #close-contact-btn': 'closeContactDetails',
        'click #update-contact-btn': 'updateContactDetails',
        'change #mailing-address-different': 'showMailingAddressDifferent',
        'change #marital-status': 'changeMaritalStatus',
        'change #home-insurance-checkbox': 'changeTabs',
        'change #health-insurance-checkbox': 'changeTabs',
        'change #auto-insurance-checkbox': 'changeTabs',
        'change #life-insurance-checkbox': 'changeTabs',
        'change #ancilliary-insurance-checkbox': 'changeTabs',
    },

    /*
    * Class constructor
    */
    initialize: function(options){
        fun.containers.contacts = this.$el;

        fun.omnibus.on("add:contact", function(){
            this.updateResourceInfo();
        }, this);
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

    /*
    * Render contact lists
    */
    renderContactLists: function(contacts){
        'use strict';
        var template,
            allContacts;
        console.log('render contact lists');
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

    maeTons: function(){
        'use strict';
        console.log('mae tons?');
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
        console.log('render directory lists');
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

        console.log('new contact event');

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
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: newNumber,
                number_type: numberType
            });

            contact.save();
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

        console.log('que pasa?');

        contactUuid = this.$('#contact-uuid');
        contactAccount = this.$('#contact-account');
        contactFirstName = this.$('#contact-first-name');
        contactLastName = this.$('#contact-last-name');
        contactLocation = this.$('#contact-location');
        contactTimezone = this.$('#contact-timezone');
        contactZip = this.$('#contact-zipcode');
        contactPhone = this.$('#contact-phone-number');
        contactTags = this.$('#contact-tags');
        contactEmail = this.$('#contact-email');
        contactAddress = this.$('#contact-address');
        contactCountry = this.$('#contact-country');
        contactChecked = this.$('#contact-checked');
        contactDnd = this.$('#contact-dnd');
        contactCity = this.$('#contact-city');
        contactState = this.$('#contact-state');
        contactStatus = this.$('#task_status');
        contactDescription = this.$('#contact-description');
        contactHistory = this.$('#contact-history');
        contactComment = this.$('#contact-comment');
        contactGender = this.$('#contact-gender');
        contactAutoPriorityCode = this.$('#contact-auto-priority-code');
        leadType = this.$('#lead-type');
        writingAgent = this.$('#writting-agent');
        leadSource = this.$('#lead-source');
        partner = this.$('#partner');
        renewalSource2016 = this.$('#renewal-source-2016');
        renewalAgent2016 = this.$('#renewal-agent-2016');
        presoldProcessor2016 = this.$('#presold-processor-2016');
        scrubber = this.$('#scrubber');
        lastModifiedBy = this.$('#last-modified-by');
        healthWritingAgent = this.$('#healt-writting-agent');
        healthLeadStatus = this.$('#healt-lead-status');
        homeLeadStatus = this.$('#home-lead-status');
        autoLeadStatus = this.$('#auto-lead-status');
        floodLeadStatus = this.$('#flood-lead-status');
        otherPolicySold = this.$('#other-policy-sold');
        dentalLeadStatus = this.$('#dental-lead-status');
        federalDoNotCall = this.$('#federal-do-not-call');
        totalIndividualIncome = this.$('#total-individual-income');
        totalHouseholdIncome = this.$('#total-household-income');
        primaryApplicantsIncomeSources_income_source = this.$('#primary-applicants-income-source');
        primaryApplicantsEmployersName = this.$('#primary-applicants-employers-name');
        applicantEmployersPhoneNumber = this.$('#applicant-employers-phone-number');
        maritalStatus = this.$('#marital -status');
        numberOfDependentChildrenInHouse = this.$('#number-of-dependent-children-in-house');
        spouseFirstName = this.$('#spouse-first-name');
        spouseLastName = this.$('#spouse-last-name');
        spouseGender = this.$('#spouse-gender');
        spouseDOB = this.$('#spouse-dob');
        doYouHaveASocialSecurityNumber = this.$('#do-you-have-a-social-security-number');
        spouseSocial = this.$('#spouse-social');
        spouseYearlyIncome = this.$('#spouse-income-source');
        spouseIncomeSource = this.$('#spouse-yearly-income');
        spouseEmployersName = this.$('#spouse-employers-name');
        spouseEmployersPhoneNumber = this.$('#spouse-employers-phone-number');
        child1Name = this.$('#child-1-name');
        child1Dob = this.$('#child-1-dob');
        child1Gender = this.$('#child-1-gender');
        child1Social = this.$('#child-1-social');
        child2Name = this.$('#child-2-name');
        child2Dob = this.$('#child-2-dob');
        child2Gender = this.$('#child-2-gender');
        child2Social = this.$('#child-2-social');
        child3Name = this.$('#child-3-name');
        child3Dob = this.$('#child-3-dob');
        child3Gender = this.$('#child-3-gender');
        child3Social = this.$('#child-3-social');
        child4Name = this.$('#child-4-name');
        child4Dob = this.$('#child-4-dob');
        child4Gender = this.$('#child-4-gender');
        child4Social = this.$('#child-4-social');
        leadHasAMarketplaceAccount = this.$('#lead-has-a-marketplace-account');
        currentCoverage = this.$('#current-coverage');
        marketplaceAppID2015 = this.$('#marketplace-app-id-2015');
        currentPremium = this.$('#current-premium');
        subsidyAmount = this.$('#subsidy-amount');
        currentNetPremium = this.$('#current-net-premium');
        effectiveDate2015 = this.$('#effective-date-2015');
        applicationId2015 = this.$('#application-id-2015');
        healthPremium2015 = this.$('#health-premium-2015');
        healthCarrier2015 = this.$('#health-carrier-2015');
        subsidy2015 = this.$('#subsidy-2015');
        adultsOnPlan2015 = this.$('#adult-on-plan-2015');
        childrenOnPlan2015 = this.$('#children-on-plan');
        incomeVerificationNeeded = this.$('#income-verification-needed');
        citizenshipDocumentsNeeded = this.$('#citizenship-documents-needed');
        username = this.$('#username');
        password = this.$('#password');
        healthPolicy = this.$('#health-policy');
        agentCode = this.$('#agent-code');
        wantsToRenewSamePlanFor2016 = this.$('#wants-to-renew-same-plan-for-2016');
        quotedRenewalGrossPremium2016 = this.$('#quoted-renewal-gross-premium-2016');
        quotedRenewalSubsidy2016 = this.$('#quoted-renewal-subsidy-2016');
        quotedRenewalNetPremium2016 = this.$('#quoted-renewal-net-premium-2016');
        adultsApplyingForCoverage2016 = this.$('#adults-applying-for-coverage-2016');
        totalHouseholdSize2016 = this.$('#total-household-size-2016');
        cloudGrossPremium2016 = this.$('#cloud-gross-premium-2016');
        childrenApplyingForCoverage2016 = this.$('#children-applying-for-coverage-2016');
        cloudSubsidy2016 = this.$('#cloud-subsidy-2016');
        cloudPremiumAfterSubsidy2016 = this.$('#cloud-premium-after-subsidy-2016');
        binderPaymentOption2016 = this.$('#binder-payment-option-2016');
        PaymentChargeRequestDate = this.$('#payment-charge-request-date');
        creditCardType2016 = this.$('#credit-card-type-2016');
        nameOnCc2016 = this.$('#name-on-cc-2016');
        creditCardNumber2016 = this.$('#credit-card-number-2016');
        ccExpirationDate2016 = this.$('#cc-expiration-date-2016');
        ccCvv2016 = this.$('#cc-cvv-2016');
        bankAccountType2016 = this.$('#bank-account-type-2016');
        bankName2016 = this.$('#bank-name-2016');
        bankRoutingNumber2016 = this.$('#bank-routing-number-2016');
        bankAccountNumber2016 = this.$('#bank-account-number');
        doYouOwnYourHome = this.$('#do-you-own-your-home');
        renewAsIsEmailReceived = this.$('#renew-as-is-email-received');
        languagePreference = this.$('#language-preference');
        firstName = this.$('#first-name');
        lastName = this.$('#last-name');
        phone = this.$('#contact-phone');
        cellPhone = this.$('#cell-phone');
        clientEmail = this.$('#client-email');
        otherPhone = this.$('#other-phone');
        dateOfBirth = this.$('#date-of-birth');
        socialSecurityNumber = this.$('#social-security-number');
        usCitizenOrLegalPermanentResident = this.$('#us-citizen-or-legal-permanent-resident');
        mailingAddress = this.$('#mailing-address');
        state = this.$('#state');
        city = this.$('#city');
        zipCode = this.$('#zip-code');
        mailingAddressDifferent = this.$('#mailing-address-different');
        county = this.$('#county');
        marketplaceEmail = this.$('#marketplace-email');
        propertyAddress = this.$('#property-address');
        propertyCity = this.$('#property-city');
        propertyState = this.$('#property-state');
        propertyZipCode = this.$('#property-zip-code');
        applicationNumber2016 = this.$('application-#-2016');
        effectiveDate2016 = this.$('effective-date-2016');
        marketplacePolicy2016 = this.$('marketplace-policy-2016');
        totalIncomeUsedOnApplication = this.$('total-income-used-on-application');
        finalGrossPremium2016 = this.$('final-gross-premium-2016');
        finalSubsidy2016 = this.$('final-subsidy-2016');
        heatlhPlan2016 = this.$('heatlh-plan-2016');
        finalPremiumAfterSubsidy2016 = this.$('final-premium-after-subsidy-2016');
        verificationDocumentsNeeded2016 = this.$('verification-documents-needed-2016');

        newPurchase = this.$('#new-purchase');
        homeExpDateClosingDate = this.$('#home-exp-date-closing-date');
        occupancyStatus = this.$('#occupancy-status');
        typeOfDwelling = this.$('#type-of-dwelling');
        currentHomeCarrier = this.$('#current-home-carrier');
        currentHomePremium = this.$('#current-home-premium');
        currentDwellingCoverage = this.$('#current-dwelling-coverage');
        yearBuilt = this.$('#year-built');
        squareFtUnderAir = this.$('#square-ft-under-air');
        garage = this.$('#garage');
        constructionType = this.$('#construction-type');
        stories = this.$('#stories');
        ageRoof = this.$('#age-roof');
        roofMaterial = this.$('#roof-material');
        bathrooms = this.$('#bathrooms');
        dog = this.$('#dog');
        pool = this.$('#pool');
        fenceOrScreenEnclosure = this.$('#fence-or-screen-enclosure');
        bankrupcyOrForeclosureInThePastFiveYears = this.$('#bankrupcy-or-Foreclosure-in-the-past-five-years');
        centrallyMonitoredAlarm = this.$('#centrally-monitored-alarm');
        gatedCommunity = this.$('#gated-community');
        howManyClaimsInTheLastFiveYears = this.$('#how-many-claims-in-the-last-five-Years');
        realtorMortgageBroker = this.$('#realtor-mortgage-broker');
        amountOfPersonalProperty = this.$('#amount-of-personal-property');
        numberOfStoriesInTheBuilding = this.$('#number-of-stories-in-the-building');
        whatFloorIsCondoOn = this.$('#what-floor-number-is-condo-on');
        quoteUpdateRequest = this.$('#quote-update-request');
        homePolicyEffectiveDate = this.$('#home-policy-effective-date');
        fourPointIfApplicable = this.$('#four-point-if-applicable');
        quotedHomeCompany = this.$('#quoted-home-company');
        windMit = this.$('#wind-mit');
        quotedHomePremium = this.$('#quoted-home-premium');
        quotedHomeNumber = this.$('#quoted-home-number');
        homePaymentOption = this.$('#home-payment-option');
        mortgageClauseNew = this.$('#mortgage-clause-new');
        loanNumber = this.$('#loan-number');
        homeInsuranceCarrier = this.$('#home-insurance-carrier');
        homeInsurancePremium = this.$('#home-insurance-premium');
        homeInsurancePolicyNumber = this.$('#home-insurance-policy-number');

        currentAutoCarrier = this.$('current-auto-carrier');
        expirationDate = this.$('expiration-date');
        currentAutoPremium = this.$('current-auto-premium');
        currentResidenceType = this.$('current-residence-type');
        driverOneLicense = this.$('driver-one-license-number');
        vehicleOneVin = this.$('vehicle-one-vin');
        vehicleOneYear = this.$('vehicle-one-year');
        vehicleOneMake = this.$('vehicle-one-make');
        vehicleOneModel = this.$('vehicle-one-model');
        driverTwoLicense = this.$('driver-two-license-number');
        vehicleTwoVin = this.$('vehicle-two-vin');
        vehicleTwoYear = this.$('vehicle-two-year');
        vehicleTwoMake = this.$('vehicle-two-make');
        vehicleTwoModel = this.$('vehicle-two-model');
        bodilyInjuryLiability = this.$('bodily-injury-liability');
        propertyDamage = this.$('property-damage');
        uninsuredMotoristLiability = this.$('uninsured-motorist-liability');
        medicalPayments = this.$('medical-payments');
        vehicleOneCompDed = this.$('vehicle-one-comp-ded');
        vehicleOneCollisionDed = this.$('vehicle-one-collision-ded');
        autoOneTowing = this.$('auto-one-towing');
        autoOneRentalCar = this.$('auto-one-rental-car');
        vehicleTwoCompDed = this.$('vehicle-two-comp-ded');
        vehicleTwoCollisionDed = this.$('vehicle-two-collision-ded');
        autoTwoTowing = this.$('auto-two-towing');
        autoTwoRentalCar = this.$('auto-two-rental-car');
        autoQuoteUpdateRequest = this.$('quote-update-request');
        autoPolicyEffectiveDate = this.$('auto-policy-effective-date');
        paymentOption = this.$('payment-option');
        autoPaymentInfo = this.$('auto-payment-info');
        quotedAutoCompany = this.$('quoted-auto-company');
        quotedAutoPremium = this.$('quoted-auto-premium');
        quotedAutoNumber = this.$('quoted-auto-number');
        autoInsuranceCarrier = this.$('auto-insurance-carrier');
        autoInsurancePremium = this.$('auto-insurance-pemium');
        autoInsurancePolicy = this.$('auto-insurance-policy-number');


        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        contact = new fun.models.Contact({'uuid':name});

        console.log(contact.toJSON());

        contact.fetch({
            success: function(response){

                console.log(response.get('uuid'));

                contactUuid.html(response.get('uuid'));
                contactAccount.html(response.get('account'));
                contactFirstName.val(response.get('first_name'));
                contactLastName.val(response.get('last_name'));
                contactLocation.val(response.get('location') || '');
                contactTimezone.val(response.get('time_zone') || '');
                contactZip.val(response.get('zip') || '');
                contactPhone.val(response.get('phone_number'));
                contactTags.html(response.get('tags') || '');
                contactEmail.val(response.get('email') || '');
                contactAddress.val(response.get('address') || '');
                contactCountry.val(response.get('country') || '');
                contactChecked.val(response.get('checked') || '');
                contactDnd.val(response.get('do_not_disturb') || '');
                contactCity.val(response.get('city') || '');
                contactState.val(response.get('state') || '');
                contactStatus.val(response.get('status') || '');
                contactDescription.html(response.get('description') || '');
                contactHistory.html(response.get('history') || '');
                contactComment.val(response.get('comment') || '');

                contactGender.val(response.get('gender') || '');

                contactAutoPriorityCode.val(response.get('auto_priority_code') || 'None')
                

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
    * Update resource information
    */
    updateResourceInfo: function(){
        'use strict';
        var resource,
            resources,
            onSuccess,
            vonCount;

        console.log('executing update resource information');

        resources = {
            contacts: new fun.models.Contacts(),
            directories: new fun.models.Directories()
        };

        onSuccess = function(){
            console.log('donde se queda?');
            if(++vonCount === _.keys(resources).length){
                console.log('da get update resources success!');

                // fun.instances.contacts.renderContactLists(
                //     resources.contacts
                // );

                // fun.instances.contacts.renderDirectoryLists(
                //     resources.directories
                // );
            }
        };

        if(fun.utils.loggedIn()){

            for (resource in resources){
                resources[resource].fetch({
                    success: onSuccess,
                    error: function() {
                        console.log('what the fuck error!');
                    }
                });
            }
            console.log('crashea?');
        } else {
            fun.utils.redirect(fun.conf.hash.login);
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

        if(event.target.checked===true){
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
