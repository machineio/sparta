fun.views.footer = Backbone.View.extend({

    events: {
        'click #thisIsATest': 'testWithAlex',
        'click #call-outbound-btn': 'callNowContact',
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
        fun.messages.on("obelix:message", function(){
            console.log('lol con uli');
        }, this);

        fun.messages.on("toronja:contact", function(){
            console.log('on footer reacting to fun.messages on toronja:contact');                // WTF IS THIS SHIT YOU ??????
        }, this);

        fun.messages.on("call:contact", function(){
            this.callActiveContact();
        }, this);
    },

    successResult: function(response){

        var lolazo = response.attributes.results.models;

        

        _.each(lolazo, function(value){
            /*template = _.template(
                fun.utils.getTemplate(fun.conf.templates.contactRow)
            )(value);
            rows.append(template);*/
            console.log(value.toJSON());
        });

    },


    getDropdownInfo: function(select){
        'use strict';
        var list_of_states,
            options;

        options = {unique:true};
        options[select] = true;

        list_of_states = new fun.models.ContactsContainer();
        list_of_states.fetch({data: $.param(options)});

        return list_of_states.attributes.results;
    },

    callNowContact: function(){
        'use strict';
        console.log('dial the shit out of');
        var activeContact = JSON.parse(sessionStorage.getItem("active_contact")),
            currentAccount = JSON.parse(localStorage.getItem("profile")),
            struct,
            outbound;

        struct = {
            phone_number: activeContact['contact_info_phone_number'],
            account: currentAccount['account'],
            callerid: currentAccount['phone_number'],
            extension: currentAccount['extension']
        };

        outbound = new fun.models.Outbound(struct);
        outbound.save();

        console.log('this is only a test a fucking call now contact or some random shit test');
    },

    callActiveContact: function(){
        'use strict';
        var response = JSON.parse(sessionStorage.getItem("active_contact"));
        console.log('RESPONSE!!!!!!!',response);

        var name_uuid,
            stuff = JSON.parse(localStorage.getItem("profile"));
            // callbacks_and_stuff,
            // lolol,

        name_uuid = $(event.target).data('name');

        this.renderContactModalForm();

        function renderDate(date){
            console.log('RAW DATE',date);
            var now = new Date(date);
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day);
            console.log('TODAY!!!!',today, typeof today);
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

        $('#callingModal').modal('show');

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

            var payment_request_payment_date = this.$("#payment-request-payment-date");

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

        // CONTACT INFO
            contact_uuid = response.uuid;
            localStorage.setItem('current_contact_uuid',JSON.stringify({uuid:response.uuid}));
            contact_account = response.account;
            contact_description = response.description;
            contact_history = response.history;
            contact_comment = response.comment;
            contact_info_first_name.val(response.contact_info_first_name || '');
            contact_info_last_name.val(response.contact_info_last_name || '');
            contact_info_phone_number.val(response.contact_info_phone_number || '');
            contact_info_cellphone.val(response.other_phone || '');
            contact_info_email.val(response.contact_info_email || '');
            contact_info_other_phone.val(response.other_phone_2 || '');
            contact_info_date_of_birth.val(renderDate(response.contact_info_date_of_birth) || '');
            // contact_info_date_of_birth.value = response.contact_info_dob') || '';

            contact_info_gender.val(response.contact_info_gender || '');
            $(contact_info_gender.selector + " option[value='" + response.contact_info_gender + "']").attr("selected", "selected");

            contact_info_marital_status.value = response.contact_info_marital_status || '';
            $(contact_info_marital_status.selector + " option[value='" + response.contact_info_marital_status + "']").attr("selected", "selected");

            contact_info_number_of_children.val(response.contact_info_number_of_children || 0);
            $(contact_info_number_of_children.selector + " option[value='" + response.contact_info_number_of_children + "']").attr("selected", "selected");

            contact_info_social_security_number.val(response.contact_info_social_security_number || '');
            contact_info_property_address.val(response.contact_info_property_address);

            contact_info_state.val(response.contact_info_state || '');
            $(contact_info_state.selector + " option[value='" + response.contact_info_state + "']").attr("selected", "selected");

            contact_info_city.val(response.contact_info_city || '');
            contact_info_zip_code.val(response.contact_info_zip_code || '');
            contact_info_country.val(response.country || '');

            contact_info_mailing_address_different.val(response.contact_info_mailing_address_different || '');
            $(contact_info_mailing_address_different.selector + " option[value='" + response.contact_info_mailing_address_different + "']").attr("selected", "selected");

            contact_info_mailing_address.val(response.contact_info_mailing_address || '');
            contact_info_mailing_city.val(response.contact_info_mailing_city || '');
            contact_info_mailing_state.val(response.contact_info_mailing_state || '');
            contact_info_mailing_zipcode.val(response.contact_info_mailing_zipcode || '');
            contact_info_marketplace_email.val(response.marketplace_app_id_2015 || '');

            contact_info_language_preference.val(response.language_preference || '');
            $(contact_info_language_preference.selector + " option[value='" + response.language_preference + "']").attr("selected", "selected");

            contact_info_writing_agent.val(response.contact_info_writing_agent || '');
            $(contact_info_writing_agent.selector + " option[value='" + response.contact_info_writing_agent + "']").attr("selected", "selected");

            contact_info_lead_type.val(response.contact_info_lead_type || 'health');
            // $(contact_info_lead_type.selector + " option[value='health']").attr("selected", "selected");
            $(contact_info_writing_agent.selector + " option[value='" + response.contact_info_lead_type + "']").attr("selected", "selected");

            contact_info_lead_source.val(response.contact_info_lead_source || 'boberdoo');
            $(contact_info_lead_source.selector + " option[value='boberdoo']").attr("selected", "selected");
            // $(contact_info_lead_source.selector + " option[value='" + response.lead_source') + "']").attr("selected", "selected");

            contact_info_partner.val(response.contact_info_partner || '');
            contact_info_last_modified_by.val(response.contact_info_last_modified_by || '');

            contact_info_health_insurance_checkbox.val(response.contact_info_health_insurance_status || 'true');
            // $(contact_info_health_insurance_checkbox.selector + " option[value='true']").attr("selected", "selected");
            $(contact_info_health_insurance_checkbox.selector + " option[value='" + response.contact_info_health_insurance_status + "']").attr("selected", "selected");

            contact_info_home_insurance_checkbox.val(response.contact_info_home_insurance_status || '');
            $(contact_info_home_insurance_checkbox.selector + " option[value='" + response.contact_info_home_insurance_status + "']").attr("selected", "selected");

            contact_info_auto_insurance_checkbox.val(response.contact_info_auto_insurance_status || '');
            $(contact_info_auto_insurance_checkbox.selector + " option[value='" + response.contact_info_auto_insurance_status + "']").attr("selected", "selected");

            contact_info_life_insurance_checkbox.val(response.contact_info_life_insurance_status || '');
            $(contact_info_life_insurance_checkbox.selector + " option[value='" + response.contact_info_life_insurance_status + "']").attr("selected", "selected");

            contact_info_ancilliary_insurance_checkbox.val(response.ancillary_lead_status || '');
            $(contact_info_ancilliary_insurance_checkbox.selector + " option[value='" + response.ancillary_lead_status + "']").attr("selected", "selected");

            contact_info_other_policy_sold.val(response.other_policies_sold || '');
            $(contact_info_other_policy_sold.selector + " option[value='" + response.other_policies_sold + "']").attr("selected", "selected");

            contact_info_federal_do_not_call.val(response.contact_info_federal_do_not_call || '');
            $(contact_info_federal_do_not_call.selector + " option[value='" + response.contact_info_federal_do_not_call + "']").attr("selected", "selected");

            contact_info_renew_as_is_email_received.val(response.contact_info_renew_as_is_email_received || '');
            $(contact_info_renew_as_is_email_received.selector + " option[value='" + response.contact_info_renew_as_is_email_received + "']").attr("selected", "selected");

            health_us_citizen_or_legal_permanent_resident.val(response.us_citizen_or_legal_permanent_resident || '');
            $(contact_info_renew_as_is_email_received.selector + " option[value='" + response.us_citizen_or_legal_permanent_resident + "']").attr("selected", "selected");

        // SPOUSE INFO
            spouse_first_name.val(response.spouse_first_name || '');
            spouse_last_name.val(response.spouse_last_name || '');

            spouse_gender.val(response.spouse_1_gender || '');
            $(spouse_gender.selector + " option[value='" + response.spouse_1_gender + "']").attr("selected", "selected");

            spouse_dob.val(response.spouse_dob || '');

            spouse_do_you_have_a_social_security_number.val(response.spouse_do_you_have_a_social_security_number || 'none');
            $(spouse_do_you_have_a_social_security_number.selector + " option[value='none']").attr("selected", "selected");
            // $(spouse_do_you_have_a_social_security_number.selector + " option[value='" + response.spouse_do_you_have_a_social_security_number + "']").attr("selected", "selected");

            spouse_social.val(response.spouse_social || '');
            spouse_income_source.val(response.spouse_income_source || '');
            spouse_yearly_income.val(response.spouse_yearly_income || '');
            spouse_employers_name.val(response.spouse_employers_name || '');
            spouse_employers_phone_number.val(response.spouse_employers_phone_number || '');


        // CHILD INFO
            contact_info_child_1_name.val(response.child_1_name || '');
            contact_info_child_1_dob.val(response.child_1_dob || '');
            contact_info_child_1_gender.val(response.child_1_gender || '');
            contact_info_child_1_social.val(response.child_1_social || '');
            contact_info_child_2_name.val(response.child_2_dob || '');
            contact_info_child_2_dob.val(response.child_2_dob || '');
            contact_info_child_2_gender.val(response.child_2_gender || '');
            contact_info_child_2_social.val(response.child_2_social || '');
            contact_info_child_3_name.val(response.child_3_name || '');
            contact_info_child_3_dob.val(response.child_3_dob || '');
            contact_info_child_3_gender.val(response.child_3_gender || '');
            contact_info_child_3_social.val(response.child_3_social || '');
            contact_info_child_4_name.val(response.child_4_name || '');
            contact_info_child_4_dob.val(response.child_4_dob || '');
            contact_info_child_4_gender.val(response.child_4_gender || '');
            contact_info_child_4_social.val(response.child_4_social || '');


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
            health_auto_priority_code.val(response.health_auto_priority_code || '');
            health_priority_code.val(response.health_priority_code || '');
            health_lead_source.val(response.health_lead_source || '');
            health_partner.val(response.contact_info_partner || '');
            health_lead_status.val(response.health_lead_status || '');
            health_writing_agent.val(response.health_writing_agent || '');
            health_scrubber.val(response.health_scrubber || '');
            health_total_individual_income.val(response.health_total_individual_income || '');
            health_total_household_income.val(response.health_total_household_income || '');
            health_primary_applicants_income_source.val(response.primary_applicants_income_source || '');
            health_primary_applicants_employers_name.val(response.primary_applicants_employers_name || '');
            health_applicant_employers_phone_number.val(response.contact_info_marital_status || '');
            health_marital_status.val(response.health_marital_status || '');
            health_number_of_dependent_children_in_house.val(response.number_of_children || '');

            health_renewal_source_2016.val(response.health_renewal_source_2016 || '');
            $(health_renewal_source_2016.selector + " option[value='" + response.health_renewal_source_2016 + "']").attr("selected", "selected");

            health_renewal_agent_2016.val(response.renewal_submitter_2016 || '');
            $(health_renewal_agent_2016.selector + " option[value='" + response.renewal_submitter_2016 + "']").attr("selected", "selected");

            health_presold_processor_2016.val(response.presold_processor_2016 || '');
            $(health_presold_processor_2016.selector + " option[value='" + response.presold_processor_2016 + "']").attr("selected", "selected");

            health_application_number_2016_info.val(response.health_application_number_2016_selection || '');
            health_effective_date_2016.val(renderDate(response.health_effective_date_2016) || '');
            health_presold_processor_2016.val(response.health_presold_processor_2016 || '');
            health_total_income_used_on_application.val(response.health_total_income_used_on_application || '');
            health_final_gross_premium_2016.val(response.health_final_gross_premium_2016 || '');
            health_final_subsidy_2016.val(response.health_final_subsidy_2016 || '');
            heatlh_plan_2016.val(response.health_policy_2016 || '');
            health_final_premium_after_subsidy_2016.val(response.health_final_premium_after_subsidy_2016 || '');

            health_verification_documents_needed_2016.val(response.health_verification_documents_needed_2016 || '');
            $(health_verification_documents_needed_2016.selector + " option[value='" + response.health_verification_documents_needed_2016 + "']").attr("selected", "selected");

            health_verification_documents_due_date_2016.val(renderDate(response.health_verification_documents_due_date_2016) || '');
            health_application_number_2016_selection.val(response.health_application_number_2016_selection || '');
            health_adults_applying_for_coverage_2016.val(response.health_adults_applying_for_coverage_2016 || '');
            health_total_household_size_2016.val(response.health_total_household_size_2016 || '');
            health_cloud_gross_premium_2016.val(response.cloud_gross_premium_2016 || '');
            health_children_applying_for_coverage_2016.val(response.health_children_applying_for_coverage_2016 || '');
            health_cloud_subsidy_2016.val(response.health_cloud_subsidy_2016 || '');
            health_cloud_premium_after_subsidy_2016.val(response.health_cloud_premium_after_subsidy_2016 || '');
            health_lead_has_a_marketplace_account.val(response.health_lead_has_marketplace_account || '');
            health_current_coverage.val(response.health_number_of_dependent_children_in_house || '');
            // health_marketplace_app_id_2015.val(response.health_marketplace_app_id_2015 || '');
            health_current_premium.val(response.health_current_premium || '');
            health_subsidy_amount.val(response.health_subsidy_amount || '');
            health_current_net_premium.val(response.health_current_net_premium || '');
            // health_effective_date_2015.val(response.health_effective_date_2015 || '');
            // health_application_id_2015.val(response.health_application_id_2015 || '');
            // health_premium_2015.val(response.health_premium_2015 || '');
            // health_carrier_2015.val(response.health_carrier_2015 || '');
            // health_subsidy_2015.val(response.health_subsidy_2015 || '');
            // health_adult_on_plan_2015.val(response.health_adult_on_plan_2015 || '');
            // health_children_on_plan_2015.val(response.health_children_on_plan_2015 || '');
            // health_income_verification_needed_2015.val(response.health_income_verification_needed_2015 || '');
            // health_citizenship_documents_needed_2015.val(response.health_citizenship_documents_needed_2015 || '');
            health_policy.val(response.health_policy_2016 || '');
            // health_contact_code_2015.val(response.health_contact_code_2015 || '');
            health_wants_to_renew_same_plan_for_2016.val(response.health_wants_to_renew_same_plan_for_2016 || '');
            health_quoted_renewal_gross_premium_2016.val(response.health_quoted_renewal_gross_premium_2016 || '');
            health_quoted_renewal_subsidy_2016.val(response.health_quoted_renewal_subsidy_2016 || '');
            health_quoted_renewal_net_premium_2016.val(response.health_quoted_renewal_net_premium_2016 || '');
            health_username.val(response.health_username || '');
            health_password.val(response.health_password || '');


        // HOME INFO
            // home_priority_code.val(response.home_priority_code || '');
            // home_auto_priority_code.val(response.home_auto_priority_code || '');
            // home_lead_source.val(response.home_lead_source || '');
            // home_partner.val(response.home_partner || '');
            // home_insurance_policy_number.val(response.home_insurance_policy_number || '');
            // home_writing_agent.val(response.home_writing_agent || '');
            // home_scrubber.val(response.home_scrubber || '');
            // home_lead_status.val(response.home_lead_status || '');
            // home_new_purchase.val(response.home_new_purchase || '');
            // home_exp_date_closing_date.val(response.home_exp_date_closing_date || '');
            // home_occupancy_status.val(response.home_occupancy_status || '');
            // home_type_of_dwelling.val(response.home_type_of_dwelling || '');
            // home_current_home_carrier.val(response.home_current_home_carrier || '');
            // home_current_home_premium.val(response.home_current_home_premium || '');
            // home_current_dwelling_coverage.val(response.home_current_dwelling_coverage || '');
            // home_year_built.val(response.home_year_built || '');
            // home_square_ft_under_air.val(response.home_square_ft_under_air || '');
            // home_garage.val(response.home_garage || '');
            // home_construction_type.val(response.home_construction_type || '');
            // home_stories.val(response.home_stories || '');
            // home_number_of_stories_in_the_building.val(response.home_number_of_stories_in_the_building || '');
            // home_what_floor_number_is_condo_on.val(response.home_what_floor_number_is_condo_on || '');
            // home_quote_update_request.val(response.home_quote_update_request || '');
            // home_policy_effective_date.val(response.home_policy_effective_date || '');
            // home_four_point_if_applicable.val(response.home_four_point_if_applicable || '');
            // home_quoted_home_company.val(response.home_quoted_home_company || '');
            // home_wind_mit.val(response.home_wind_mit || '');
            // home_age_roof.val(response.home_age_roof || '');
            // home_roof_material.val(response.home_roof_material || '');
            // home_bathrooms.val(response.home_bathrooms || '');
            // home_dog.val(response.home_dog || '');
            // home_pool.val(response.home_pool || '');
            // home_fence_or_screen_enclosure.val(response.home_fence_or_screen_enclosure || '');
            // home_bankrupcy_or_Foreclosure_in_the_past_five_years.val(response.home_bankrupcy_or_Foreclosure_in_the_past_five_years || '');
            // home_centrally_monitored_alarm.val(response.home_centrally_monitored_alarm || '');
            // home_gated_community.val(response.home_gated_community || '');
            // home_how_many_claims_in_the_last_five_Years.val(response.home_how_many_claims_in_the_last_five_Years || '');
            // home_realtor_mortgage_broker.val(response.home_realtor_mortgage_broker || '');
            // home_amount_of_personal_property.val(response.home_amount_of_personal_property || '');
            // home_quoted_home_premium.val(response.home_quoted_home_premium || '');
            // home_quoted_home_number.val(response.home_quoted_home_number || '');
            // home_payment_option.val(response.home_payment_option || '');
            // home_mortgage_clause_new.val(response.home_mortgage_clause_new || '');
            // home_loan_number.val(response.home_loan_number || '');
            // home_insurance_carrier.val(response.home_insurance_carrier || '');
            // home_insurance_premium.val(response.home_insurance_premium || '');


        // AUTO INFO
            // auto_auto_priority_code.val(response.auto_auto_priority_code || '');
            // auto_priority_code.val(response.auto_priority_code || '');
            // auto_lead_source.val(response.auto_lead_source || '');
            // auto_partner.val(response.auto_partner || '');
            // auto_insurance_policy_number.val(response.auto_insurance_policy_number || '');
            // auto_lead_status.val(response.auto_lead_status || '');
            // auto_writing_agent.val(response.auto_writing_agent || '');
            // auto_scrubber.val(response.auto_scrubber || '');
            // auto_current_auto_carrier.val(response.auto_current_auto_carrier || '');
            // auto_expiration_date.val(response.auto_expiration_date || '');
            // auto_current_auto_premium.val(response.auto_current_auto_premium || '');
            // auto_current_residence_type.val(response.auto_current_residence_type || '');
            // auto_driver_one_license_number.val(response.auto_driver_one_license_number || '');
            // auto_vehicle_one_vin.val(response.auto_vehicle_one_vin || '');
            // auto_vehicle_one_year.val(response.auto_vehicle_one_year || '');
            // auto_vehicle_one_make.val(response.auto_vehicle_one_make || '');
            // auto_vehicle_one_model.val(response.auto_vehicle_one_model || '');
            // auto_driver_two_license_number.val(response.auto_driver_two_license_number || '');
            // auto_vehicle_two_vin.val(response.auto_vehicle_two_vin || '');
            // auto_vehicle_two_year.val(response.auto_vehicle_two_year || '');
            // auto_vehicle_two_make.val(response.auto_vehicle_two_make || '');
            // auto_vehicle_two_model.val(response.auto_vehicle_two_model || '');
            // auto_bodily_injury_liability.val(response.auto_bodily_injury_liability || '');
            // auto_property_damage.val(response.auto_property_damage || '');
            // auto_uninsured_motorist_liability.val(response.auto_uninsured_motorist_liability || '');
            // auto_medical_payments.val(response.auto_medical_payments || '');
            // auto_vehicle_one_comp_ded.val(response.auto_vehicle_one_comp_ded || '');
            // auto_vehicle_1_collision_ded.val(response.auto_vehicle_1_collision_ded || '');
            // auto_1_towing.val(response.auto_1_towing || '');
            // auto_1_rental_car.val(response.auto_1_rental_car || '');
            // auto_vehicle_2_comp_ded.val(response.auto_vehicle_2_comp_ded || '');
            // auto_vehicle_2_collision_ded.val(response.auto_vehicle_2_collision_ded || '');
            // auto_2_towing.val(response.auto_2_towing || '');
            // auto_2_rental_car.val(response.auto_2_rental_car || '');
            // auto_quote_update_request.val(response.auto_quote_update_request || '');
            // auto_policy_effective_date.val(response.auto_policy_effective_date || '');
            // auto_payment_option.val(response.auto_payment_option || '');
            // auto_payment_info.val(response.auto_payment_info || '');
            // auto_quoted_auto_company.val(response.auto_quoted_auto_company || '');
            // auto_quoted_auto_premium.val(response.auto_quoted_auto_premium || '');
            // auto_quoted_auto_number.val(response.auto_quoted_auto_number || '');
            // auto_insurance_carrier.val(response.auto_insurance_carrier || '');
            // auto_insurance_premium.val(response.auto_insurance_premium || '');
            // auto_insurance_premium.val(response.auto_insurance_premium || '');
            // auto_document_needed.val(response.auto_document_needed || '');


        // LIFE INFO
            // life_auto_priority_code.val(response.life_auto_priority_code || '');
            // life_priority_code.val(response.life_priority_code || '');
            // life_lead_source.val(response.life_lead_source || '');
            // life_partner.val(response.life_partner || '');
            // life_insurance_policy_number.val(response.life_insurance_policy_number || '');
            // life_lead_status.val(response.life_lead_status || '');
            // life_writing_agent.val(response.life_writing_agent || '');
            // life_scrubber.val(response.life_scrubber || '');
            // life_age.val(response.life_age || '');
            // life_height.val(response.life_height || '');
            // life_weight.val(response.life_weight || '');
            // life_insurance_type.val(response.life_insurance_type || '');
            // life_term_life_policy_lenght.val(response.life_term_life_policy_lenght || '');
            // life_desired_amount_of_coverage.val(response.life_desired_amount_of_coverage || '');
            // life_smoke.val(response.life_smoke || '');
            // life_major_health_issues_in_relatives.val(response.life_major_health_issues_in_relatives || '');
            // life_convicted_of_drunk_driving.val(response.life_convicted_of_drunk_driving || '');
            // life_quote_status.val(response.life_quote_status || '');
            // life_date_paramed_exam_ordered.val(response.life_date_paramed_exam_ordered || '');
            // life_monthly_premium.val(response.life_monthly_premium || '');
            // life_paramed_company.val(response.life_paramed_company || '');
            // life_application_id_number.val(response.life_application_id_number || '');
            // life_application_status.val(response.life_application_status || '');
            // life_application_changes.val(response.life_application_changes || '');
            // life_after_changes_new_premium.val(response.life_after_changes_new_premium || '');
            // life_application_declined_reason.val(response.life_application_declined_reason || '');

        // ANCILLIARY INFO
            ancilliary_auto_priority_code.val(response.ancilliary_auto_priority_code || '');
            ancilliary_priority_code.val(response.ancilliary_priority_code || '');
            ancilliary_lead_source.val(response.ancilliary_lead_source || '');
            ancilliary_partner.val(response.ancilliary_partner || '');
            ancilliary_insurance_policy_number.val(response.ancilliary_insurance_policy_number || '');
            ancilliary_writing_agent.val(response.ancilliary_writing_agent || '');
            ancilliary_scrubber.val(response.ancilliary_scrubber || '');
            ancilliary_lead_status.val(response.ancilliary_lead_status || '');
            ancilliary_accident.val(response.ancilliary_accident || '');
            ancilliary_critical_illness.val(response.ancilliary_critical_illness || '');
            ancilliary_hospital_confinement.val(response.ancilliary_hospital_confinement || '');
            ancilliary_dental_care.val(response.ancilliary_dental_care || '');
            ancilliary_dental_lead_status.val(response.ancilliary_dental_lead_status || '');
            ancilliary_ancillary_total.val(response.ancilliary_ancillary_total || '');
            ancilliary_abnormal_cancer_screening_test.val(response.ancilliary_abnormal_cancer_screening_test || '');
            ancilliary_cysts_growths_etc_not_seen_for.val(response.ancilliary_cysts_growths_etc_not_seen_for || '');
            ancilliary_carotid_artery_stenosis_etc.val(response.ancilliary_carotid_artery_stenosis_etc || '');
            ancilliary_hiv_positive_aids_related_complex_aids.val(response.ancilliary_hiv_positive_aids_related_complex_aids || '');
            ancilliary_multiple_sclerosis_memory_loss_etc.val(response.ancilliary_multiple_sclerosis_memory_loss_etc || '');
            ancilliary_abnormal_tests_requiring_follow_up.val(response.ancilliary_abnormal_tests_requiring_follow_up || '');
            ancilliary_any_non_routine_consultation_scheduled.val(response.ancilliary_any_non_routine_consultation_scheduled || '');
            ancilliary_one_or_more_imm_relatives_with_issues.val(response.ancilliary_one_or_more_imm_relatives_with_issues || '');
            ancilliary_two_or_more_imm_relatives_with_issues.val(response.ancilliary_two_or_more_imm_relatives_with_issues || '');
            ancilliary_bening_tumor_hypertension_etc.val(response.ancilliary_bening_tumor_hypertension_etc || '');
            ancilliary_prescription_medication_in_last_three_years.val(response.ancilliary_prescription_medication_in_last_three_years || '');
            ancilliary_disorder_disease_heart_kidney_lungs.val(response.ancilliary_disorder_disease_heart_kidney_lungs || '');
            ancilliary_disease_quad_lou_gehrigs_other_motor.val(response.ancilliary_disease_quad_lou_gehrigs_other_motor || '');
            ancilliary_alcohol_or_substance_abuse_five_years.val(response.ancilliary_alcohol_or_substance_abuse_five_years || '');
            ancilliary_heart_attack_stroke_transient_ischemic.val(response.ancilliary_heart_attack_stroke_transient_ischemic || '');
            ancilliary_diabetes_type_one_or_two_blood_press_am.val(response.ancilliary_diabetes_type_one_or_two_blood_press_am || '');
            ancilliary_nursing_home_hospitalized_etc.val(response.ancilliary_nursing_home_hospitalized_etc || '');
            ancilliary_hospitalized_in_the_last_twelve_months.val(response.ancilliary_hospitalized_in_the_last_twelve_months || '');
            ancilliary_diagnosed_or_treated_for_medical_issues.val(response.ancilliary_diagnosed_or_treated_for_medical_issues || '');
            ancilliary_pregnant.val(response.ancilliary_pregnant || '');
            ancilliary_ever_had_a_problem_pregnancy.val(response.ancilliary_ever_had_a_problem_pregnancy || '');
            ancilliary_hypertension.val(response.ancilliary_hypertension || '');
            ancilliary_accident_elite_request_eff_date.val(response.ancilliary_accident_elite_request_eff_date || '');
            ancilliary_accident_elite_premium.val(response.ancilliary_accident_elite_premium || '');
            ancilliary_accident_elite_notes.val(response.ancilliary_accident_elite_notes || '');
            ancilliary_critical_care_request_eff_date.val(response.ancilliary_critical_care_request_eff_date || '');
            ancilliary_critial_care_premium.val(response.ancilliary_critial_care_premium || '');
            ancilliary_critical_care_notes.val(response.ancilliary_critical_care_notes || '');
            ancilliary_request_eff_date.val(response.ancilliary_request_eff_date || '');
            ancilliary_hospital_confinement_premium.val(response.ancilliary_hospital_confinement_premium || '');
            ancilliary_hospital_confinement_notes.val(response.ancilliary_hospital_confinement_notes || '');
            ancilliary_dental_request_eff_date.val(response.ancilliary_dental_request_eff_date || '');
            ancilliary_dental_care_premium.val(response.ancilliary_dental_care_premium || '');
            ancilliary_dental_care_notes.val(response.ancilliary_dental_care_notes || '');

            payment_request_payment_date.val(renderDate(response.payment_request_payment_date)  || '');
            payment_binder_payment_option.val(response.payment_binder_payment_option  || '');
            payment_payment_charge_request.val(response.payment_payment_charge_request  || '');
            payment_ccredit_card_type.val(response.payment_ccredit_card_type  || '');
            payment_name_on_cc.val(response.payment_name_on_cc  || '');
            payment_credit_card_number.val(response.payment_credit_card_number  || '');
            payment_cc_expiration_date.val(response.payment_cc_expiration_date  || '');
            payment_cc_cvv.val(response.payment_cc_cvv  || '');
            payment_bank_account_type.val(response.payment_bank_account_type  || '');
            payment_bank_name.val(response.payment_bank_name  || '');
            payment_bank_routuing_number.val(response.payment_bank_routuing_number  || '');
            payment_bank_account_number.val(response.payment_bank_account_number  || '');


        // Addittional Data
            contact_info_property_address_2.val(response.contact_info_property_address_2);
            contact_info_agent_code.val(response.contact_info_agent_code);
            contact_info_created_by.val(response.contact_info_created_by);
            contact_info_created_date.val(response.contact_info_created_date);
            contact_info_date_modified.val(response.contact_info_date_modified);
            contact_info_transfer_timestamp.val(response.contact_info_transfer_timestamp);
            contact_info_current_job_and_income_info.val(response.contact_info_current_job_and_income_info);
            contact_info_spouse.val(response.contact_info_spouse);
            contact_info_employment_status.val(response.employment_status);
            contact_info_subsidy_drop_date.val(renderDate(response.contact_info_subsidy_drop_date));
            contact_info_can_find_a_temp_id_card.val(response.contact_info_can_find_a_temp_id_card);
            contact_info_found_in_search_accounts.val(response.contact_info_found_in_search_accounts);
            contact_info_paid_to_date_2016.val(renderDate(response.contact_info_paid_to_date_2016));
            contact_info_corrected_discrepancy.val(response.contact_info_corrected_discrepancy);
            contact_info_corrected_discrepancy_completed_date.val(renderDate(response.contact_info_corrected_discrepancy_completed_date));
            contact_info_updated_premium_2016.val(response.contact_info_updated_premium_2016);
            contact_info_marketplace_changed_premium.val(response.contact_info_marketplace_changed_premium);
            contact_info_red_box_error.val(response.contact_info_red_box_error);
            contact_info_verification_documents_submitted_date.val(renderDate(response.contact_info_verification_documents_submitted_date));
            contact_info_tcpa_compliant.val(response.contact_info_tcpa_compliant);
            child_1_income.val(response.child_1_income);
            child_2_income.val(response.child_2_income);
            child_3_income.val(response.child_3_income);
            child_4_income.val(response.child_4_income);
            health_agent_notes.val(response.health_agent_notes);
            health_project_individual_income.val(response.health_project_individual_income);
            health_project_household_income.val(response.health_project_household_income);
            health_presold_timestamp.val(response.health_presold_timestamp);
            health_tentative_timestamp.val(response.health_tentative_timestamp);
            health_enrolled_timestamp.val(response.health_enrolled_timestamp);
            health_active_timestamp.val(response.health_active_timestamp);
            health_policy_2016.val(response.health_policy_2016);
            payment_paid_confirmation_number.val(response.payment_paid_confirmation_number);
            ancillary_client.val(response.ancillary_client);
            ancillary_payment_option.val(response.ancillary_payment_option);
            ancillary_bank_account_number.val(response.ancillary_bank_account_number);
            ancillary_bank_routing_number.val(response.ancillary_bank_routing_number);
            ancillary_bank_name.val(response.ancillary_bank_name);
            ancillary_bank_account_type.val(response.ancillary_bank_account_type);
            ancillary_bank_routing_number.val(response.ancillary_bank_routing_number);
            ancillary_bank_account_number.val(response.ancillary_bank_account_number);

        // this.renderActiveContactInformation();
    },

    renderActiveContactInformation: function(){
        'use strict';
        console.log('render active contact information');

        function renderDate(date){
            var now = new Date(date);
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            return today;
        }

        function changeMaritalStatus_fx(){
            if($('#contact-info-marital-status').val()==='Married'){
                $('#contactSpouseInfoTab').removeClass('hide');
                $('#contactSpouseInfoTab').addClass('show');
            } else {
                $('#contactSpouseInfoTab').removeClass('show');
                $('#contactSpouseInfoTab').addClass('hide');
            }
        }

        function healthInsuranceTab_fx(){
            if(($('#contact-info-health-insurance-checkbox').val()==="true")||($('#contact-info-health-insurance-checkbox').val()===true)){
                $('#healthInsuranceTab').removeClass('hide');
                $('#healthInsuranceTab').addClass('show');
            } else {
                $('#healthInsuranceTab').removeClass('show');
                $('#healthInsuranceTab').addClass('hide');
            }
        }

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
            contact_info_country,
            contact_info_mailing_address_different,
            contact_info_mailingAddressDifferentDiv,
            contact_info_mailing_address,
            contact_info_mailing_city,
            contact_info_mailing_state,
            contact_info_mailing_zipcode,
            contact_info_marketplace_email,
            contact_info_language_preference,
            contact_info_writing_agent,
            contact_info_lead_source,
            contact_info_lead_type,
            contact_info_partner,
            contact_info_last_modified_by,
            contact_info_health_insurance_checkbox,
            contact_info_home_insurance_checkbox,
            contact_info_auto_insurance_checkbox,
            contact_info_life_insurance_checkbox,
            contact_info_ancilliary_insurance_checkbox,
            contact_info_other_policy_sold,
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
            health_priority_code,
            health_lead_source,
            health_partner,
            health_lead_status,
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

        // and now for something completely different that is exactly the same.

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
        contact_info_country = this.$("#contact-info-country");
        contact_info_mailing_address_different = this.$("#contact-info-mailing-address-different");
        contact_info_mailing_address = this.$("#contact-info-mailing-address");
        contact_info_mailing_city = this.$("#contact-info-mailing-city");
        contact_info_mailing_state = this.$("#contact-info-mailing-state");
        contact_info_mailing_zipcode = this.$("#contact-info-mailing-zipcode");
        contact_info_marketplace_email = this.$("#contact-info-marketplace-email");
        contact_info_language_preference = this.$("#contact-info-language-preference");
        contact_info_writing_agent = this.$("#contact-info-writing-agent");
        contact_info_lead_source = this.$("#contact-info-lead-source");
        contact_info_lead_type = this.$("#contact-info-lead-type");
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






        function renderThisShit(response){



                console.log(response);
            
                // CONTACT INFO
                contact_uuid = response['uuid'];
                contact_account = response['account'];
                contact_description = response['description'];
                contact_history = response['history'];
                contact_comment = response['comment'];
                contact_info_first_name.val(response['first_name'] || '');
                contact_info_last_name.val(response['last_name'] || '');
                contact_info_phone_number.val(response['phone_number'] || '');
                contact_info_cellphone.val(response['mobile_number'] || '');
                contact_info_email.val(response['email'] || '');
                contact_info_other_phone.val(response['other_phone'] || '');
                contact_info_date_of_birth.val(renderDate(response['dob']) || '');

                contact_info_gender.val(response['gender'] || '');
                $(contact_info_gender.selector + " option[value='" + response['gender'] + "']").attr("selected", "selected");

                contact_info_marital_status.value = response['marital_status'] || '';
                $(contact_info_marital_status.selector + " option[value='" + response['marital_status'] + "']").attr("selected", "selected");

                contact_info_number_of_children.val(response['number_of_children'] || 0);
                $(contact_info_number_of_children.selector + " option[value='" + response['number_of_children'] + "']").attr("selected", "selected");

                contact_info_social_security_number.val(response['social_security_number'] || '');
                contact_info_property_address.val(response['street_address']);

                contact_info_state.val(response['state'] || '');
                $(contact_info_state.selector + " option[value='" + response['state'] + "']").attr("selected", "selected");

                contact_info_city.val(response['city'] || '');
                contact_info_zip_code.val(response['zip_code'] || '');
                contact_info_country.val(response['country'] || '');

                contact_info_mailing_address_different.val(response['mailing_address_different'] || '');
                $(contact_info_mailing_address_different.selector + " option[value='" + response['mailing_address_different'] + "']").attr("selected", "selected");

                contact_info_mailing_address.val(response['mailing_address'] || '');
                contact_info_mailing_city.val(response['mailing_city'] || '');
                contact_info_mailing_state.val(response['mailing_state'] || '');
                contact_info_mailing_zipcode.val(response['mailing_zipcode'] || '');
                contact_info_marketplace_email.val(response['marketplace_email'] || '');

                contact_info_language_preference.val(response['language_preference'] || '');
                $(contact_info_language_preference.selector + " option[value='" + response['language_preference'] + "']").attr("selected", "selected");

                contact_info_writing_agent.val(response['writing_agent'] || '');
                $(contact_info_writing_agent.selector + " option[value='" + response['writing_agent'] + "']").attr("selected", "selected");

                contact_info_lead_type.val(response['lead_type'] || 'health');
                $(contact_info_lead_type.selector + " option[value='health']").attr("selected", "selected");
                // $(contact_info_writing_agent.selector + " option[value='" + response['contact_lead_type') + "']").attr("selected", "selected");

                contact_info_lead_source.val(response['lead_source'] || 'boberdoo');
                $(contact_info_lead_source.selector + " option[value='boberdoo']").attr("selected", "selected");
                // $(contact_info_lead_source.selector + " option[value='" + response['lead_source') + "']").attr("selected", "selected");

                contact_info_partner.val(response['partner'] || '');
                contact_info_last_modified_by.val(response['last_modified_by'] || '');

                contact_info_health_insurance_checkbox.val(response['health_insurance_status'] || 'true');
                // $(contact_info_health_insurance_checkbox.selector + " option[value='true']").attr("selected", "selected");
                $(contact_info_health_insurance_checkbox.selector + " option[value='" + response['health_insurance_status'] + "']").attr("selected", "selected");

                contact_info_home_insurance_checkbox.val(response['home_insurance_status'] || '');
                $(contact_info_home_insurance_checkbox.selector + " option[value='" + response['home_insurance_status'] + "']").attr("selected", "selected");

                contact_info_auto_insurance_checkbox.val(response['auto_insurance_status'] || '');
                $(contact_info_auto_insurance_checkbox.selector + " option[value='" + response['auto_insurance_status'] + "']").attr("selected", "selected");

                contact_info_life_insurance_checkbox.val(response['life_insurance_status'] || '');
                $(contact_info_life_insurance_checkbox.selector + " option[value='" + response['life_insurance_status'] + "']").attr("selected", "selected");

                contact_info_ancilliary_insurance_checkbox.val(response['ancilliary_insurance_status'] || '');
                $(contact_info_ancilliary_insurance_checkbox.selector + " option[value='" + response['ancilliary_insurance_status'] + "']").attr("selected", "selected");

                contact_info_other_policy_sold.val(response['other_policy_sold'] || '');
                $(contact_info_other_policy_sold.selector + " option[value='" + response['other_policy_sold'] + "']").attr("selected", "selected");

                contact_info_federal_do_not_call.val(response['federal_do_not_call'] || '');
                $(contact_info_federal_do_not_call.selector + " option[value='" + response['federal_do_not_call'] + "']").attr("selected", "selected");

                contact_info_renew_as_is_email_received.val(response['renew_as_email_received'] || '');
                $(contact_info_renew_as_is_email_received.selector + " option[value='" + response['renew_as_email_received'] + "']").attr("selected", "selected");


                // SPOUSE INFO
                spouse_first_name.val(response['spouse_first_name'] || '');
                spouse_last_name.val(response['spouse_last_name'] || '');

                spouse_gender.val(response['spouse_1_gender'] || '');
                $(spouse_gender.selector + " option[value='" + response['spouse_1_gender'] + "']").attr("selected", "selected");

                spouse_dob.val(response['spouse_dob'] || '');

                spouse_do_you_have_a_social_security_number.val(response['spouse_do_you_have_a_social_security_number'] || 'none');
                $(spouse_do_you_have_a_social_security_number.selector + " option[value='none']").attr("selected", "selected");
                // $(spouse_do_you_have_a_social_security_number.selector + " option[value='" + response['spouse_do_you_have_a_social_security_number') + "']").attr("selected", "selected");

                spouse_social.val(response['spouse_social'] || '');
                spouse_income_source.val(response['spouse_income_source'] || '');
                spouse_yearly_income.val(response['spouse_yearly_income'] || '');
                spouse_employers_name.val(response['spouse_employers_name'] || '');
                spouse_employers_phone_number.val(response['spouse_employers_phone_number'] || '');


                // CHILD INFO
                contact_info_child_1_name.val(response['child_1_name'] || '');
                contact_info_child_1_dob.val(response['child_1_dob'] || '');
                contact_info_child_1_gender.val(response['child_1_gender'] || '');
                contact_info_child_1_social.val(response['child_1_social'] || '');
                contact_info_child_2_name.val(response['child_2_dob'] || '');
                contact_info_child_2_dob.val(response['child_2_dob'] || '');
                contact_info_child_2_gender.val(response['child_2_gender'] || '');
                contact_info_child_2_social.val(response['child_2_social'] || '');
                contact_info_child_3_name.val(response['child_3_name'] || '');
                contact_info_child_3_dob.val(response['child_3_dob'] || '');
                contact_info_child_3_gender.val(response['child_3_gender'] || '');
                contact_info_child_3_social.val(response['child_3_social'] || '');
                contact_info_child_4_name.val(response['child_4_name'] || '');
                contact_info_child_4_dob.val(response['child_4_dob'] || '');
                contact_info_child_4_gender.val(response['child_4_gender'] || '');
                contact_info_child_4_social.val(response['child_4_social'] || '');


                // HEALTH INFO
                health_auto_priority_code.val(response['health_auto_priority_code'] || '');
                health_priority_code.val(response['health_priority_code'] || '');
                health_lead_source.val(response['health_lead_source'] || '');
                health_partner.val(response['health_partner'] || '');
                health_lead_status.val(response['health_lead_status'] || '');
                health_writing_agent.val(response['health_writing_agent'] || '');
                health_scrubber.val(response['health_scrubber'] || '');
                health_total_individual_income.val(response['ttl_idv_inc'] || '');
                health_total_household_income.val(response['ttl_hse_inc'] || '');
                health_primary_applicants_income_source.val(response['health_primary_applicants_income_source'] || '');
                health_primary_applicants_employers_name.val(response['health_primary_applicants_employers_name'] || '');
                health_applicant_employers_phone_number.val(response['health_applicant_employers_phone_number'] || '');
                health_marital_status.val(response['health_marital_status'] || '');
                health_number_of_dependent_children_in_house.val(response['health_number_of_dependent_children_in_house'] || '');
                health_renewal_source_2016.val(response['health_renewal_source_2016'] || '');
                health_renewal_agent_2016.val(response['health_renewal_agent_2016'] || '');
                health_presold_processor_2016.val(response['health_presold_processor_2016'] || '');
                health_application_number_2016_info.val(response['health_application_number_2016_info'] || '');
                health_effective_date_2016.val(response['health_effective_date_2016'] || '');
                health_presold_processor_2016.val(response['health_presold_processor_2016'] || '');
                health_total_income_used_on_application.val(response['health_total_income_used_on_application'] || '');
                health_final_gross_premium_2016.val(response['health_final_gross_premium_2016'] || '');
                health_final_subsidy_2016.val(response['health_final_subsidy_2016'] || '');
                heatlh_plan_2016.val(response['health_plan_2016'] || '');
                health_final_premium_after_subsidy_2016.val(response['health_final_premium_after_subsidy_2016'] || '');
                health_verification_documents_needed_2016.val(response['health_verification_documents_needed_2016'] || '');
                health_verification_documents_due_date_2016.val(response['health_verification_documents_due_date_2016'] || '');
                health_application_number_2016_selection.val(response['health_application_number_2016_selection'] || '');
                health_adults_applying_for_coverage_2016.val(response['health_adults_applying_for_coverage_2016'] || '');
                health_total_household_size_2016.val(response['health_total_household_size_2016'] || '');
                health_cloud_gross_premium_2016.val(response['cloud_gross_premium_2016'] || '');
                health_children_applying_for_coverage_2016.val(response['health_children_applying_for_coverage_2016'] || '');
                health_cloud_subsidy_2016.val(response['health_cloud_subsidy_2016'] || '');
                health_cloud_premium_after_subsidy_2016.val(response['health_cloud_premium_after_subsidy_2016'] || '');
                health_lead_has_a_marketplace_account.val(response['health_lead_has_marketplace_account'] || '');
                health_current_coverage.val(response['health_number_of_dependent_children_in_house'] || '');
                health_marketplace_app_id_2015.val(response['health_marketplace_app_id_2015'] || '');
                health_current_premium.val(response['health_current_premium'] || '');
                health_subsidy_amount.val(response['health_subsidy_amount'] || '');
                health_current_net_premium.val(response['health_current_net_premium'] || '');
                health_effective_date_2015.val(response['health_effective_date_2015'] || '');
                health_application_id_2015.val(response['health_application_id_2015'] || '');
                health_premium_2015.val(response['health_premium_2015'] || '');
                health_carrier_2015.val(response['health_carrier_2015'] || '');
                health_subsidy_2015.val(response['health_subsidy_2015'] || '');
                health_adult_on_plan_2015.val(response['health_adult_on_plan_2015'] || '');
                health_children_on_plan_2015.val(response['health_children_on_plan_2015'] || '');
                health_income_verification_needed_2015.val(response['health_income_verification_needed_2015'] || '');
                health_citizenship_documents_needed_2015.val(response['health_citizenship_documents_needed_2015'] || '');
                health_policy.val(response['health_policy'] || '');
                health_contact_code_2015.val(response['health_contact_code_2015'] || '');
                health_wants_to_renew_same_plan_for_2016.val(response['health_wants_to_renew_same_plan_for_2016'] || '');
                health_quoted_renewal_gross_premium_2016.val(response['health_quoted_renewal_gross_premium_2016'] || '');
                health_quoted_renewal_subsidy_2016.val(response['health_quoted_renewal_subsidy_2016'] || '');
                health_quoted_renewal_net_premium_2016.val(response['health_quoted_renewal_net_premium_2016'] || '');
                health_username.val(response['health_username'] || '');
                health_password.val(response['health_password'] || '');


                // HOME INFO
                home_priority_code.val(response['home_priority_code'] || '');
                home_auto_priority_code.val(response['home_auto_priority_code'] || '');
                home_lead_source.val(response['home_lead_source'] || '');
                home_partner.val(response['home_partner'] || '');
                home_insurance_policy_number.val(response['home_insurance_policy_number'] || '');
                home_writing_agent.val(response['home_writing_agent'] || '');
                home_scrubber.val(response['home_scrubber'] || '');
                home_lead_status.val(response['home_lead_status'] || '');
                home_new_purchase.val(response['home_new_purchase'] || '');
                home_exp_date_closing_date.val(response['home_exp_date_closing_date'] || '');
                home_occupancy_status.val(response['home_occupancy_status'] || '');
                home_type_of_dwelling.val(response['home_type_of_dwelling'] || '');
                home_current_home_carrier.val(response['home_current_home_carrier'] || '');
                home_current_home_premium.val(response['home_current_home_premium'] || '');
                home_current_dwelling_coverage.val(response['home_current_dwelling_coverage'] || '');
                home_year_built.val(response['home_year_built'] || '');
                home_square_ft_under_air.val(response['home_square_ft_under_air'] || '');
                home_garage.val(response['home_garage'] || '');
                home_construction_type.val(response['home_construction_type'] || '');
                home_stories.val(response['home_stories'] || '');
                home_number_of_stories_in_the_building.val(response['home_number_of_stories_in_the_building'] || '');
                home_what_floor_number_is_condo_on.val(response['home_what_floor_number_is_condo_on'] || '');
                home_quote_update_request.val(response['home_quote_update_request'] || '');
                home_policy_effective_date.val(response['home_policy_effective_date'] || '');
                home_four_point_if_applicable.val(response['home_four_point_if_applicable'] || '');
                home_quoted_home_company.val(response['home_quoted_home_company'] || '');
                home_wind_mit.val(response['home_wind_mit'] || '');
                home_age_roof.val(response['home_age_roof'] || '');
                home_roof_material.val(response['home_roof_material'] || '');
                home_bathrooms.val(response['home_bathrooms'] || '');
                home_dog.val(response['home_dog'] || '');
                home_pool.val(response['home_pool'] || '');
                home_fence_or_screen_enclosure.val(response['home_fence_or_screen_enclosure'] || '');
                home_bankrupcy_or_Foreclosure_in_the_past_five_years.val(response['home_bankrupcy_or_Foreclosure_in_the_past_five_years'] || '');
                home_centrally_monitored_alarm.val(response['home_centrally_monitored_alarm'] || '');
                home_gated_community.val(response['home_gated_community'] || '');
                home_how_many_claims_in_the_last_five_Years.val(response['home_how_many_claims_in_the_last_five_Years'] || '');
                home_realtor_mortgage_broker.val(response['home_realtor_mortgage_broker'] || '');
                home_amount_of_personal_property.val(response['home_amount_of_personal_property'] || '');
                home_quoted_home_premium.val(response['home_quoted_home_premium'] || '');
                home_quoted_home_number.val(response['home_quoted_home_number'] || '');
                home_payment_option.val(response['home_payment_option'] || '');
                home_mortgage_clause_new.val(response['home_mortgage_clause_new'] || '');
                home_loan_number.val(response['home_loan_number'] || '');
                home_insurance_carrier.val(response['home_insurance_carrier'] || '');
                home_insurance_premium.val(response['home_insurance_premium'] || '');


                // AUTO INFO
                auto_auto_priority_code.val(response['auto_auto_priority_code'] || '');
                auto_priority_code.val(response['auto_priority_code'] || '');
                auto_lead_source.val(response['auto_lead_source'] || '');
                auto_partner.val(response['auto_partner'] || '');
                auto_insurance_policy_number.val(response['auto_insurance_policy_number'] || '');
                auto_lead_status.val(response['auto_lead_status'] || '');
                auto_writing_agent.val(response['auto_writing_agent'] || '');
                auto_scrubber.val(response['auto_scrubber'] || '');
                auto_current_auto_carrier.val(response['auto_current_auto_carrier'] || '');
                auto_expiration_date.val(response['auto_expiration_date'] || '');
                auto_current_auto_premium.val(response['auto_current_auto_premium'] || '');
                auto_current_residence_type.val(response['auto_current_residence_type'] || '');
                auto_driver_one_license_number.val(response['auto_driver_one_license_number'] || '');
                auto_vehicle_one_vin.val(response['auto_vehicle_one_vin'] || '');
                auto_vehicle_one_year.val(response['auto_vehicle_one_year'] || '');
                auto_vehicle_one_make.val(response['auto_vehicle_one_make'] || '');
                auto_vehicle_one_model.val(response['auto_vehicle_one_model'] || '');
                auto_driver_two_license_number.val(response['auto_driver_two_license_number'] || '');
                auto_vehicle_two_vin.val(response['auto_vehicle_two_vin'] || '');
                auto_vehicle_two_year.val(response['auto_vehicle_two_year'] || '');
                auto_vehicle_two_make.val(response['auto_vehicle_two_make'] || '');
                auto_vehicle_two_model.val(response['auto_vehicle_two_model'] || '');
                auto_bodily_injury_liability.val(response['auto_bodily_injury_liability'] || '');
                auto_property_damage.val(response['auto_property_damage'] || '');
                auto_uninsured_motorist_liability.val(response['auto_uninsured_motorist_liability'] || '');
                auto_medical_payments.val(response['auto_medical_payments'] || '');
                auto_vehicle_one_comp_ded.val(response['auto_vehicle_one_comp_ded'] || '');
                auto_vehicle_1_collision_ded.val(response['auto_vehicle_1_collision_ded'] || '');
                auto_1_towing.val(response['auto_1_towing'] || '');
                auto_1_rental_car.val(response['auto_1_rental_car'] || '');
                auto_vehicle_2_comp_ded.val(response['auto_vehicle_2_comp_ded'] || '');
                auto_vehicle_2_collision_ded.val(response['auto_vehicle_2_collision_ded'] || '');
                auto_2_towing.val(response['auto_2_towing'] || '');
                auto_2_rental_car.val(response['auto_2_rental_car'] || '');
                auto_quote_update_request.val(response['auto_quote_update_request'] || '');
                auto_policy_effective_date.val(response['auto_policy_effective_date'] || '');
                auto_payment_option.val(response['auto_payment_option'] || '');
                auto_payment_info.val(response['auto_payment_info'] || '');
                auto_quoted_auto_company.val(response['auto_quoted_auto_company'] || '');
                auto_quoted_auto_premium.val(response['auto_quoted_auto_premium'] || '');
                auto_quoted_auto_number.val(response['auto_quoted_auto_number'] || '');
                auto_insurance_carrier.val(response['auto_insurance_carrier'] || '');
                auto_insurance_premium.val(response['auto_insurance_premium'] || '');
                auto_insurance_premium.val(response['auto_insurance_premium'] || '');
                auto_document_needed.val(response['auto_document_needed'] || '');


                // LIFE INFO
                life_auto_priority_code.val(response['life_auto_priority_code'] || '');
                life_priority_code.val(response['life_priority_code'] || '');
                life_lead_source.val(response['life_lead_source'] || '');
                life_partner.val(response['life_partner'] || '');
                life_insurance_policy_number.val(response['life_insurance_policy_number'] || '');
                life_lead_status.val(response['life_lead_status'] || '');
                life_writing_agent.val(response['life_writing_agent'] || '');
                life_scrubber.val(response['life_scrubber'] || '');
                life_age.val(response['life_age'] || '');
                life_height.val(response['life_height'] || '');
                life_weight.val(response['life_weight'] || '');
                life_insurance_type.val(response['life_insurance_type'] || '');
                life_term_life_policy_lenght.val(response['life_term_life_policy_lenght'] || '');
                life_desired_amount_of_coverage.val(response['life_desired_amount_of_coverage'] || '');
                life_smoke.val(response['life_smoke'] || '');
                life_major_health_issues_in_relatives.val(response['life_major_health_issues_in_relatives'] || '');
                life_convicted_of_drunk_driving.val(response['life_convicted_of_drunk_driving'] || '');
                life_quote_status.val(response['life_quote_status'] || '');
                life_date_paramed_exam_ordered.val(response['life_date_paramed_exam_ordered'] || '');
                life_monthly_premium.val(response['life_monthly_premium'] || '');
                life_paramed_company.val(response['life_paramed_company'] || '');
                life_application_id_number.val(response['life_application_id_number'] || '');
                life_application_status.val(response['life_application_status'] || '');
                life_application_changes.val(response['life_application_changes'] || '');
                life_after_changes_new_premium.val(response['life_after_changes_new_premium'] || '');
                life_application_declined_reason.val(response['life_application_declined_reason'] || '');

                // ANCILLIARY INFO
                ancilliary_auto_priority_code.val(response['ancilliary_auto_priority_code'] || '');
                ancilliary_priority_code.val(response['ancilliary_priority_code'] || '');
                ancilliary_lead_source.val(response['ancilliary_lead_source'] || '');
                ancilliary_partner.val(response['ancilliary_partner'] || '');
                ancilliary_insurance_policy_number.val(response['ancilliary_insurance_policy_number'] || '');
                ancilliary_writing_agent.val(response['ancilliary_writing_agent'] || '');
                ancilliary_scrubber.val(response['ancilliary_scrubber'] || '');
                ancilliary_lead_status.val(response['ancilliary_lead_status'] || '');
                ancilliary_accident.val(response['ancilliary_accident'] || '');
                ancilliary_critical_illness.val(response['ancilliary_critical_illness'] || '');
                ancilliary_hospital_confinement.val(response['ancilliary_hospital_confinement'] || '');
                ancilliary_dental_care.val(response['ancilliary_dental_care'] || '');
                ancilliary_dental_lead_status.val(response['ancilliary_dental_lead_status'] || '');
                ancilliary_ancillary_total.val(response['ancilliary_ancillary_total'] || '');
                ancilliary_abnormal_cancer_screening_test.val(response['ancilliary_abnormal_cancer_screening_test'] || '');
                ancilliary_cysts_growths_etc_not_seen_for.val(response['ancilliary_cysts_growths_etc_not_seen_for'] || '');
                ancilliary_carotid_artery_stenosis_etc.val(response['ancilliary_carotid_artery_stenosis_etc'] || '');
                ancilliary_hiv_positive_aids_related_complex_aids.val(response['ancilliary_hiv_positive_aids_related_complex_aids'] || '');
                ancilliary_multiple_sclerosis_memory_loss_etc.val(response['ancilliary_multiple_sclerosis_memory_loss_etc'] || '');
                ancilliary_abnormal_tests_requiring_follow_up.val(response['ancilliary_abnormal_tests_requiring_follow_up'] || '');
                ancilliary_any_non_routine_consultation_scheduled.val(response['ancilliary_any_non_routine_consultation_scheduled'] || '');
                ancilliary_one_or_more_imm_relatives_with_issues.val(response['ancilliary_one_or_more_imm_relatives_with_issues'] || '');
                ancilliary_two_or_more_imm_relatives_with_issues.val(response['ancilliary_two_or_more_imm_relatives_with_issues'] || '');
                ancilliary_bening_tumor_hypertension_etc.val(response['ancilliary_bening_tumor_hypertension_etc'] || '');
                ancilliary_prescription_medication_in_last_three_years.val(response['ancilliary_prescription_medication_in_last_three_years'] || '');
                ancilliary_disorder_disease_heart_kidney_lungs.val(response['ancilliary_disorder_disease_heart_kidney_lungs'] || '');
                ancilliary_disease_quad_lou_gehrigs_other_motor.val(response['ancilliary_disease_quad_lou_gehrigs_other_motor'] || '');
                ancilliary_alcohol_or_substance_abuse_five_years.val(response['ancilliary_alcohol_or_substance_abuse_five_years'] || '');
                ancilliary_heart_attack_stroke_transient_ischemic.val(response['ancilliary_heart_attack_stroke_transient_ischemic'] || '');
                ancilliary_diabetes_type_one_or_two_blood_press_am.val(response['ancilliary_diabetes_type_one_or_two_blood_press_am'] || '');
                ancilliary_nursing_home_hospitalized_etc.val(response['ancilliary_nursing_home_hospitalized_etc'] || '');
                ancilliary_hospitalized_in_the_last_twelve_months.val(response['ancilliary_hospitalized_in_the_last_twelve_months'] || '');
                ancilliary_diagnosed_or_treated_for_medical_issues.val(response['ancilliary_diagnosed_or_treated_for_medical_issues'] || '');
                ancilliary_pregnant.val(response['ancilliary_pregnant'] || '');
                ancilliary_ever_had_a_problem_pregnancy.val(response['ancilliary_ever_had_a_problem_pregnancy'] || '');
                ancilliary_hypertension.val(response['ancilliary_hypertension'] || '');
                ancilliary_accident_elite_request_eff_date.val(response['ancilliary_accident_elite_request_eff_date'] || '');
                ancilliary_accident_elite_premium.val(response['ancilliary_accident_elite_premium'] || '');
                ancilliary_accident_elite_notes.val(response['ancilliary_accident_elite_notes'] || '');
                ancilliary_critical_care_request_eff_date.val(response['ancilliary_critical_care_request_eff_date'] || '');
                ancilliary_critial_care_premium.val(response['ancilliary_critial_care_premium'] || '');
                ancilliary_critical_care_notes.val(response['ancilliary_critical_care_notes'] || '');
                ancilliary_request_eff_date.val(response['ancilliary_request_eff_date'] || '');
                ancilliary_hospital_confinement_premium.val(response['ancilliary_hospital_confinement_premium'] || '');
                ancilliary_hospital_confinement_notes.val(response['ancilliary_hospital_confinement_notes'] || '');
                ancilliary_dental_request_eff_date.val(response['ancilliary_dental_request_eff_date'] || '');
                ancilliary_dental_care_premium.val(response['ancilliary_dental_care_premium'] || '');
                ancilliary_dental_care_notes.val(response['ancilliary_dental_care_notes'] || '');

                changeMaritalStatus_fx();
                healthInsuranceTab_fx();
        };

        var response =  JSON.parse(sessionStorage.getItem("active_contact"));
        renderThisShit(response);

        console.log('secuentially to this place');


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

    testWithAlex: function(event){
        var struct = {
                title: 'Incoming Lead!',
                text: '',
                'type': '',
                sticky :true
            },
            list_of_states,
            options;
        // punk ass you fucker!
        fun.utils.sendMessage(struct);
        

        // this stuff is bananas
        options = {unique:true};
        options['contact_info_marital_status'] = true;
        options['contact_info_gender'] = true;
        // lis of unique stuff
        list_of_states = new fun.models.ContactsContainer();
        list_of_states.fetch({
            data: $.param(options),
            success: function(response){
                var lolazo = response.attributes.results.models;
                _.each(lolazo, function(value){
                    console.log(value);
                });
            },
            error: function(response){
                console.log('prueba con alex y tony');
                console.log(response);
            },
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