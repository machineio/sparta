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
        'click .call-number-popup': 'callPhoneNumber',
        'click .view-contact-popup': 'viewContact',
        'click .edit-contact-popup': 'editContact',
        'click .delete-contact-pupup': 'deleteContact',
        'change #contact-info-mailing-address-different': 'showMailingAddressDifferent',
        'change #contact-info-marital-status': 'changeMaritalStatus',
        'change #contact-info-home-insurance-checkbox': 'homeInsuranceTab',
        'change #contact-info-health-insurance-checkbox': 'healthInsuranceTab',
        'change #contact-info-auto-insurance-checkbox': 'autoInsuranceTab',
        'change #contact-info-life-insurance-checkbox': 'lifeInsuranceTab',
        'change #contact-info-ancilliary-insurance-checkbox': 'ancilliaryInsuranceTab',
        'change #contact-info-marketing-checkbox': 'showMarketingTab',
        'change #contact-info-number-of-children': 'changeNumberChildren',
        'change #health-lead-status': 'showPaymentTab',
        'change #home-lead-status': 'showPaymentTab',
        'change #auto-lead-status': 'showPaymentTab',
        'change #life-lead-status': 'showPaymentTab',
        'change #ancilliary-lead-status': 'showPaymentTab',
        'change #marketing-compliant': 'showSendSMSButton',
        'click #update-task-btn-create': 'saveNewContact',
        'click #update-contact-btn-create': 'saveNewContact',
    },

    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.profile = this.$el;
        var view = this;
    },

    callPhoneNumber: function(event){
        'use strict';
        event.preventDefault();    
        var view = this,
            name_uuid = $(event.target).data('name'),
            stuff = JSON.parse(localStorage.getItem("profile")),
            struct,
            async_callback,
            contact;

        name_uuid = $(event.target).data('name');

        // this stuff is in the fucking profile and we need to fucking trigger fucking something in the footer you fucking son of a bitch,
        // so... lets use the fucking messages and complete and fucking shit you bastard.

        struct = {
            'uuid': name_uuid,
            'account':stuff['account']
        };

        async_callback = {
            success: function(response){
                sessionStorage.setItem("active_contact", JSON.stringify(response));
                fun.messages.trigger("call:contact");

            },
            error: function(error){
                console.log(error);
            }
        };

        contact = new fun.models.Contact(struct);
        contact.fetch(async_callback);
    },

    getDropdownInfo: function(elem,string){
        'use strict';
        var list_of_states,
            options;

        options = {unique:true};
        options[string] = true;

        list_of_states = new fun.models.ContactsContainer();
        list_of_states.fetch({
            data: $.param(options),
            success: function(response){
                var lolazo = response.attributes.results.models;
                _.each(lolazo, function(value){
                    elem.append($("<option />").val(value.toJSON().option).text(value.toJSON().option));
                });
            },
            error: function(response){
                console.log('prueba con alex y tony');
                console.log(response);
            },
        });

        /*console.log('ELEM',$.param(options));
        console.log('COLLECTION!!!',list_of_states.toJSON().results);
        console.log('COLLECTION!!! 2',JSON.stringify(list_of_states.toJSON()));

        console.log('test 3');

        $.each(list_of_states.toJSON().results.models, function() {
            console.log('RESULTS!!!!',this);
            elem.append($("<option />").val(this.uuid).text(this.option));
        });*/
        // console.log(this.getDropdownInfo(contact_info_gender['0'].id).toJSON().results);
        // return list_of_states.toJSON().results.models;
    },

    viewContact: function(event){
        'use strict';
        event.preventDefault();
        console.log('view contact event');
        // view cache
        this.renderContactModalForm();

        function renderDate(date){
            var now = new Date(date);
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            return today;
        }

        var view = this,
            name,
            contact,
            contact_uuid,
            contact_account,
            contact_description,
            contact_history,
            contact_comment;

        $("#profile-contact-modal-tabs :input").prop("disabled", true);

        $('#profileContactModal').modal({
            'show': true
        });

        // CALL THE INPUTS
            var contact_info_first_name = this.$("#contact-info-first-name");
            var contact_info_last_name = this.$("#contact-info-last-name");
            var contact_info_phone_number = this.$("#contact-info-phone-number");
            var contact_info_cellphone = this.$("#contact-info-cellphone");
            var contact_info_email = this.$("#contact-info-email");
            var contact_info_other_phone = this.$("#contact-info-other-phone");
            var contact_info_date_of_birth = this.$("#contact-info-date-of-birth");

            var contact_info_gender = this.$("#contact-info-gender");
            this.getDropdownInfo(contact_info_gender,'contact_info_gender');

            var contact_info_marital_status = this.$("#contact-info-marital-status");
            this.getDropdownInfo(contact_info_marital_status,'contact_info_marital_status');

            var contact_info_number_of_children = this.$("#contact-info-number-of-children");
            this.getDropdownInfo(contact_info_number_of_children,'contact_info_number_of_children');

            var contact_info_social_security_number = this.$("#contact-info-social-security-number");
            var contact_info_property_address = this.$("#contact-info-property-address");

            var contact_info_state = this.$("#contact-info-state");
            this.getDropdownInfo(contact_info_state,'contact_info_state');

            var contact_info_city = this.$("#contact-info-city");
            var contact_info_zip_code = this.$("#contact-info-zip-code");

            var contact_info_country = this.$("#contact-info-country");
            this.getDropdownInfo(contact_info_country,'contact_info_country');

            var contact_info_mailing_address_different = this.$("#contact-info-mailing-address-different");
            this.getDropdownInfo(contact_info_mailing_address_different,'contact_info_mailing_address_different');

            var contact_info_mailing_address = this.$("#contact-info-mailing-address");
            var contact_info_mailing_city = this.$("#contact-info-mailing-city");
            var contact_info_mailing_state = this.$("#contact-info-mailing-state");
            var contact_info_mailing_zipcode = this.$("#contact-info-mailing-zipcode");
            var contact_info_marketplace_email = this.$("#contact-info-marketplace-email");

            var contact_info_language_preference = this.$("#contact-info-language-preference");
            this.getDropdownInfo(contact_info_language_preference,'language_preference');

            var contact_info_writing_agent = this.$("#contact-info-writing-agent");
            this.getDropdownInfo(contact_info_writing_agent,'contact_info_writing_agent');

            var contact_info_lead_source = this.$("#contact-info-lead-source");
            this.getDropdownInfo(contact_info_lead_source,'contact_info_lead_source');

            var contact_info_lead_type = this.$("#contact-info-lead-type");
            this.getDropdownInfo(contact_info_lead_type,'contact_info_lead_type');

            var contact_info_partner = this.$("#contact-info-partner");
            var contact_info_last_modified_by = this.$("#contact-info-last-modified-by");

            var contact_info_health_insurance_checkbox = this.$("#contact-info-health-insurance-checkbox");
            this.getDropdownInfo(contact_info_health_insurance_checkbox,'contact_info_health_insurance_checkbox');
            console.log('DROPDOWN!!!!',contact_info_health_insurance_checkbox);

            var contact_info_home_insurance_checkbox = this.$("#contact-info-home-insurance-checkbox");
            this.getDropdownInfo(contact_info_home_insurance_checkbox,'contact_info_home_insurance_checkbox');

            var contact_info_auto_insurance_checkbox = this.$("#contact-info-auto-insurance-checkbox");
            this.getDropdownInfo(contact_info_auto_insurance_checkbox,'contact_info_auto_insurance_checkbox');

            var contact_info_life_insurance_checkbox = this.$("#contact-info-life-insurance-checkbox");
            this.getDropdownInfo(contact_info_life_insurance_checkbox,'contact_info_life_insurance_checkbox');

            var contact_info_ancilliary_insurance_checkbox = this.$("#contact-info-ancilliary-insurance-checkbox");
            this.getDropdownInfo(contact_info_ancilliary_insurance_checkbox,'ancillary_lead_status');

            var contact_info_other_policy_sold = this.$("#contact-info-other-policy-sold");
            this.getDropdownInfo(contact_info_other_policy_sold,'other_policies_sold');

            var contact_info_federal_do_not_call = this.$("#contact-info-federal-do-not-call");
            this.getDropdownInfo(contact_info_federal_do_not_call,'contact_info_federal_do_not_call');

            var contact_info_do_you_own_your_home = this.$("#contact-info-do-you-own-your-home");
            this.getDropdownInfo(contact_info_do_you_own_your_home,'contact_info_do_you_own_your_home');

            var contact_info_renew_as_is_email_received = this.$("#contact-info-renew-as-is-email-received");
            this.getDropdownInfo(contact_info_renew_as_is_email_received,'contact_info_renew_as_is_email_received');

            var health_us_citizen_or_legal_permanent_resident = this.$("#health-us-citizen-or-legal-permanent-resident");
            this.getDropdownInfo(health_us_citizen_or_legal_permanent_resident,'us_citizen_or_legal_permanent_resident');

            var spouse_first_name = this.$("#spouse-first-name");
            var spouse_last_name = this.$("#spouse-last-name");

            var spouse_gender = this.$("#spouse-gender");
            this.getDropdownInfo(spouse_gender,'contact_info_gender');

            var spouse_dob = this.$("#spouse-dob");
            this.getDropdownInfo(spouse_dob,'contact_info_gender');

            var spouse_do_you_have_a_social_security_number = this.$("#spouse-do-you-have-a-social-security-number");
            this.getDropdownInfo(spouse_do_you_have_a_social_security_number,'spouse_do_you_have_a_social_security_number');

            var spouse_social = this.$("#spouse-social");
            var spouse_income_source = this.$("#spouse-income-source");
            var spouse_yearly_income = this.$("#spouse-yearly-income");
            var spouse_employers_name = this.$("#spouse-employers-name");
            var spouse_employers_phone_number = this.$("#spouse-employers-phone-number");
            var contact_info_child_1_name = this.$("#child-1-name");
            var contact_info_child_1_dob = this.$("#child-1-dob");
            var contact_info_child_1_gender = this.$("#child-1-gender");
            var contact_info_child_1_social = this.$("#child-1-social");
            var contact_info_child_2_name = this.$("#child-2-name");
            var contact_info_child_2_dob = this.$("#child-2-dob");
            var contact_info_child_2_gender = this.$("#child-2-gender");
            var contact_info_child_2_social = this.$("#child-2-social");
            var contact_info_child_3_name = this.$("#child-3-name");
            var contact_info_child_3_dob = this.$("#child-3-dob");
            var contact_info_child_3_gender = this.$("#child-3-gender");
            var contact_info_child_3_social = this.$("#child-3-social");
            var contact_info_child_4_name = this.$("#child-4-name");
            var contact_info_child_4_dob = this.$("#child-4-dob");
            var contact_info_child_4_gender = this.$("#child-4-gender");
            var contact_info_child_4_social = this.$("#child-4-social");

            var health_auto_priority_code = this.$("#health-auto-priority-code");
            this.getDropdownInfo(health_auto_priority_code,'health_auto_priority_code');

            var health_priority_code = this.$("#health-priority-code");
            this.getDropdownInfo(health_priority_code,'health_priority_code');

            var health_lead_source = this.$("#health-lead-source");
            this.getDropdownInfo(health_lead_source,'health_lead_source');

            var health_partner = this.$("#health-partner");
            this.getDropdownInfo(health_partner,'contact_info_gender');

            var health_lead_status = this.$("#health-lead-status");
            this.getDropdownInfo(health_lead_status,'health_lead_status');

            var health_writing_agent = this.$("#health-writing-agent");
            this.getDropdownInfo(health_writing_agent,'health_writing_agent');

            var health_scrubber = this.$("#health-scrubber");
            this.getDropdownInfo(health_scrubber,'health_scrubber');

            var health_total_individual_income = this.$("#health-total-individual-income");
            var health_total_household_income = this.$("#health-total-household-income");
            var health_primary_applicants_income_source = this.$("#health-primary-applicants-income-source");
            var health_primary_applicants_employers_name = this.$("#health-primary-applicants-employers-name");
            var health_applicant_employers_phone_number = this.$("#health-applicant-employers-phone-number");

            var health_marital_status = this.$("#health-marital-status");
            this.getDropdownInfo(health_marital_status,'contact_info_marital_status');

            var health_number_of_dependent_children_in_house = this.$("#health-number-of-dependent-children-in-house");
            this.getDropdownInfo(health_number_of_dependent_children_in_house,'number_of_children');

            var health_renewal_source_2016 = this.$("#health-renewal-source-2016");
            this.getDropdownInfo(health_renewal_source_2016,'health_renewal_source_2016');

            var health_renewal_agent_2016 = this.$("#health-renewal-agent-2016");
            this.getDropdownInfo(health_renewal_agent_2016,'renewal_submitter_2016');

            var health_presold_processor_2016 = this.$("#health-presold-processor-2016");
            this.getDropdownInfo(health_presold_processor_2016,'presold_processor_2016');

            var health_application_number_2016_info = this.$("#health-application-number-2016-info");
            var health_effective_date_2016 = this.$("#health-effective-date-2016");
            var health_total_income_used_on_application = this.$("#health-total-income-used-on-application");
            var health_final_gross_premium_2016 = this.$("#health-final-gross-premium-2016");
            var health_final_subsidy_2016 = this.$("#health-final-subsidy-2016");
            var heatlh_plan_2016 = this.$("#heatlh-plan-2016");
            var health_final_premium_after_subsidy_2016 = this.$("#health-final-premium-after-subsidy-2016");

            var health_verification_documents_needed_2016 = this.$("#health-verification-documents-needed-2016");
            this.getDropdownInfo(health_verification_documents_needed_2016,'health_verification_documents_needed_2016');

            var health_verification_documents_due_date_2016 = this.$("#health-verification-documents-due-date-2016");
            var health_application_number_2016_selection = this.$("#health-application-number-2016-selection");

            var health_adults_applying_for_coverage_2016 = this.$("#health-adults-applying-for-coverage-2016");
            this.getDropdownInfo(health_adults_applying_for_coverage_2016,'health_adults_applying_for_coverage_2016');

            var health_total_household_size_2016 = this.$("#health-total-household-size-2016");
            this.getDropdownInfo(health_total_household_size_2016,'health_total_household_size_2016');

            var health_cloud_gross_premium_2016 = this.$("#health-cloud-gross-premium-2016");
            this.getDropdownInfo(health_cloud_gross_premium_2016,'health_cloud_gross_premium_2016');

            var health_children_applying_for_coverage_2016 = this.$("#health-children-applying-for-coverage-2016");
            var health_cloud_subsidy_2016 = this.$("#health-cloud-subsidy-2016");
            var health_cloud_premium_after_subsidy_2016 = this.$("#health-cloud-premium-after-subsidy-2016");

            var health_lead_has_a_marketplace_account = this.$("#health-lead-has-a-marketplace-account");
            this.getDropdownInfo(health_lead_has_a_marketplace_account,'health_lead_has_a_marketplace_account');

            var health_current_coverage = this.$("#health-current-coverage");
            this.getDropdownInfo(health_current_coverage,'health_current_coverage');

            var health_marketplace_app_id_2015 = this.$("#health-marketplace-app-id-2015");
            var health_current_premium = this.$("#health-current-premium");
            var health_subsidy_amount = this.$("#health-subsidy-amount");
            var health_current_net_premium = this.$("#health-current-net-premium");
            // var health_effective_date_2015 = this.$("#health-effective-date-2015");
            // var health_application_id_2015 = this.$("#health-application-id-2015");
            // var health_premium_2015 = this.$("#health-premium-2015");

            // var health_carrier_2015 = this.$("#health-carrier-2015");
            // this.getDropdownInfo(health_carrier_2015,'health_carrier_2015');

            // var health_subsidy_2015 = this.$("#health-subsidy-2015");
            // this.getDropdownInfo(health_subsidy_2015,'health_subsidy_2015');

            // var health_adult_on_plan_2015 = this.$("#health-adult-on-plan-2015");
            // this.getDropdownInfo(health_adult_on_plan_2015,'health_adult_on_plan_2015');

            // var health_children_on_plan_2015 = this.$("#health-children-on-plan-2015");
            // this.getDropdownInfo(health_children_on_plan_2015,'health_children_on_plan_2015');

            // var health_income_verification_needed_2015 = this.$("#health-income-verification-needed-2015");
            // this.getDropdownInfo(health_income_verification_needed_2015,'health_income_verification_needed_2015');

            // var health_citizenship_documents_needed_2015 = this.$("#health-citizenship-documents-needed-2015");
            // this.getDropdownInfo(health_citizenship_documents_needed_2015,'health_citizenship_documents_needed_2015');

            var health_policy = this.$("#health-policy-2016");
            this.getDropdownInfo(health_policy,'health_policy');

            // var health_contact_code_2015 = this.$("#health-contact-code-2015");
            // this.getDropdownInfo(health_contact_code_2015,'health_contact_code_2015');

            var health_wants_to_renew_same_plan_for_2016 = this.$("#health-wants-to-renew-same-plan-for-2016");
            this.getDropdownInfo(health_wants_to_renew_same_plan_for_2016,'health_wants_to_renew_same_plan_for_2016');

            var health_quoted_renewal_gross_premium_2016 = this.$("#health-quoted-renewal-gross-premium-2016");
            var health_quoted_renewal_subsidy_2016 = this.$("#health-quoted-renewal-subsidy-2016");
            var health_quoted_renewal_net_premium_2016 = this.$("#health-quoted-renewal-net-premium-2016");
            var health_username = this.$("#health-username");
            var health_password = this.$("#health-password");
            var home_priority_code = this.$("#home-priority-code");
            var home_auto_priority_code = this.$("#home-auto-priority-code");
            var home_lead_source = this.$("#home-lead-source");
            var home_partner = this.$("*#home-partner");
            var home_insurance_policy_number = this.$("#home-insurance-policy-number");
            var home_writing_agent = this.$("#home-writing-agent");
            var home_scrubber = this.$("#home-scrubber");
            var home_lead_status = this.$("#home-lead-status");
            var home_new_purchase = this.$("#home-new-purchase");
            var home_exp_date_closing_date = this.$("#home-exp-date-closing-date");
            var home_occupancy_status = this.$("#home-occupancy-status");
            var home_type_of_dwelling = this.$("#home-type-of-dwelling");
            var home_current_home_carrier = this.$("#home-current-home-carrier");
            var home_current_home_premium = this.$("#home-current-home-premium");
            var home_current_dwelling_coverage = this.$("#home-current-dwelling-coverage");
            var home_year_built = this.$("#home-year-built");
            var home_square_ft_under_air = this.$("#home-square-ft-under-air");
            var home_garage = this.$("#home-garage");
            var home_construction_type = this.$("#home-construction-type");
            var home_stories = this.$("#home-stories");
            var home_number_of_stories_in_the_building = this.$("#home-number-of-stories-in-the-building");
            var home_what_floor_number_is_condo_on = this.$("#home-what-floor-number-is-condo-on");
            var home_quote_update_request = this.$("#home-quote-update-request");
            var home_policy_effective_date = this.$("#home-policy-effective-date");
            var home_four_point_if_applicable = this.$("#home-four-point-if-applicable");
            var home_quoted_home_company = this.$("#home-quoted-home-company");
            var home_wind_mit = this.$("#home-wind-mit");
            var home_age_roof = this.$("#home-age-roof");
            var home_roof_material = this.$("#home-roof-material");
            var home_bathrooms = this.$("#home-bathrooms");
            var home_dog = this.$("#home-dog");
            var home_pool = this.$("#home-pool");
            var home_fence_or_screen_enclosure  = this.$("#home-fence-or-screen-enclosure");
            var home_bankrupcy_or_Foreclosure_in_the_past_five_years = this.$("#home-bankrupcy-or-Foreclosure-in-the-past-five-years");
            var home_centrally_monitored_alarm = this.$("#home-centrally-monitored-alarm");
            var home_gated_community = this.$("#home-gated-community");
            var home_how_many_claims_in_the_last_five_Years = this.$("#home-how-many-claims-in-the-last-five-Years");
            var home_realtor_mortgage_broker = this.$("#home-realtor-mortgage-broker");
            var home_amount_of_personal_property = this.$("#home-amount-of-personal-property");
            var home_quoted_home_premium = this.$("#home-quoted-home-premium");
            var home_quoted_home_number = this.$("#home-quoted-home-number");
            var home_payment_option = this.$("#home-payment-option");
            var home_mortgage_clause_new = this.$("#home-mortgage-clause-new");
            var home_loan_number = this.$("#home-loan-number");
            var home_insurance_carrier = this.$("#home-insurance-carrier");
            var home_insurance_premium = this.$("#home-insurance-premium");
            var auto_auto_priority_code = this.$("#auto-auto-priority-code");
            var auto_priority_code = this.$("#auto-priority-code");
            var auto_lead_source = this.$("#auto-lead-source");
            var auto_partner = this.$("#auto-partner");
            var auto_insurance_policy_number = this.$("#auto-insurance-policy-number");
            var auto_lead_status = this.$("#auto-lead-status");
            var auto_writing_agent = this.$("#auto-writing-agent");
            var auto_scrubber = this.$("#auto-scrubber");
            var auto_current_auto_carrier = this.$("#auto-current-auto-carrier");
            var auto_expiration_date = this.$("#auto-expiration-date");
            var auto_current_auto_premium = this.$("#auto-current-auto-premium");
            var auto_current_residence_type = this.$("#auto-current-residence-type");
            var auto_driver_one_license_number = this.$("#auto-driver-one-license-number");
            var auto_vehicle_one_vin= this.$("#auto-vehicle-one-vin");
            var auto_vehicle_one_year = this.$("#auto-vehicle-one-year");
            var auto_vehicle_one_make = this.$("#auto-vehicle-one-make");
            var auto_vehicle_one_model = this.$("#auto-vehicle-one-model");
            var auto_driver_two_license_number = this.$("#auto-driver-two-license-number");
            var auto_vehicle_two_vin = this.$("#auto-vehicle-two-vin");
            var auto_vehicle_two_year = this.$("#auto-vehicle-two-year");
            var auto_vehicle_two_make = this.$("#auto-vehicle-two-make");
            var auto_vehicle_two_model = this.$("#auto-vehicle-two-model");
            var auto_bodily_injury_liability = this.$("#auto-bodily-injury-liability");
            var auto_property_damage= this.$("#auto-property-damage");
            var auto_uninsured_motorist_liability = this.$("#auto-uninsured-motorist-liability");
            var auto_medical_payments = this.$("#auto-medical-payments");
            var auto_vehicle_one_comp_ded = this.$("#auto-vehicle-one-comp-ded");
            var auto_vehicle_1_collision_ded = this.$("#auto-vehicle-1-collision-ded");
            var auto_1_towing= this.$("#auto-1-towing");
            var auto_1_rental_car = this.$("#auto-1-rental-car");
            var auto_vehicle_2_comp_ded = this.$("#auto-vehicle-2-comp-ded");
            var auto_vehicle_2_collision_ded = this.$("#auto-vehicle-2-collision-ded");
            var auto_2_towing = this.$("#auto-2-towing");
            var auto_2_rental_car = this.$("#auto-2-rental-car");
            var auto_quote_update_request = this.$("#auto-quote-update-request");
            var auto_policy_effective_date = this.$("#auto-policy-effective-date");
            var auto_payment_option = this.$("#auto-payment-option");
            var auto_payment_info = this.$("#auto-payment-info");
            var auto_quoted_auto_company = this.$("#auto-quoted-auto-company");
            var auto_quoted_auto_premium = this.$("#auto-quoted-auto-premium");
            var auto_quoted_auto_number = this.$("#auto-quoted-auto-number");
            var auto_insurance_carrier = this.$("#auto-insurance-carrier");
            var auto_insurance_premium = this.$("#auto-insurance-premium");
            var auto_document_needed = this.$("#auto-document-needed");
            var life_auto_priority_code = this.$("#life-auto-priority-code");
            var life_priority_code = this.$("#life-priority-code");
            var life_lead_source = this.$("#life-lead-source");
            var life_partner = this.$("#life-partner");
            var life_insurance_policy_number = this.$("#life-insurance-policy-number");
            var life_lead_status = this.$("#life-lead-status");
            var life_writing_agent = this.$("#life-writing-agent");
            var life_scrubber = this.$("#life-scrubber");
            var life_age = this.$("#life-age");
            var life_height = this.$("#life-height");
            var life_weight = this.$("#life-weight");
            var life_insurance_type = this.$("#life-insurance-type");
            var life_term_life_policy_lenght = this.$("#life-term-life-policy-lenght");
            var life_desired_amount_of_coverage = this.$("#life-desired-amount-of-coverage");
            var life_smoke = this.$("#life-smoke");
            var life_major_health_issues_in_relatives = this.$("#life-major-health-issues-in-relatives");
            var life_convicted_of_drunk_driving = this.$("#life-convicted-of-drunk-driving");
            var life_quote_status = this.$("#life-quote-status");
            var life_date_paramed_exam_ordered = this.$("#life-date-paramed-exam-ordered");
            var life_monthly_premium = this.$("#life-monthly-premium");
            var life_paramed_company = this.$("#life-paramed-company");
            var life_application_id_number = this.$("#life-application-id-number");
            var life_application_status = this.$("#life-application-status");
            var life_application_changes = this.$("#life-application-changes");
            var life_after_changes_new_premium = this.$("#life-after-changes-new-premium");
            var life_application_declined_reason = this.$("#life-application-declined-reason");
            var ancilliary_auto_priority_code = this.$("#ancilliary-auto-priority-code");
            var ancilliary_priority_code = this.$("#ancilliary-priority-code");
            var ancilliary_lead_source = this.$("#ancilliary-lead-source");
            var ancilliary_partner = this.$("#ancilliary-partner");
            var ancilliary_insurance_policy_number = this.$("#ancilliary-insurance-policy-number");
            var ancilliary_writing_agent = this.$("#ancilliary-writing-agent");
            var ancilliary_scrubber = this.$("#ancilliary-scrubber");
            var ancilliary_lead_status = this.$("#ancilliary-lead-status");
            var ancilliary_accident = this.$("#ancilliary-accident");
            var ancilliary_critical_illness = this.$("#ancilliary-critical-illness");
            var ancilliary_hospital_confinement = this.$("#ancilliary-hospital-confinement");
            var ancilliary_dental_care = this.$("#ancilliary-dental-care");
            var ancilliary_dental_lead_status = this.$("#ancilliary-dental-lead-status");
            var ancilliary_ancillary_total = this.$("#ancilliary-ancillary-total");
            var ancilliary_abnormal_cancer_screening_test = this.$("#ancilliary-abnormal-cancer-screening-test");
            var ancilliary_cysts_growths_etc_not_seen_for = this.$("#ancilliary-cysts-growths-etc-not-seen-for");
            var ancilliary_carotid_artery_stenosis_etc = this.$("#ancilliary-carotid-artery-stenosis-etc");
            var ancilliary_hiv_positive_aids_related_complex_aids = this.$("#ancilliary-hiv-positive-aids-related-complex-aids");
            var ancilliary_multiple_sclerosis_memory_loss_etc = this.$("#ancilliary-multiple-sclerosis-memory-loss-etc");
            var ancilliary_abnormal_tests_requiring_follow_up = this.$("#ancilliary-abnormal-tests-requiring-follow-up");
            var ancilliary_any_non_routine_consultation_scheduled = this.$("#ancilliary-any-non-routine-consultation-scheduled");
            var ancilliary_one_or_more_imm_relatives_with_issues = this.$("#ancilliary-one-or-more-imm-relatives-with-issues");
            var ancilliary_two_or_more_imm_relatives_with_issues = this.$("#ancilliary-two-or-more-imm-relatives-with-issues");
            var ancilliary_bening_tumor_hypertension_etc = this.$("#ancilliary-bening_tumor-hypertension-etc");
            var ancilliary_prescription_medication_in_last_three_years = this.$("#ancilliary-prescription-medication-in-last-three-years");
            var ancilliary_disorder_disease_heart_kidney_lungs = this.$("#ancilliary-disorder-disease-heart-kidney-lungs");
            var ancilliary_disease_quad_lou_gehrigs_other_motor = this.$("#ancilliary-disease-quad-lou-gehrigs-other-motor");
            var ancilliary_alcohol_or_substance_abuse_five_years = this.$("#ancilliary-alcohol-or-substance-abuse-five-years");
            var ancilliary_heart_attack_stroke_transient_ischemic = this.$("#ancilliary-heart-attack-stroke-transient-ischemic");
            var ancilliary_diabetes_type_one_or_two_blood_press_am = this.$("#ancilliary-diabetes-type-one-or-two-blood-press-am");
            var ancilliary_nursing_home_hospitalized_etc = this.$("#ancilliary-nursing-home-hospitalized-etc");
            var ancilliary_hospitalized_in_the_last_twelve_months = this.$("#ancilliary-hospitalized-in-the-last-twelve-months");
            var ancilliary_diagnosed_or_treated_for_medical_issues = this.$("#ancilliary-diagnosed_or_treated_for_medical_issues");
            var ancilliary_pregnant = this.$("#ancilliary-pregnant");
            var ancilliary_ever_had_a_problem_pregnancy = this.$("#ancilliary-ever_had_a_problem_pregnancy");
            var ancilliary_hypertension = this.$("#ancilliary-hypertension");
            var ancilliary_accident_elite_request_eff_date = this.$("#ancilliary-accident-elite-request_eff_date");
            var ancilliary_accident_elite_premium = this.$("#ancilliary-accident-elite-premium");
            var ancilliary_accident_elite_notes = this.$("#ancilliary-accident-elite-notes");
            var ancilliary_critical_care_request_eff_date = this.$("#ancilliary-critical-care-request-eff-date");
            var ancilliary_critial_care_premium = this.$("#ancilliary-critial-care-premium");
            var ancilliary_critical_care_notes = this.$("#ancilliary-critical-care-notes");
            var ancilliary_request_eff_date = this.$("#ancilliary-request-eff-date");
            var ancilliary_hospital_confinement_premium = this.$("#ancilliary-hospital-confinement-premium");
            var ancilliary_hospital_confinement_notes = this.$("#ancilliary-hospital-confinement-notes");
            var ancilliary_dental_request_eff_date = this.$("#ancilliary-dental-request-eff-date");
            var ancilliary_dental_care_premium = this.$("#ancilliary-dental-care-premium");
            var ancilliary_dental_care_notes = this.$("#ancilliary-dental-care-notes");
            var payment_binder_payment_option = this.$("#payment-binder-payment-option");
            var payment_payment_charge_request = this.$("#payment-payment-charge-request");
            var payment_ccredit_card_type = this.$("#payment-ccredit-card-type");
            var payment_name_on_cc = this.$("#payment-name-on-cc");
            var payment_credit_card_number = this.$("#payment-credit-card-number");
            var payment_cc_expiration_date = this.$("#payment-cc-expiration-date");
            var payment_cc_cvv = this.$("#payment-cc-cvv");
            var payment_bank_account_type = this.$("#payment-bank-account-type");
            var payment_bank_name = this.$("#payment-bank-name");
            var payment_bank_routuing_number = this.$("#payment-bank-routuing-number");
            var payment_bank_account_number = this.$("#payment-bank-account-number");

            var contact_info_property_address_2 = this.$("#contact-info-property-address-2");
            var contact_info_agent_code = this.$("#contact-info-agent-code");
            var contact_info_created_by = this.$("#contact-info-created-by");
            var contact_info_created_date = this.$("#contact-info-created-date");
            var contact_info_date_modified = this.$("#contact-info-date-modified");
            var contact_info_transfer_timestamp = this.$("#contact-info-transfer-timestamp");
            var contact_info_current_job_and_income_info = this.$("#contact-info-current-job-and-income-info");
            var contact_info_spouse = this.$("#contact-info-spouse");
            var contact_info_employment_status = this.$("#contact-info-employment-status");
            var contact_info_subsidy_drop_date = this.$("#contact-info-subsidy-drop-date");
            var contact_info_can_find_a_temp_id_card = this.$("#contact-info-can-find-a-temp-id-card");
            var contact_info_found_in_search_accounts = this.$("#contact-info-found-in-search-accounts");
            var contact_info_paid_to_date_2016 = this.$("#contact-info-paid-to-date-2016");
            var contact_info_corrected_discrepancy = this.$("#contact-info-corrected-discrepancy");
            var contact_info_corrected_discrepancy_completed_date = this.$("#contact-info-corrected-discrepancy-completed-date");
            var contact_info_updated_premium_2016 = this.$("#contact-info-updated-premium-2016");
            var contact_info_marketplace_changed_premium = this.$("#contact-info-marketplace-changed-premium");
            var contact_info_red_box_error = this.$("#contact-info-red-box-error");
            var contact_info_verification_documents_submitted_date = this.$("#contact-info-verification-documents-submitted-date");
            var contact_info_tcpa_compliant = this.$("#contact-info-tcpa-compliant");
            var child_1_income = this.$("#child-1-income");
            var child_2_income = this.$("#child-2-income");
            var child_3_income = this.$("#child-3-income");
            var child_4_income = this.$("#child-4-income");
            var health_agent_notes = this.$("#health-agent-notes");
            var health_project_individual_income = this.$("#health-project-individual-income");
            var health_project_household_income = this.$("#health-project-household-income");
            var health_presold_timestamp = this.$("#health-presold-timestamp");
            var health_tentative_timestamp = this.$("#health-tentative-timestamp");
            var health_enrolled_timestamp = this.$("#health-enrolled-timestamp");
            var health_active_timestamp = this.$("#health-active-timestamp");
            var health_policy_2016 = this.$("#health-policy-2016");
            var payment_paid_confirmation_number = this.$("#payment-paid-confirmation-number");
            var ancillary_client = this.$("#ancillary-client");
            var ancillary_payment_option = this.$("#ancillary-payment-option");
            var ancillary_bank_account_number = this.$("#ancillary-bank-account-number");
            var ancillary_bank_routing_number = this.$("#ancillary-bank-routing-number");
            var ancillary_bank_name = this.$("#ancillary-bank-name");
            var ancillary_bank_account_type = this.$("#ancillary-bank-account-type");




        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        contact = new fun.models.Contact({'uuid':name});

        contact.fetch({
            success: function(response){

                console.log('CONTACT!!!!',response.attributes);

            // CONTACT INFO
                contact_uuid = response.get('uuid');
                contact_account = response.get('account');
                contact_description = response.get('description');
                contact_history = response.get('history');
                contact_comment = response.get('comment');
                contact_info_first_name.val(response.get('contact_info_first_name') || '');
                contact_info_last_name.val(response.get('contact_info_last_name') || '');
                contact_info_phone_number.val(response.get('contact_info_phone_number') || '');
                contact_info_cellphone.val(response.get('other_phone') || '');
                contact_info_email.val(response.get('contact_info_email') || '');
                contact_info_other_phone.val(response.get('other_phone_2') || '');
                // contact_info_date_of_birth.value = renderDate(response.get('contact_info_dob')) || '';
                contact_info_date_of_birth.value = response.get('contact_info_dob') || '';

                contact_info_gender.val(response.get('contact_info_gender') || '');
                $(contact_info_gender.selector + " option[value='" + response.get('contact_info_gender') + "']").attr("selected", "selected");

                contact_info_marital_status.value = response.get('contact_info_marital_status') || '';
                $(contact_info_marital_status.selector + " option[value='" + response.get('contact_info_marital_status') + "']").attr("selected", "selected");

                contact_info_number_of_children.val(response.get('contact_info_number_of_children') || 0);
                $(contact_info_number_of_children.selector + " option[value='" + response.get('contact_info_number_of_children') + "']").attr("selected", "selected");

                contact_info_social_security_number.val(response.get('contact_info_social_security_number') || '');
                contact_info_property_address.val(response.get('contact_info_property_address'));

                contact_info_state.val(response.get('contact_info_state') || '');
                $(contact_info_state.selector + " option[value='" + response.get('contact_info_state') + "']").attr("selected", "selected");

                contact_info_city.val(response.get('contact_info_city') || '');
                contact_info_zip_code.val(response.get('contact_info_zip_code') || '');
                contact_info_country.val(response.get('country') || '');

                contact_info_mailing_address_different.val(response.get('contact_info_mailing_address_different') || '');
                $(contact_info_mailing_address_different.selector + " option[value='" + response.get('contact_info_mailing_address_different') + "']").attr("selected", "selected");

                contact_info_mailing_address.val(response.get('contact_info_mailing_address') || '');
                contact_info_mailing_city.val(response.get('contact_info_mailing_city') || '');
                contact_info_mailing_state.val(response.get('contact_info_mailing_state') || '');
                contact_info_mailing_zipcode.val(response.get('contact_info_mailing_zipcode') || '');
                contact_info_marketplace_email.val(response.get('marketplace_app_id_2015') || '');

                contact_info_language_preference.val(response.get('language_preference') || '');
                $(contact_info_language_preference.selector + " option[value='" + response.get('language_preference') + "']").attr("selected", "selected");

                contact_info_writing_agent.val(response.get('contact_info_writing_agent') || '');
                $(contact_info_writing_agent.selector + " option[value='" + response.get('contact_info_writing_agent') + "']").attr("selected", "selected");

                contact_info_lead_type.val(response.get('contact_info_lead_type') || 'health');
                // $(contact_info_lead_type.selector + " option[value='health']").attr("selected", "selected");
                $(contact_info_writing_agent.selector + " option[value='" + response.get('contact_info_lead_type') + "']").attr("selected", "selected");

                contact_info_lead_source.val(response.get('contact_info_lead_source') || 'boberdoo');
                $(contact_info_lead_source.selector + " option[value='boberdoo']").attr("selected", "selected");
                // $(contact_info_lead_source.selector + " option[value='" + response.get('lead_source') + "']").attr("selected", "selected");

                contact_info_partner.val(response.get('contact_info_partner') || '');
                contact_info_last_modified_by.val(response.get('contact_info_last_modified_by') || '');

                contact_info_health_insurance_checkbox.val(response.get('contact_info_health_insurance_status') || 'true');
                // $(contact_info_health_insurance_checkbox.selector + " option[value='true']").attr("selected", "selected");
                $(contact_info_health_insurance_checkbox.selector + " option[value='" + response.get('contact_info_health_insurance_status') + "']").attr("selected", "selected");

                contact_info_home_insurance_checkbox.val(response.get('contact_info_home_insurance_status') || '');
                $(contact_info_home_insurance_checkbox.selector + " option[value='" + response.get('contact_info_home_insurance_status') + "']").attr("selected", "selected");

                contact_info_auto_insurance_checkbox.val(response.get('contact_info_auto_insurance_status') || '');
                $(contact_info_auto_insurance_checkbox.selector + " option[value='" + response.get('contact_info_auto_insurance_status') + "']").attr("selected", "selected");

                contact_info_life_insurance_checkbox.val(response.get('contact_info_life_insurance_status') || '');
                $(contact_info_life_insurance_checkbox.selector + " option[value='" + response.get('contact_info_life_insurance_status') + "']").attr("selected", "selected");

                contact_info_ancilliary_insurance_checkbox.val(response.get('ancillary_lead_status') || '');
                $(contact_info_ancilliary_insurance_checkbox.selector + " option[value='" + response.get('ancillary_lead_status') + "']").attr("selected", "selected");

                contact_info_other_policy_sold.val(response.get('other_policies_sold') || '');
                $(contact_info_other_policy_sold.selector + " option[value='" + response.get('other_policies_sold') + "']").attr("selected", "selected");

                contact_info_federal_do_not_call.val(response.get('contact_info_federal_do_not_call') || '');
                $(contact_info_federal_do_not_call.selector + " option[value='" + response.get('contact_info_federal_do_not_call') + "']").attr("selected", "selected");

                contact_info_renew_as_is_email_received.val(response.get('contact_info_renew_as_is_email_received') || '');
                $(contact_info_renew_as_is_email_received.selector + " option[value='" + response.get('contact_info_renew_as_is_email_received') + "']").attr("selected", "selected");

                health_us_citizen_or_legal_permanent_resident.val(response.get('us_citizen_or_legal_permanent_resident') || '');
                $(contact_info_renew_as_is_email_received.selector + " option[value='" + response.get('us_citizen_or_legal_permanent_resident') + "']").attr("selected", "selected");

            // SPOUSE INFO
                spouse_first_name.val(response.get('spouse_first_name') || '');
                spouse_last_name.val(response.get('spouse_last_name') || '');

                spouse_gender.val(response.get('spouse_1_gender') || '');
                $(spouse_gender.selector + " option[value='" + response.get('spouse_1_gender') + "']").attr("selected", "selected");

                spouse_dob.val(response.get('spouse_dob') || '');

                spouse_do_you_have_a_social_security_number.val(response.get('spouse_do_you_have_a_social_security_number') || 'none');
                $(spouse_do_you_have_a_social_security_number.selector + " option[value='none']").attr("selected", "selected");
                // $(spouse_do_you_have_a_social_security_number.selector + " option[value='" + response.get('spouse_do_you_have_a_social_security_number') + "']").attr("selected", "selected");

                spouse_social.val(response.get('spouse_social') || '');
                spouse_income_source.val(response.get('spouse_income_source') || '');
                spouse_yearly_income.val(response.get('spouse_yearly_income') || '');
                spouse_employers_name.val(response.get('spouse_employers_name') || '');
                spouse_employers_phone_number.val(response.get('spouse_employers_phone_number') || '');


            // CHILD INFO
                contact_info_child_1_name.val(response.get('child_1_name') || '');
                contact_info_child_1_dob.val(response.get('child_1_dob') || '');
                contact_info_child_1_gender.val(response.get('child_1_gender') || '');
                contact_info_child_1_social.val(response.get('child_1_social') || '');
                contact_info_child_2_name.val(response.get('child_2_dob') || '');
                contact_info_child_2_dob.val(response.get('child_2_dob') || '');
                contact_info_child_2_gender.val(response.get('child_2_gender') || '');
                contact_info_child_2_social.val(response.get('child_2_social') || '');
                contact_info_child_3_name.val(response.get('child_3_name') || '');
                contact_info_child_3_dob.val(response.get('child_3_dob') || '');
                contact_info_child_3_gender.val(response.get('child_3_gender') || '');
                contact_info_child_3_social.val(response.get('child_3_social') || '');
                contact_info_child_4_name.val(response.get('child_4_name') || '');
                contact_info_child_4_dob.val(response.get('child_4_dob') || '');
                contact_info_child_4_gender.val(response.get('child_4_gender') || '');
                contact_info_child_4_social.val(response.get('child_4_social') || '');


            // Now that contact info is loaded we run the functions for the show/hide of the tabs
                fun.utils.showMailingAddressDifferent();
                fun.utils.changeMaritalStatus();
                fun.utils.homeInsuranceTab();
                fun.utils.healthInsuranceTab();
                fun.utils.autoInsuranceTab();
                fun.utils.lifeInsuranceTab();
                fun.utils.ancilliaryInsuranceTab();
                fun.utils.showMarketingTab();
                fun.utils.changeNumberChildren();
                fun.utils.showPaymentTab();
                fun.utils.showPaymentTab();
                fun.utils.showSendSMSButton();


            // HEALTH INFO
                health_auto_priority_code.val(response.get('health_auto_priority_code') || '');
                health_priority_code.val(response.get('health_priority_code') || '');
                health_lead_source.val(response.get('health_lead_source') || '');
                health_partner.val(response.get('contact_info_partner') || '');
                health_lead_status.val(response.get('health_lead_status') || '');
                health_writing_agent.val(response.get('health_writing_agent') || '');
                health_scrubber.val(response.get('health_scrubber') || '');
                health_total_individual_income.val(response.get('health_total_individual_income') || '');
                health_total_household_income.val(response.get('health_total_household_income') || '');
                health_primary_applicants_income_source.val(response.get('primary_applicants_income_source') || '');
                health_primary_applicants_employers_name.val(response.get('primary_applicants_employers_name') || '');
                health_applicant_employers_phone_number.val(response.get('contact_info_marital_status') || '');
                health_marital_status.val(response.get('health_marital_status') || '');
                health_number_of_dependent_children_in_house.val(response.get('number_of_children') || '');

                health_renewal_source_2016.val(response.get('health_renewal_source_2016') || '');
                $(health_renewal_source_2016.selector + " option[value='" + response.get('health_renewal_source_2016') + "']").attr("selected", "selected");

                health_renewal_agent_2016.val(response.get('renewal_submitter_2016') || '');
                $(health_renewal_agent_2016.selector + " option[value='" + response.get('renewal_submitter_2016') + "']").attr("selected", "selected");

                health_presold_processor_2016.val(response.get('presold_processor_2016') || '');
                $(health_presold_processor_2016.selector + " option[value='" + response.get('presold_processor_2016') + "']").attr("selected", "selected");

                health_application_number_2016_info.val(response.get('health_application_number_2016_selection') || '');
                health_effective_date_2016.value = response.get('health_effective_date_2016') || '';
                health_presold_processor_2016.val(response.get('health_presold_processor_2016') || '');
                health_total_income_used_on_application.val(response.get('health_total_income_used_on_application') || '');
                health_final_gross_premium_2016.val(response.get('health_final_gross_premium_2016') || '');
                health_final_subsidy_2016.val(response.get('health_final_subsidy_2016') || '');
                heatlh_plan_2016.val(response.get('health_policy_2016') || '');
                health_final_premium_after_subsidy_2016.val(response.get('health_final_premium_after_subsidy_2016') || '');

                health_verification_documents_needed_2016.val(response.get('health_verification_documents_needed_2016') || '');
                $(health_verification_documents_needed_2016.selector + " option[value='" + response.get('health_verification_documents_needed_2016') + "']").attr("selected", "selected");

                health_verification_documents_due_date_2016 = response.get('health_verification_documents_due_date_2016') || '';

                health_application_number_2016_selection.val(response.get('health_application_number_2016_selection') || '');
                health_adults_applying_for_coverage_2016.val(response.get('health_adults_applying_for_coverage_2016') || '');
                health_total_household_size_2016.val(response.get('health_total_household_size_2016') || '');
                health_cloud_gross_premium_2016.val(response.get('cloud_gross_premium_2016') || '');
                health_children_applying_for_coverage_2016.val(response.get('health_children_applying_for_coverage_2016') || '');
                health_cloud_subsidy_2016.val(response.get('health_cloud_subsidy_2016') || '');
                health_cloud_premium_after_subsidy_2016.val(response.get('health_cloud_premium_after_subsidy_2016') || '');
                health_lead_has_a_marketplace_account.val(response.get('health_lead_has_marketplace_account') || '');
                health_current_coverage.val(response.get('health_number_of_dependent_children_in_house') || '');
                // health_marketplace_app_id_2015.val(response.get('health_marketplace_app_id_2015') || '');
                health_current_premium.val(response.get('health_current_premium') || '');
                health_subsidy_amount.val(response.get('health_subsidy_amount') || '');
                health_current_net_premium.val(response.get('health_current_net_premium') || '');
                // health_effective_date_2015.val(response.get('health_effective_date_2015') || '');
                // health_application_id_2015.val(response.get('health_application_id_2015') || '');
                // health_premium_2015.val(response.get('health_premium_2015') || '');
                // health_carrier_2015.val(response.get('health_carrier_2015') || '');
                // health_subsidy_2015.val(response.get('health_subsidy_2015') || '');
                // health_adult_on_plan_2015.val(response.get('health_adult_on_plan_2015') || '');
                // health_children_on_plan_2015.val(response.get('health_children_on_plan_2015') || '');
                // health_income_verification_needed_2015.val(response.get('health_income_verification_needed_2015') || '');
                // health_citizenship_documents_needed_2015.val(response.get('health_citizenship_documents_needed_2015') || '');
                health_policy.val(response.get('health_policy_2016') || '');
                // health_contact_code_2015.val(response.get('health_contact_code_2015') || '');
                health_wants_to_renew_same_plan_for_2016.val(response.get('health_wants_to_renew_same_plan_for_2016') || '');
                health_quoted_renewal_gross_premium_2016.val(response.get('health_quoted_renewal_gross_premium_2016') || '');
                health_quoted_renewal_subsidy_2016.val(response.get('health_quoted_renewal_subsidy_2016') || '');
                health_quoted_renewal_net_premium_2016.val(response.get('health_quoted_renewal_net_premium_2016') || '');
                health_username.val(response.get('health_username') || '');
                health_password.val(response.get('health_password') || '');


            // HOME INFO
                // home_priority_code.val(response.get('home_priority_code') || '');
                // home_auto_priority_code.val(response.get('home_auto_priority_code') || '');
                // home_lead_source.val(response.get('home_lead_source') || '');
                // home_partner.val(response.get('home_partner') || '');
                // home_insurance_policy_number.val(response.get('home_insurance_policy_number') || '');
                // home_writing_agent.val(response.get('home_writing_agent') || '');
                // home_scrubber.val(response.get('home_scrubber') || '');
                // home_lead_status.val(response.get('home_lead_status') || '');
                // home_new_purchase.val(response.get('home_new_purchase') || '');
                // home_exp_date_closing_date.val(response.get('home_exp_date_closing_date') || '');
                // home_occupancy_status.val(response.get('home_occupancy_status') || '');
                // home_type_of_dwelling.val(response.get('home_type_of_dwelling') || '');
                // home_current_home_carrier.val(response.get('home_current_home_carrier') || '');
                // home_current_home_premium.val(response.get('home_current_home_premium') || '');
                // home_current_dwelling_coverage.val(response.get('home_current_dwelling_coverage') || '');
                // home_year_built.val(response.get('home_year_built') || '');
                // home_square_ft_under_air.val(response.get('home_square_ft_under_air') || '');
                // home_garage.val(response.get('home_garage') || '');
                // home_construction_type.val(response.get('home_construction_type') || '');
                // home_stories.val(response.get('home_stories') || '');
                // home_number_of_stories_in_the_building.val(response.get('home_number_of_stories_in_the_building') || '');
                // home_what_floor_number_is_condo_on.val(response.get('home_what_floor_number_is_condo_on') || '');
                // home_quote_update_request.val(response.get('home_quote_update_request') || '');
                // home_policy_effective_date.val(response.get('home_policy_effective_date') || '');
                // home_four_point_if_applicable.val(response.get('home_four_point_if_applicable') || '');
                // home_quoted_home_company.val(response.get('home_quoted_home_company') || '');
                // home_wind_mit.val(response.get('home_wind_mit') || '');
                // home_age_roof.val(response.get('home_age_roof') || '');
                // home_roof_material.val(response.get('home_roof_material') || '');
                // home_bathrooms.val(response.get('home_bathrooms') || '');
                // home_dog.val(response.get('home_dog') || '');
                // home_pool.val(response.get('home_pool') || '');
                // home_fence_or_screen_enclosure.val(response.get('home_fence_or_screen_enclosure') || '');
                // home_bankrupcy_or_Foreclosure_in_the_past_five_years.val(response.get('home_bankrupcy_or_Foreclosure_in_the_past_five_years') || '');
                // home_centrally_monitored_alarm.val(response.get('home_centrally_monitored_alarm') || '');
                // home_gated_community.val(response.get('home_gated_community') || '');
                // home_how_many_claims_in_the_last_five_Years.val(response.get('home_how_many_claims_in_the_last_five_Years') || '');
                // home_realtor_mortgage_broker.val(response.get('home_realtor_mortgage_broker') || '');
                // home_amount_of_personal_property.val(response.get('home_amount_of_personal_property') || '');
                // home_quoted_home_premium.val(response.get('home_quoted_home_premium') || '');
                // home_quoted_home_number.val(response.get('home_quoted_home_number') || '');
                // home_payment_option.val(response.get('home_payment_option') || '');
                // home_mortgage_clause_new.val(response.get('home_mortgage_clause_new') || '');
                // home_loan_number.val(response.get('home_loan_number') || '');
                // home_insurance_carrier.val(response.get('home_insurance_carrier') || '');
                // home_insurance_premium.val(response.get('home_insurance_premium') || '');


            // AUTO INFO
                // auto_auto_priority_code.val(response.get('auto_auto_priority_code') || '');
                // auto_priority_code.val(response.get('auto_priority_code') || '');
                // auto_lead_source.val(response.get('auto_lead_source') || '');
                // auto_partner.val(response.get('auto_partner') || '');
                // auto_insurance_policy_number.val(response.get('auto_insurance_policy_number') || '');
                // auto_lead_status.val(response.get('auto_lead_status') || '');
                // auto_writing_agent.val(response.get('auto_writing_agent') || '');
                // auto_scrubber.val(response.get('auto_scrubber') || '');
                // auto_current_auto_carrier.val(response.get('auto_current_auto_carrier') || '');
                // auto_expiration_date.val(response.get('auto_expiration_date') || '');
                // auto_current_auto_premium.val(response.get('auto_current_auto_premium') || '');
                // auto_current_residence_type.val(response.get('auto_current_residence_type') || '');
                // auto_driver_one_license_number.val(response.get('auto_driver_one_license_number') || '');
                // auto_vehicle_one_vin.val(response.get('auto_vehicle_one_vin') || '');
                // auto_vehicle_one_year.val(response.get('auto_vehicle_one_year') || '');
                // auto_vehicle_one_make.val(response.get('auto_vehicle_one_make') || '');
                // auto_vehicle_one_model.val(response.get('auto_vehicle_one_model') || '');
                // auto_driver_two_license_number.val(response.get('auto_driver_two_license_number') || '');
                // auto_vehicle_two_vin.val(response.get('auto_vehicle_two_vin') || '');
                // auto_vehicle_two_year.val(response.get('auto_vehicle_two_year') || '');
                // auto_vehicle_two_make.val(response.get('auto_vehicle_two_make') || '');
                // auto_vehicle_two_model.val(response.get('auto_vehicle_two_model') || '');
                // auto_bodily_injury_liability.val(response.get('auto_bodily_injury_liability') || '');
                // auto_property_damage.val(response.get('auto_property_damage') || '');
                // auto_uninsured_motorist_liability.val(response.get('auto_uninsured_motorist_liability') || '');
                // auto_medical_payments.val(response.get('auto_medical_payments') || '');
                // auto_vehicle_one_comp_ded.val(response.get('auto_vehicle_one_comp_ded') || '');
                // auto_vehicle_1_collision_ded.val(response.get('auto_vehicle_1_collision_ded') || '');
                // auto_1_towing.val(response.get('auto_1_towing') || '');
                // auto_1_rental_car.val(response.get('auto_1_rental_car') || '');
                // auto_vehicle_2_comp_ded.val(response.get('auto_vehicle_2_comp_ded') || '');
                // auto_vehicle_2_collision_ded.val(response.get('auto_vehicle_2_collision_ded') || '');
                // auto_2_towing.val(response.get('auto_2_towing') || '');
                // auto_2_rental_car.val(response.get('auto_2_rental_car') || '');
                // auto_quote_update_request.val(response.get('auto_quote_update_request') || '');
                // auto_policy_effective_date.val(response.get('auto_policy_effective_date') || '');
                // auto_payment_option.val(response.get('auto_payment_option') || '');
                // auto_payment_info.val(response.get('auto_payment_info') || '');
                // auto_quoted_auto_company.val(response.get('auto_quoted_auto_company') || '');
                // auto_quoted_auto_premium.val(response.get('auto_quoted_auto_premium') || '');
                // auto_quoted_auto_number.val(response.get('auto_quoted_auto_number') || '');
                // auto_insurance_carrier.val(response.get('auto_insurance_carrier') || '');
                // auto_insurance_premium.val(response.get('auto_insurance_premium') || '');
                // auto_insurance_premium.val(response.get('auto_insurance_premium') || '');
                // auto_document_needed.val(response.get('auto_document_needed') || '');


            // LIFE INFO
                // life_auto_priority_code.val(response.get('life_auto_priority_code') || '');
                // life_priority_code.val(response.get('life_priority_code') || '');
                // life_lead_source.val(response.get('life_lead_source') || '');
                // life_partner.val(response.get('life_partner') || '');
                // life_insurance_policy_number.val(response.get('life_insurance_policy_number') || '');
                // life_lead_status.val(response.get('life_lead_status') || '');
                // life_writing_agent.val(response.get('life_writing_agent') || '');
                // life_scrubber.val(response.get('life_scrubber') || '');
                // life_age.val(response.get('life_age') || '');
                // life_height.val(response.get('life_height') || '');
                // life_weight.val(response.get('life_weight') || '');
                // life_insurance_type.val(response.get('life_insurance_type') || '');
                // life_term_life_policy_lenght.val(response.get('life_term_life_policy_lenght') || '');
                // life_desired_amount_of_coverage.val(response.get('life_desired_amount_of_coverage') || '');
                // life_smoke.val(response.get('life_smoke') || '');
                // life_major_health_issues_in_relatives.val(response.get('life_major_health_issues_in_relatives') || '');
                // life_convicted_of_drunk_driving.val(response.get('life_convicted_of_drunk_driving') || '');
                // life_quote_status.val(response.get('life_quote_status') || '');
                // life_date_paramed_exam_ordered.val(response.get('life_date_paramed_exam_ordered') || '');
                // life_monthly_premium.val(response.get('life_monthly_premium') || '');
                // life_paramed_company.val(response.get('life_paramed_company') || '');
                // life_application_id_number.val(response.get('life_application_id_number') || '');
                // life_application_status.val(response.get('life_application_status') || '');
                // life_application_changes.val(response.get('life_application_changes') || '');
                // life_after_changes_new_premium.val(response.get('life_after_changes_new_premium') || '');
                // life_application_declined_reason.val(response.get('life_application_declined_reason') || '');

            // ANCILLIARY INFO
                ancilliary_auto_priority_code.val(response.get('ancilliary_auto_priority_code') || '');
                ancilliary_priority_code.val(response.get('ancilliary_priority_code') || '');
                ancilliary_lead_source.val(response.get('ancilliary_lead_source') || '');
                ancilliary_partner.val(response.get('ancilliary_partner') || '');
                ancilliary_insurance_policy_number.val(response.get('ancilliary_insurance_policy_number') || '');
                ancilliary_writing_agent.val(response.get('ancilliary_writing_agent') || '');
                ancilliary_scrubber.val(response.get('ancilliary_scrubber') || '');
                ancilliary_lead_status.val(response.get('ancilliary_lead_status') || '');
                ancilliary_accident.val(response.get('ancilliary_accident') || '');
                ancilliary_critical_illness.val(response.get('ancilliary_critical_illness') || '');
                ancilliary_hospital_confinement.val(response.get('ancilliary_hospital_confinement') || '');
                ancilliary_dental_care.val(response.get('ancilliary_dental_care') || '');
                ancilliary_dental_lead_status.val(response.get('ancilliary_dental_lead_status') || '');
                ancilliary_ancillary_total.val(response.get('ancilliary_ancillary_total') || '');
                ancilliary_abnormal_cancer_screening_test.val(response.get('ancilliary_abnormal_cancer_screening_test') || '');
                ancilliary_cysts_growths_etc_not_seen_for.val(response.get('ancilliary_cysts_growths_etc_not_seen_for') || '');
                ancilliary_carotid_artery_stenosis_etc.val(response.get('ancilliary_carotid_artery_stenosis_etc') || '');
                ancilliary_hiv_positive_aids_related_complex_aids.val(response.get('ancilliary_hiv_positive_aids_related_complex_aids') || '');
                ancilliary_multiple_sclerosis_memory_loss_etc.val(response.get('ancilliary_multiple_sclerosis_memory_loss_etc') || '');
                ancilliary_abnormal_tests_requiring_follow_up.val(response.get('ancilliary_abnormal_tests_requiring_follow_up') || '');
                ancilliary_any_non_routine_consultation_scheduled.val(response.get('ancilliary_any_non_routine_consultation_scheduled') || '');
                ancilliary_one_or_more_imm_relatives_with_issues.val(response.get('ancilliary_one_or_more_imm_relatives_with_issues') || '');
                ancilliary_two_or_more_imm_relatives_with_issues.val(response.get('ancilliary_two_or_more_imm_relatives_with_issues') || '');
                ancilliary_bening_tumor_hypertension_etc.val(response.get('ancilliary_bening_tumor_hypertension_etc') || '');
                ancilliary_prescription_medication_in_last_three_years.val(response.get('ancilliary_prescription_medication_in_last_three_years') || '');
                ancilliary_disorder_disease_heart_kidney_lungs.val(response.get('ancilliary_disorder_disease_heart_kidney_lungs') || '');
                ancilliary_disease_quad_lou_gehrigs_other_motor.val(response.get('ancilliary_disease_quad_lou_gehrigs_other_motor') || '');
                ancilliary_alcohol_or_substance_abuse_five_years.val(response.get('ancilliary_alcohol_or_substance_abuse_five_years') || '');
                ancilliary_heart_attack_stroke_transient_ischemic.val(response.get('ancilliary_heart_attack_stroke_transient_ischemic') || '');
                ancilliary_diabetes_type_one_or_two_blood_press_am.val(response.get('ancilliary_diabetes_type_one_or_two_blood_press_am') || '');
                ancilliary_nursing_home_hospitalized_etc.val(response.get('ancilliary_nursing_home_hospitalized_etc') || '');
                ancilliary_hospitalized_in_the_last_twelve_months.val(response.get('ancilliary_hospitalized_in_the_last_twelve_months') || '');
                ancilliary_diagnosed_or_treated_for_medical_issues.val(response.get('ancilliary_diagnosed_or_treated_for_medical_issues') || '');
                ancilliary_pregnant.val(response.get('ancilliary_pregnant') || '');
                ancilliary_ever_had_a_problem_pregnancy.val(response.get('ancilliary_ever_had_a_problem_pregnancy') || '');
                ancilliary_hypertension.val(response.get('ancilliary_hypertension') || '');
                ancilliary_accident_elite_request_eff_date.val(response.get('ancilliary_accident_elite_request_eff_date') || '');
                ancilliary_accident_elite_premium.val(response.get('ancilliary_accident_elite_premium') || '');
                ancilliary_accident_elite_notes.val(response.get('ancilliary_accident_elite_notes') || '');
                ancilliary_critical_care_request_eff_date.val(response.get('ancilliary_critical_care_request_eff_date') || '');
                ancilliary_critial_care_premium.val(response.get('ancilliary_critial_care_premium') || '');
                ancilliary_critical_care_notes.val(response.get('ancilliary_critical_care_notes') || '');
                ancilliary_request_eff_date.val(response.get('ancilliary_request_eff_date') || '');
                ancilliary_hospital_confinement_premium.val(response.get('ancilliary_hospital_confinement_premium') || '');
                ancilliary_hospital_confinement_notes.val(response.get('ancilliary_hospital_confinement_notes') || '');
                ancilliary_dental_request_eff_date.val(response.get('ancilliary_dental_request_eff_date') || '');
                ancilliary_dental_care_premium.val(response.get('ancilliary_dental_care_premium') || '');
                ancilliary_dental_care_notes.val(response.get('ancilliary_dental_care_notes') || '');

            // Addittional Data
                contact_info_property_address_2.val(response.get("contact_info_property_address_2"));
                contact_info_agent_code.val(response.get("contact_info_agent_code"));
                contact_info_created_by.val(response.get("contact_info_created_by"));
                contact_info_created_date.val(response.get("contact_info_created_date"));
                contact_info_date_modified.val(response.get("contact_info_date_modified"));
                contact_info_transfer_timestamp.val(response.get("contact_info_transfer_timestamp"));
                contact_info_current_job_and_income_info.val(response.get("contact_info_current_job_and_income_info"));
                contact_info_spouse.val(response.get("contact_info_spouse"));
                contact_info_employment_status.val(response.get("employment_status"));
                contact_info_subsidy_drop_date.val(response.get("contact_info_subsidy_drop_date"));
                contact_info_can_find_a_temp_id_card.val(response.get("contact_info_can_find_a_temp_id_card"));
                contact_info_found_in_search_accounts.val(response.get("contact_info_found_in_search_accounts"));
                contact_info_paid_to_date_2016.val(response.get("contact_info_paid_to_date_2016"));
                contact_info_corrected_discrepancy.val(response.get("contact_info_corrected_discrepancy"));
                contact_info_corrected_discrepancy_completed_date.val(response.get("contact_info_corrected_discrepancy_completed_date"));
                contact_info_updated_premium_2016.val(response.get("contact_info_updated_premium_2016"));
                contact_info_marketplace_changed_premium.val(response.get("contact_info_marketplace_changed_premium"));
                contact_info_red_box_error.val(response.get("contact_info_red_box_error"));
                contact_info_verification_documents_submitted_date.val(response.get("contact_info_verification_documents_submitted_date"));
                contact_info_tcpa_compliant.val(response.get("contact_info_tcpa_compliant"));
                child_1_income.val(response.get("child_1_income"));
                child_2_income.val(response.get("child_2_income"));
                child_3_income.val(response.get("child_3_income"));
                child_4_income.val(response.get("child_4_income"));
                health_agent_notes.val(response.get("health_agent_notes"));
                health_project_individual_income.val(response.get("health_project_individual_income"));
                health_project_household_income.val(response.get("health_project_household_income"));
                health_presold_timestamp.val(response.get("health_presold_timestamp"));
                health_tentative_timestamp.val(response.get("health_tentative_timestamp"));
                health_enrolled_timestamp.val(response.get("health_enrolled_timestamp"));
                health_active_timestamp.val(response.get("health_active_timestamp"));
                health_policy_2016.val(response.get("health_policy_2016"));
                payment_paid_confirmation_number.val(response.get("payment_paid_confirmation_number"));
                ancillary_client.val(response.get("ancillary_client"));
                ancillary_payment_option.val(response.get("ancillary_payment_option"));
                ancillary_bank_account_number.val(response.get("ancillary_bank_account_number"));
                ancillary_bank_routing_number.val(response.get("ancillary_bank_routing_number"));
                ancillary_bank_name.val(response.get("ancillary_bank_name"));
                ancillary_bank_account_type.val(response.get("ancillary_bank_account_type"));
                ancillary_bank_routing_number.val(response.get("ancillary_bank_routing_number"));
                ancillary_bank_account_number.val(response.get("ancillary_bank_account_number"));
            },
            error: function(error){
                console.log(error);
            }
        });
    },

    // getDropdownInfo: function(response){

    //     // esto es un hack por una vara ahi que no le voy a explicar x que no es el momento.

    //     // - X que?

    //     // (=

    //     var lolazo = response.attributes.results.models;

    //     _.each(lolazo, function(value){
    //         /*template = _.template(
    //             fun.utils.getTemplate(fun.conf.templates.contactRow)
    //         )(value);
    //         rows.append(template);*/
    //         console.log(value.toJSON());
    //     });

    // },

    deleteContact:function(event){
        'use strict';
        event.preventDefault();
        console.log('delete contact event');
        var confirm,
            name_uuid,
            callbacks;

        name_uuid = $(event.target).data('name');

        var stuff = JSON.parse(localStorage.getItem("profile"));

        var lolol = {
            'uuid': name_uuid,
            'account':stuff['account']
        };

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

                console.log("its the end of the line");
                console.log(value);


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

    saveNewContact: function(event,patch){
        'use strict';

        var view = this,
            name,
            contact,
            contact_uuid,
            contact_account = localStorage.getItem("username"),
            contact_description,
            contact_history,
            contact_comment;

        // CALL THE INPUTS
            var contact_info_first_name = this.$("#contact-info-first-name");
            var contact_info_last_name = this.$("#contact-info-last-name");
            var contact_info_phone_number = this.$("#contact-info-phone-number");
            var contact_info_cellphone = this.$("#contact-info-cellphone");
            var contact_info_email = this.$("#contact-info-email");
            var contact_info_other_phone = this.$("#contact-info-other-phone");
            var contact_info_date_of_birth = this.$("#contact-info-date-of-birth");

            var contact_info_gender = this.$("#contact-info-gender");
            this.getDropdownInfo(contact_info_gender,'contact_info_gender');

            var contact_info_marital_status = this.$("#contact-info-marital-status");
            this.getDropdownInfo(contact_info_marital_status,'contact_info_marital_status');

            var contact_info_number_of_children = this.$("#contact-info-number-of-children");
            this.getDropdownInfo(contact_info_number_of_children,'contact_info_number_of_children');

            var contact_info_social_security_number = this.$("#contact-info-social-security-number");
            var contact_info_property_address = this.$("#contact-info-property-address");

            var contact_info_state = this.$("#contact-info-state");
            this.getDropdownInfo(contact_info_state,'contact_info_state');

            var contact_info_city = this.$("#contact-info-city");
            var contact_info_zip_code = this.$("#contact-info-zip-code");

            var contact_info_country = this.$("#contact-info-country");
            this.getDropdownInfo(contact_info_country,'contact_info_country');

            var contact_info_mailing_address_different = this.$("#contact-info-mailing-address-different");
            this.getDropdownInfo(contact_info_mailing_address_different,'contact_info_mailing_address_different');

            var contact_info_mailing_address = this.$("#contact-info-mailing-address");
            var contact_info_mailing_city = this.$("#contact-info-mailing-city");
            var contact_info_mailing_state = this.$("#contact-info-mailing-state");
            var contact_info_mailing_zipcode = this.$("#contact-info-mailing-zipcode");
            var contact_info_marketplace_email = this.$("#contact-info-marketplace-email");

            var contact_info_language_preference = this.$("#contact-info-language-preference");
            this.getDropdownInfo(contact_info_language_preference,'language_preference');

            var contact_info_writing_agent = this.$("#contact-info-writing-agent");
            this.getDropdownInfo(contact_info_writing_agent,'contact_info_writing_agent');

            var contact_info_lead_source = this.$("#contact-info-lead-source");
            this.getDropdownInfo(contact_info_lead_source,'contact_info_lead_source');

            var contact_info_lead_type = this.$("#contact-info-lead-type");
            this.getDropdownInfo(contact_info_lead_type,'contact_info_lead_type');

            var contact_info_partner = this.$("#contact-info-partner");
            var contact_info_last_modified_by = this.$("#contact-info-last-modified-by");

            var contact_info_health_insurance_checkbox = this.$("#contact-info-health-insurance-checkbox");
            this.getDropdownInfo(contact_info_health_insurance_checkbox,'contact_info_health_insurance_checkbox');
            console.log('DROPDOWN!!!!',contact_info_health_insurance_checkbox);

            var contact_info_home_insurance_checkbox = this.$("#contact-info-home-insurance-checkbox");
            this.getDropdownInfo(contact_info_home_insurance_checkbox,'contact_info_home_insurance_checkbox');

            var contact_info_auto_insurance_checkbox = this.$("#contact-info-auto-insurance-checkbox");
            this.getDropdownInfo(contact_info_auto_insurance_checkbox,'contact_info_auto_insurance_checkbox');

            var contact_info_life_insurance_checkbox = this.$("#contact-info-life-insurance-checkbox");
            this.getDropdownInfo(contact_info_life_insurance_checkbox,'contact_info_life_insurance_checkbox');

            var contact_info_ancilliary_insurance_checkbox = this.$("#contact-info-ancilliary-insurance-checkbox");
            this.getDropdownInfo(contact_info_ancilliary_insurance_checkbox,'ancillary_lead_status');

            var contact_info_other_policy_sold = this.$("#contact-info-other-policy-sold");
            this.getDropdownInfo(contact_info_other_policy_sold,'other_policies_sold');

            var contact_info_federal_do_not_call = this.$("#contact-info-federal-do-not-call");
            this.getDropdownInfo(contact_info_federal_do_not_call,'contact_info_federal_do_not_call');

            var contact_info_do_you_own_your_home = this.$("#contact-info-do-you-own-your-home");
            this.getDropdownInfo(contact_info_do_you_own_your_home,'contact_info_do_you_own_your_home');

            var contact_info_renew_as_is_email_received = this.$("#contact-info-renew-as-is-email-received");
            this.getDropdownInfo(contact_info_renew_as_is_email_received,'contact_info_renew_as_is_email_received');

            var health_us_citizen_or_legal_permanent_resident = this.$("#health-us-citizen-or-legal-permanent-resident");
            this.getDropdownInfo(health_us_citizen_or_legal_permanent_resident,'us_citizen_or_legal_permanent_resident');

            var spouse_first_name = this.$("#spouse-first-name");
            var spouse_last_name = this.$("#spouse-last-name");

            var spouse_gender = this.$("#spouse-gender");
            this.getDropdownInfo(spouse_gender,'contact_info_gender');

            var spouse_dob = this.$("#spouse-dob");
            this.getDropdownInfo(spouse_dob,'contact_info_gender');

            var spouse_do_you_have_a_social_security_number = this.$("#spouse-do-you-have-a-social-security-number");
            this.getDropdownInfo(spouse_do_you_have_a_social_security_number,'spouse_do_you_have_a_social_security_number');

            var spouse_social = this.$("#spouse-social");
            var spouse_income_source = this.$("#spouse-income-source");
            var spouse_yearly_income = this.$("#spouse-yearly-income");
            var spouse_employers_name = this.$("#spouse-employers-name");
            var spouse_employers_phone_number = this.$("#spouse-employers-phone-number");
            var contact_info_child_1_name = this.$("#child-1-name");
            var contact_info_child_1_dob = this.$("#child-1-dob");
            var contact_info_child_1_gender = this.$("#child-1-gender");
            var contact_info_child_1_social = this.$("#child-1-social");
            var contact_info_child_2_name = this.$("#child-2-name");
            var contact_info_child_2_dob = this.$("#child-2-dob");
            var contact_info_child_2_gender = this.$("#child-2-gender");
            var contact_info_child_2_social = this.$("#child-2-social");
            var contact_info_child_3_name = this.$("#child-3-name");
            var contact_info_child_3_dob = this.$("#child-3-dob");
            var contact_info_child_3_gender = this.$("#child-3-gender");
            var contact_info_child_3_social = this.$("#child-3-social");
            var contact_info_child_4_name = this.$("#child-4-name");
            var contact_info_child_4_dob = this.$("#child-4-dob");
            var contact_info_child_4_gender = this.$("#child-4-gender");
            var contact_info_child_4_social = this.$("#child-4-social");

            var health_auto_priority_code = this.$("#health-auto-priority-code");
            this.getDropdownInfo(health_auto_priority_code,'health_auto_priority_code');

            var health_priority_code = this.$("#health-priority-code");
            this.getDropdownInfo(health_priority_code,'health_priority_code');

            var health_lead_source = this.$("#health-lead-source");
            this.getDropdownInfo(health_lead_source,'health_lead_source');

            var health_partner = this.$("#health-partner");
            this.getDropdownInfo(health_partner,'contact_info_gender');

            var health_lead_status = this.$("#health-lead-status");
            this.getDropdownInfo(health_lead_status,'health_lead_status');

            var health_writing_agent = this.$("#health-writing-agent");
            this.getDropdownInfo(health_writing_agent,'health_writing_agent');

            var health_scrubber = this.$("#health-scrubber");
            this.getDropdownInfo(health_scrubber,'health_scrubber');

            var health_total_individual_income = this.$("#health-total-individual-income");
            var health_total_household_income = this.$("#health-total-household-income");
            var health_primary_applicants_income_source = this.$("#health-primary-applicants-income-source");
            var health_primary_applicants_employers_name = this.$("#health-primary-applicants-employers-name");
            var health_applicant_employers_phone_number = this.$("#health-applicant-employers-phone-number");

            var health_marital_status = this.$("#health-marital-status");
            this.getDropdownInfo(health_marital_status,'contact_info_marital_status');

            var health_number_of_dependent_children_in_house = this.$("#health-number-of-dependent-children-in-house");
            this.getDropdownInfo(health_number_of_dependent_children_in_house,'number_of_children');

            var health_renewal_source_2016 = this.$("#health-renewal-source-2016");
            this.getDropdownInfo(health_renewal_source_2016,'health_renewal_source_2016');

            var health_renewal_agent_2016 = this.$("#health-renewal-agent-2016");
            this.getDropdownInfo(health_renewal_agent_2016,'renewal_submitter_2016');

            var health_presold_processor_2016 = this.$("#health-presold-processor-2016");
            this.getDropdownInfo(health_presold_processor_2016,'presold_processor_2016');

            var health_application_number_2016_info = this.$("#health-application-number-2016-info");
            var health_effective_date_2016 = this.$("#health-effective-date-2016");
            var health_total_income_used_on_application = this.$("#health-total-income-used-on-application");
            var health_final_gross_premium_2016 = this.$("#health-final-gross-premium-2016");
            var health_final_subsidy_2016 = this.$("#health-final-subsidy-2016");
            var heatlh_plan_2016 = this.$("#heatlh-plan-2016");
            var health_final_premium_after_subsidy_2016 = this.$("#health-final-premium-after-subsidy-2016");

            var health_verification_documents_needed_2016 = this.$("#health-verification-documents-needed-2016");
            this.getDropdownInfo(health_verification_documents_needed_2016,'health_verification_documents_needed_2016');

            var health_verification_documents_due_date_2016 = this.$("#health-verification-documents-due-date-2016");
            var health_application_number_2016_selection = this.$("#health-application-number-2016-selection");

            var health_adults_applying_for_coverage_2016 = this.$("#health-adults-applying-for-coverage-2016");
            this.getDropdownInfo(health_adults_applying_for_coverage_2016,'health_adults_applying_for_coverage_2016');

            var health_total_household_size_2016 = this.$("#health-total-household-size-2016");
            this.getDropdownInfo(health_total_household_size_2016,'health_total_household_size_2016');

            var health_cloud_gross_premium_2016 = this.$("#health-cloud-gross-premium-2016");
            this.getDropdownInfo(health_cloud_gross_premium_2016,'health_cloud_gross_premium_2016');

            var health_children_applying_for_coverage_2016 = this.$("#health-children-applying-for-coverage-2016");
            var health_cloud_subsidy_2016 = this.$("#health-cloud-subsidy-2016");
            var health_cloud_premium_after_subsidy_2016 = this.$("#health-cloud-premium-after-subsidy-2016");

            var health_lead_has_a_marketplace_account = this.$("#health-lead-has-a-marketplace-account");
            this.getDropdownInfo(health_lead_has_a_marketplace_account,'health_lead_has_a_marketplace_account');

            var health_current_coverage = this.$("#health-current-coverage");
            this.getDropdownInfo(health_current_coverage,'health_current_coverage');

            var health_marketplace_app_id_2015 = this.$("#health-marketplace-app-id-2015");
            var health_current_premium = this.$("#health-current-premium");
            var health_subsidy_amount = this.$("#health-subsidy-amount");
            var health_current_net_premium = this.$("#health-current-net-premium");
            // var health_effective_date_2015 = this.$("#health-effective-date-2015");
            // var health_application_id_2015 = this.$("#health-application-id-2015");
            // var health_premium_2015 = this.$("#health-premium-2015");

            // var health_carrier_2015 = this.$("#health-carrier-2015");
            // this.getDropdownInfo(health_carrier_2015,'health_carrier_2015');

            // var health_subsidy_2015 = this.$("#health-subsidy-2015");
            // this.getDropdownInfo(health_subsidy_2015,'health_subsidy_2015');

            // var health_adult_on_plan_2015 = this.$("#health-adult-on-plan-2015");
            // this.getDropdownInfo(health_adult_on_plan_2015,'health_adult_on_plan_2015');

            // var health_children_on_plan_2015 = this.$("#health-children-on-plan-2015");
            // this.getDropdownInfo(health_children_on_plan_2015,'health_children_on_plan_2015');

            // var health_income_verification_needed_2015 = this.$("#health-income-verification-needed-2015");
            // this.getDropdownInfo(health_income_verification_needed_2015,'health_income_verification_needed_2015');

            // var health_citizenship_documents_needed_2015 = this.$("#health-citizenship-documents-needed-2015");
            // this.getDropdownInfo(health_citizenship_documents_needed_2015,'health_citizenship_documents_needed_2015');

            var health_policy = this.$("#health-policy-2016");
            this.getDropdownInfo(health_policy,'health_policy');

            // var health_contact_code_2015 = this.$("#health-contact-code-2015");
            // this.getDropdownInfo(health_contact_code_2015,'health_contact_code_2015');

            var health_wants_to_renew_same_plan_for_2016 = this.$("#health-wants-to-renew-same-plan-for-2016");
            this.getDropdownInfo(health_wants_to_renew_same_plan_for_2016,'health_wants_to_renew_same_plan_for_2016');

            var health_quoted_renewal_gross_premium_2016 = this.$("#health-quoted-renewal-gross-premium-2016");
            var health_quoted_renewal_subsidy_2016 = this.$("#health-quoted-renewal-subsidy-2016");
            var health_quoted_renewal_net_premium_2016 = this.$("#health-quoted-renewal-net-premium-2016");
            var health_username = this.$("#health-username");
            var health_password = this.$("#health-password");
            var home_priority_code = this.$("#home-priority-code");
            var home_auto_priority_code = this.$("#home-auto-priority-code");
            var home_lead_source = this.$("#home-lead-source");
            var home_partner = this.$("*#home-partner");
            var home_insurance_policy_number = this.$("#home-insurance-policy-number");
            var home_writing_agent = this.$("#home-writing-agent");
            var home_scrubber = this.$("#home-scrubber");
            var home_lead_status = this.$("#home-lead-status");
            var home_new_purchase = this.$("#home-new-purchase");
            var home_exp_date_closing_date = this.$("#home-exp-date-closing-date");
            var home_occupancy_status = this.$("#home-occupancy-status");
            var home_type_of_dwelling = this.$("#home-type-of-dwelling");
            var home_current_home_carrier = this.$("#home-current-home-carrier");
            var home_current_home_premium = this.$("#home-current-home-premium");
            var home_current_dwelling_coverage = this.$("#home-current-dwelling-coverage");
            var home_year_built = this.$("#home-year-built");
            var home_square_ft_under_air = this.$("#home-square-ft-under-air");
            var home_garage = this.$("#home-garage");
            var home_construction_type = this.$("#home-construction-type");
            var home_stories = this.$("#home-stories");
            var home_number_of_stories_in_the_building = this.$("#home-number-of-stories-in-the-building");
            var home_what_floor_number_is_condo_on = this.$("#home-what-floor-number-is-condo-on");
            var home_quote_update_request = this.$("#home-quote-update-request");
            var home_policy_effective_date = this.$("#home-policy-effective-date");
            var home_four_point_if_applicable = this.$("#home-four-point-if-applicable");
            var home_quoted_home_company = this.$("#home-quoted-home-company");
            var home_wind_mit = this.$("#home-wind-mit");
            var home_age_roof = this.$("#home-age-roof");
            var home_roof_material = this.$("#home-roof-material");
            var home_bathrooms = this.$("#home-bathrooms");
            var home_dog = this.$("#home-dog");
            var home_pool = this.$("#home-pool");
            var home_fence_or_screen_enclosure  = this.$("#home-fence-or-screen-enclosure");
            var home_bankrupcy_or_Foreclosure_in_the_past_five_years = this.$("#home-bankrupcy-or-Foreclosure-in-the-past-five-years");
            var home_centrally_monitored_alarm = this.$("#home-centrally-monitored-alarm");
            var home_gated_community = this.$("#home-gated-community");
            var home_how_many_claims_in_the_last_five_Years = this.$("#home-how-many-claims-in-the-last-five-Years");
            var home_realtor_mortgage_broker = this.$("#home-realtor-mortgage-broker");
            var home_amount_of_personal_property = this.$("#home-amount-of-personal-property");
            var home_quoted_home_premium = this.$("#home-quoted-home-premium");
            var home_quoted_home_number = this.$("#home-quoted-home-number");
            var home_payment_option = this.$("#home-payment-option");
            var home_mortgage_clause_new = this.$("#home-mortgage-clause-new");
            var home_loan_number = this.$("#home-loan-number");
            var home_insurance_carrier = this.$("#home-insurance-carrier");
            var home_insurance_premium = this.$("#home-insurance-premium");
            var auto_auto_priority_code = this.$("#auto-auto-priority-code");
            var auto_priority_code = this.$("#auto-priority-code");
            var auto_lead_source = this.$("#auto-lead-source");
            var auto_partner = this.$("#auto-partner");
            var auto_insurance_policy_number = this.$("#auto-insurance-policy-number");
            var auto_lead_status = this.$("#auto-lead-status");
            var auto_writing_agent = this.$("#auto-writing-agent");
            var auto_scrubber = this.$("#auto-scrubber");
            var auto_current_auto_carrier = this.$("#auto-current-auto-carrier");
            var auto_expiration_date = this.$("#auto-expiration-date");
            var auto_current_auto_premium = this.$("#auto-current-auto-premium");
            var auto_current_residence_type = this.$("#auto-current-residence-type");
            var auto_driver_one_license_number = this.$("#auto-driver-one-license-number");
            var auto_vehicle_one_vin= this.$("#auto-vehicle-one-vin");
            var auto_vehicle_one_year = this.$("#auto-vehicle-one-year");
            var auto_vehicle_one_make = this.$("#auto-vehicle-one-make");
            var auto_vehicle_one_model = this.$("#auto-vehicle-one-model");
            var auto_driver_two_license_number = this.$("#auto-driver-two-license-number");
            var auto_vehicle_two_vin = this.$("#auto-vehicle-two-vin");
            var auto_vehicle_two_year = this.$("#auto-vehicle-two-year");
            var auto_vehicle_two_make = this.$("#auto-vehicle-two-make");
            var auto_vehicle_two_model = this.$("#auto-vehicle-two-model");
            var auto_bodily_injury_liability = this.$("#auto-bodily-injury-liability");
            var auto_property_damage= this.$("#auto-property-damage");
            var auto_uninsured_motorist_liability = this.$("#auto-uninsured-motorist-liability");
            var auto_medical_payments = this.$("#auto-medical-payments");
            var auto_vehicle_one_comp_ded = this.$("#auto-vehicle-one-comp-ded");
            var auto_vehicle_1_collision_ded = this.$("#auto-vehicle-1-collision-ded");
            var auto_1_towing= this.$("#auto-1-towing");
            var auto_1_rental_car = this.$("#auto-1-rental-car");
            var auto_vehicle_2_comp_ded = this.$("#auto-vehicle-2-comp-ded");
            var auto_vehicle_2_collision_ded = this.$("#auto-vehicle-2-collision-ded");
            var auto_2_towing = this.$("#auto-2-towing");
            var auto_2_rental_car = this.$("#auto-2-rental-car");
            var auto_quote_update_request = this.$("#auto-quote-update-request");
            var auto_policy_effective_date = this.$("#auto-policy-effective-date");
            var auto_payment_option = this.$("#auto-payment-option");
            var auto_payment_info = this.$("#auto-payment-info");
            var auto_quoted_auto_company = this.$("#auto-quoted-auto-company");
            var auto_quoted_auto_premium = this.$("#auto-quoted-auto-premium");
            var auto_quoted_auto_number = this.$("#auto-quoted-auto-number");
            var auto_insurance_carrier = this.$("#auto-insurance-carrier");
            var auto_insurance_premium = this.$("#auto-insurance-premium");
            var auto_document_needed = this.$("#auto-document-needed");
            var life_auto_priority_code = this.$("#life-auto-priority-code");
            var life_priority_code = this.$("#life-priority-code");
            var life_lead_source = this.$("#life-lead-source");
            var life_partner = this.$("#life-partner");
            var life_insurance_policy_number = this.$("#life-insurance-policy-number");
            var life_lead_status = this.$("#life-lead-status");
            var life_writing_agent = this.$("#life-writing-agent");
            var life_scrubber = this.$("#life-scrubber");
            var life_age = this.$("#life-age");
            var life_height = this.$("#life-height");
            var life_weight = this.$("#life-weight");
            var life_insurance_type = this.$("#life-insurance-type");
            var life_term_life_policy_lenght = this.$("#life-term-life-policy-lenght");
            var life_desired_amount_of_coverage = this.$("#life-desired-amount-of-coverage");
            var life_smoke = this.$("#life-smoke");
            var life_major_health_issues_in_relatives = this.$("#life-major-health-issues-in-relatives");
            var life_convicted_of_drunk_driving = this.$("#life-convicted-of-drunk-driving");
            var life_quote_status = this.$("#life-quote-status");
            var life_date_paramed_exam_ordered = this.$("#life-date-paramed-exam-ordered");
            var life_monthly_premium = this.$("#life-monthly-premium");
            var life_paramed_company = this.$("#life-paramed-company");
            var life_application_id_number = this.$("#life-application-id-number");
            var life_application_status = this.$("#life-application-status");
            var life_application_changes = this.$("#life-application-changes");
            var life_after_changes_new_premium = this.$("#life-after-changes-new-premium");
            var life_application_declined_reason = this.$("#life-application-declined-reason");
            var ancilliary_auto_priority_code = this.$("#ancilliary-auto-priority-code");
            var ancilliary_priority_code = this.$("#ancilliary-priority-code");
            var ancilliary_lead_source = this.$("#ancilliary-lead-source");
            var ancilliary_partner = this.$("#ancilliary-partner");
            var ancilliary_insurance_policy_number = this.$("#ancilliary-insurance-policy-number");
            var ancilliary_writing_agent = this.$("#ancilliary-writing-agent");
            var ancilliary_scrubber = this.$("#ancilliary-scrubber");
            var ancilliary_lead_status = this.$("#ancilliary-lead-status");
            var ancilliary_accident = this.$("#ancilliary-accident");
            var ancilliary_critical_illness = this.$("#ancilliary-critical-illness");
            var ancilliary_hospital_confinement = this.$("#ancilliary-hospital-confinement");
            var ancilliary_dental_care = this.$("#ancilliary-dental-care");
            var ancilliary_dental_lead_status = this.$("#ancilliary-dental-lead-status");
            var ancilliary_ancillary_total = this.$("#ancilliary-ancillary-total");
            var ancilliary_abnormal_cancer_screening_test = this.$("#ancilliary-abnormal-cancer-screening-test");
            var ancilliary_cysts_growths_etc_not_seen_for = this.$("#ancilliary-cysts-growths-etc-not-seen-for");
            var ancilliary_carotid_artery_stenosis_etc = this.$("#ancilliary-carotid-artery-stenosis-etc");
            var ancilliary_hiv_positive_aids_related_complex_aids = this.$("#ancilliary-hiv-positive-aids-related-complex-aids");
            var ancilliary_multiple_sclerosis_memory_loss_etc = this.$("#ancilliary-multiple-sclerosis-memory-loss-etc");
            var ancilliary_abnormal_tests_requiring_follow_up = this.$("#ancilliary-abnormal-tests-requiring-follow-up");
            var ancilliary_any_non_routine_consultation_scheduled = this.$("#ancilliary-any-non-routine-consultation-scheduled");
            var ancilliary_one_or_more_imm_relatives_with_issues = this.$("#ancilliary-one-or-more-imm-relatives-with-issues");
            var ancilliary_two_or_more_imm_relatives_with_issues = this.$("#ancilliary-two-or-more-imm-relatives-with-issues");
            var ancilliary_bening_tumor_hypertension_etc = this.$("#ancilliary-bening_tumor-hypertension-etc");
            var ancilliary_prescription_medication_in_last_three_years = this.$("#ancilliary-prescription-medication-in-last-three-years");
            var ancilliary_disorder_disease_heart_kidney_lungs = this.$("#ancilliary-disorder-disease-heart-kidney-lungs");
            var ancilliary_disease_quad_lou_gehrigs_other_motor = this.$("#ancilliary-disease-quad-lou-gehrigs-other-motor");
            var ancilliary_alcohol_or_substance_abuse_five_years = this.$("#ancilliary-alcohol-or-substance-abuse-five-years");
            var ancilliary_heart_attack_stroke_transient_ischemic = this.$("#ancilliary-heart-attack-stroke-transient-ischemic");
            var ancilliary_diabetes_type_one_or_two_blood_press_am = this.$("#ancilliary-diabetes-type-one-or-two-blood-press-am");
            var ancilliary_nursing_home_hospitalized_etc = this.$("#ancilliary-nursing-home-hospitalized-etc");
            var ancilliary_hospitalized_in_the_last_twelve_months = this.$("#ancilliary-hospitalized-in-the-last-twelve-months");
            var ancilliary_diagnosed_or_treated_for_medical_issues = this.$("#ancilliary-diagnosed_or_treated_for_medical_issues");
            var ancilliary_pregnant = this.$("#ancilliary-pregnant");
            var ancilliary_ever_had_a_problem_pregnancy = this.$("#ancilliary-ever_had_a_problem_pregnancy");
            var ancilliary_hypertension = this.$("#ancilliary-hypertension");
            var ancilliary_accident_elite_request_eff_date = this.$("#ancilliary-accident-elite-request_eff_date");
            var ancilliary_accident_elite_premium = this.$("#ancilliary-accident-elite-premium");
            var ancilliary_accident_elite_notes = this.$("#ancilliary-accident-elite-notes");
            var ancilliary_critical_care_request_eff_date = this.$("#ancilliary-critical-care-request-eff-date");
            var ancilliary_critial_care_premium = this.$("#ancilliary-critial-care-premium");
            var ancilliary_critical_care_notes = this.$("#ancilliary-critical-care-notes");
            var ancilliary_request_eff_date = this.$("#ancilliary-request-eff-date");
            var ancilliary_hospital_confinement_premium = this.$("#ancilliary-hospital-confinement-premium");
            var ancilliary_hospital_confinement_notes = this.$("#ancilliary-hospital-confinement-notes");
            var ancilliary_dental_request_eff_date = this.$("#ancilliary-dental-request-eff-date");
            var ancilliary_dental_care_premium = this.$("#ancilliary-dental-care-premium");
            var ancilliary_dental_care_notes = this.$("#ancilliary-dental-care-notes");
            var payment_binder_payment_option = this.$("#payment-binder-payment-option");
            var payment_payment_charge_request = this.$("#payment-payment-charge-request");
            var payment_ccredit_card_type = this.$("#payment-ccredit-card-type");
            var payment_name_on_cc = this.$("#payment-name-on-cc");
            var payment_credit_card_number = this.$("#payment-credit-card-number");
            var payment_cc_expiration_date = this.$("#payment-cc-expiration-date");
            var payment_cc_cvv = this.$("#payment-cc-cvv");
            var payment_bank_account_type = this.$("#payment-bank-account-type");
            var payment_bank_name = this.$("#payment-bank-name");
            var payment_bank_routuing_number = this.$("#payment-bank-routuing-number");
            var payment_bank_account_number = this.$("#payment-bank-account-number");

            var contact_info_property_address_2 = this.$("#contact-info-property-address-2");
            var contact_info_agent_code = this.$("#contact-info-agent-code");
            var contact_info_created_by = this.$("#contact-info-created-by");
            var contact_info_created_date = this.$("#contact-info-created-date");
            var contact_info_date_modified = this.$("#contact-info-date-modified");
            var contact_info_transfer_timestamp = this.$("#contact-info-transfer-timestamp");
            var contact_info_current_job_and_income_info = this.$("#contact-info-current-job-and-income-info");
            var contact_info_spouse = this.$("#contact-info-spouse");
            var contact_info_employment_status = this.$("#contact-info-employment-status");
            var contact_info_subsidy_drop_date = this.$("#contact-info-subsidy-drop-date");
            var contact_info_can_find_a_temp_id_card = this.$("#contact-info-can-find-a-temp-id-card");
            var contact_info_found_in_search_accounts = this.$("#contact-info-found-in-search-accounts");
            var contact_info_paid_to_date_2016 = this.$("#contact-info-paid-to-date-2016");
            var contact_info_corrected_discrepancy = this.$("#contact-info-corrected-discrepancy");
            var contact_info_corrected_discrepancy_completed_date = this.$("#contact-info-corrected-discrepancy-completed-date");
            var contact_info_updated_premium_2016 = this.$("#contact-info-updated-premium-2016");
            var contact_info_marketplace_changed_premium = this.$("#contact-info-marketplace-changed-premium");
            var contact_info_red_box_error = this.$("#contact-info-red-box-error");
            var contact_info_verification_documents_submitted_date = this.$("#contact-info-verification-documents-submitted-date");
            var contact_info_tcpa_compliant = this.$("#contact-info-tcpa-compliant");
            var child_1_income = this.$("#child-1-income");
            var child_2_income = this.$("#child-2-income");
            var child_3_income = this.$("#child-3-income");
            var child_4_income = this.$("#child-4-income");
            var health_agent_notes = this.$("#health-agent-notes");
            var health_project_individual_income = this.$("#health-project-individual-income");
            var health_project_household_income = this.$("#health-project-household-income");
            var health_presold_timestamp = this.$("#health-presold-timestamp");
            var health_tentative_timestamp = this.$("#health-tentative-timestamp");
            var health_enrolled_timestamp = this.$("#health-enrolled-timestamp");
            var health_active_timestamp = this.$("#health-active-timestamp");
            var health_policy_2016 = this.$("#health-policy-2016");
            var payment_paid_confirmation_number = this.$("#payment-paid-confirmation-number");
            var ancillary_client = this.$("#ancillary-client");
            var ancillary_payment_option = this.$("#ancillary-payment-option");
            var ancillary_bank_account_number = this.$("#ancillary-bank-account-number");
            var ancillary_bank_routing_number = this.$("#ancillary-bank-routing-number");
            var ancillary_bank_name = this.$("#ancillary-bank-name");
            var ancillary_bank_account_type = this.$("#ancillary-bank-account-type");


        var health_verification_documents_needed_2016_fields = [];
        $('#health-verification-documents-needed-2016 :selected').each(function(i, selected){
            health_verification_documents_needed_2016_fields[i] = $(selected).text();
        });

        console.log('health_verification_documents_needed_2016_fields',health_verification_documents_needed_2016_fields);

        var saveData = {
            "account": contact_account || "",
            "contact_info_first_name": contact_info_first_name.val() || "",
            "contact_info_last_name": contact_info_last_name.val() || "",
            "contact_info_phone_number": contact_info_phone_number.val() || "",
            "contact_info_cellphone": contact_info_cellphone.val() || "",
            "contact_info_email": contact_info_email.val() || "",
            "contact_info_other_phone": contact_info_other_phone.val() || "",
            "contact_info_date_of_birth": contact_info_date_of_birth.val() || "",
            "contact_info_gender": contact_info_gender.val() || "",
            "contact_info_marital_status": contact_info_marital_status.val() || "",
            "contact_info_number_of_children": contact_info_number_of_children.val() || "",
            "contact_info_social_security_number": contact_info_social_security_number.val() || "",
            "contact_info_property_address": contact_info_property_address.val() || "",
            "contact_info_state": contact_info_state.val() || "",
            "contact_info_city": contact_info_city.val() || "",
            "contact_info_zip_code": contact_info_zip_code.val() || "",
            "contact_info_country": contact_info_country.val() || "",
            "contact_info_mailing_address_different": contact_info_mailing_address_different.val() || "",
            "contact_info_mailing_address": contact_info_mailing_address.val() || "",
            "contact_info_mailing_city": contact_info_mailing_city.val() || "",
            "contact_info_mailing_state": contact_info_mailing_state.val() || "",
            "contact_info_mailing_zipcode": contact_info_mailing_zipcode.val() || "",
            "contact_info_marketplace_email": contact_info_marketplace_email.val() || "",
            "contact_info_language_preference": contact_info_language_preference.val() || "",
            "contact_info_writing_agent": contact_info_writing_agent.val() || "",
            "contact_info_lead_source": contact_info_lead_source.val() || "",
            "contact_info_lead_type": contact_info_lead_type.val() || "",
            "contact_info_partner": contact_info_partner.val() || "",
            "contact_info_last_modified_by": contact_info_last_modified_by.val() || "",
            "contact_info_health_insurance_checkbox": contact_info_health_insurance_checkbox.val() || "",
            "contact_info_home_insurance_checkbox": contact_info_home_insurance_checkbox.val() || "",
            "contact_info_auto_insurance_checkbox": contact_info_auto_insurance_checkbox.val() || "",
            "contact_info_life_insurance_checkbox": contact_info_life_insurance_checkbox.val() || "",
            "contact_info_ancilliary_insurance_checkbox": contact_info_ancilliary_insurance_checkbox.val() || "",
            "contact_info_other_policy_sold": contact_info_other_policy_sold.val() || "",
            "contact_info_federal_do_not_call": contact_info_federal_do_not_call.val() || "",
            "contact_info_do_you_own_your_home": contact_info_do_you_own_your_home.val() || "",
            "contact_info_renew_as_is_email_received": contact_info_renew_as_is_email_received.val() || "",
            "health_us_citizen_or_legal_permanent_resident": health_us_citizen_or_legal_permanent_resident.val() || "",
            "spouse_first_name": spouse_first_name.val() || "",
            "spouse_last_name": spouse_last_name.val() || "",
            "spouse_gender": spouse_gender.val() || "",
            "spouse_dob": spouse_dob.val() || "",
            "spouse_do_you_have_a_social_security_number": spouse_do_you_have_a_social_security_number.val() || "",
            "spouse_social": spouse_social.val() || "",
            "spouse_income_source": spouse_income_source.val() || "",
            "spouse_yearly_income": spouse_yearly_income.val() || "",
            "spouse_employers_name": spouse_employers_name.val() || "",
            "spouse_employers_phone_number": spouse_employers_phone_number.val() || "",
            "contact_info_child_1_name": contact_info_child_1_name.val() || "",
            "contact_info_child_1_dob": contact_info_child_1_dob.val() || "",
            "contact_info_child_1_gender": contact_info_child_1_gender.val() || "",
            "contact_info_child_1_social": contact_info_child_1_social.val() || "",
            "contact_info_child_2_name": contact_info_child_2_name.val() || "",
            "contact_info_child_2_dob": contact_info_child_2_dob.val() || "",
            "contact_info_child_2_gender": contact_info_child_2_gender.val() || "",
            "contact_info_child_2_social": contact_info_child_2_social.val() || "",
            "contact_info_child_3_name": contact_info_child_3_name.val() || "",
            "contact_info_child_3_dob": contact_info_child_3_dob.val() || "",
            "contact_info_child_3_gender": contact_info_child_3_gender.val() || "",
            "contact_info_child_3_social": contact_info_child_3_social.val() || "",
            "contact_info_child_4_name": contact_info_child_4_name.val() || "",
            "contact_info_child_4_dob": contact_info_child_4_dob.val() || "",
            "contact_info_child_4_gender": contact_info_child_4_gender.val() || "",
            "contact_info_child_4_social": contact_info_child_4_social.val() || "",
            "health_auto_priority_code": health_auto_priority_code.val() || "",
            "health_priority_code": health_priority_code.val() || "",
            "health_lead_source": health_lead_source.val() || "",
            "health_partner": health_partner.val() || "",
            "health_lead_status": health_lead_status.val() || "",
            "health_writing_agent": health_writing_agent.val() || "",
            "health_scrubber": health_scrubber.val() || "",
            "health_total_individual_income": health_total_individual_income.val() || "",
            "health_total_household_income": health_total_household_income.val() || "",
            "health_primary_applicants_income_source": health_primary_applicants_income_source.val() || "",
            "health_primary_applicants_employers_name": health_primary_applicants_employers_name.val() || "",
            "health_applicant_employers_phone_number": health_applicant_employers_phone_number.val() || "",
            "health_marital_status": health_marital_status.val() || "",
            "health_number_of_dependent_children_in_house": health_number_of_dependent_children_in_house.val() || "",
            "health_renewal_source_2016": health_renewal_source_2016.val() || "",
            "health_renewal_agent_2016": health_renewal_agent_2016.val() || "",
            "health_presold_processor_2016": health_presold_processor_2016.val() || "",
            "health_application_number_2016_info": health_application_number_2016_info.val() || "",
            "health_effective_date_2016": health_effective_date_2016.val() || "",
            "health_total_income_used_on_application": health_total_income_used_on_application.val() || "",
            "health_final_gross_premium_2016": health_final_gross_premium_2016.val() || "",
            "health_final_subsidy_2016": health_final_subsidy_2016.val() || "",
            "heatlh_plan_2016": heatlh_plan_2016.val() || "",
            "health_final_premium_after_subsidy_2016": health_final_premium_after_subsidy_2016.val() || "",
            "health_verification_documents_needed_2016": health_verification_documents_needed_2016_fields || "",
            "health_verification_documents_due_date_2016": health_verification_documents_due_date_2016.val() || "",
            "health_application_number_2016_selection": health_application_number_2016_selection.val() || "",
            "health_adults_applying_for_coverage_2016": health_adults_applying_for_coverage_2016.val() || "",
            "health_total_household_size_2016": health_total_household_size_2016.val() || "",
            "health_cloud_gross_premium_2016": health_cloud_gross_premium_2016.val() || "",
            "health_children_applying_for_coverage_2016": health_children_applying_for_coverage_2016.val() || "",
            "health_cloud_subsidy_2016": health_cloud_subsidy_2016.val() || "",
            "health_cloud_premium_after_subsidy_2016": health_cloud_premium_after_subsidy_2016.val() || "",
            "health_lead_has_a_marketplace_account": health_lead_has_a_marketplace_account.val() || "",
            "health_current_coverage": health_current_coverage.val() || "",
            "health_marketplace_app_id_2015": health_marketplace_app_id_2015.val() || "",
            "health_current_premium": health_current_premium.val() || "",
            "health_subsidy_amount": health_subsidy_amount.val() || "",
            "health_current_net_premium": health_current_net_premium.val() || "",
            "health_policy": health_policy_2016.val() || "",
            "health_wants_to_renew_same_plan_for_2016": health_wants_to_renew_same_plan_for_2016.val() || "",
            "health_quoted_renewal_gross_premium_2016": health_quoted_renewal_gross_premium_2016.val() || "",
            "health_quoted_renewal_subsidy_2016": health_quoted_renewal_subsidy_2016.val() || "",
            "health_quoted_renewal_net_premium_2016": health_quoted_renewal_net_premium_2016.val() || "",
            "health_username": health_username.val() || "",
            "health_password": health_password.val() || "",
            "home_priority_code": home_priority_code.val() || "",
            "home_auto_priority_code": home_auto_priority_code.val() || "",
            "home_lead_source": home_lead_source.val() || "",
            "home_partner": home_partner.val() || "",
            "home_insurance_policy_number": home_insurance_policy_number.val() || "",
            "home_writing_agent": home_writing_agent.val() || "",
            "home_scrubber": home_scrubber.val() || "",
            "home_lead_status": home_lead_status.val() || "",
            "home_new_purchase": home_new_purchase.val() || "",
            "home_exp_date_closing_date": home_exp_date_closing_date.val() || "",
            "home_occupancy_status": home_occupancy_status.val() || "",
            "home_type_of_dwelling": home_type_of_dwelling.val() || "",
            "home_current_home_carrier": home_current_home_carrier.val() || "",
            "home_current_home_premium": home_current_home_premium.val() || "",
            "home_current_dwelling_coverage": home_current_dwelling_coverage.val() || "",
            "home_year_built": home_year_built.val() || "",
            "home_square_ft_under_air": home_square_ft_under_air.val() || "",
            "home_garage": home_garage.val() || "",
            "home_construction_type": home_construction_type.val() || "",
            "home_stories": home_stories.val() || "",
            "home_number_of_stories_in_the_building": home_number_of_stories_in_the_building.val() || "",
            "home_what_floor_number_is_condo_on": home_what_floor_number_is_condo_on.val() || "",
            "home_quote_update_request": home_quote_update_request.val() || "",
            "home_policy_effective_date": home_policy_effective_date.val() || "",
            "home_four_point_if_applicable": home_four_point_if_applicable.val() || "",
            "home_quoted_home_company": home_quoted_home_company.val() || "",
            "home_wind_mit": home_wind_mit.val() || "",
            "home_age_roof": home_age_roof.val() || "",
            "home_roof_material": home_roof_material.val() || "",
            "home_bathrooms": home_bathrooms.val() || "",
            "home_dog": home_dog.val() || "",
            "home_pool": home_pool.val() || "",
            "home_fence_or_screen_enclosure": home_fence_or_screen_enclosure.val() || "",
            "home_bankrupcy_or_Foreclosure_in_the_past_five_years": home_bankrupcy_or_Foreclosure_in_the_past_five_years.val() || "",
            "home_centrally_monitored_alarm": home_centrally_monitored_alarm.val() || "",
            "home_gated_community": home_gated_community.val() || "",
            "home_how_many_claims_in_the_last_five_Years": home_how_many_claims_in_the_last_five_Years.val() || "",
            "home_realtor_mortgage_broker": home_realtor_mortgage_broker.val() || "",
            "home_amount_of_personal_property": home_amount_of_personal_property.val() || "",
            "home_quoted_home_premium": home_quoted_home_premium.val() || "",
            "home_quoted_home_number": home_quoted_home_number.val() || "",
            "home_payment_option": home_payment_option.val() || "",
            "home_mortgage_clause_new": home_mortgage_clause_new.val() || "",
            "home_loan_number": home_loan_number.val() || "",
            "home_insurance_carrier": home_insurance_carrier.val() || "",
            "home_insurance_premium": home_insurance_premium.val() || "",
            "auto_auto_priority_code": auto_auto_priority_code.val() || "",
            "auto_priority_code": auto_priority_code.val() || "",
            "auto_lead_source": auto_lead_source.val() || "",
            "auto_partner": auto_partner.val() || "",
            "auto_insurance_policy_number": auto_insurance_policy_number.val() || "",
            "auto_lead_status": auto_lead_status.val() || "",
            "auto_writing_agent": auto_writing_agent.val() || "",
            "auto_scrubber": auto_scrubber.val() || "",
            "auto_current_auto_carrier": auto_current_auto_carrier.val() || "",
            "auto_expiration_date": auto_expiration_date.val() || "",
            "auto_current_auto_premium": auto_current_auto_premium.val() || "",
            "auto_current_residence_type": auto_current_residence_type.val() || "",
            "auto_driver_one_license_number": auto_driver_one_license_number.val() || "",
            "auto_vehicle_one_vin": auto_vehicle_one_vin.val() || "",
            "auto_vehicle_one_year": auto_vehicle_one_year.val() || "",
            "auto_vehicle_one_make": auto_vehicle_one_make.val() || "",
            "auto_vehicle_one_model": auto_vehicle_one_model.val() || "",
            "auto_driver_two_license_number": auto_driver_two_license_number.val() || "",
            "auto_vehicle_two_vin": auto_vehicle_two_vin.val() || "",
            "auto_vehicle_two_year": auto_vehicle_two_year.val() || "",
            "auto_vehicle_two_make": auto_vehicle_two_make.val() || "",
            "auto_vehicle_two_model": auto_vehicle_two_model.val() || "",
            "auto_bodily_injury_liability": auto_bodily_injury_liability.val() || "",
            "auto_property_damage": auto_property_damage.val() || "",
            "auto_uninsured_motorist_liability": auto_uninsured_motorist_liability.val() || "",
            "auto_medical_payments": auto_medical_payments.val() || "",
            "auto_vehicle_one_comp_ded": auto_vehicle_one_comp_ded.val() || "",
            "auto_vehicle_1_collision_ded": auto_vehicle_1_collision_ded.val() || "",
            "auto_1_towing": auto_1_towing.val() || "",
            "auto_1_rental_car": auto_1_rental_car.val() || "",
            "auto_vehicle_2_comp_ded": auto_vehicle_2_comp_ded.val() || "",
            "auto_vehicle_2_collision_ded": auto_vehicle_2_collision_ded.val() || "",
            "auto_2_towing": auto_2_towing.val() || "",
            "auto_2_rental_car": auto_2_rental_car.val() || "",
            "auto_quote_update_request": auto_quote_update_request.val() || "",
            "auto_policy_effective_date": auto_policy_effective_date.val() || "",
            "auto_payment_option": auto_payment_option.val() || "",
            "auto_payment_info": auto_payment_info.val() || "",
            "auto_quoted_auto_company": auto_quoted_auto_company.val() || "",
            "auto_quoted_auto_premium": auto_quoted_auto_premium.val() || "",
            "auto_quoted_auto_number": auto_quoted_auto_number.val() || "",
            "auto_insurance_carrier": auto_insurance_carrier.val() || "",
            "auto_insurance_premium": auto_insurance_premium.val() || "",
            "auto_document_needed": auto_document_needed.val() || "",
            "life_auto_priority_code": life_auto_priority_code.val() || "",
            "life_priority_code": life_priority_code.val() || "",
            "life_lead_source": life_lead_source.val() || "",
            "life_partner": life_partner.val() || "",
            "life_insurance_policy_number": life_insurance_policy_number.val() || "",
            "life_lead_status": life_lead_status.val() || "",
            "life_writing_agent": life_writing_agent.val() || "",
            "life_scrubber": life_scrubber.val() || "",
            "life_age": life_age.val() || "",
            "life_height": life_height.val() || "",
            "life_weight": life_weight.val() || "",
            "life_insurance_type": life_insurance_type.val() || "",
            "life_term_life_policy_lenght": life_term_life_policy_lenght.val() || "",
            "life_desired_amount_of_coverage": life_desired_amount_of_coverage.val() || "",
            "life_smoke": life_smoke.val() || "",
            "life_major_health_issues_in_relatives": life_major_health_issues_in_relatives.val() || "",
            "life_convicted_of_drunk_driving": life_convicted_of_drunk_driving.val() || "",
            "life_quote_status": life_quote_status.val() || "",
            "life_date_paramed_exam_ordered": life_date_paramed_exam_ordered.val() || "",
            "life_monthly_premium": life_monthly_premium.val() || "",
            "life_paramed_company": life_paramed_company.val() || "",
            "life_application_id_number": life_application_id_number.val() || "",
            "life_application_status": life_application_status.val() || "",
            "life_application_changes": life_application_changes.val() || "",
            "life_after_changes_new_premium": life_after_changes_new_premium.val() || "",
            "life_application_declined_reason": life_application_declined_reason.val() || "",
            "ancilliary_auto_priority_code": ancilliary_auto_priority_code.val() || "",
            "ancilliary_priority_code": ancilliary_priority_code.val() || "",
            "ancilliary_lead_source": ancilliary_lead_source.val() || "",
            "ancilliary_partner": ancilliary_partner.val() || "",
            "ancilliary_insurance_policy_number": ancilliary_insurance_policy_number.val() || "",
            "ancilliary_writing_agent": ancilliary_writing_agent.val() || "",
            "ancilliary_scrubber": ancilliary_scrubber.val() || "",
            "ancilliary_lead_status": ancilliary_lead_status.val() || "",
            "ancilliary_accident": ancilliary_accident.val() || "",
            "ancilliary_critical_illness": ancilliary_critical_illness.val() || "",
            "ancilliary_hospital_confinement": ancilliary_hospital_confinement.val() || "",
            "ancilliary_dental_care": ancilliary_dental_care.val() || "",
            "ancilliary_dental_lead_status": ancilliary_dental_lead_status.val() || "",
            "ancilliary_ancillary_total": ancilliary_ancillary_total.val() || "",
            "ancilliary_abnormal_cancer_screening_test": ancilliary_abnormal_cancer_screening_test.val() || "",
            "ancilliary_cysts_growths_etc_not_seen_for": ancilliary_cysts_growths_etc_not_seen_for.val() || "",
            "ancilliary_carotid_artery_stenosis_etc": ancilliary_carotid_artery_stenosis_etc.val() || "",
            "ancilliary_hiv_positive_aids_related_complex_aids": ancilliary_hiv_positive_aids_related_complex_aids.val() || "",
            "ancilliary_multiple_sclerosis_memory_loss_etc": ancilliary_multiple_sclerosis_memory_loss_etc.val() || "",
            "ancilliary_abnormal_tests_requiring_follow_up": ancilliary_abnormal_tests_requiring_follow_up.val() || "",
            "ancilliary_any_non_routine_consultation_scheduled": ancilliary_any_non_routine_consultation_scheduled.val() || "",
            "ancilliary_one_or_more_imm_relatives_with_issues": ancilliary_one_or_more_imm_relatives_with_issues.val() || "",
            "ancilliary_two_or_more_imm_relatives_with_issues": ancilliary_two_or_more_imm_relatives_with_issues.val() || "",
            "ancilliary_bening_tumor_hypertension_etc": ancilliary_bening_tumor_hypertension_etc.val() || "",
            "ancilliary_prescription_medication_in_last_three_years": ancilliary_prescription_medication_in_last_three_years.val() || "",
            "ancilliary_disorder_disease_heart_kidney_lungs": ancilliary_disorder_disease_heart_kidney_lungs.val() || "",
            "ancilliary_disease_quad_lou_gehrigs_other_motor": ancilliary_disease_quad_lou_gehrigs_other_motor.val() || "",
            "ancilliary_alcohol_or_substance_abuse_five_years": ancilliary_alcohol_or_substance_abuse_five_years.val() || "",
            "ancilliary_heart_attack_stroke_transient_ischemic": ancilliary_heart_attack_stroke_transient_ischemic.val() || "",
            "ancilliary_diabetes_type_one_or_two_blood_press_am": ancilliary_diabetes_type_one_or_two_blood_press_am.val() || "",
            "ancilliary_nursing_home_hospitalized_etc": ancilliary_nursing_home_hospitalized_etc.val() || "",
            "ancilliary_hospitalized_in_the_last_twelve_months": ancilliary_hospitalized_in_the_last_twelve_months.val() || "",
            "ancilliary_diagnosed_or_treated_for_medical_issues": ancilliary_diagnosed_or_treated_for_medical_issues.val() || "",
            "ancilliary_pregnant": ancilliary_pregnant.val() || "",
            "ancilliary_ever_had_a_problem_pregnancy": ancilliary_ever_had_a_problem_pregnancy.val() || "",
            "ancilliary_hypertension": ancilliary_hypertension.val() || "",
            "ancilliary_accident_elite_request_eff_date": ancilliary_accident_elite_request_eff_date.val() || "",
            "ancilliary_accident_elite_premium": ancilliary_accident_elite_premium.val() || "",
            "ancilliary_accident_elite_notes": ancilliary_accident_elite_notes.val() || "",
            "ancilliary_critical_care_request_eff_date": ancilliary_critical_care_request_eff_date.val() || "",
            "ancilliary_critial_care_premium": ancilliary_critial_care_premium.val() || "",
            "ancilliary_critical_care_notes": ancilliary_critical_care_notes.val() || "",
            "ancilliary_request_eff_date": ancilliary_request_eff_date.val() || "",
            "ancilliary_hospital_confinement_premium": ancilliary_hospital_confinement_premium.val() || "",
            "ancilliary_hospital_confinement_notes": ancilliary_hospital_confinement_notes.val() || "",
            "ancilliary_dental_request_eff_date": ancilliary_dental_request_eff_date.val() || "",
            "ancilliary_dental_care_premium": ancilliary_dental_care_premium.val() || "",
            "ancilliary_dental_care_notes": ancilliary_dental_care_notes.val() || "",
            "payment_binder_payment_option": payment_binder_payment_option.val() || "",
            "payment_payment_charge_request": payment_payment_charge_request.val() || "",
            "payment_ccredit_card_type": payment_ccredit_card_type.val() || "",
            "payment_name_on_cc": payment_name_on_cc.val() || "",
            "payment_credit_card_number": payment_credit_card_number.val() || "",
            "payment_cc_expiration_date": payment_cc_expiration_date.val() || "",
            "payment_cc_cvv": payment_cc_cvv.val() || "",
            "payment_bank_account_type": payment_bank_account_type.val() || "",
            "payment_bank_name": payment_bank_name.val() || "",
            "payment_bank_routuing_number": payment_bank_routuing_number.val() || "",
            "payment_bank_account_number": payment_bank_account_number.val() || "",
            "contact_info_property_address_2": contact_info_property_address_2.val() || "",
            "contact_info_agent_code": contact_info_agent_code.val() || "",
            "contact_info_created_by": contact_info_created_by.val() || "",
            "contact_info_created_date": contact_info_created_date.val() || "",
            "contact_info_date_modified": contact_info_date_modified.val() || "",
            "contact_info_transfer_timestamp": contact_info_transfer_timestamp.val() || "",
            "contact_info_current_job_and_income_info": contact_info_current_job_and_income_info.val() || "",
            "contact_info_spouse": contact_info_spouse.val() || "",
            "contact_info_employment_status": contact_info_employment_status.val() || "",
            "contact_info_subsidy_drop_date": contact_info_subsidy_drop_date.val() || "",
            "contact_info_can_find_a_temp_id_card": contact_info_can_find_a_temp_id_card.val() || "",
            "contact_info_found_in_search_accounts": contact_info_found_in_search_accounts.val() || "",
            "contact_info_paid_to_date_2016": contact_info_paid_to_date_2016.val() || "",
            "contact_info_corrected_discrepancy": contact_info_corrected_discrepancy.val() || "",
            "contact_info_corrected_discrepancy_completed_date": contact_info_corrected_discrepancy_completed_date.val() || "",
            "contact_info_updated_premium_2016": contact_info_updated_premium_2016.val() || "",
            "contact_info_marketplace_changed_premium": contact_info_marketplace_changed_premium.val() || "",
            "contact_info_red_box_error": contact_info_red_box_error.val() || "",
            "contact_info_verification_documents_submitted_date": contact_info_verification_documents_submitted_date.val() || "",
            "contact_info_tcpa_compliant": contact_info_tcpa_compliant.val() || "",
            "child_1_income": child_1_income.val() || "",
            "child_2_income": child_2_income.val() || "",
            "child_3_income": child_3_income.val() || "",
            "child_4_income": child_4_income.val() || "",
            "health_agent_notes": health_agent_notes.val() || "",
            "health_project_individual_income": health_project_individual_income.val() || "",
            "health_project_household_income": health_project_household_income.val() || "",
            "health_presold_timestamp": health_presold_timestamp.val() || "",
            "health_tentative_timestamp": health_tentative_timestamp.val() || "",
            "health_enrolled_timestamp": health_enrolled_timestamp.val() || "",
            "health_active_timestamp": health_active_timestamp.val() || "",
            "health_policy_2016": health_policy_2016.val() || "",
            "payment_paid_confirmation_number": payment_paid_confirmation_number.val() || "",
            "ancillary_client": ancillary_client.val() || "",
            "ancillary_payment_option": ancillary_payment_option.val() || "",
            "ancillary_bank_account_number": ancillary_bank_account_number.val() || "",
            "ancillary_bank_routing_number": ancillary_bank_routing_number.val() || "",
            "ancillary_bank_name": ancillary_bank_name.val() || "",
            "ancillary_bank_account_type": ancillary_bank_account_type.val() || "",
        };

        console.log('event',event,this.contact_uuid);

        if(event.currentTarget.id==='update-contact-btn-create'){
            console.log('UPDATING CONTACT');
            contact_uuid = JSON.parse(localStorage.getItem('current_contact_uuid'));
            console.log('SaveDate',saveData, typeof saveData);
            contact = new fun.models.Contact(contact_uuid);
            contact.save(saveData,{patch: true});
        } else {
            contact = new fun.models.Contact(saveData);
            contact.save();
        }
        $('#profileContactModal').modal('hide');
    },

    newContact: function(event){
        console.log('new contact and stuff get the popup in here');
        'use strict';
        event.preventDefault();

        this.renderContactModalForm();

        function renderDate(date){
            var now = new Date(date);
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            return today;
        }

        var view = this,
            name,
            contact,
            contact_uuid,
            contact_account,
            contact_description,
            contact_history,
            contact_comment;

        $('#profileContactModal').modal({
            'show': true
        });

        // CALL THE INPUTS
            var contact_info_first_name = this.$("#contact-info-first-name");
            var contact_info_last_name = this.$("#contact-info-last-name");
            var contact_info_phone_number = this.$("#contact-info-phone-number");
            var contact_info_cellphone = this.$("#contact-info-cellphone");
            var contact_info_email = this.$("#contact-info-email");
            var contact_info_other_phone = this.$("#contact-info-other-phone");
            var contact_info_date_of_birth = this.$("#contact-info-date-of-birth");

            var contact_info_gender = this.$("#contact-info-gender");
            this.getDropdownInfo(contact_info_gender,'contact_info_gender');

            var contact_info_marital_status = this.$("#contact-info-marital-status");
            this.getDropdownInfo(contact_info_marital_status,'contact_info_marital_status');

            var contact_info_number_of_children = this.$("#contact-info-number-of-children");
            this.getDropdownInfo(contact_info_number_of_children,'contact_info_number_of_children');

            var contact_info_social_security_number = this.$("#contact-info-social-security-number");
            var contact_info_property_address = this.$("#contact-info-property-address");

            var contact_info_state = this.$("#contact-info-state");
            this.getDropdownInfo(contact_info_state,'contact_info_state');

            var contact_info_city = this.$("#contact-info-city");
            var contact_info_zip_code = this.$("#contact-info-zip-code");

            var contact_info_country = this.$("#contact-info-country");
            this.getDropdownInfo(contact_info_country,'contact_info_country');

            var contact_info_mailing_address_different = this.$("#contact-info-mailing-address-different");
            this.getDropdownInfo(contact_info_mailing_address_different,'contact_info_mailing_address_different');

            var contact_info_mailing_address = this.$("#contact-info-mailing-address");
            var contact_info_mailing_city = this.$("#contact-info-mailing-city");
            var contact_info_mailing_state = this.$("#contact-info-mailing-state");
            var contact_info_mailing_zipcode = this.$("#contact-info-mailing-zipcode");
            var contact_info_marketplace_email = this.$("#contact-info-marketplace-email");

            var contact_info_language_preference = this.$("#contact-info-language-preference");
            this.getDropdownInfo(contact_info_language_preference,'language_preference');

            var contact_info_writing_agent = this.$("#contact-info-writing-agent");
            this.getDropdownInfo(contact_info_writing_agent,'contact_info_writing_agent');

            var contact_info_lead_source = this.$("#contact-info-lead-source");
            this.getDropdownInfo(contact_info_lead_source,'contact_info_lead_source');

            var contact_info_lead_type = this.$("#contact-info-lead-type");
            this.getDropdownInfo(contact_info_lead_type,'contact_info_lead_type');

            var contact_info_partner = this.$("#contact-info-partner");
            var contact_info_last_modified_by = this.$("#contact-info-last-modified-by");

            var contact_info_health_insurance_checkbox = this.$("#contact-info-health-insurance-checkbox");
            this.getDropdownInfo(contact_info_health_insurance_checkbox,'contact_info_health_insurance_checkbox');
            console.log('DROPDOWN!!!!',contact_info_health_insurance_checkbox);

            var contact_info_home_insurance_checkbox = this.$("#contact-info-home-insurance-checkbox");
            this.getDropdownInfo(contact_info_home_insurance_checkbox,'contact_info_home_insurance_checkbox');

            var contact_info_auto_insurance_checkbox = this.$("#contact-info-auto-insurance-checkbox");
            this.getDropdownInfo(contact_info_auto_insurance_checkbox,'contact_info_auto_insurance_checkbox');

            var contact_info_life_insurance_checkbox = this.$("#contact-info-life-insurance-checkbox");
            this.getDropdownInfo(contact_info_life_insurance_checkbox,'contact_info_life_insurance_checkbox');

            var contact_info_ancilliary_insurance_checkbox = this.$("#contact-info-ancilliary-insurance-checkbox");
            this.getDropdownInfo(contact_info_ancilliary_insurance_checkbox,'ancillary_lead_status');

            var contact_info_other_policy_sold = this.$("#contact-info-other-policy-sold");
            this.getDropdownInfo(contact_info_other_policy_sold,'other_policies_sold');

            var contact_info_federal_do_not_call = this.$("#contact-info-federal-do-not-call");
            this.getDropdownInfo(contact_info_federal_do_not_call,'contact_info_federal_do_not_call');

            var contact_info_do_you_own_your_home = this.$("#contact-info-do-you-own-your-home");
            this.getDropdownInfo(contact_info_do_you_own_your_home,'contact_info_do_you_own_your_home');

            var contact_info_renew_as_is_email_received = this.$("#contact-info-renew-as-is-email-received");
            this.getDropdownInfo(contact_info_renew_as_is_email_received,'contact_info_renew_as_is_email_received');

            var health_us_citizen_or_legal_permanent_resident = this.$("#health-us-citizen-or-legal-permanent-resident");
            this.getDropdownInfo(health_us_citizen_or_legal_permanent_resident,'us_citizen_or_legal_permanent_resident');

            var spouse_first_name = this.$("#spouse-first-name");
            var spouse_last_name = this.$("#spouse-last-name");

            var spouse_gender = this.$("#spouse-gender");
            this.getDropdownInfo(spouse_gender,'contact_info_gender');

            var spouse_dob = this.$("#spouse-dob");
            this.getDropdownInfo(spouse_dob,'contact_info_gender');

            var spouse_do_you_have_a_social_security_number = this.$("#spouse-do-you-have-a-social-security-number");
            this.getDropdownInfo(spouse_do_you_have_a_social_security_number,'spouse_do_you_have_a_social_security_number');

            var spouse_social = this.$("#spouse-social");
            var spouse_income_source = this.$("#spouse-income-source");
            var spouse_yearly_income = this.$("#spouse-yearly-income");
            var spouse_employers_name = this.$("#spouse-employers-name");
            var spouse_employers_phone_number = this.$("#spouse-employers-phone-number");
            var contact_info_child_1_name = this.$("#child-1-name");
            var contact_info_child_1_dob = this.$("#child-1-dob");
            var contact_info_child_1_gender = this.$("#child-1-gender");
            var contact_info_child_1_social = this.$("#child-1-social");
            var contact_info_child_2_name = this.$("#child-2-name");
            var contact_info_child_2_dob = this.$("#child-2-dob");
            var contact_info_child_2_gender = this.$("#child-2-gender");
            var contact_info_child_2_social = this.$("#child-2-social");
            var contact_info_child_3_name = this.$("#child-3-name");
            var contact_info_child_3_dob = this.$("#child-3-dob");
            var contact_info_child_3_gender = this.$("#child-3-gender");
            var contact_info_child_3_social = this.$("#child-3-social");
            var contact_info_child_4_name = this.$("#child-4-name");
            var contact_info_child_4_dob = this.$("#child-4-dob");
            var contact_info_child_4_gender = this.$("#child-4-gender");
            var contact_info_child_4_social = this.$("#child-4-social");

            var health_auto_priority_code = this.$("#health-auto-priority-code");
            this.getDropdownInfo(health_auto_priority_code,'health_auto_priority_code');

            var health_priority_code = this.$("#health-priority-code");
            this.getDropdownInfo(health_priority_code,'health_priority_code');

            var health_lead_source = this.$("#health-lead-source");
            this.getDropdownInfo(health_lead_source,'health_lead_source');

            var health_partner = this.$("#health-partner");
            this.getDropdownInfo(health_partner,'contact_info_gender');

            var health_lead_status = this.$("#health-lead-status");
            this.getDropdownInfo(health_lead_status,'health_lead_status');

            var health_writing_agent = this.$("#health-writing-agent");
            this.getDropdownInfo(health_writing_agent,'health_writing_agent');

            var health_scrubber = this.$("#health-scrubber");
            this.getDropdownInfo(health_scrubber,'health_scrubber');

            var health_total_individual_income = this.$("#health-total-individual-income");
            var health_total_household_income = this.$("#health-total-household-income");
            var health_primary_applicants_income_source = this.$("#health-primary-applicants-income-source");
            var health_primary_applicants_employers_name = this.$("#health-primary-applicants-employers-name");
            var health_applicant_employers_phone_number = this.$("#health-applicant-employers-phone-number");

            var health_marital_status = this.$("#health-marital-status");
            this.getDropdownInfo(health_marital_status,'contact_info_marital_status');

            var health_number_of_dependent_children_in_house = this.$("#health-number-of-dependent-children-in-house");
            this.getDropdownInfo(health_number_of_dependent_children_in_house,'number_of_children');

            var health_renewal_source_2016 = this.$("#health-renewal-source-2016");
            this.getDropdownInfo(health_renewal_source_2016,'health_renewal_source_2016');

            var health_renewal_agent_2016 = this.$("#health-renewal-agent-2016");
            this.getDropdownInfo(health_renewal_agent_2016,'renewal_submitter_2016');

            var health_presold_processor_2016 = this.$("#health-presold-processor-2016");
            this.getDropdownInfo(health_presold_processor_2016,'presold_processor_2016');

            var health_application_number_2016_info = this.$("#health-application-number-2016-info");
            var health_effective_date_2016 = this.$("#health-effective-date-2016");
            var health_total_income_used_on_application = this.$("#health-total-income-used-on-application");
            var health_final_gross_premium_2016 = this.$("#health-final-gross-premium-2016");
            var health_final_subsidy_2016 = this.$("#health-final-subsidy-2016");
            var heatlh_plan_2016 = this.$("#heatlh-plan-2016");
            var health_final_premium_after_subsidy_2016 = this.$("#health-final-premium-after-subsidy-2016");

            var health_verification_documents_needed_2016 = this.$("#health-verification-documents-needed-2016");
            this.getDropdownInfo(health_verification_documents_needed_2016,'health_verification_documents_needed_2016');

            var health_verification_documents_due_date_2016 = this.$("#health-verification-documents-due-date-2016");
            var health_application_number_2016_selection = this.$("#health-application-number-2016-selection");

            var health_adults_applying_for_coverage_2016 = this.$("#health-adults-applying-for-coverage-2016");
            this.getDropdownInfo(health_adults_applying_for_coverage_2016,'health_adults_applying_for_coverage_2016');

            var health_total_household_size_2016 = this.$("#health-total-household-size-2016");
            this.getDropdownInfo(health_total_household_size_2016,'health_total_household_size_2016');

            var health_cloud_gross_premium_2016 = this.$("#health-cloud-gross-premium-2016");
            this.getDropdownInfo(health_cloud_gross_premium_2016,'health_cloud_gross_premium_2016');

            var health_children_applying_for_coverage_2016 = this.$("#health-children-applying-for-coverage-2016");
            var health_cloud_subsidy_2016 = this.$("#health-cloud-subsidy-2016");
            var health_cloud_premium_after_subsidy_2016 = this.$("#health-cloud-premium-after-subsidy-2016");

            var health_lead_has_a_marketplace_account = this.$("#health-lead-has-a-marketplace-account");
            this.getDropdownInfo(health_lead_has_a_marketplace_account,'health_lead_has_a_marketplace_account');

            var health_current_coverage = this.$("#health-current-coverage");
            this.getDropdownInfo(health_current_coverage,'health_current_coverage');

            var health_marketplace_app_id_2015 = this.$("#health-marketplace-app-id-2015");
            var health_current_premium = this.$("#health-current-premium");
            var health_subsidy_amount = this.$("#health-subsidy-amount");
            var health_current_net_premium = this.$("#health-current-net-premium");
            // var health_effective_date_2015 = this.$("#health-effective-date-2015");
            // var health_application_id_2015 = this.$("#health-application-id-2015");
            // var health_premium_2015 = this.$("#health-premium-2015");

            // var health_carrier_2015 = this.$("#health-carrier-2015");
            // this.getDropdownInfo(health_carrier_2015,'health_carrier_2015');

            // var health_subsidy_2015 = this.$("#health-subsidy-2015");
            // this.getDropdownInfo(health_subsidy_2015,'health_subsidy_2015');

            // var health_adult_on_plan_2015 = this.$("#health-adult-on-plan-2015");
            // this.getDropdownInfo(health_adult_on_plan_2015,'health_adult_on_plan_2015');

            // var health_children_on_plan_2015 = this.$("#health-children-on-plan-2015");
            // this.getDropdownInfo(health_children_on_plan_2015,'health_children_on_plan_2015');

            // var health_income_verification_needed_2015 = this.$("#health-income-verification-needed-2015");
            // this.getDropdownInfo(health_income_verification_needed_2015,'health_income_verification_needed_2015');

            // var health_citizenship_documents_needed_2015 = this.$("#health-citizenship-documents-needed-2015");
            // this.getDropdownInfo(health_citizenship_documents_needed_2015,'health_citizenship_documents_needed_2015');

            var health_policy = this.$("#health-policy-2016");
            this.getDropdownInfo(health_policy,'health_policy');

            // var health_contact_code_2015 = this.$("#health-contact-code-2015");
            // this.getDropdownInfo(health_contact_code_2015,'health_contact_code_2015');

            var health_wants_to_renew_same_plan_for_2016 = this.$("#health-wants-to-renew-same-plan-for-2016");
            this.getDropdownInfo(health_wants_to_renew_same_plan_for_2016,'health_wants_to_renew_same_plan_for_2016');

            var health_quoted_renewal_gross_premium_2016 = this.$("#health-quoted-renewal-gross-premium-2016");
            var health_quoted_renewal_subsidy_2016 = this.$("#health-quoted-renewal-subsidy-2016");
            var health_quoted_renewal_net_premium_2016 = this.$("#health-quoted-renewal-net-premium-2016");
            var health_username = this.$("#health-username");
            var health_password = this.$("#health-password");
            var home_priority_code = this.$("#home-priority-code");
            var home_auto_priority_code = this.$("#home-auto-priority-code");
            var home_lead_source = this.$("#home-lead-source");
            var home_partner = this.$("*#home-partner");
            var home_insurance_policy_number = this.$("#home-insurance-policy-number");
            var home_writing_agent = this.$("#home-writing-agent");
            var home_scrubber = this.$("#home-scrubber");
            var home_lead_status = this.$("#home-lead-status");
            var home_new_purchase = this.$("#home-new-purchase");
            var home_exp_date_closing_date = this.$("#home-exp-date-closing-date");
            var home_occupancy_status = this.$("#home-occupancy-status");
            var home_type_of_dwelling = this.$("#home-type-of-dwelling");
            var home_current_home_carrier = this.$("#home-current-home-carrier");
            var home_current_home_premium = this.$("#home-current-home-premium");
            var home_current_dwelling_coverage = this.$("#home-current-dwelling-coverage");
            var home_year_built = this.$("#home-year-built");
            var home_square_ft_under_air = this.$("#home-square-ft-under-air");
            var home_garage = this.$("#home-garage");
            var home_construction_type = this.$("#home-construction-type");
            var home_stories = this.$("#home-stories");
            var home_number_of_stories_in_the_building = this.$("#home-number-of-stories-in-the-building");
            var home_what_floor_number_is_condo_on = this.$("#home-what-floor-number-is-condo-on");
            var home_quote_update_request = this.$("#home-quote-update-request");
            var home_policy_effective_date = this.$("#home-policy-effective-date");
            var home_four_point_if_applicable = this.$("#home-four-point-if-applicable");
            var home_quoted_home_company = this.$("#home-quoted-home-company");
            var home_wind_mit = this.$("#home-wind-mit");
            var home_age_roof = this.$("#home-age-roof");
            var home_roof_material = this.$("#home-roof-material");
            var home_bathrooms = this.$("#home-bathrooms");
            var home_dog = this.$("#home-dog");
            var home_pool = this.$("#home-pool");
            var home_fence_or_screen_enclosure  = this.$("#home-fence-or-screen-enclosure");
            var home_bankrupcy_or_Foreclosure_in_the_past_five_years = this.$("#home-bankrupcy-or-Foreclosure-in-the-past-five-years");
            var home_centrally_monitored_alarm = this.$("#home-centrally-monitored-alarm");
            var home_gated_community = this.$("#home-gated-community");
            var home_how_many_claims_in_the_last_five_Years = this.$("#home-how-many-claims-in-the-last-five-Years");
            var home_realtor_mortgage_broker = this.$("#home-realtor-mortgage-broker");
            var home_amount_of_personal_property = this.$("#home-amount-of-personal-property");
            var home_quoted_home_premium = this.$("#home-quoted-home-premium");
            var home_quoted_home_number = this.$("#home-quoted-home-number");
            var home_payment_option = this.$("#home-payment-option");
            var home_mortgage_clause_new = this.$("#home-mortgage-clause-new");
            var home_loan_number = this.$("#home-loan-number");
            var home_insurance_carrier = this.$("#home-insurance-carrier");
            var home_insurance_premium = this.$("#home-insurance-premium");
            var auto_auto_priority_code = this.$("#auto-auto-priority-code");
            var auto_priority_code = this.$("#auto-priority-code");
            var auto_lead_source = this.$("#auto-lead-source");
            var auto_partner = this.$("#auto-partner");
            var auto_insurance_policy_number = this.$("#auto-insurance-policy-number");
            var auto_lead_status = this.$("#auto-lead-status");
            var auto_writing_agent = this.$("#auto-writing-agent");
            var auto_scrubber = this.$("#auto-scrubber");
            var auto_current_auto_carrier = this.$("#auto-current-auto-carrier");
            var auto_expiration_date = this.$("#auto-expiration-date");
            var auto_current_auto_premium = this.$("#auto-current-auto-premium");
            var auto_current_residence_type = this.$("#auto-current-residence-type");
            var auto_driver_one_license_number = this.$("#auto-driver-one-license-number");
            var auto_vehicle_one_vin= this.$("#auto-vehicle-one-vin");
            var auto_vehicle_one_year = this.$("#auto-vehicle-one-year");
            var auto_vehicle_one_make = this.$("#auto-vehicle-one-make");
            var auto_vehicle_one_model = this.$("#auto-vehicle-one-model");
            var auto_driver_two_license_number = this.$("#auto-driver-two-license-number");
            var auto_vehicle_two_vin = this.$("#auto-vehicle-two-vin");
            var auto_vehicle_two_year = this.$("#auto-vehicle-two-year");
            var auto_vehicle_two_make = this.$("#auto-vehicle-two-make");
            var auto_vehicle_two_model = this.$("#auto-vehicle-two-model");
            var auto_bodily_injury_liability = this.$("#auto-bodily-injury-liability");
            var auto_property_damage= this.$("#auto-property-damage");
            var auto_uninsured_motorist_liability = this.$("#auto-uninsured-motorist-liability");
            var auto_medical_payments = this.$("#auto-medical-payments");
            var auto_vehicle_one_comp_ded = this.$("#auto-vehicle-one-comp-ded");
            var auto_vehicle_1_collision_ded = this.$("#auto-vehicle-1-collision-ded");
            var auto_1_towing= this.$("#auto-1-towing");
            var auto_1_rental_car = this.$("#auto-1-rental-car");
            var auto_vehicle_2_comp_ded = this.$("#auto-vehicle-2-comp-ded");
            var auto_vehicle_2_collision_ded = this.$("#auto-vehicle-2-collision-ded");
            var auto_2_towing = this.$("#auto-2-towing");
            var auto_2_rental_car = this.$("#auto-2-rental-car");
            var auto_quote_update_request = this.$("#auto-quote-update-request");
            var auto_policy_effective_date = this.$("#auto-policy-effective-date");
            var auto_payment_option = this.$("#auto-payment-option");
            var auto_payment_info = this.$("#auto-payment-info");
            var auto_quoted_auto_company = this.$("#auto-quoted-auto-company");
            var auto_quoted_auto_premium = this.$("#auto-quoted-auto-premium");
            var auto_quoted_auto_number = this.$("#auto-quoted-auto-number");
            var auto_insurance_carrier = this.$("#auto-insurance-carrier");
            var auto_insurance_premium = this.$("#auto-insurance-premium");
            var auto_document_needed = this.$("#auto-document-needed");
            var life_auto_priority_code = this.$("#life-auto-priority-code");
            var life_priority_code = this.$("#life-priority-code");
            var life_lead_source = this.$("#life-lead-source");
            var life_partner = this.$("#life-partner");
            var life_insurance_policy_number = this.$("#life-insurance-policy-number");
            var life_lead_status = this.$("#life-lead-status");
            var life_writing_agent = this.$("#life-writing-agent");
            var life_scrubber = this.$("#life-scrubber");
            var life_age = this.$("#life-age");
            var life_height = this.$("#life-height");
            var life_weight = this.$("#life-weight");
            var life_insurance_type = this.$("#life-insurance-type");
            var life_term_life_policy_lenght = this.$("#life-term-life-policy-lenght");
            var life_desired_amount_of_coverage = this.$("#life-desired-amount-of-coverage");
            var life_smoke = this.$("#life-smoke");
            var life_major_health_issues_in_relatives = this.$("#life-major-health-issues-in-relatives");
            var life_convicted_of_drunk_driving = this.$("#life-convicted-of-drunk-driving");
            var life_quote_status = this.$("#life-quote-status");
            var life_date_paramed_exam_ordered = this.$("#life-date-paramed-exam-ordered");
            var life_monthly_premium = this.$("#life-monthly-premium");
            var life_paramed_company = this.$("#life-paramed-company");
            var life_application_id_number = this.$("#life-application-id-number");
            var life_application_status = this.$("#life-application-status");
            var life_application_changes = this.$("#life-application-changes");
            var life_after_changes_new_premium = this.$("#life-after-changes-new-premium");
            var life_application_declined_reason = this.$("#life-application-declined-reason");
            var ancilliary_auto_priority_code = this.$("#ancilliary-auto-priority-code");
            var ancilliary_priority_code = this.$("#ancilliary-priority-code");
            var ancilliary_lead_source = this.$("#ancilliary-lead-source");
            var ancilliary_partner = this.$("#ancilliary-partner");
            var ancilliary_insurance_policy_number = this.$("#ancilliary-insurance-policy-number");
            var ancilliary_writing_agent = this.$("#ancilliary-writing-agent");
            var ancilliary_scrubber = this.$("#ancilliary-scrubber");
            var ancilliary_lead_status = this.$("#ancilliary-lead-status");
            var ancilliary_accident = this.$("#ancilliary-accident");
            var ancilliary_critical_illness = this.$("#ancilliary-critical-illness");
            var ancilliary_hospital_confinement = this.$("#ancilliary-hospital-confinement");
            var ancilliary_dental_care = this.$("#ancilliary-dental-care");
            var ancilliary_dental_lead_status = this.$("#ancilliary-dental-lead-status");
            var ancilliary_ancillary_total = this.$("#ancilliary-ancillary-total");
            var ancilliary_abnormal_cancer_screening_test = this.$("#ancilliary-abnormal-cancer-screening-test");
            var ancilliary_cysts_growths_etc_not_seen_for = this.$("#ancilliary-cysts-growths-etc-not-seen-for");
            var ancilliary_carotid_artery_stenosis_etc = this.$("#ancilliary-carotid-artery-stenosis-etc");
            var ancilliary_hiv_positive_aids_related_complex_aids = this.$("#ancilliary-hiv-positive-aids-related-complex-aids");
            var ancilliary_multiple_sclerosis_memory_loss_etc = this.$("#ancilliary-multiple-sclerosis-memory-loss-etc");
            var ancilliary_abnormal_tests_requiring_follow_up = this.$("#ancilliary-abnormal-tests-requiring-follow-up");
            var ancilliary_any_non_routine_consultation_scheduled = this.$("#ancilliary-any-non-routine-consultation-scheduled");
            var ancilliary_one_or_more_imm_relatives_with_issues = this.$("#ancilliary-one-or-more-imm-relatives-with-issues");
            var ancilliary_two_or_more_imm_relatives_with_issues = this.$("#ancilliary-two-or-more-imm-relatives-with-issues");
            var ancilliary_bening_tumor_hypertension_etc = this.$("#ancilliary-bening_tumor-hypertension-etc");
            var ancilliary_prescription_medication_in_last_three_years = this.$("#ancilliary-prescription-medication-in-last-three-years");
            var ancilliary_disorder_disease_heart_kidney_lungs = this.$("#ancilliary-disorder-disease-heart-kidney-lungs");
            var ancilliary_disease_quad_lou_gehrigs_other_motor = this.$("#ancilliary-disease-quad-lou-gehrigs-other-motor");
            var ancilliary_alcohol_or_substance_abuse_five_years = this.$("#ancilliary-alcohol-or-substance-abuse-five-years");
            var ancilliary_heart_attack_stroke_transient_ischemic = this.$("#ancilliary-heart-attack-stroke-transient-ischemic");
            var ancilliary_diabetes_type_one_or_two_blood_press_am = this.$("#ancilliary-diabetes-type-one-or-two-blood-press-am");
            var ancilliary_nursing_home_hospitalized_etc = this.$("#ancilliary-nursing-home-hospitalized-etc");
            var ancilliary_hospitalized_in_the_last_twelve_months = this.$("#ancilliary-hospitalized-in-the-last-twelve-months");
            var ancilliary_diagnosed_or_treated_for_medical_issues = this.$("#ancilliary-diagnosed_or_treated_for_medical_issues");
            var ancilliary_pregnant = this.$("#ancilliary-pregnant");
            var ancilliary_ever_had_a_problem_pregnancy = this.$("#ancilliary-ever_had_a_problem_pregnancy");
            var ancilliary_hypertension = this.$("#ancilliary-hypertension");
            var ancilliary_accident_elite_request_eff_date = this.$("#ancilliary-accident-elite-request_eff_date");
            var ancilliary_accident_elite_premium = this.$("#ancilliary-accident-elite-premium");
            var ancilliary_accident_elite_notes = this.$("#ancilliary-accident-elite-notes");
            var ancilliary_critical_care_request_eff_date = this.$("#ancilliary-critical-care-request-eff-date");
            var ancilliary_critial_care_premium = this.$("#ancilliary-critial-care-premium");
            var ancilliary_critical_care_notes = this.$("#ancilliary-critical-care-notes");
            var ancilliary_request_eff_date = this.$("#ancilliary-request-eff-date");
            var ancilliary_hospital_confinement_premium = this.$("#ancilliary-hospital-confinement-premium");
            var ancilliary_hospital_confinement_notes = this.$("#ancilliary-hospital-confinement-notes");
            var ancilliary_dental_request_eff_date = this.$("#ancilliary-dental-request-eff-date");
            var ancilliary_dental_care_premium = this.$("#ancilliary-dental-care-premium");
            var ancilliary_dental_care_notes = this.$("#ancilliary-dental-care-notes");
            var payment_binder_payment_option = this.$("#payment-binder-payment-option");
            var payment_payment_charge_request = this.$("#payment-payment-charge-request");
            var payment_ccredit_card_type = this.$("#payment-ccredit-card-type");
            var payment_name_on_cc = this.$("#payment-name-on-cc");
            var payment_credit_card_number = this.$("#payment-credit-card-number");
            var payment_cc_expiration_date = this.$("#payment-cc-expiration-date");
            var payment_cc_cvv = this.$("#payment-cc-cvv");
            var payment_bank_account_type = this.$("#payment-bank-account-type");
            var payment_bank_name = this.$("#payment-bank-name");
            var payment_bank_routuing_number = this.$("#payment-bank-routuing-number");
            var payment_bank_account_number = this.$("#payment-bank-account-number");

            var contact_info_property_address_2 = this.$("#contact-info-property-address-2");
            var contact_info_agent_code = this.$("#contact-info-agent-code");
            var contact_info_created_by = this.$("#contact-info-created-by");
            var contact_info_created_date = this.$("#contact-info-created-date");
            var contact_info_date_modified = this.$("#contact-info-date-modified");
            var contact_info_transfer_timestamp = this.$("#contact-info-transfer-timestamp");
            var contact_info_current_job_and_income_info = this.$("#contact-info-current-job-and-income-info");
            var contact_info_spouse = this.$("#contact-info-spouse");
            var contact_info_employment_status = this.$("#contact-info-employment-status");
            var contact_info_subsidy_drop_date = this.$("#contact-info-subsidy-drop-date");
            var contact_info_can_find_a_temp_id_card = this.$("#contact-info-can-find-a-temp-id-card");
            var contact_info_found_in_search_accounts = this.$("#contact-info-found-in-search-accounts");
            var contact_info_paid_to_date_2016 = this.$("#contact-info-paid-to-date-2016");
            var contact_info_corrected_discrepancy = this.$("#contact-info-corrected-discrepancy");
            var contact_info_corrected_discrepancy_completed_date = this.$("#contact-info-corrected-discrepancy-completed-date");
            var contact_info_updated_premium_2016 = this.$("#contact-info-updated-premium-2016");
            var contact_info_marketplace_changed_premium = this.$("#contact-info-marketplace-changed-premium");
            var contact_info_red_box_error = this.$("#contact-info-red-box-error");
            var contact_info_verification_documents_submitted_date = this.$("#contact-info-verification-documents-submitted-date");
            var contact_info_tcpa_compliant = this.$("#contact-info-tcpa-compliant");
            var child_1_income = this.$("#child-1-income");
            var child_2_income = this.$("#child-2-income");
            var child_3_income = this.$("#child-3-income");
            var child_4_income = this.$("#child-4-income");
            var health_agent_notes = this.$("#health-agent-notes");
            var health_project_individual_income = this.$("#health-project-individual-income");
            var health_project_household_income = this.$("#health-project-household-income");
            var health_presold_timestamp = this.$("#health-presold-timestamp");
            var health_tentative_timestamp = this.$("#health-tentative-timestamp");
            var health_enrolled_timestamp = this.$("#health-enrolled-timestamp");
            var health_active_timestamp = this.$("#health-active-timestamp");
            var health_policy_2016 = this.$("#health-policy-2016");
            var payment_paid_confirmation_number = this.$("#payment-paid-confirmation-number");
            var ancillary_client = this.$("#ancillary-client");
            var ancillary_payment_option = this.$("#ancillary-payment-option");
            var ancillary_bank_account_number = this.$("#ancillary-bank-account-number");
            var ancillary_bank_routing_number = this.$("#ancillary-bank-routing-number");
            var ancillary_bank_name = this.$("#ancillary-bank-name");
            var ancillary_bank_account_type = this.$("#ancillary-bank-account-type");
    },

    showMailingAddressDifferent: function(event){
        fun.utils.showMailingAddressDifferent(event);
    },

    changeMaritalStatus: function(event){
        fun.utils.changeMaritalStatus(event);
    },

    healthInsuranceTab: function(event){
        fun.utils.healthInsuranceTab(event);
    },

    homeInsuranceTab: function(event){
        fun.utils.homeInsuranceTab(event);
    },

    autoInsuranceTab: function(event){
        fun.utils.autoInsuranceTab(event);
    },

    lifeInsuranceTab: function(event){
        fun.utils.lifeInsuranceTab(event);
    },

    ancilliaryInsuranceTab: function(event){
        fun.utils.ancilliaryInsuranceTab(event);
    },

    changeNumberChildren: function(event){
        fun.utils.changeNumberChildren(event);
    },

    showPaymentTab: function(event){
        fun.utils.showPaymentTab(event);
    },
    showSendSMSButton: function(event){
        fun.utils.showSendSMSButton(event);
    },
    showMarketingTab: function(event){
        fun.utils.showMarketingTab(event);
    },
    editContact:function(event){
        'use strict';
        event.preventDefault();
        console.log('edit contact event');
        // view cache
        var name_uuid,
            stuff = JSON.parse(localStorage.getItem("profile"));
            // callbacks_and_stuff,
            // lolol,

        name_uuid = $(event.target).data('name');

        this.renderContactModalForm();

        function renderDate(date){
            var now = new Date(date);
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            return today;
        }

        var view = this,
            name,
            contact,
            contact_uuid,
            contact_account,
            contact_description,
            contact_history,
            contact_comment;

        $('#profileContactModal').modal({
            'show': true
        });

        // CALL THE INPUTS
            var contact_info_first_name = this.$("#contact-info-first-name");
            var contact_info_last_name = this.$("#contact-info-last-name");
            var contact_info_phone_number = this.$("#contact-info-phone-number");
            var contact_info_cellphone = this.$("#contact-info-cellphone");
            var contact_info_email = this.$("#contact-info-email");
            var contact_info_other_phone = this.$("#contact-info-other-phone");
            var contact_info_date_of_birth = this.$("#contact-info-date-of-birth");

            var contact_info_gender = this.$("#contact-info-gender");
            this.getDropdownInfo(contact_info_gender,'contact_info_gender');

            var contact_info_marital_status = this.$("#contact-info-marital-status");
            this.getDropdownInfo(contact_info_marital_status,'contact_info_marital_status');

            var contact_info_number_of_children = this.$("#contact-info-number-of-children");
            this.getDropdownInfo(contact_info_number_of_children,'contact_info_number_of_children');

            var contact_info_social_security_number = this.$("#contact-info-social-security-number");
            var contact_info_property_address = this.$("#contact-info-property-address");

            var contact_info_state = this.$("#contact-info-state");
            this.getDropdownInfo(contact_info_state,'contact_info_state');

            var contact_info_city = this.$("#contact-info-city");
            var contact_info_zip_code = this.$("#contact-info-zip-code");

            var contact_info_country = this.$("#contact-info-country");
            this.getDropdownInfo(contact_info_country,'contact_info_country');

            var contact_info_mailing_address_different = this.$("#contact-info-mailing-address-different");
            this.getDropdownInfo(contact_info_mailing_address_different,'contact_info_mailing_address_different');

            var contact_info_mailing_address = this.$("#contact-info-mailing-address");
            var contact_info_mailing_city = this.$("#contact-info-mailing-city");
            var contact_info_mailing_state = this.$("#contact-info-mailing-state");
            var contact_info_mailing_zipcode = this.$("#contact-info-mailing-zipcode");
            var contact_info_marketplace_email = this.$("#contact-info-marketplace-email");

            var contact_info_language_preference = this.$("#contact-info-language-preference");
            this.getDropdownInfo(contact_info_language_preference,'language_preference');

            var contact_info_writing_agent = this.$("#contact-info-writing-agent");
            this.getDropdownInfo(contact_info_writing_agent,'contact_info_writing_agent');

            var contact_info_lead_source = this.$("#contact-info-lead-source");
            this.getDropdownInfo(contact_info_lead_source,'contact_info_lead_source');

            var contact_info_lead_type = this.$("#contact-info-lead-type");
            this.getDropdownInfo(contact_info_lead_type,'contact_info_lead_type');

            var contact_info_partner = this.$("#contact-info-partner");
            var contact_info_last_modified_by = this.$("#contact-info-last-modified-by");

            var contact_info_health_insurance_checkbox = this.$("#contact-info-health-insurance-checkbox");
            this.getDropdownInfo(contact_info_health_insurance_checkbox,'contact_info_health_insurance_checkbox');
            console.log('DROPDOWN!!!!',contact_info_health_insurance_checkbox);

            var contact_info_home_insurance_checkbox = this.$("#contact-info-home-insurance-checkbox");
            this.getDropdownInfo(contact_info_home_insurance_checkbox,'contact_info_home_insurance_checkbox');

            var contact_info_auto_insurance_checkbox = this.$("#contact-info-auto-insurance-checkbox");
            this.getDropdownInfo(contact_info_auto_insurance_checkbox,'contact_info_auto_insurance_checkbox');

            var contact_info_life_insurance_checkbox = this.$("#contact-info-life-insurance-checkbox");
            this.getDropdownInfo(contact_info_life_insurance_checkbox,'contact_info_life_insurance_checkbox');

            var contact_info_ancilliary_insurance_checkbox = this.$("#contact-info-ancilliary-insurance-checkbox");
            this.getDropdownInfo(contact_info_ancilliary_insurance_checkbox,'ancillary_lead_status');

            var contact_info_other_policy_sold = this.$("#contact-info-other-policy-sold");
            this.getDropdownInfo(contact_info_other_policy_sold,'other_policies_sold');

            var contact_info_federal_do_not_call = this.$("#contact-info-federal-do-not-call");
            this.getDropdownInfo(contact_info_federal_do_not_call,'contact_info_federal_do_not_call');

            var contact_info_do_you_own_your_home = this.$("#contact-info-do-you-own-your-home");
            this.getDropdownInfo(contact_info_do_you_own_your_home,'contact_info_do_you_own_your_home');

            var contact_info_renew_as_is_email_received = this.$("#contact-info-renew-as-is-email-received");
            this.getDropdownInfo(contact_info_renew_as_is_email_received,'contact_info_renew_as_is_email_received');

            var health_us_citizen_or_legal_permanent_resident = this.$("#health-us-citizen-or-legal-permanent-resident");
            this.getDropdownInfo(health_us_citizen_or_legal_permanent_resident,'us_citizen_or_legal_permanent_resident');

            var spouse_first_name = this.$("#spouse-first-name");
            var spouse_last_name = this.$("#spouse-last-name");

            var spouse_gender = this.$("#spouse-gender");
            this.getDropdownInfo(spouse_gender,'contact_info_gender');

            var spouse_dob = this.$("#spouse-dob");
            this.getDropdownInfo(spouse_dob,'contact_info_gender');

            var spouse_do_you_have_a_social_security_number = this.$("#spouse-do-you-have-a-social-security-number");
            this.getDropdownInfo(spouse_do_you_have_a_social_security_number,'spouse_do_you_have_a_social_security_number');

            var spouse_social = this.$("#spouse-social");
            var spouse_income_source = this.$("#spouse-income-source");
            var spouse_yearly_income = this.$("#spouse-yearly-income");
            var spouse_employers_name = this.$("#spouse-employers-name");
            var spouse_employers_phone_number = this.$("#spouse-employers-phone-number");
            var contact_info_child_1_name = this.$("#child-1-name");
            var contact_info_child_1_dob = this.$("#child-1-dob");
            var contact_info_child_1_gender = this.$("#child-1-gender");
            var contact_info_child_1_social = this.$("#child-1-social");
            var contact_info_child_2_name = this.$("#child-2-name");
            var contact_info_child_2_dob = this.$("#child-2-dob");
            var contact_info_child_2_gender = this.$("#child-2-gender");
            var contact_info_child_2_social = this.$("#child-2-social");
            var contact_info_child_3_name = this.$("#child-3-name");
            var contact_info_child_3_dob = this.$("#child-3-dob");
            var contact_info_child_3_gender = this.$("#child-3-gender");
            var contact_info_child_3_social = this.$("#child-3-social");
            var contact_info_child_4_name = this.$("#child-4-name");
            var contact_info_child_4_dob = this.$("#child-4-dob");
            var contact_info_child_4_gender = this.$("#child-4-gender");
            var contact_info_child_4_social = this.$("#child-4-social");

            var health_auto_priority_code = this.$("#health-auto-priority-code");
            this.getDropdownInfo(health_auto_priority_code,'health_auto_priority_code');

            var health_priority_code = this.$("#health-priority-code");
            this.getDropdownInfo(health_priority_code,'health_priority_code');

            var health_lead_source = this.$("#health-lead-source");
            this.getDropdownInfo(health_lead_source,'health_lead_source');

            var health_partner = this.$("#health-partner");
            this.getDropdownInfo(health_partner,'contact_info_gender');

            var health_lead_status = this.$("#health-lead-status");
            this.getDropdownInfo(health_lead_status,'health_lead_status');

            var health_writing_agent = this.$("#health-writing-agent");
            this.getDropdownInfo(health_writing_agent,'health_writing_agent');

            var health_scrubber = this.$("#health-scrubber");
            this.getDropdownInfo(health_scrubber,'health_scrubber');

            var health_total_individual_income = this.$("#health-total-individual-income");
            var health_total_household_income = this.$("#health-total-household-income");
            var health_primary_applicants_income_source = this.$("#health-primary-applicants-income-source");
            var health_primary_applicants_employers_name = this.$("#health-primary-applicants-employers-name");
            var health_applicant_employers_phone_number = this.$("#health-applicant-employers-phone-number");

            var health_marital_status = this.$("#health-marital-status");
            this.getDropdownInfo(health_marital_status,'contact_info_marital_status');

            var health_number_of_dependent_children_in_house = this.$("#health-number-of-dependent-children-in-house");
            this.getDropdownInfo(health_number_of_dependent_children_in_house,'number_of_children');

            var health_renewal_source_2016 = this.$("#health-renewal-source-2016");
            this.getDropdownInfo(health_renewal_source_2016,'health_renewal_source_2016');

            var health_renewal_agent_2016 = this.$("#health-renewal-agent-2016");
            this.getDropdownInfo(health_renewal_agent_2016,'renewal_submitter_2016');

            var health_presold_processor_2016 = this.$("#health-presold-processor-2016");
            this.getDropdownInfo(health_presold_processor_2016,'presold_processor_2016');

            var health_application_number_2016_info = this.$("#health-application-number-2016-info");
            var health_effective_date_2016 = this.$("#health-effective-date-2016");
            var health_total_income_used_on_application = this.$("#health-total-income-used-on-application");
            var health_final_gross_premium_2016 = this.$("#health-final-gross-premium-2016");
            var health_final_subsidy_2016 = this.$("#health-final-subsidy-2016");
            var heatlh_plan_2016 = this.$("#heatlh-plan-2016");
            var health_final_premium_after_subsidy_2016 = this.$("#health-final-premium-after-subsidy-2016");

            var health_verification_documents_needed_2016 = this.$("#health-verification-documents-needed-2016");
            this.getDropdownInfo(health_verification_documents_needed_2016,'health_verification_documents_needed_2016');

            var health_verification_documents_due_date_2016 = this.$("#health-verification-documents-due-date-2016");
            var health_application_number_2016_selection = this.$("#health-application-number-2016-selection");

            var health_adults_applying_for_coverage_2016 = this.$("#health-adults-applying-for-coverage-2016");
            this.getDropdownInfo(health_adults_applying_for_coverage_2016,'health_adults_applying_for_coverage_2016');

            var health_total_household_size_2016 = this.$("#health-total-household-size-2016");
            this.getDropdownInfo(health_total_household_size_2016,'health_total_household_size_2016');

            var health_cloud_gross_premium_2016 = this.$("#health-cloud-gross-premium-2016");
            this.getDropdownInfo(health_cloud_gross_premium_2016,'health_cloud_gross_premium_2016');

            var health_children_applying_for_coverage_2016 = this.$("#health-children-applying-for-coverage-2016");
            var health_cloud_subsidy_2016 = this.$("#health-cloud-subsidy-2016");
            var health_cloud_premium_after_subsidy_2016 = this.$("#health-cloud-premium-after-subsidy-2016");

            var health_lead_has_a_marketplace_account = this.$("#health-lead-has-a-marketplace-account");
            this.getDropdownInfo(health_lead_has_a_marketplace_account,'health_lead_has_a_marketplace_account');

            var health_current_coverage = this.$("#health-current-coverage");
            this.getDropdownInfo(health_current_coverage,'health_current_coverage');

            var health_marketplace_app_id_2015 = this.$("#health-marketplace-app-id-2015");
            var health_current_premium = this.$("#health-current-premium");
            var health_subsidy_amount = this.$("#health-subsidy-amount");
            var health_current_net_premium = this.$("#health-current-net-premium");
            // var health_effective_date_2015 = this.$("#health-effective-date-2015");
            // var health_application_id_2015 = this.$("#health-application-id-2015");
            // var health_premium_2015 = this.$("#health-premium-2015");

            // var health_carrier_2015 = this.$("#health-carrier-2015");
            // this.getDropdownInfo(health_carrier_2015,'health_carrier_2015');

            // var health_subsidy_2015 = this.$("#health-subsidy-2015");
            // this.getDropdownInfo(health_subsidy_2015,'health_subsidy_2015');

            // var health_adult_on_plan_2015 = this.$("#health-adult-on-plan-2015");
            // this.getDropdownInfo(health_adult_on_plan_2015,'health_adult_on_plan_2015');

            // var health_children_on_plan_2015 = this.$("#health-children-on-plan-2015");
            // this.getDropdownInfo(health_children_on_plan_2015,'health_children_on_plan_2015');

            // var health_income_verification_needed_2015 = this.$("#health-income-verification-needed-2015");
            // this.getDropdownInfo(health_income_verification_needed_2015,'health_income_verification_needed_2015');

            // var health_citizenship_documents_needed_2015 = this.$("#health-citizenship-documents-needed-2015");
            // this.getDropdownInfo(health_citizenship_documents_needed_2015,'health_citizenship_documents_needed_2015');

            var health_policy = this.$("#health-policy-2016");
            this.getDropdownInfo(health_policy,'health_policy');

            // var health_contact_code_2015 = this.$("#health-contact-code-2015");
            // this.getDropdownInfo(health_contact_code_2015,'health_contact_code_2015');

            var health_wants_to_renew_same_plan_for_2016 = this.$("#health-wants-to-renew-same-plan-for-2016");
            this.getDropdownInfo(health_wants_to_renew_same_plan_for_2016,'health_wants_to_renew_same_plan_for_2016');

            var health_quoted_renewal_gross_premium_2016 = this.$("#health-quoted-renewal-gross-premium-2016");
            var health_quoted_renewal_subsidy_2016 = this.$("#health-quoted-renewal-subsidy-2016");
            var health_quoted_renewal_net_premium_2016 = this.$("#health-quoted-renewal-net-premium-2016");
            var health_username = this.$("#health-username");
            var health_password = this.$("#health-password");
            var home_priority_code = this.$("#home-priority-code");
            var home_auto_priority_code = this.$("#home-auto-priority-code");
            var home_lead_source = this.$("#home-lead-source");
            var home_partner = this.$("*#home-partner");
            var home_insurance_policy_number = this.$("#home-insurance-policy-number");
            var home_writing_agent = this.$("#home-writing-agent");
            var home_scrubber = this.$("#home-scrubber");
            var home_lead_status = this.$("#home-lead-status");
            var home_new_purchase = this.$("#home-new-purchase");
            var home_exp_date_closing_date = this.$("#home-exp-date-closing-date");
            var home_occupancy_status = this.$("#home-occupancy-status");
            var home_type_of_dwelling = this.$("#home-type-of-dwelling");
            var home_current_home_carrier = this.$("#home-current-home-carrier");
            var home_current_home_premium = this.$("#home-current-home-premium");
            var home_current_dwelling_coverage = this.$("#home-current-dwelling-coverage");
            var home_year_built = this.$("#home-year-built");
            var home_square_ft_under_air = this.$("#home-square-ft-under-air");
            var home_garage = this.$("#home-garage");
            var home_construction_type = this.$("#home-construction-type");
            var home_stories = this.$("#home-stories");
            var home_number_of_stories_in_the_building = this.$("#home-number-of-stories-in-the-building");
            var home_what_floor_number_is_condo_on = this.$("#home-what-floor-number-is-condo-on");
            var home_quote_update_request = this.$("#home-quote-update-request");
            var home_policy_effective_date = this.$("#home-policy-effective-date");
            var home_four_point_if_applicable = this.$("#home-four-point-if-applicable");
            var home_quoted_home_company = this.$("#home-quoted-home-company");
            var home_wind_mit = this.$("#home-wind-mit");
            var home_age_roof = this.$("#home-age-roof");
            var home_roof_material = this.$("#home-roof-material");
            var home_bathrooms = this.$("#home-bathrooms");
            var home_dog = this.$("#home-dog");
            var home_pool = this.$("#home-pool");
            var home_fence_or_screen_enclosure  = this.$("#home-fence-or-screen-enclosure");
            var home_bankrupcy_or_Foreclosure_in_the_past_five_years = this.$("#home-bankrupcy-or-Foreclosure-in-the-past-five-years");
            var home_centrally_monitored_alarm = this.$("#home-centrally-monitored-alarm");
            var home_gated_community = this.$("#home-gated-community");
            var home_how_many_claims_in_the_last_five_Years = this.$("#home-how-many-claims-in-the-last-five-Years");
            var home_realtor_mortgage_broker = this.$("#home-realtor-mortgage-broker");
            var home_amount_of_personal_property = this.$("#home-amount-of-personal-property");
            var home_quoted_home_premium = this.$("#home-quoted-home-premium");
            var home_quoted_home_number = this.$("#home-quoted-home-number");
            var home_payment_option = this.$("#home-payment-option");
            var home_mortgage_clause_new = this.$("#home-mortgage-clause-new");
            var home_loan_number = this.$("#home-loan-number");
            var home_insurance_carrier = this.$("#home-insurance-carrier");
            var home_insurance_premium = this.$("#home-insurance-premium");
            var auto_auto_priority_code = this.$("#auto-auto-priority-code");
            var auto_priority_code = this.$("#auto-priority-code");
            var auto_lead_source = this.$("#auto-lead-source");
            var auto_partner = this.$("#auto-partner");
            var auto_insurance_policy_number = this.$("#auto-insurance-policy-number");
            var auto_lead_status = this.$("#auto-lead-status");
            var auto_writing_agent = this.$("#auto-writing-agent");
            var auto_scrubber = this.$("#auto-scrubber");
            var auto_current_auto_carrier = this.$("#auto-current-auto-carrier");
            var auto_expiration_date = this.$("#auto-expiration-date");
            var auto_current_auto_premium = this.$("#auto-current-auto-premium");
            var auto_current_residence_type = this.$("#auto-current-residence-type");
            var auto_driver_one_license_number = this.$("#auto-driver-one-license-number");
            var auto_vehicle_one_vin= this.$("#auto-vehicle-one-vin");
            var auto_vehicle_one_year = this.$("#auto-vehicle-one-year");
            var auto_vehicle_one_make = this.$("#auto-vehicle-one-make");
            var auto_vehicle_one_model = this.$("#auto-vehicle-one-model");
            var auto_driver_two_license_number = this.$("#auto-driver-two-license-number");
            var auto_vehicle_two_vin = this.$("#auto-vehicle-two-vin");
            var auto_vehicle_two_year = this.$("#auto-vehicle-two-year");
            var auto_vehicle_two_make = this.$("#auto-vehicle-two-make");
            var auto_vehicle_two_model = this.$("#auto-vehicle-two-model");
            var auto_bodily_injury_liability = this.$("#auto-bodily-injury-liability");
            var auto_property_damage= this.$("#auto-property-damage");
            var auto_uninsured_motorist_liability = this.$("#auto-uninsured-motorist-liability");
            var auto_medical_payments = this.$("#auto-medical-payments");
            var auto_vehicle_one_comp_ded = this.$("#auto-vehicle-one-comp-ded");
            var auto_vehicle_1_collision_ded = this.$("#auto-vehicle-1-collision-ded");
            var auto_1_towing= this.$("#auto-1-towing");
            var auto_1_rental_car = this.$("#auto-1-rental-car");
            var auto_vehicle_2_comp_ded = this.$("#auto-vehicle-2-comp-ded");
            var auto_vehicle_2_collision_ded = this.$("#auto-vehicle-2-collision-ded");
            var auto_2_towing = this.$("#auto-2-towing");
            var auto_2_rental_car = this.$("#auto-2-rental-car");
            var auto_quote_update_request = this.$("#auto-quote-update-request");
            var auto_policy_effective_date = this.$("#auto-policy-effective-date");
            var auto_payment_option = this.$("#auto-payment-option");
            var auto_payment_info = this.$("#auto-payment-info");
            var auto_quoted_auto_company = this.$("#auto-quoted-auto-company");
            var auto_quoted_auto_premium = this.$("#auto-quoted-auto-premium");
            var auto_quoted_auto_number = this.$("#auto-quoted-auto-number");
            var auto_insurance_carrier = this.$("#auto-insurance-carrier");
            var auto_insurance_premium = this.$("#auto-insurance-premium");
            var auto_document_needed = this.$("#auto-document-needed");
            var life_auto_priority_code = this.$("#life-auto-priority-code");
            var life_priority_code = this.$("#life-priority-code");
            var life_lead_source = this.$("#life-lead-source");
            var life_partner = this.$("#life-partner");
            var life_insurance_policy_number = this.$("#life-insurance-policy-number");
            var life_lead_status = this.$("#life-lead-status");
            var life_writing_agent = this.$("#life-writing-agent");
            var life_scrubber = this.$("#life-scrubber");
            var life_age = this.$("#life-age");
            var life_height = this.$("#life-height");
            var life_weight = this.$("#life-weight");
            var life_insurance_type = this.$("#life-insurance-type");
            var life_term_life_policy_lenght = this.$("#life-term-life-policy-lenght");
            var life_desired_amount_of_coverage = this.$("#life-desired-amount-of-coverage");
            var life_smoke = this.$("#life-smoke");
            var life_major_health_issues_in_relatives = this.$("#life-major-health-issues-in-relatives");
            var life_convicted_of_drunk_driving = this.$("#life-convicted-of-drunk-driving");
            var life_quote_status = this.$("#life-quote-status");
            var life_date_paramed_exam_ordered = this.$("#life-date-paramed-exam-ordered");
            var life_monthly_premium = this.$("#life-monthly-premium");
            var life_paramed_company = this.$("#life-paramed-company");
            var life_application_id_number = this.$("#life-application-id-number");
            var life_application_status = this.$("#life-application-status");
            var life_application_changes = this.$("#life-application-changes");
            var life_after_changes_new_premium = this.$("#life-after-changes-new-premium");
            var life_application_declined_reason = this.$("#life-application-declined-reason");
            var ancilliary_auto_priority_code = this.$("#ancilliary-auto-priority-code");
            var ancilliary_priority_code = this.$("#ancilliary-priority-code");
            var ancilliary_lead_source = this.$("#ancilliary-lead-source");
            var ancilliary_partner = this.$("#ancilliary-partner");
            var ancilliary_insurance_policy_number = this.$("#ancilliary-insurance-policy-number");
            var ancilliary_writing_agent = this.$("#ancilliary-writing-agent");
            var ancilliary_scrubber = this.$("#ancilliary-scrubber");
            var ancilliary_lead_status = this.$("#ancilliary-lead-status");
            var ancilliary_accident = this.$("#ancilliary-accident");
            var ancilliary_critical_illness = this.$("#ancilliary-critical-illness");
            var ancilliary_hospital_confinement = this.$("#ancilliary-hospital-confinement");
            var ancilliary_dental_care = this.$("#ancilliary-dental-care");
            var ancilliary_dental_lead_status = this.$("#ancilliary-dental-lead-status");
            var ancilliary_ancillary_total = this.$("#ancilliary-ancillary-total");
            var ancilliary_abnormal_cancer_screening_test = this.$("#ancilliary-abnormal-cancer-screening-test");
            var ancilliary_cysts_growths_etc_not_seen_for = this.$("#ancilliary-cysts-growths-etc-not-seen-for");
            var ancilliary_carotid_artery_stenosis_etc = this.$("#ancilliary-carotid-artery-stenosis-etc");
            var ancilliary_hiv_positive_aids_related_complex_aids = this.$("#ancilliary-hiv-positive-aids-related-complex-aids");
            var ancilliary_multiple_sclerosis_memory_loss_etc = this.$("#ancilliary-multiple-sclerosis-memory-loss-etc");
            var ancilliary_abnormal_tests_requiring_follow_up = this.$("#ancilliary-abnormal-tests-requiring-follow-up");
            var ancilliary_any_non_routine_consultation_scheduled = this.$("#ancilliary-any-non-routine-consultation-scheduled");
            var ancilliary_one_or_more_imm_relatives_with_issues = this.$("#ancilliary-one-or-more-imm-relatives-with-issues");
            var ancilliary_two_or_more_imm_relatives_with_issues = this.$("#ancilliary-two-or-more-imm-relatives-with-issues");
            var ancilliary_bening_tumor_hypertension_etc = this.$("#ancilliary-bening_tumor-hypertension-etc");
            var ancilliary_prescription_medication_in_last_three_years = this.$("#ancilliary-prescription-medication-in-last-three-years");
            var ancilliary_disorder_disease_heart_kidney_lungs = this.$("#ancilliary-disorder-disease-heart-kidney-lungs");
            var ancilliary_disease_quad_lou_gehrigs_other_motor = this.$("#ancilliary-disease-quad-lou-gehrigs-other-motor");
            var ancilliary_alcohol_or_substance_abuse_five_years = this.$("#ancilliary-alcohol-or-substance-abuse-five-years");
            var ancilliary_heart_attack_stroke_transient_ischemic = this.$("#ancilliary-heart-attack-stroke-transient-ischemic");
            var ancilliary_diabetes_type_one_or_two_blood_press_am = this.$("#ancilliary-diabetes-type-one-or-two-blood-press-am");
            var ancilliary_nursing_home_hospitalized_etc = this.$("#ancilliary-nursing-home-hospitalized-etc");
            var ancilliary_hospitalized_in_the_last_twelve_months = this.$("#ancilliary-hospitalized-in-the-last-twelve-months");
            var ancilliary_diagnosed_or_treated_for_medical_issues = this.$("#ancilliary-diagnosed_or_treated_for_medical_issues");
            var ancilliary_pregnant = this.$("#ancilliary-pregnant");
            var ancilliary_ever_had_a_problem_pregnancy = this.$("#ancilliary-ever_had_a_problem_pregnancy");
            var ancilliary_hypertension = this.$("#ancilliary-hypertension");
            var ancilliary_accident_elite_request_eff_date = this.$("#ancilliary-accident-elite-request_eff_date");
            var ancilliary_accident_elite_premium = this.$("#ancilliary-accident-elite-premium");
            var ancilliary_accident_elite_notes = this.$("#ancilliary-accident-elite-notes");
            var ancilliary_critical_care_request_eff_date = this.$("#ancilliary-critical-care-request-eff-date");
            var ancilliary_critial_care_premium = this.$("#ancilliary-critial-care-premium");
            var ancilliary_critical_care_notes = this.$("#ancilliary-critical-care-notes");
            var ancilliary_request_eff_date = this.$("#ancilliary-request-eff-date");
            var ancilliary_hospital_confinement_premium = this.$("#ancilliary-hospital-confinement-premium");
            var ancilliary_hospital_confinement_notes = this.$("#ancilliary-hospital-confinement-notes");
            var ancilliary_dental_request_eff_date = this.$("#ancilliary-dental-request-eff-date");
            var ancilliary_dental_care_premium = this.$("#ancilliary-dental-care-premium");
            var ancilliary_dental_care_notes = this.$("#ancilliary-dental-care-notes");
            var payment_binder_payment_option = this.$("#payment-binder-payment-option");
            var payment_payment_charge_request = this.$("#payment-payment-charge-request");
            var payment_ccredit_card_type = this.$("#payment-ccredit-card-type");
            var payment_name_on_cc = this.$("#payment-name-on-cc");
            var payment_credit_card_number = this.$("#payment-credit-card-number");
            var payment_cc_expiration_date = this.$("#payment-cc-expiration-date");
            var payment_cc_cvv = this.$("#payment-cc-cvv");
            var payment_bank_account_type = this.$("#payment-bank-account-type");
            var payment_bank_name = this.$("#payment-bank-name");
            var payment_bank_routuing_number = this.$("#payment-bank-routuing-number");
            var payment_bank_account_number = this.$("#payment-bank-account-number");

            var contact_info_property_address_2 = this.$("#contact-info-property-address-2");
            var contact_info_agent_code = this.$("#contact-info-agent-code");
            var contact_info_created_by = this.$("#contact-info-created-by");
            var contact_info_created_date = this.$("#contact-info-created-date");
            var contact_info_date_modified = this.$("#contact-info-date-modified");
            var contact_info_transfer_timestamp = this.$("#contact-info-transfer-timestamp");
            var contact_info_current_job_and_income_info = this.$("#contact-info-current-job-and-income-info");
            var contact_info_spouse = this.$("#contact-info-spouse");
            var contact_info_employment_status = this.$("#contact-info-employment-status");
            var contact_info_subsidy_drop_date = this.$("#contact-info-subsidy-drop-date");
            var contact_info_can_find_a_temp_id_card = this.$("#contact-info-can-find-a-temp-id-card");
            var contact_info_found_in_search_accounts = this.$("#contact-info-found-in-search-accounts");
            var contact_info_paid_to_date_2016 = this.$("#contact-info-paid-to-date-2016");
            var contact_info_corrected_discrepancy = this.$("#contact-info-corrected-discrepancy");
            var contact_info_corrected_discrepancy_completed_date = this.$("#contact-info-corrected-discrepancy-completed-date");
            var contact_info_updated_premium_2016 = this.$("#contact-info-updated-premium-2016");
            var contact_info_marketplace_changed_premium = this.$("#contact-info-marketplace-changed-premium");
            var contact_info_red_box_error = this.$("#contact-info-red-box-error");
            var contact_info_verification_documents_submitted_date = this.$("#contact-info-verification-documents-submitted-date");
            var contact_info_tcpa_compliant = this.$("#contact-info-tcpa-compliant");
            var child_1_income = this.$("#child-1-income");
            var child_2_income = this.$("#child-2-income");
            var child_3_income = this.$("#child-3-income");
            var child_4_income = this.$("#child-4-income");
            var health_agent_notes = this.$("#health-agent-notes");
            var health_project_individual_income = this.$("#health-project-individual-income");
            var health_project_household_income = this.$("#health-project-household-income");
            var health_presold_timestamp = this.$("#health-presold-timestamp");
            var health_tentative_timestamp = this.$("#health-tentative-timestamp");
            var health_enrolled_timestamp = this.$("#health-enrolled-timestamp");
            var health_active_timestamp = this.$("#health-active-timestamp");
            var health_policy_2016 = this.$("#health-policy-2016");
            var payment_paid_confirmation_number = this.$("#payment-paid-confirmation-number");
            var ancillary_client = this.$("#ancillary-client");
            var ancillary_payment_option = this.$("#ancillary-payment-option");
            var ancillary_bank_account_number = this.$("#ancillary-bank-account-number");
            var ancillary_bank_routing_number = this.$("#ancillary-bank-routing-number");
            var ancillary_bank_name = this.$("#ancillary-bank-name");
            var ancillary_bank_account_type = this.$("#ancillary-bank-account-type");




        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        contact = new fun.models.Contact({'uuid':name});

        contact.fetch({
            success: function(response){

                console.log('CONTACT!!!!',response.attributes);

            // CONTACT INFO
                contact_uuid = response.get('uuid');
                localStorage.setItem('current_contact_uuid',JSON.stringify({uuid:response.get('uuid')}));
                contact_account = response.get('account');
                contact_description = response.get('description');
                contact_history = response.get('history');
                contact_comment = response.get('comment');
                contact_info_first_name.val(response.get('contact_info_first_name') || '');
                contact_info_last_name.val(response.get('contact_info_last_name') || '');
                contact_info_phone_number.val(response.get('contact_info_phone_number') || '');
                contact_info_cellphone.val(response.get('other_phone') || '');
                contact_info_email.val(response.get('contact_info_email') || '');
                contact_info_other_phone.val(response.get('other_phone_2') || '');
                // contact_info_date_of_birth.value = renderDate(response.get('contact_info_dob')) || '';
                contact_info_date_of_birth.value = response.get('contact_info_dob') || '';

                contact_info_gender.val(response.get('contact_info_gender') || '');
                $(contact_info_gender.selector + " option[value='" + response.get('contact_info_gender') + "']").attr("selected", "selected");

                contact_info_marital_status.value = response.get('contact_info_marital_status') || '';
                $(contact_info_marital_status.selector + " option[value='" + response.get('contact_info_marital_status') + "']").attr("selected", "selected");

                contact_info_number_of_children.val(response.get('contact_info_number_of_children') || 0);
                $(contact_info_number_of_children.selector + " option[value='" + response.get('contact_info_number_of_children') + "']").attr("selected", "selected");

                contact_info_social_security_number.val(response.get('contact_info_social_security_number') || '');
                contact_info_property_address.val(response.get('contact_info_property_address'));

                contact_info_state.val(response.get('contact_info_state') || '');
                $(contact_info_state.selector + " option[value='" + response.get('contact_info_state') + "']").attr("selected", "selected");

                contact_info_city.val(response.get('contact_info_city') || '');
                contact_info_zip_code.val(response.get('contact_info_zip_code') || '');
                contact_info_country.val(response.get('country') || '');

                contact_info_mailing_address_different.val(response.get('contact_info_mailing_address_different') || '');
                $(contact_info_mailing_address_different.selector + " option[value='" + response.get('contact_info_mailing_address_different') + "']").attr("selected", "selected");

                contact_info_mailing_address.val(response.get('contact_info_mailing_address') || '');
                contact_info_mailing_city.val(response.get('contact_info_mailing_city') || '');
                contact_info_mailing_state.val(response.get('contact_info_mailing_state') || '');
                contact_info_mailing_zipcode.val(response.get('contact_info_mailing_zipcode') || '');
                contact_info_marketplace_email.val(response.get('marketplace_app_id_2015') || '');

                contact_info_language_preference.val(response.get('language_preference') || '');
                $(contact_info_language_preference.selector + " option[value='" + response.get('language_preference') + "']").attr("selected", "selected");

                contact_info_writing_agent.val(response.get('contact_info_writing_agent') || '');
                $(contact_info_writing_agent.selector + " option[value='" + response.get('contact_info_writing_agent') + "']").attr("selected", "selected");

                contact_info_lead_type.val(response.get('contact_info_lead_type') || 'health');
                // $(contact_info_lead_type.selector + " option[value='health']").attr("selected", "selected");
                $(contact_info_writing_agent.selector + " option[value='" + response.get('contact_info_lead_type') + "']").attr("selected", "selected");

                contact_info_lead_source.val(response.get('contact_info_lead_source') || 'boberdoo');
                $(contact_info_lead_source.selector + " option[value='boberdoo']").attr("selected", "selected");
                // $(contact_info_lead_source.selector + " option[value='" + response.get('lead_source') + "']").attr("selected", "selected");

                contact_info_partner.val(response.get('contact_info_partner') || '');
                contact_info_last_modified_by.val(response.get('contact_info_last_modified_by') || '');

                contact_info_health_insurance_checkbox.val(response.get('contact_info_health_insurance_status') || 'true');
                // $(contact_info_health_insurance_checkbox.selector + " option[value='true']").attr("selected", "selected");
                $(contact_info_health_insurance_checkbox.selector + " option[value='" + response.get('contact_info_health_insurance_status') + "']").attr("selected", "selected");

                contact_info_home_insurance_checkbox.val(response.get('contact_info_home_insurance_status') || '');
                $(contact_info_home_insurance_checkbox.selector + " option[value='" + response.get('contact_info_home_insurance_status') + "']").attr("selected", "selected");

                contact_info_auto_insurance_checkbox.val(response.get('contact_info_auto_insurance_status') || '');
                $(contact_info_auto_insurance_checkbox.selector + " option[value='" + response.get('contact_info_auto_insurance_status') + "']").attr("selected", "selected");

                contact_info_life_insurance_checkbox.val(response.get('contact_info_life_insurance_status') || '');
                $(contact_info_life_insurance_checkbox.selector + " option[value='" + response.get('contact_info_life_insurance_status') + "']").attr("selected", "selected");

                contact_info_ancilliary_insurance_checkbox.val(response.get('ancillary_lead_status') || '');
                $(contact_info_ancilliary_insurance_checkbox.selector + " option[value='" + response.get('ancillary_lead_status') + "']").attr("selected", "selected");

                contact_info_other_policy_sold.val(response.get('other_policies_sold') || '');
                $(contact_info_other_policy_sold.selector + " option[value='" + response.get('other_policies_sold') + "']").attr("selected", "selected");

                contact_info_federal_do_not_call.val(response.get('contact_info_federal_do_not_call') || '');
                $(contact_info_federal_do_not_call.selector + " option[value='" + response.get('contact_info_federal_do_not_call') + "']").attr("selected", "selected");

                contact_info_renew_as_is_email_received.val(response.get('contact_info_renew_as_is_email_received') || '');
                $(contact_info_renew_as_is_email_received.selector + " option[value='" + response.get('contact_info_renew_as_is_email_received') + "']").attr("selected", "selected");

                health_us_citizen_or_legal_permanent_resident.val(response.get('us_citizen_or_legal_permanent_resident') || '');
                $(contact_info_renew_as_is_email_received.selector + " option[value='" + response.get('us_citizen_or_legal_permanent_resident') + "']").attr("selected", "selected");

            // SPOUSE INFO
                spouse_first_name.val(response.get('spouse_first_name') || '');
                spouse_last_name.val(response.get('spouse_last_name') || '');

                spouse_gender.val(response.get('spouse_1_gender') || '');
                $(spouse_gender.selector + " option[value='" + response.get('spouse_1_gender') + "']").attr("selected", "selected");

                spouse_dob.val(response.get('spouse_dob') || '');

                spouse_do_you_have_a_social_security_number.val(response.get('spouse_do_you_have_a_social_security_number') || 'none');
                $(spouse_do_you_have_a_social_security_number.selector + " option[value='none']").attr("selected", "selected");
                // $(spouse_do_you_have_a_social_security_number.selector + " option[value='" + response.get('spouse_do_you_have_a_social_security_number') + "']").attr("selected", "selected");

                spouse_social.val(response.get('spouse_social') || '');
                spouse_income_source.val(response.get('spouse_income_source') || '');
                spouse_yearly_income.val(response.get('spouse_yearly_income') || '');
                spouse_employers_name.val(response.get('spouse_employers_name') || '');
                spouse_employers_phone_number.val(response.get('spouse_employers_phone_number') || '');


            // CHILD INFO
                contact_info_child_1_name.val(response.get('child_1_name') || '');
                contact_info_child_1_dob.val(response.get('child_1_dob') || '');
                contact_info_child_1_gender.val(response.get('child_1_gender') || '');
                contact_info_child_1_social.val(response.get('child_1_social') || '');
                contact_info_child_2_name.val(response.get('child_2_dob') || '');
                contact_info_child_2_dob.val(response.get('child_2_dob') || '');
                contact_info_child_2_gender.val(response.get('child_2_gender') || '');
                contact_info_child_2_social.val(response.get('child_2_social') || '');
                contact_info_child_3_name.val(response.get('child_3_name') || '');
                contact_info_child_3_dob.val(response.get('child_3_dob') || '');
                contact_info_child_3_gender.val(response.get('child_3_gender') || '');
                contact_info_child_3_social.val(response.get('child_3_social') || '');
                contact_info_child_4_name.val(response.get('child_4_name') || '');
                contact_info_child_4_dob.val(response.get('child_4_dob') || '');
                contact_info_child_4_gender.val(response.get('child_4_gender') || '');
                contact_info_child_4_social.val(response.get('child_4_social') || '');


            // Now that contact info is loaded we run the functions for the show/hide of the tabs
                fun.utils.showMailingAddressDifferent();
                fun.utils.changeMaritalStatus();
                fun.utils.homeInsuranceTab();
                fun.utils.healthInsuranceTab();
                fun.utils.autoInsuranceTab();
                fun.utils.lifeInsuranceTab();
                fun.utils.ancilliaryInsuranceTab();
                fun.utils.showMarketingTab();
                fun.utils.changeNumberChildren();
                fun.utils.showPaymentTab();
                fun.utils.showPaymentTab();
                fun.utils.showSendSMSButton();


            // HEALTH INFO
                health_auto_priority_code.val(response.get('health_auto_priority_code') || '');
                health_priority_code.val(response.get('health_priority_code') || '');
                health_lead_source.val(response.get('health_lead_source') || '');
                health_partner.val(response.get('contact_info_partner') || '');
                health_lead_status.val(response.get('health_lead_status') || '');
                health_writing_agent.val(response.get('health_writing_agent') || '');
                health_scrubber.val(response.get('health_scrubber') || '');
                health_total_individual_income.val(response.get('health_total_individual_income') || '');
                health_total_household_income.val(response.get('health_total_household_income') || '');
                health_primary_applicants_income_source.val(response.get('primary_applicants_income_source') || '');
                health_primary_applicants_employers_name.val(response.get('primary_applicants_employers_name') || '');
                health_applicant_employers_phone_number.val(response.get('contact_info_marital_status') || '');
                health_marital_status.val(response.get('health_marital_status') || '');
                health_number_of_dependent_children_in_house.val(response.get('number_of_children') || '');

                health_renewal_source_2016.val(response.get('health_renewal_source_2016') || '');
                $(health_renewal_source_2016.selector + " option[value='" + response.get('health_renewal_source_2016') + "']").attr("selected", "selected");

                health_renewal_agent_2016.val(response.get('renewal_submitter_2016') || '');
                $(health_renewal_agent_2016.selector + " option[value='" + response.get('renewal_submitter_2016') + "']").attr("selected", "selected");

                health_presold_processor_2016.val(response.get('presold_processor_2016') || '');
                $(health_presold_processor_2016.selector + " option[value='" + response.get('presold_processor_2016') + "']").attr("selected", "selected");

                health_application_number_2016_info.val(response.get('health_application_number_2016_selection') || '');
                health_effective_date_2016.value = response.get('health_effective_date_2016') || '';
                health_presold_processor_2016.val(response.get('health_presold_processor_2016') || '');
                health_total_income_used_on_application.val(response.get('health_total_income_used_on_application') || '');
                health_final_gross_premium_2016.val(response.get('health_final_gross_premium_2016') || '');
                health_final_subsidy_2016.val(response.get('health_final_subsidy_2016') || '');
                heatlh_plan_2016.val(response.get('health_policy_2016') || '');
                health_final_premium_after_subsidy_2016.val(response.get('health_final_premium_after_subsidy_2016') || '');

                health_verification_documents_needed_2016.val(response.get('health_verification_documents_needed_2016') || '');
                $(health_verification_documents_needed_2016.selector + " option[value='" + response.get('health_verification_documents_needed_2016') + "']").attr("selected", "selected");

                health_verification_documents_due_date_2016 = response.get('health_verification_documents_due_date_2016') || '';

                health_application_number_2016_selection.val(response.get('health_application_number_2016_selection') || '');
                health_adults_applying_for_coverage_2016.val(response.get('health_adults_applying_for_coverage_2016') || '');
                health_total_household_size_2016.val(response.get('health_total_household_size_2016') || '');
                health_cloud_gross_premium_2016.val(response.get('cloud_gross_premium_2016') || '');
                health_children_applying_for_coverage_2016.val(response.get('health_children_applying_for_coverage_2016') || '');
                health_cloud_subsidy_2016.val(response.get('health_cloud_subsidy_2016') || '');
                health_cloud_premium_after_subsidy_2016.val(response.get('health_cloud_premium_after_subsidy_2016') || '');
                health_lead_has_a_marketplace_account.val(response.get('health_lead_has_marketplace_account') || '');
                health_current_coverage.val(response.get('health_number_of_dependent_children_in_house') || '');
                // health_marketplace_app_id_2015.val(response.get('health_marketplace_app_id_2015') || '');
                health_current_premium.val(response.get('health_current_premium') || '');
                health_subsidy_amount.val(response.get('health_subsidy_amount') || '');
                health_current_net_premium.val(response.get('health_current_net_premium') || '');
                // health_effective_date_2015.val(response.get('health_effective_date_2015') || '');
                // health_application_id_2015.val(response.get('health_application_id_2015') || '');
                // health_premium_2015.val(response.get('health_premium_2015') || '');
                // health_carrier_2015.val(response.get('health_carrier_2015') || '');
                // health_subsidy_2015.val(response.get('health_subsidy_2015') || '');
                // health_adult_on_plan_2015.val(response.get('health_adult_on_plan_2015') || '');
                // health_children_on_plan_2015.val(response.get('health_children_on_plan_2015') || '');
                // health_income_verification_needed_2015.val(response.get('health_income_verification_needed_2015') || '');
                // health_citizenship_documents_needed_2015.val(response.get('health_citizenship_documents_needed_2015') || '');
                health_policy.val(response.get('health_policy_2016') || '');
                // health_contact_code_2015.val(response.get('health_contact_code_2015') || '');
                health_wants_to_renew_same_plan_for_2016.val(response.get('health_wants_to_renew_same_plan_for_2016') || '');
                health_quoted_renewal_gross_premium_2016.val(response.get('health_quoted_renewal_gross_premium_2016') || '');
                health_quoted_renewal_subsidy_2016.val(response.get('health_quoted_renewal_subsidy_2016') || '');
                health_quoted_renewal_net_premium_2016.val(response.get('health_quoted_renewal_net_premium_2016') || '');
                health_username.val(response.get('health_username') || '');
                health_password.val(response.get('health_password') || '');


            // HOME INFO
                // home_priority_code.val(response.get('home_priority_code') || '');
                // home_auto_priority_code.val(response.get('home_auto_priority_code') || '');
                // home_lead_source.val(response.get('home_lead_source') || '');
                // home_partner.val(response.get('home_partner') || '');
                // home_insurance_policy_number.val(response.get('home_insurance_policy_number') || '');
                // home_writing_agent.val(response.get('home_writing_agent') || '');
                // home_scrubber.val(response.get('home_scrubber') || '');
                // home_lead_status.val(response.get('home_lead_status') || '');
                // home_new_purchase.val(response.get('home_new_purchase') || '');
                // home_exp_date_closing_date.val(response.get('home_exp_date_closing_date') || '');
                // home_occupancy_status.val(response.get('home_occupancy_status') || '');
                // home_type_of_dwelling.val(response.get('home_type_of_dwelling') || '');
                // home_current_home_carrier.val(response.get('home_current_home_carrier') || '');
                // home_current_home_premium.val(response.get('home_current_home_premium') || '');
                // home_current_dwelling_coverage.val(response.get('home_current_dwelling_coverage') || '');
                // home_year_built.val(response.get('home_year_built') || '');
                // home_square_ft_under_air.val(response.get('home_square_ft_under_air') || '');
                // home_garage.val(response.get('home_garage') || '');
                // home_construction_type.val(response.get('home_construction_type') || '');
                // home_stories.val(response.get('home_stories') || '');
                // home_number_of_stories_in_the_building.val(response.get('home_number_of_stories_in_the_building') || '');
                // home_what_floor_number_is_condo_on.val(response.get('home_what_floor_number_is_condo_on') || '');
                // home_quote_update_request.val(response.get('home_quote_update_request') || '');
                // home_policy_effective_date.val(response.get('home_policy_effective_date') || '');
                // home_four_point_if_applicable.val(response.get('home_four_point_if_applicable') || '');
                // home_quoted_home_company.val(response.get('home_quoted_home_company') || '');
                // home_wind_mit.val(response.get('home_wind_mit') || '');
                // home_age_roof.val(response.get('home_age_roof') || '');
                // home_roof_material.val(response.get('home_roof_material') || '');
                // home_bathrooms.val(response.get('home_bathrooms') || '');
                // home_dog.val(response.get('home_dog') || '');
                // home_pool.val(response.get('home_pool') || '');
                // home_fence_or_screen_enclosure.val(response.get('home_fence_or_screen_enclosure') || '');
                // home_bankrupcy_or_Foreclosure_in_the_past_five_years.val(response.get('home_bankrupcy_or_Foreclosure_in_the_past_five_years') || '');
                // home_centrally_monitored_alarm.val(response.get('home_centrally_monitored_alarm') || '');
                // home_gated_community.val(response.get('home_gated_community') || '');
                // home_how_many_claims_in_the_last_five_Years.val(response.get('home_how_many_claims_in_the_last_five_Years') || '');
                // home_realtor_mortgage_broker.val(response.get('home_realtor_mortgage_broker') || '');
                // home_amount_of_personal_property.val(response.get('home_amount_of_personal_property') || '');
                // home_quoted_home_premium.val(response.get('home_quoted_home_premium') || '');
                // home_quoted_home_number.val(response.get('home_quoted_home_number') || '');
                // home_payment_option.val(response.get('home_payment_option') || '');
                // home_mortgage_clause_new.val(response.get('home_mortgage_clause_new') || '');
                // home_loan_number.val(response.get('home_loan_number') || '');
                // home_insurance_carrier.val(response.get('home_insurance_carrier') || '');
                // home_insurance_premium.val(response.get('home_insurance_premium') || '');


            // AUTO INFO
                // auto_auto_priority_code.val(response.get('auto_auto_priority_code') || '');
                // auto_priority_code.val(response.get('auto_priority_code') || '');
                // auto_lead_source.val(response.get('auto_lead_source') || '');
                // auto_partner.val(response.get('auto_partner') || '');
                // auto_insurance_policy_number.val(response.get('auto_insurance_policy_number') || '');
                // auto_lead_status.val(response.get('auto_lead_status') || '');
                // auto_writing_agent.val(response.get('auto_writing_agent') || '');
                // auto_scrubber.val(response.get('auto_scrubber') || '');
                // auto_current_auto_carrier.val(response.get('auto_current_auto_carrier') || '');
                // auto_expiration_date.val(response.get('auto_expiration_date') || '');
                // auto_current_auto_premium.val(response.get('auto_current_auto_premium') || '');
                // auto_current_residence_type.val(response.get('auto_current_residence_type') || '');
                // auto_driver_one_license_number.val(response.get('auto_driver_one_license_number') || '');
                // auto_vehicle_one_vin.val(response.get('auto_vehicle_one_vin') || '');
                // auto_vehicle_one_year.val(response.get('auto_vehicle_one_year') || '');
                // auto_vehicle_one_make.val(response.get('auto_vehicle_one_make') || '');
                // auto_vehicle_one_model.val(response.get('auto_vehicle_one_model') || '');
                // auto_driver_two_license_number.val(response.get('auto_driver_two_license_number') || '');
                // auto_vehicle_two_vin.val(response.get('auto_vehicle_two_vin') || '');
                // auto_vehicle_two_year.val(response.get('auto_vehicle_two_year') || '');
                // auto_vehicle_two_make.val(response.get('auto_vehicle_two_make') || '');
                // auto_vehicle_two_model.val(response.get('auto_vehicle_two_model') || '');
                // auto_bodily_injury_liability.val(response.get('auto_bodily_injury_liability') || '');
                // auto_property_damage.val(response.get('auto_property_damage') || '');
                // auto_uninsured_motorist_liability.val(response.get('auto_uninsured_motorist_liability') || '');
                // auto_medical_payments.val(response.get('auto_medical_payments') || '');
                // auto_vehicle_one_comp_ded.val(response.get('auto_vehicle_one_comp_ded') || '');
                // auto_vehicle_1_collision_ded.val(response.get('auto_vehicle_1_collision_ded') || '');
                // auto_1_towing.val(response.get('auto_1_towing') || '');
                // auto_1_rental_car.val(response.get('auto_1_rental_car') || '');
                // auto_vehicle_2_comp_ded.val(response.get('auto_vehicle_2_comp_ded') || '');
                // auto_vehicle_2_collision_ded.val(response.get('auto_vehicle_2_collision_ded') || '');
                // auto_2_towing.val(response.get('auto_2_towing') || '');
                // auto_2_rental_car.val(response.get('auto_2_rental_car') || '');
                // auto_quote_update_request.val(response.get('auto_quote_update_request') || '');
                // auto_policy_effective_date.val(response.get('auto_policy_effective_date') || '');
                // auto_payment_option.val(response.get('auto_payment_option') || '');
                // auto_payment_info.val(response.get('auto_payment_info') || '');
                // auto_quoted_auto_company.val(response.get('auto_quoted_auto_company') || '');
                // auto_quoted_auto_premium.val(response.get('auto_quoted_auto_premium') || '');
                // auto_quoted_auto_number.val(response.get('auto_quoted_auto_number') || '');
                // auto_insurance_carrier.val(response.get('auto_insurance_carrier') || '');
                // auto_insurance_premium.val(response.get('auto_insurance_premium') || '');
                // auto_insurance_premium.val(response.get('auto_insurance_premium') || '');
                // auto_document_needed.val(response.get('auto_document_needed') || '');


            // LIFE INFO
                // life_auto_priority_code.val(response.get('life_auto_priority_code') || '');
                // life_priority_code.val(response.get('life_priority_code') || '');
                // life_lead_source.val(response.get('life_lead_source') || '');
                // life_partner.val(response.get('life_partner') || '');
                // life_insurance_policy_number.val(response.get('life_insurance_policy_number') || '');
                // life_lead_status.val(response.get('life_lead_status') || '');
                // life_writing_agent.val(response.get('life_writing_agent') || '');
                // life_scrubber.val(response.get('life_scrubber') || '');
                // life_age.val(response.get('life_age') || '');
                // life_height.val(response.get('life_height') || '');
                // life_weight.val(response.get('life_weight') || '');
                // life_insurance_type.val(response.get('life_insurance_type') || '');
                // life_term_life_policy_lenght.val(response.get('life_term_life_policy_lenght') || '');
                // life_desired_amount_of_coverage.val(response.get('life_desired_amount_of_coverage') || '');
                // life_smoke.val(response.get('life_smoke') || '');
                // life_major_health_issues_in_relatives.val(response.get('life_major_health_issues_in_relatives') || '');
                // life_convicted_of_drunk_driving.val(response.get('life_convicted_of_drunk_driving') || '');
                // life_quote_status.val(response.get('life_quote_status') || '');
                // life_date_paramed_exam_ordered.val(response.get('life_date_paramed_exam_ordered') || '');
                // life_monthly_premium.val(response.get('life_monthly_premium') || '');
                // life_paramed_company.val(response.get('life_paramed_company') || '');
                // life_application_id_number.val(response.get('life_application_id_number') || '');
                // life_application_status.val(response.get('life_application_status') || '');
                // life_application_changes.val(response.get('life_application_changes') || '');
                // life_after_changes_new_premium.val(response.get('life_after_changes_new_premium') || '');
                // life_application_declined_reason.val(response.get('life_application_declined_reason') || '');

            // ANCILLIARY INFO
                ancilliary_auto_priority_code.val(response.get('ancilliary_auto_priority_code') || '');
                ancilliary_priority_code.val(response.get('ancilliary_priority_code') || '');
                ancilliary_lead_source.val(response.get('ancilliary_lead_source') || '');
                ancilliary_partner.val(response.get('ancilliary_partner') || '');
                ancilliary_insurance_policy_number.val(response.get('ancilliary_insurance_policy_number') || '');
                ancilliary_writing_agent.val(response.get('ancilliary_writing_agent') || '');
                ancilliary_scrubber.val(response.get('ancilliary_scrubber') || '');
                ancilliary_lead_status.val(response.get('ancilliary_lead_status') || '');
                ancilliary_accident.val(response.get('ancilliary_accident') || '');
                ancilliary_critical_illness.val(response.get('ancilliary_critical_illness') || '');
                ancilliary_hospital_confinement.val(response.get('ancilliary_hospital_confinement') || '');
                ancilliary_dental_care.val(response.get('ancilliary_dental_care') || '');
                ancilliary_dental_lead_status.val(response.get('ancilliary_dental_lead_status') || '');
                ancilliary_ancillary_total.val(response.get('ancilliary_ancillary_total') || '');
                ancilliary_abnormal_cancer_screening_test.val(response.get('ancilliary_abnormal_cancer_screening_test') || '');
                ancilliary_cysts_growths_etc_not_seen_for.val(response.get('ancilliary_cysts_growths_etc_not_seen_for') || '');
                ancilliary_carotid_artery_stenosis_etc.val(response.get('ancilliary_carotid_artery_stenosis_etc') || '');
                ancilliary_hiv_positive_aids_related_complex_aids.val(response.get('ancilliary_hiv_positive_aids_related_complex_aids') || '');
                ancilliary_multiple_sclerosis_memory_loss_etc.val(response.get('ancilliary_multiple_sclerosis_memory_loss_etc') || '');
                ancilliary_abnormal_tests_requiring_follow_up.val(response.get('ancilliary_abnormal_tests_requiring_follow_up') || '');
                ancilliary_any_non_routine_consultation_scheduled.val(response.get('ancilliary_any_non_routine_consultation_scheduled') || '');
                ancilliary_one_or_more_imm_relatives_with_issues.val(response.get('ancilliary_one_or_more_imm_relatives_with_issues') || '');
                ancilliary_two_or_more_imm_relatives_with_issues.val(response.get('ancilliary_two_or_more_imm_relatives_with_issues') || '');
                ancilliary_bening_tumor_hypertension_etc.val(response.get('ancilliary_bening_tumor_hypertension_etc') || '');
                ancilliary_prescription_medication_in_last_three_years.val(response.get('ancilliary_prescription_medication_in_last_three_years') || '');
                ancilliary_disorder_disease_heart_kidney_lungs.val(response.get('ancilliary_disorder_disease_heart_kidney_lungs') || '');
                ancilliary_disease_quad_lou_gehrigs_other_motor.val(response.get('ancilliary_disease_quad_lou_gehrigs_other_motor') || '');
                ancilliary_alcohol_or_substance_abuse_five_years.val(response.get('ancilliary_alcohol_or_substance_abuse_five_years') || '');
                ancilliary_heart_attack_stroke_transient_ischemic.val(response.get('ancilliary_heart_attack_stroke_transient_ischemic') || '');
                ancilliary_diabetes_type_one_or_two_blood_press_am.val(response.get('ancilliary_diabetes_type_one_or_two_blood_press_am') || '');
                ancilliary_nursing_home_hospitalized_etc.val(response.get('ancilliary_nursing_home_hospitalized_etc') || '');
                ancilliary_hospitalized_in_the_last_twelve_months.val(response.get('ancilliary_hospitalized_in_the_last_twelve_months') || '');
                ancilliary_diagnosed_or_treated_for_medical_issues.val(response.get('ancilliary_diagnosed_or_treated_for_medical_issues') || '');
                ancilliary_pregnant.val(response.get('ancilliary_pregnant') || '');
                ancilliary_ever_had_a_problem_pregnancy.val(response.get('ancilliary_ever_had_a_problem_pregnancy') || '');
                ancilliary_hypertension.val(response.get('ancilliary_hypertension') || '');
                ancilliary_accident_elite_request_eff_date.val(response.get('ancilliary_accident_elite_request_eff_date') || '');
                ancilliary_accident_elite_premium.val(response.get('ancilliary_accident_elite_premium') || '');
                ancilliary_accident_elite_notes.val(response.get('ancilliary_accident_elite_notes') || '');
                ancilliary_critical_care_request_eff_date.val(response.get('ancilliary_critical_care_request_eff_date') || '');
                ancilliary_critial_care_premium.val(response.get('ancilliary_critial_care_premium') || '');
                ancilliary_critical_care_notes.val(response.get('ancilliary_critical_care_notes') || '');
                ancilliary_request_eff_date.val(response.get('ancilliary_request_eff_date') || '');
                ancilliary_hospital_confinement_premium.val(response.get('ancilliary_hospital_confinement_premium') || '');
                ancilliary_hospital_confinement_notes.val(response.get('ancilliary_hospital_confinement_notes') || '');
                ancilliary_dental_request_eff_date.val(response.get('ancilliary_dental_request_eff_date') || '');
                ancilliary_dental_care_premium.val(response.get('ancilliary_dental_care_premium') || '');
                ancilliary_dental_care_notes.val(response.get('ancilliary_dental_care_notes') || '');

            // Addittional Data
                contact_info_property_address_2.val(response.get("contact_info_property_address_2"));
                contact_info_agent_code.val(response.get("contact_info_agent_code"));
                contact_info_created_by.val(response.get("contact_info_created_by"));
                contact_info_created_date.val(response.get("contact_info_created_date"));
                contact_info_date_modified.val(response.get("contact_info_date_modified"));
                contact_info_transfer_timestamp.val(response.get("contact_info_transfer_timestamp"));
                contact_info_current_job_and_income_info.val(response.get("contact_info_current_job_and_income_info"));
                contact_info_spouse.val(response.get("contact_info_spouse"));
                contact_info_employment_status.val(response.get("employment_status"));
                contact_info_subsidy_drop_date.val(response.get("contact_info_subsidy_drop_date"));
                contact_info_can_find_a_temp_id_card.val(response.get("contact_info_can_find_a_temp_id_card"));
                contact_info_found_in_search_accounts.val(response.get("contact_info_found_in_search_accounts"));
                contact_info_paid_to_date_2016.val(response.get("contact_info_paid_to_date_2016"));
                contact_info_corrected_discrepancy.val(response.get("contact_info_corrected_discrepancy"));
                contact_info_corrected_discrepancy_completed_date.val(response.get("contact_info_corrected_discrepancy_completed_date"));
                contact_info_updated_premium_2016.val(response.get("contact_info_updated_premium_2016"));
                contact_info_marketplace_changed_premium.val(response.get("contact_info_marketplace_changed_premium"));
                contact_info_red_box_error.val(response.get("contact_info_red_box_error"));
                contact_info_verification_documents_submitted_date.val(response.get("contact_info_verification_documents_submitted_date"));
                contact_info_tcpa_compliant.val(response.get("contact_info_tcpa_compliant"));
                child_1_income.val(response.get("child_1_income"));
                child_2_income.val(response.get("child_2_income"));
                child_3_income.val(response.get("child_3_income"));
                child_4_income.val(response.get("child_4_income"));
                health_agent_notes.val(response.get("health_agent_notes"));
                health_project_individual_income.val(response.get("health_project_individual_income"));
                health_project_household_income.val(response.get("health_project_household_income"));
                health_presold_timestamp.val(response.get("health_presold_timestamp"));
                health_tentative_timestamp.val(response.get("health_tentative_timestamp"));
                health_enrolled_timestamp.val(response.get("health_enrolled_timestamp"));
                health_active_timestamp.val(response.get("health_active_timestamp"));
                health_policy_2016.val(response.get("health_policy_2016"));
                payment_paid_confirmation_number.val(response.get("payment_paid_confirmation_number"));
                ancillary_client.val(response.get("ancillary_client"));
                ancillary_payment_option.val(response.get("ancillary_payment_option"));
                ancillary_bank_account_number.val(response.get("ancillary_bank_account_number"));
                ancillary_bank_routing_number.val(response.get("ancillary_bank_routing_number"));
                ancillary_bank_name.val(response.get("ancillary_bank_name"));
                ancillary_bank_account_type.val(response.get("ancillary_bank_account_type"));
                ancillary_bank_routing_number.val(response.get("ancillary_bank_routing_number"));
                ancillary_bank_account_number.val(response.get("ancillary_bank_account_number"));

            },
            error: function(error){
                console.log(error);
            }
        });
    }
});