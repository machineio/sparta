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


    /*
    * Update Contacts
    */
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
            console.log('CONTACT!!!!!',JSON.stringify(this.contacts.toJSON()[0]));
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


    /*
    * Render Contact Modal Form
    */
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


        //fun.omnibus.trigger("toronja:contact");

        this.renderContactModalForm();


        var view = this,
            name,
            contact,
            contact_uuid,
            contact_account,
            contact_description,
            contact_history,
            contact_comment,
            contact_info_first_name,
            contact_info_last_name,
            contact_info_phone_number,
            contact_info_cellphone,
            contact_info_email,
            contact_info_other_phone,
            contact_info_date_of_birth,
            contact_info_gender,
            contact_info_marital_status,
            contact_info_number_of_children,
            contact_info_social_security_number,
            contact_info_property_address,
            contact_info_state,
            contact_info_city,
            contact_info_zip_code,
            contact_info_county,
            contact_info_mailing_address_different,
            contact_info_mailingAddressDifferentDiv,
            contact_mailing_address,
            contact_info_mailing_city,
            contact_info_mailing_state,
            contact_info_mailing_zipcode,
            contact_info_marketplace_email,
            contact_info_language_preference,
            contact_info_writing_agent,
            contact_info_lead_source,
            contact_info_partner,
            contact_info_last_modified_by,
            contact_info_health_insurance_checkbox,
            contact_info_home_insurance_checkbox,
            contact_info_auto_insurance_checkbox,
            contact_info_life_insurance_checkbox,
            contact_info_ancilliary_insurance_checkbox,
            contact_info_other_policy_sold,
            contact_info_federal_do_not_call,
            contact_info_federal_do_not_call,
            contact_info_renew_as_is_email_received,
            health_us_citizen_or_legal_permanent_resident,
            spouse_first_name,
            spouse_last_name,
            spouse_gender,
            spouse_dob,
            spouse_do_you_have_a_social_security_number,
            spouse_social,
            spouse_income_source,
            spouse_yearly_income,
            spouse_employers_name,
            spouse_employers_phone_number,
            contact_info_child_1_name,
            contact_info_child_1_dob,
            contact_info_child_1_gender,
            contact_info_child_1_social,
            contact_info_child_2_name,
            contact_info_child_2_dob,
            contact_info_child_2_gender,
            contact_info_child_2_social,
            contact_info_child_3_name,
            contact_info_child_3_dob,
            contact_info_child_3_gender,
            contact_info_child_3_social,
            contact_info_child_4_name,
            contact_info_child_4_dob,
            contact_info_child_4_gender,
            contact_info_child_4_social,
            health_auto_priority_code,
            health_lead_type,
            health_priority_code,
            health_lead_source,
            health_partner,
            health_lead_status,
            health_writing_agent,
            health_writing_agent,
            health_scrubber,
            health_total_individual_income,
            health_total_household_income,
            health_primary_applicants_income_source,
            health_primary_applicants_employers_name,
            health_applicant_employers_phone_number,
            health_marital_status,
            health_number_of_dependent_children_in_house,
            health_renewal_source_2016,
            health_renewal_agent_2016,
            health_presold_processor_2016,
            health_application_number_2016_info,
            health_effective_date_2016,
            health_presold_processor_2016,
            health_total_income_used_on_application,
            health_final_gross_premium_2016,
            health_final_subsidy_2016,
            heatlh_plan_2016,
            health_final_premium_after_subsidy_2016,
            health_verification_documents_needed_2016,
            health_verification_documents_due_date_2016,
            health_application_number_2016_selection,
            health_adults_applying_for_coverage_2016,
            health_total_household_size_2016,
            health_cloud_gross_premium_2016,
            health_children_applying_for_coverage_2016,
            health_cloud_subsidy_2016,
            health_cloud_premium_after_subsidy_2016,
            health_lead_has_a_marketplace_account,
            health_current_coverage,
            health_marketplace_app_id_2015,
            health_current_premium,
            health_subsidy_amount,
            health_current_net_premium,
            health_effective_date_2015,
            health_application_id_2015,
            health_premium_2015,
            health_carrier_2015,
            health_subsidy_2015,
            health_adult_on_plan_2015,
            health_children_on_plan_2015,
            health_income_verification_needed_2015,
            health_citizenship_documents_needed_2015,
            health_policy,
            health_contact_code_2015,
            health_wants_to_renew_same_plan_for_2016,
            health_quoted_renewal_gross_premium_2016,
            health_quoted_renewal_subsidy_2016,
            health_quoted_renewal_net_premium_2016,
            health_username,
            health_password,
            home_priority_code,
            home_auto_priority_code,
            home_lead_source,
            home_partner,
            home_insurance_policy_number,
            home_writing_agent,
            home_scrubber,
            home_lead_status,
            home_new_purchase,
            home_exp_date_closing_date,
            home_occupancy_status,
            home_type_of_dwelling,
            home_current_home_carrier,
            home_current_home_premium,
            home_current_dwelling_coverage,
            home_year_built,
            home_square_ft_under_air,
            home_garage,
            home_construction_type,
            home_stories,
            home_number_of_stories_in_the_building,
            home_what_floor_number_is_condo_on,
            home_quote_update_request,
            home_policy_effective_date,
            home_four_point_if_applicable,
            home_quoted_home_company,
            home_wind_mit,
            home_age_roof,
            home_roof_material,
            home_bathrooms,
            home_dog,
            home_pool,
            home_fence_or_screen_enclosure,
            home_bankrupcy_or_Foreclosure_in_the_past_five_years,
            home_centrally_monitored_alarm,
            home_gated_community,
            home_how_many_claims_in_the_last_five_Years,
            home_realtor_mortgage_broker,
            home_amount_of_personal_property,
            home_quoted_home_premium,
            home_quoted_home_number,
            home_payment_option,
            home_mortgage_clause_new,
            home_loan_number,
            home_insurance_carrier,
            home_insurance_premium,
            auto_auto_priority_code,
            auto_priority_code,
            auto_lead_source,
            auto_partner,
            auto_insurance_policy_number,
            auto_lead_status,
            auto_writing_agent,
            auto_scrubber,
            auto_current_auto_carrier,
            auto_expiration_date,
            auto_current_auto_premium,
            auto_current_residence_type,
            auto_driver_one_license_number,
            auto_vehicle_one_vin,
            auto_vehicle_one_year,
            auto_vehicle_one_make,
            auto_vehicle_one_model,
            auto_driver_two_license_number,
            auto_vehicle_two_vin,
            auto_vehicle_two_year,
            auto_vehicle_two_make,
            auto_vehicle_two_model,
            auto_bodily_injury_liability,
            auto_property_damage,
            auto_uninsured_motorist_liability,
            auto_medical_payments,
            auto_vehicle_one_comp_ded,
            auto_vehicle_1_collision_ded,
            auto_1_towing,
            auto_1_rental_car,
            auto_vehicle_2_comp_ded,
            auto_vehicle_2_collision_ded,
            auto_2_towing,
            auto_2_rental_car,
            auto_quote_update_request,
            auto_policy_effective_date,
            auto_payment_option,
            auto_payment_info,
            auto_quoted_auto_company,
            auto_quoted_auto_premium,
            auto_quoted_auto_number,
            auto_insurance_carrier,
            auto_insurance_premium,
            auto_insurance_premium,
            auto_document_needed,
            life_auto_priority_code,
            life_priority_code,
            life_lead_source,
            life_partner,
            life_insurance_policy_number,
            life_lead_status,
            life_writing_agent,
            life_scrubber,
            life_age,
            life_height,
            life_weight,
            life_insurance_type,
            life_term_life_policy_lenght,
            life_desired_amount_of_coverage,
            life_smoke,
            life_major_health_issues_in_relatives,
            life_convicted_of_drunk_driving,
            life_quote_status,
            life_date_paramed_exam_ordered,
            life_monthly_premium,
            life_paramed_company,
            life_application_id_number,
            life_application_status,
            life_application_changes,
            life_after_changes_new_premium,
            life_application_declined_reason,
            ancilliary_auto_priority_code,
            ancilliary_priority_code,
            ancilliary_lead_source,
            ancilliary_partner,
            ancilliary_insurance_policy_number,
            ancilliary_writing_agent,
            ancilliary_scrubber,
            ancilliary_lead_status,
            ancilliary_accident,
            ancilliary_critical_illness,
            ancilliary_hospital_confinement,
            ancilliary_dental_care,
            ancilliary_dental_lead_status,
            ancilliary_ancillary_total,
            ancilliary_abnormal_cancer_screening_test,
            ancilliary_cysts_growths_etc_not_seen_for,
            ancilliary_carotid_artery_stenosis_etc,
            ancilliary_hiv_positive_aids_related_complex_aids,
            ancilliary_multiple_sclerosis_memory_loss_etc,
            ancilliary_abnormal_tests_requiring_follow_up,
            ancilliary_any_non_routine_consultation_scheduled,
            ancilliary_one_or_more_imm_relatives_with_issues,
            ancilliary_two_or_more_imm_relatives_with_issues,
            ancilliary_bening_tumor_hypertension_etc,
            ancilliary_prescription_medication_in_last_three_years,
            ancilliary_disorder_disease_heart_kidney_lungs,
            ancilliary_disease_quad_lou_gehrigs_other_motor,
            ancilliary_alcohol_or_substance_abuse_five_years,
            ancilliary_heart_attack_stroke_transient_ischemic,
            ancilliary_diabetes_type_one_or_two_blood_press_am,
            ancilliary_nursing_home_hospitalized_etc,
            ancilliary_hospitalized_in_the_last_twelve_months,
            ancilliary_diagnosed_or_treated_for_medical_issues,
            ancilliary_pregnant,
            ancilliary_ever_had_a_problem_pregnancy,
            ancilliary_hypertension,
            ancilliary_accident_elite_request_eff_date,
            ancilliary_accident_elite_premium,
            ancilliary_accident_elite_notes,
            ancilliary_critical_care_request_eff_date,
            ancilliary_critial_care_premium,
            ancilliary_critical_care_notes,
            ancilliary_request_eff_date,
            ancilliary_hospital_confinement_premium,
            ancilliary_hospital_confinement_notes,
            ancilliary_dental_request_eff_date,
            ancilliary_dental_care_premium,
            ancilliary_dental_care_notes,
            payment_binder_payment_option,
            payment_payment_charge_request,
            payment_ccredit_card_type,
            payment_name_on_cc,
            payment_credit_card_number,
            payment_cc_expiration_date,
            payment_cc_cvv,
            payment_bank_account_type,
            payment_bank_name,
            payment_bank_routuing_number,
            payment_bank_account_number;


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
        contact_info_child_1_name = this.$("#child-1-name");
        contact_info_child_1_dob = this.$("#child-1-dob");
        contact_info_child_1_gender = this.$("#child-1-gender");
        contact_info_child_1_social = this.$("#child-1-social");
        contact_info_child_2_name = this.$("#child-2-name");
        contact_info_child_2_dob = this.$("#child-2-dob");
        contact_info_child_2_gender = this.$("#child-2-gender");
        contact_info_child_2_social = this.$("#child-2-social");
        contact_info_child_3_name = this.$("#child-3-name");
        contact_info_child_3_dob = this.$("#child-3-dob");
        contact_info_child_3_gender = this.$("#child-3-gender");
        contact_info_child_3_social = this.$("#child-3-social");
        contact_info_child_4_name = this.$("#child-4-name");
        contact_info_child_4_dob = this.$("#child-4-dob");
        contact_info_child_4_gender = this.$("#child-4-gender");
        contact_info_child_4_social = this.$("#child-4-social");
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
        home_priority_code = this.$("#home-priority-code");
        home_auto_priority_code = this.$("#home-auto-priority-code");
        home_lead_source = this.$("#home-lead-source");
        home_partner = this.$("*#home-partner");
        home_insurance_policy_number = this.$("#home-insurance-policy-number");
        home_writing_agent = this.$("#home-writing-agent");
        home_scrubber = this.$("#home-scrubber");
        home_lead_status = this.$("#home-lead-status");
        home_new_purchase = this.$("#home-new-purchase");
        home_exp_date_closing_date = this.$("#home-exp-date-closing-date");
        home_occupancy_status = this.$("#home-occupancy-status");
        home_type_of_dwelling = this.$("#home-type-of-dwelling");
        home_current_home_carrier = this.$("#home-current-home-carrier");
        home_current_home_premium = this.$("#home-current-home-premium");
        home_current_dwelling_coverage = this.$("#home-current-dwelling-coverage");
        home_year_built = this.$("#home-year-built");
        home_square_ft_under_air = this.$("#home-square-ft-under-air");
        home_garage = this.$("#home-garage");
        home_construction_type = this.$("#home-construction-type");
        home_stories = this.$("#home-stories");
        home_number_of_stories_in_the_building = this.$("#home-number-of-stories-in-the-building");
        home_what_floor_number_is_condo_on = this.$("#home-what-floor-number-is-condo-on");
        home_quote_update_request = this.$("#home-quote-update-request");
        home_policy_effective_date = this.$("#home-policy-effective-date");
        home_four_point_if_applicable = this.$("#home-four-point-if-applicable");
        home_quoted_home_company = this.$("#home-quoted-home-company");
        home_wind_mit = this.$("#home-wind-mit");
        home_age_roof = this.$("#home-age-roof");
        home_roof_material = this.$("#home-roof-material");
        home_bathrooms = this.$("#home-bathrooms");
        home_dog = this.$("#home-dog");
        home_pool = this.$("#home-pool");
        home_fence_or_screen_enclosure  = this.$("#home-fence-or-screen-enclosure");
        home_bankrupcy_or_Foreclosure_in_the_past_five_years = this.$("#home-bankrupcy-or-Foreclosure-in-the-past-five-years");
        home_centrally_monitored_alarm = this.$("#home-centrally-monitored-alarm");
        home_gated_community = this.$("#home-gated-community");
        home_how_many_claims_in_the_last_five_Years = this.$("#home-how-many-claims-in-the-last-five-Years");
        home_realtor_mortgage_broker = this.$("#home-realtor-mortgage-broker");
        home_amount_of_personal_property = this.$("#home-amount-of-personal-property");
        home_quoted_home_premium = this.$("#home-quoted-home-premium");
        home_quoted_home_number = this.$("#home-quoted-home-number");
        home_payment_option = this.$("#home-payment-option");
        home_mortgage_clause_new = this.$("#home-mortgage-clause-new");
        home_loan_number = this.$("#home-loan-number");
        home_insurance_carrier = this.$("#home-insurance-carrier");
        home_insurance_premium = this.$("#home-insurance-premium");
        auto_auto_priority_code = this.$("#auto-auto-priority-code");
        auto_priority_code = this.$("#auto-priority-code");
        auto_lead_source = this.$("#auto-lead-source");
        auto_partner = this.$("#auto-partner");
        auto_insurance_policy_number = this.$("#auto-insurance-policy-number");
        auto_lead_status = this.$("#auto-lead-status");
        auto_writing_agent = this.$("#auto-writing-agent");
        auto_scrubber = this.$("#auto-scrubber");
        auto_current_auto_carrier = this.$("#auto-current-auto-carrier");
        auto_expiration_date = this.$("#auto-expiration-date");
        auto_current_auto_premium = this.$("#auto-current-auto-premium");
        auto_current_residence_type = this.$("#auto-current-residence-type");
        auto_driver_one_license_number = this.$("#auto-driver-one-license-number");
        auto_vehicle_one_vin= this.$("#auto-vehicle-one-vin");
        auto_vehicle_one_year = this.$("#auto-vehicle-one-year");
        auto_vehicle_one_make = this.$("#auto-vehicle-one-make");
        auto_vehicle_one_model = this.$("#auto-vehicle-one-model");
        auto_driver_two_license_number = this.$("#auto-driver-two-license-number");
        auto_vehicle_two_vin = this.$("#auto-vehicle-two-vin");
        auto_vehicle_two_year = this.$("#auto-vehicle-two-year");
        auto_vehicle_two_make = this.$("#auto-vehicle-two-make");
        auto_vehicle_two_model = this.$("#auto-vehicle-two-model");
        auto_bodily_injury_liability = this.$("#auto-bodily-injury-liability");
        auto_property_damage= this.$("#auto-property-damage");
        auto_uninsured_motorist_liability = this.$("#auto-uninsured-motorist-liability");
        auto_medical_payments = this.$("#auto-medical-payments");
        auto_vehicle_one_comp_ded = this.$("#auto-vehicle-one-comp-ded");
        auto_vehicle_1_collision_ded = this.$("#auto-vehicle-1-collision-ded");
        auto_1_towing= this.$("#auto-1-towing");
        auto_1_rental_car = this.$("#auto-1-rental-car");
        auto_vehicle_2_comp_ded = this.$("#auto-vehicle-2-comp-ded");
        auto_vehicle_2_collision_ded = this.$("#auto-vehicle-2-collision-ded");
        auto_2_towing = this.$("#auto-2-towing");
        auto_2_rental_car = this.$("#auto-2-rental-car");
        auto_quote_update_request = this.$("#auto-quote-update-request");
        auto_policy_effective_date = this.$("#auto-policy-effective-date");
        auto_payment_option = this.$("#auto-payment-option");
        auto_payment_info = this.$("#auto-payment-info");
        auto_quoted_auto_company = this.$("#auto-quoted-auto-company");
        auto_quoted_auto_premium = this.$("#auto-quoted-auto-premium");
        auto_quoted_auto_number = this.$("#auto-quoted-auto-number");
        auto_insurance_carrier = this.$("#auto-insurance-carrier");
        auto_insurance_premium = this.$("#auto-insurance-premium");
        auto_insurance_premium = this.$("#auto-insurance-premium");
        auto_document_needed = this.$("#auto-document-needed");
        life_auto_priority_code = this.$("#life-auto-priority-code");
        life_priority_code = this.$("#life-priority-code");
        life_lead_source = this.$("#life-lead-source");
        life_partner = this.$("#life-partner");
        life_insurance_policy_number = this.$("#life-insurance-policy-number");
        life_lead_status = this.$("#life-lead-status");
        life_writing_agent = this.$("#life-writing-agent");
        life_scrubber = this.$("#life-scrubber");
        life_age = this.$("#life-age");
        life_height = this.$("#life-height");
        life_weight = this.$("#life-weight");
        life_insurance_type = this.$("#life-insurance-type");
        life_term_life_policy_lenght = this.$("#life-term-life-policy-lenght");
        life_desired_amount_of_coverage = this.$("#life-desired-amount-of-coverage");
        life_smoke = this.$("#life-smoke");
        life_major_health_issues_in_relatives = this.$("#life-major-health-issues-in-relatives");
        life_convicted_of_drunk_driving = this.$("#life-convicted-of-drunk-driving");
        life_quote_status = this.$("#life-quote-status");
        life_date_paramed_exam_ordered = this.$("#life-date-paramed-exam-ordered");
        life_monthly_premium = this.$("#life-monthly-premium");
        life_paramed_company = this.$("#life-paramed-company");
        life_application_id_number = this.$("#life-application-id-number");
        life_application_status = this.$("#life-application-status");
        life_application_changes = this.$("#life-application-changes");
        life_after_changes_new_premium = this.$("#life-after-changes-new-premium");
        life_application_declined_reason = this.$("#life-application-declined-reason");
        ancilliary_auto_priority_code = this.$("#ancilliary-auto-priority-code");
        ancilliary_priority_code = this.$("#ancilliary-priority-code");
        ancilliary_lead_source = this.$("#ancilliary-lead-source");
        ancilliary_partner = this.$("#ancilliary-partner");
        ancilliary_insurance_policy_number = this.$("#ancilliary-insurance-policy-number");
        ancilliary_writing_agent = this.$("#ancilliary-writing-agent");
        ancilliary_scrubber = this.$("#ancilliary-scrubber");
        ancilliary_lead_status = this.$("#ancilliary-lead-status");
        ancilliary_accident = this.$("#ancilliary-accident");
        ancilliary_critical_illness = this.$("#ancilliary-critical-illness");
        ancilliary_hospital_confinement = this.$("#ancilliary-hospital-confinement");
        ancilliary_dental_care = this.$("#ancilliary-dental-care");
        ancilliary_dental_lead_status = this.$("#ancilliary-dental-lead-status");
        ancilliary_ancillary_total = this.$("#ancilliary-ancillary-total");
        ancilliary_abnormal_cancer_screening_test = this.$("#ancilliary-abnormal-cancer-screening-test");
        ancilliary_cysts_growths_etc_not_seen_for = this.$("#ancilliary-cysts-growths-etc-not-seen-for");
        ancilliary_carotid_artery_stenosis_etc = this.$("#ancilliary-carotid-artery-stenosis-etc");
        ancilliary_hiv_positive_aids_related_complex_aids = this.$("#ancilliary-hiv-positive-aids-related-complex-aids");
        ancilliary_multiple_sclerosis_memory_loss_etc = this.$("#ancilliary-multiple-sclerosis-memory-loss-etc");
        ancilliary_abnormal_tests_requiring_follow_up = this.$("#ancilliary-abnormal-tests-requiring-follow-up");
        ancilliary_any_non_routine_consultation_scheduled = this.$("#ancilliary-any-non-routine-consultation-scheduled");
        ancilliary_one_or_more_imm_relatives_with_issues = this.$("#ancilliary-one-or-more-imm-relatives-with-issues");
        ancilliary_two_or_more_imm_relatives_with_issues = this.$("#ancilliary-two-or-more-imm-relatives-with-issues");
        ancilliary_bening_tumor_hypertension_etc = this.$("#ancilliary-bening_tumor-hypertension-etc");
        ancilliary_prescription_medication_in_last_three_years = this.$("#ancilliary-prescription-medication-in-last-three-years");
        ancilliary_disorder_disease_heart_kidney_lungs = this.$("#ancilliary-disorder-disease-heart-kidney-lungs");
        ancilliary_disease_quad_lou_gehrigs_other_motor = this.$("#ancilliary-disease-quad-lou-gehrigs-other-motor");
        ancilliary_alcohol_or_substance_abuse_five_years = this.$("#ancilliary-alcohol-or-substance-abuse-five-years");
        ancilliary_heart_attack_stroke_transient_ischemic = this.$("#ancilliary-heart-attack-stroke-transient-ischemic");
        ancilliary_diabetes_type_one_or_two_blood_press_am = this.$("#ancilliary-diabetes-type-one-or-two-blood-press-am");
        ancilliary_nursing_home_hospitalized_etc = this.$("#ancilliary-nursing-home-hospitalized-etc");
        ancilliary_hospitalized_in_the_last_twelve_months = this.$("#ancilliary-hospitalized-in-the-last-twelve-months");
        ancilliary_diagnosed_or_treated_for_medical_issues = this.$("#ancilliary-diagnosed_or_treated_for_medical_issues");
        ancilliary_pregnant = this.$("#ancilliary-pregnant");
        ancilliary_ever_had_a_problem_pregnancy = this.$("#ancilliary-ever_had_a_problem_pregnancy");
        ancilliary_hypertension = this.$("#ancilliary-hypertension");
        ancilliary_accident_elite_request_eff_date = this.$("#ancilliary-accident-elite-request_eff_date");
        ancilliary_accident_elite_premium = this.$("#ancilliary-accident-elite-premium");
        ancilliary_accident_elite_notes = this.$("#ancilliary-accident-elite-notes");
        ancilliary_critical_care_request_eff_date = this.$("#ancilliary-critical-care-request-eff-date");
        ancilliary_critial_care_premium = this.$("#ancilliary-critial-care-premium");
        ancilliary_critical_care_notes = this.$("#ancilliary-critical-care-notes");
        ancilliary_request_eff_date = this.$("#ancilliary-request-eff-date");
        ancilliary_hospital_confinement_premium = this.$("#ancilliary-hospital-confinement-premium");
        ancilliary_hospital_confinement_notes = this.$("#ancilliary-hospital-confinement-notes");
        ancilliary_dental_request_eff_date = this.$("#ancilliary-dental-request-eff-date");
        ancilliary_dental_care_premium = this.$("#ancilliary-dental-care-premium");
        ancilliary_dental_care_notes = this.$("#ancilliary-dental-care-notes");
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


        console.log(name);

        contact = new fun.models.Contact({'uuid':name});


        contact.fetch({
            success: function(response){


                console.log(response);

                /*
                current_carrier: ""
                current_coverage: ""
                do_not_disturb: false
                dob: "08/02/1967"
                
                employment_status: ""
                
                gender: "Female"
                has_directory: false
                have_coverage: "No"
                language_preference: ""

                marital_status: "Single"
                mobile_number: ""
                number_of_children: "0"
                partner: "precise-shr"
                
                priority_code: ""


                spouse_1_gender: ""
                spouse_dob: ""
                spouse_first_name: ""
                spouse_last_name: ""


                ttl_hse_inc: "0"
                ttl_idv_inc: "0"
                us_citizenship: ""


                zip_code: "34202"


                /*contact_uuid.html(response.get('uuid'));
                contact_account.html(response.get('account'));
                */


                contact_info_marital_status.val(response.get('marital_status').toLowerCase() || '');

                contact_info_city.val(response.get('city') || '');

                contact_info_partner.val(response.get('partner') || '');

                contact_info_first_name.val(response.get('first_name'));
                contact_info_last_name.val(response.get('last_name'));
                contact_info_state.val(response.get('state') || '');
                contact_info_phone_number.val(response.get('phone_number'));
                contact_info_email.val(response.get('email') || '');
                contact_info_gender.val(response.get('gender') || '');
                contact_info_marital_status.val(response.get('marital_status') || '');


                contact_info_property_address.val(response.get('street_address') || '');


                contact_info_child_1_dob.val(response.get('child_1_dob') || '');
                contact_info_child_1_name.val(response.get('child_1_first_name') || '');
                contact_info_child_1_gender.val(response.get('child_1_gender') || '');
                //contact_info_child_1_last_name.val(response.get('child_1_last_name') || '');
                contact_info_child_2_dob.val(response.get('child_2_dob') || '');
                contact_info_child_2_name.val(response.get('child_2_first_name') || '');
                contact_info_child_2_gender.val(response.get('child_2_gender') || '');
                //contact_info_child_2_last_name.val(response.get('child_2_last_name') || '');
                contact_info_child_3_dob.val(response.get('child_3_dob') || '');
                contact_info_child_3_name.val(response.get('child_3_first_name') || '');
                contact_info_child_3_gender.val(response.get('child_3_gender') || '');
                //contact_info_child_3_last_name.val(response.get('child_3_last_name') || '');
                contact_info_child_4_dob.val(response.get('child_4_dob') || '');
                contact_info_child_4_name.val(response.get('child_4_first_name') || '');
                contact_info_child_4_gender.val(response.get('child_4_gender') || '');
                //contact_info_child_4_last_name.val(response.get('child_4_last_name') || '');


                //contact_info_location.val(response.get('location') || '');
                /*contact_info_timezone.val(response.get('time_zone') || '');
                contact_info_zip.val(response.get('zip') || '');
               
                contact_info_tags.html(response.get('tags') || '');
                
                contact_info_address.val(response.get('address') || '');
                contact_info_country.val(response.get('country') || '');
                contact_info_checked.val(response.get('checked') || '');
                contact_info_dnd.val(response.get('do_not_disturb') || '');
                
                
                contact_info_status.val(response.get('status') || '');
                contact_info_description.html(response.get('description') || '');
                contact_info_history.html(response.get('history') || '');
                contact_info_comment.val(response.get('comment') || '');
                

                contact_auto_priority_code.val(response.get('auto_priority_code') || 'None');*/
                
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
                $('#childrenInfoGroup-2').removeClass('show');
                $('#childrenInfoGroup-2').addClass('hide');
                $('#childrenInfoGroup-3').removeClass('show');
                $('#childrenInfoGroup-3').addClass('hide');
                $('#childrenInfoGroup-4').removeClass('show');
                $('#childrenInfoGroup-4').addClass('hide');
                break;

            case '2':
                $('#childrenInfoTab').removeClass('hide');
                $('#childrenInfoTab').addClass('show');
                $('#childrenInfoGroup-1').removeClass('hide');
                $('#childrenInfoGroup-1').addClass('show');
                $('#childrenInfoGroup-2').removeClass('hide');
                $('#childrenInfoGroup-2').addClass('show');
                $('#childrenInfoGroup-3').removeClass('show');
                $('#childrenInfoGroup-3').addClass('hide');
                $('#childrenInfoGroup-4').removeClass('show');
                $('#childrenInfoGroup-4').addClass('hide');
                break;

            case '3':
                $('#childrenInfoTab').removeClass('hide');
                $('#childrenInfoTab').addClass('show');
                $('#childrenInfoGroup-1').removeClass('hide');
                $('#childrenInfoGroup-1').addClass('show');
                $('#childrenInfoGroup-2').removeClass('hide');
                $('#childrenInfoGroup-2').addClass('show');
                $('#childrenInfoGroup-3').removeClass('hide');
                $('#childrenInfoGroup-3').addClass('show');
                $('#childrenInfoGroup-4').removeClass('show');
                $('#childrenInfoGroup-4').addClass('hide');
                break;

            case '4':
                $('#childrenInfoTab').removeClass('hide');
                $('#childrenInfoTab').addClass('show');
                $('#childrenInfoGroup-1').removeClass('hide');
                $('#childrenInfoGroup-1').addClass('show');
                $('#childrenInfoGroup-2').removeClass('hide');
                $('#childrenInfoGroup-2').addClass('show');
                $('#childrenInfoGroup-3').removeClass('hide');
                $('#childrenInfoGroup-3').addClass('show');
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
