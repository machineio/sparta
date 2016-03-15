fun.views.campaigns = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        'change input[type=file]': 'encodeFile',
        'click #create-campaign-btn': 'createCampaign',
        'click #create-inbound-btn': 'createInbound',
        'click #close-inbound-btn': 'closeInbound',
        'click #close-outbound-btn': 'closeOutbound',
        'click #upload-answer-btn': 'uploadAnswer',
        'click #upload-transfer-button': 'uploadTransfer',
        'click #upload-machine-button': 'uploadAnsweringMachine',
        'click #upload-do-not-call-button': 'uploadDoNotCall',
        'click #next-outbound-btn': 'showNext',
        'click #backButtonCombo': 'showBack',
        'click .campaign-popup': 'campaignDetails', // inbound
        'change input[name="campaign_type"]': 'changeCampaignType',
        'click #close-inbound-campaign-btn': 'closeInboundDetails',
        'click #update-inbound-campaign-btn': 'updateInboundDetails'
    },

    /*
    * Class constructor
    */
    initialize: function(options){
        fun.containers.campaigns = this.$el;
    },

    /*
    * Render view
    */
    render: function(){
        'use strict';
        var account,
            template;

        console.log('render campaigns view');
        account = localStorage.getItem("username");

        $('#outboundCampaignModal').on('hidden.bs.modal', function () {
            // Answer UPLOAD CLEAN
            $('#uploadAnswerFile').attr("disabled", false);
            $('#answer_description').attr("disabled", false);
            $('#answer_digit').attr("disabled", false);
            $('#answer_number').attr("disabled", false);
            $('#upload-answer-btn').attr("disabled", false);
            $('#upload-answer-btn').removeClass('btn-default');
            $('#upload-answer-btn').addClass('btn-success');
            $('#uploadAnswerFile').val('');
            $('#answer_description').val('');
            $('#answer_digit').val('');
            $('#answer_number').val('');
            $('#upload-answer-btn').val('');

            // Transfer UPLOAD CLEAN
            $('#uploadTransferFile').attr("disabled", false);
            $('#transfer_description').attr("disabled", false);
            $('#upload-transfer-button').attr("disabled", false);
            $('#upload-transfer-button').removeClass('btn-default');
            $('#upload-transfer-button').addClass('btn-success');
            $('#uploadTransferFile').val('');
            $('#transfer_description').val('');
            $('#upload-transfer-button').val('');

            // Answer Machine UPLOAD CLEAN
            $('#uploadAnsweringMachineFile').attr("disabled", false);
            $('#machine_description').attr("disabled", false);
            $('#upload-machine-button').attr("disabled", false);
            $('#upload-machine-button').removeClass('btn-default');
            $('#upload-machine-button').addClass('btn-success');
            $('#uploadAnsweringMachineFile').val('');
            $('#machine_description').val('');
            $('#upload-machine-button').val('');

            // Do Not Call UPLOAD CLEAN
            $('#uploadDoNotCallFile').attr("disabled", true);
            $('#do_not_call_description').attr("disabled", true);
            $('#do_not_call_digit').attr("disabled", true);
            $('#upload-do-not-call-button').attr("disabled", true);
            $('#upload-do-not-call-button').removeClass('btn-default');
            $('#upload-do-not-call-button').addClass('btn-success');
            $('#uploadDoNotCallFile').val('');
            $('#do_not_call_description').val('');
            $('#do_not_call_digit').val('');
            $('#upload-do-not-call-button').val('');
        });

        if (!this.$el.html()){
            template = _.template(fun.utils.getTemplate(fun.conf.templates.campaigns)
            )({'account':account});
            this.$el.html(template);
            // DOM cache stuff on form fields
            this.campaignName = this.$('#campaign_name');
            this.campaignDescription = this.$('#campaign_description');
            this.account = account;
            // sounds fields
            this.answerDescription = this.$('#answer_description');
            this.campaignDescription = this.$('#campaign_description');
            this.transferNumber = this.$('#transfer_number');
            this.transferDigit = this.$('#transfer_digit');
            this.maxTransfers = this.$('#max_transfers');
            this.machineDescription = this.$('#machine_description');
            this.doNotCallDescription = this.$('#do_not_call_description');
            this.doNotCallDigit = this.$('#do_not_call_digit');
        }


        this.$el.removeClass("hide").addClass("show");
    },


    updateCampaigns: function(){
        'use strict';
        var resource, resources, vonCount = 0, onSuccess;

        resources = {
            inbound: new fun.models.CampaignsInbound(),
            outbound: new fun.models.CampaignsOutbound()
        };

        onSuccess = function(){
            if(++vonCount === _.keys(resources).length){
                fun.instances.campaigns.renderInboundCampaignsList(
                   resources.inbound
                );
                fun.instances.campaigns.renderOutboundCampaignsList(
                   resources.outbound
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
    * Render campaigns list
    */
    renderCampaignsList: function(campaigns){
        'use strict';
        var template,
            allCampaigns;
        if (campaigns) {
            this.campaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.allCampaigns)
        );

        allCampaigns = this.$('#all-campaigns-tab');

        allCampaigns.html(template);

        this.tbody = this.$('#campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");

        this.renderCampaignRows();
    },

    /*
    * Render campaign rows
    */
    renderCampaignRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // campaigns length
        length = this.campaigns.length;

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.campaigns.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noCampaigns();
        }
    },

    /*
    * No campaigns
    */
    noCampaigns: function(){
        'use strict';
        var template,
            noCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noCampaigns = this.$('#no-campaigns');

        noCampaigns.html(template);
    },

    /*
    * Render Active Campaigns list
    */
    renderActiveCampaignsList: function(campaigns){
        'use strict';
        var template,
            activeCampaigns;
        if (campaigns) {
            this.activeCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsActiveTab)
        );

        activeCampaigns = this.$('#active-campaigns-tab');

        activeCampaigns.html(template);

        this.tbody = this.$('#active-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderActiveCampaignRows();
    },

    /*
    * Render Active campaign rows
    */
    renderActiveCampaignRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // campaigns length
        length = this.activeCampaigns.length;

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.activeCampaigns.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noActiveCampaigns();
        }
    },

    /*
    * No Active campaigns
    */
    noActiveCampaigns: function(){
        'use strict';
        var template,
            noActiveCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noActiveCampaigns = this.$('#no-active-campaigns');

        noActiveCampaigns.html(template);
    },

    /*
    * Render Paused Campaigns list
    */
    renderPausedCampaignsList: function(campaigns){
        'use strict';
        var template,
            pausedCampaigns;

        if (campaigns) {
            this.pausedCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsPausedTab)
        );

        pausedCampaigns = this.$('#paused-campaigns-tab');

        pausedCampaigns.html(template);

        this.tbody = this.$('#paused-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderPausedCampaignRows();
    },

    /*
    * Render Paused campaign rows
    */
    renderPausedCampaignRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // campaigns length
        length = this.pausedCampaigns.length;

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.pausedCampaigns.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noPausedCampaigns();
        }
    },

    /*
    * No Paused campaigns
    */
    noPausedCampaigns: function(){
        'use strict';
        var template,
            noPausedCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noPausedCampaigns = this.$('#no-paused-campaigns');

        noPausedCampaigns.html(template);
    },

    /*
    * Render Inbound Campaigns list
    */
    renderInboundCampaignsList: function(campaigns){
        'use strict';
        var template,
            inboundCampaigns;

        if (campaigns) {
            this.inboundCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsInboundTab)
        );

        inboundCampaigns = this.$('#inbound-campaigns-tab');

        inboundCampaigns.html(template);

        this.tbody = this.$('#inbound-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderInboundCampaignRows();
    },

    /*
    * Render Inbound campaign rows
    */
    renderInboundCampaignRows: function(){
        'use strict';
        var length,
            rows,
            template;

        // campaigns length
        length = this.inboundCampaigns.length;

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.inboundCampaigns.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noInboundCampaigns();
        }
    },

    /*
    * No Inbound campaigns
    */
    noInboundCampaigns: function(){
        'use strict';
        var template,
            noInboundCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noInboundCampaigns = this.$('#no-inbound-campaigns');

        noInboundCampaigns.html(template);
    },

    /*
    * Render Outbound Campaigns list
    */
    renderOutboundCampaignsList: function(campaigns){
        'use strict';
        var template,
            outboundCampaigns;

        if (campaigns) {
            this.outboundCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsOutboundTab)
        );

        outboundCampaigns = this.$('#outbound-campaigns-tab');

        outboundCampaigns.html(template);

        this.tbody = this.$('#outbound-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderOutboundCampaignRows();
    },

    /*
    * Render Outbound campaign rows
    */
    renderOutboundCampaignRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // campaigns length
        length = this.outboundCampaigns.length;

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.outboundCampaigns.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noOutboundCampaigns();
        }
    },

    /*
    * No Outbound campaigns
    */
    noOutboundCampaigns: function(){
        'use strict';
        var template,
            noOutboundCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noOutboundCampaigns = this.$('#no-outbound-campaigns');

        noOutboundCampaigns.html(template);
    },

    /*
    * Create campaign
    */
    createCampaign: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this,
            validationRules,
            validForm,
            rules,
            account,
            campaign,
            campaignName,
            campaignDescription,
            campaignScript = false,
            campaignType,
            campaignPayload;

        console.log('create campaign event');

        this.campaignName = this.$('#campaign_name');
        this.campaignDescription = this.$('#campaign_description');

        account = this.account;

        campaignName = this.campaignName.val();

        campaignDescription = this.campaignDescription.val();

        campaignType = $('input[name="campaign_type"]:checked').val();

        console.log('CAMPAIGN VALUE!!!!');
        console.log(campaignType);

        if ($('#campaign_script_true').is(':checked')) {
            campaignScript = true;
        } else {
            campaignScript = false;
        }

        campaignPayload = {
            account: account,
            name: campaignName,
            description: campaignDescription,
            has_script: campaignScript,
            campaign_type: campaignType
        };

        sessionStorage.setItem("nuCampaign", JSON.stringify(campaignPayload));

        // var heights = $(".panel-height").map(function() {
        //     return $(this).height();
        // }).get(),

        // maxHeight = Math.max.apply(null, heights);

        // $(".panel-height").height(maxHeight);

        rules = {
            rules: {
                campaign_name: {
                    minlength: 3,
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        $('#profile-form').validate(validationRules);

        validForm = $('#profile-form').valid();
        if(validForm){
            console.log('DESCRIPTION DATA!!!');
            console.log(campaignPayload.description);
            if(campaignPayload.description){
                $('#descriptionRow').removeClass('hide');
                $('#descriptionRow').addClass('show');
            } else {
                $('#descriptionRow').removeClass('hide');
                $('#descriptionRow').removeClass('show');
                $('#descriptionRow').addClass('hide');
            }
            if (campaignPayload['campaign_type'] === 'outbound'){
                if(campaignScript===true){
                    $('#scriptWrapperOutbound').removeClass('hide');
                    $('#scriptWrapperOutbound').addClass('show');
                }
                if(campaignScript===false){
                    $('#scriptWrapperOutbound').removeClass('show');
                    $('#scriptWrapperOutbound').addClass('hide');
                }
                $('#outbound-name').html(campaignName);
                $('#outbound-description').html(campaignDescription);
                $('#outboundCampaignModal').modal('show');

            }

            if (campaignPayload['campaign_type'] === 'inbound'){
                if(campaignScript===true){
                    $('#scriptWrapperInbound').removeClass('hide');
                    $('#scriptWrapperInbound').addClass('show');
                }
                if(campaignScript===false){
                    $('#scriptWrapperInbound').removeClass('show');
                    $('#scriptWrapperInbound').addClass('hide');
                }
                $('#inbound-name').html(campaignName);
                $('#inbound-description').html(campaignDescription);
                $('#inboundCampaignModal').modal('show');
            }
        }

        // // Clear the stuff from the inputs ;)
        // view.$('#campaign_name').val('');
        // view.$('#campaign_description').val('');
    },

    createInbound: function(event){
        'use strict';
        event.preventDefault();

        var view = this,
            rules,
            validationRules,
            validForm,
            form;

        form = $('#create-inbound-campaign-modal-form');

        rules = {
            rules: {
                inbound_timeout: {
                    number: true,
                    required: true
                },
                inbound_recording: {
                    required: true
                },
                inbound_retry: {
                    number: true,
                    required: true
                },
                inbound_wrapuptime: {
                    number: true,
                    required: true
                },
                inbound_maxlen: {
                    number: true,
                    required: true
                },
                inbound_servicelevel: {
                    number: true,
                    required: true
                },
                campaign_strategy: {
                    required: true
                },
                inbound_joinempty: {
                    required: true
                },
                inbound_ringinuse: {
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){
            var stuff = sessionStorage.getItem("nuCampaign");
            var campaignPayload = JSON.parse(stuff);
            var ringInUse = $('input[name="inbound_ringinuse"]:checked').val();
            var timeOut = $('#inbound-timeout').val();
            var maxLen = $('#inbound-maxlen').val();
            var serviceLevel = $('#inbound-servicelevel').val();
            var recordAudio = $('input[name="inbound_recording"]:checked').val();
            var retry = $('#inbound-retry').val();
            var wrapUpTime = $('#inbound-wrapuptime').val();
            var strategy = $('input[name="campaign_strategy"]:checked').val();
            var joinEmpty = $('input[name="inbound_joinempty"]:checked').val();

            campaignPayload['ring_in_use'] = ringInUse;
            campaignPayload['time_out'] = timeOut;
            campaignPayload['max_len'] = maxLen;
            campaignPayload['service_level'] = serviceLevel;
            campaignPayload['record_audio'] = recordAudio;
            campaignPayload['retry'] = retry;
            campaignPayload['wrap_up_time'] = wrapUpTime;
            campaignPayload['strategy'] = strategy;
            campaignPayload['join_empty'] = joinEmpty;

            var campaign = new fun.models.InboundCampaign(campaignPayload);
            campaign.save();

            view.listenTo(campaign, 'change', view.updateCampaigns);

            // there is a better way to do this.
            $('#inboundCampaignModal').modal('hide');
        }
    },

    createOutbound: function(event){
        'use strict';
        event.preventDefault();

        var rules,
            validationRules,
            validForm,
            form;

        form = $('#create-outbound-campaign-modal-form');

        rules = {
            rules: {
                inbound_timeout: {
                    number: true,
                    required: true
                },
                inbound_recording: {
                    required: true
                },
                inbound_retry: {
                    number: true,
                    required: true
                },
                inbound_wrapuptime: {
                    number: true,
                    required: true
                },
                inbound_maxlen: {
                    number: true,
                    required: true
                },
                inbound_servicelevel: {
                    number: true,
                    required: true
                },
                campaign_strategy: {
                    required: true
                },
                inbound_joinempty: {
                    required: true
                },
                inbound_ringinuse: {
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){

        }
    },

    closeInbound: function(event){
        'use strict';
        event.preventDefault();
        $('#inboundCampaignModal').modal('hide');
    },

    closeOutbound: function(event){
        'use strict';
        event.preventDefault();
        $('#outboundCampaignModal').modal('hide');
        // Answer UPLOAD CLEAN
        $('#uploadAnswerFile').attr("disabled", false);
        $('#answer_description').attr("disabled", false);
        $('#answer_digit').attr("disabled", false);
        $('#answer_number').attr("disabled", false);
        $('#upload-answer-btn').attr("disabled", false);
        $('#upload-answer-btn').removeClass('btn-default');
        $('#upload-answer-btn').addClass('btn-success');
        $('#uploadAnswerFile').val('');
        $('#answer_description').val('');
        $('#answer_digit').val('');
        $('#answer_number').val('');
        $('#upload-answer-btn').val('');

        // Transfer UPLOAD CLEAN
        $('#uploadTransferFile').attr("disabled", false);
        $('#transfer_description').attr("disabled", false);
        $('#upload-transfer-button').attr("disabled", false);
        $('#upload-transfer-button').removeClass('btn-default');
        $('#upload-transfer-button').addClass('btn-success');
        $('#uploadTransferFile').val('');
        $('#transfer_description').val('');
        $('#upload-transfer-button').val('');

        // Answer Machine UPLOAD CLEAN
        $('#uploadAnsweringMachineFile').attr("disabled", false);
        $('#machine_description').attr("disabled", false);
        $('#upload-machine-button').attr("disabled", false);
        $('#upload-machine-button').removeClass('btn-default');
        $('#upload-machine-button').addClass('btn-success');
        $('#uploadAnsweringMachineFile').val('');
        $('#machine_description').val('');
        $('#upload-machine-button').val('');

        // Do Not Call UPLOAD CLEAN
        $('#uploadDoNotCallFile').attr("disabled", false);
        $('#do_not_call_description').attr("disabled", false);
        $('#do_not_call_digit').attr("disabled", false);
        $('#upload-do-not-call-button').attr("disabled", false);
        $('#upload-do-not-call-button').removeClass('btn-success');
        $('#upload-do-not-call-button').addClass('btn-default');
        $('#uploadDoNotCallFile').val('');
        $('#do_not_call_description').val('');
        $('#do_not_call_digit').val('');
        $('#upload-do-not-call-button').val('');
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
    * Upload Answer
    */
    uploadAnswer: function(event){
        'use strict';
        event.preventDefault();

        var view = this,
            answerDescription,
            answerNumber,
            answerDigit,
            upload,
            rules,
            validationRules,
            validForm,
            form;

        upload = this.model;

        form = $('#answer-sound-form');

        rules = {
            rules: {
                uploadFile: {
                    required: true
                },
                answer_digit: {
                    required: true
                },
                answer_number: {
                    number: true,
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){
            answerDescription = this.answerDescription.val();
            // answerNumber = this.answerNumber.val();
            // answerDigit = this.answerDigit.val();
            answerNumber = $('#answer_digit').val();
            answerDigit = $('#answer_number').val();

            // set flag to backend that will handle the upload.
            upload.set({
                'account': fun.utils.format('accounts:%s', this.account),
                'answer_description': fun.utils.format('sounds:answer:description:%s', answerDescription),
                'answer_number': fun.utils.format('sounds:answer:number:%s', answerNumber),
                'answer_digit': fun.utils.format('sounds:answer:digit:%s', answerDigit),
            });

            upload.save();
            event.preventDefault();
            $('#uploadAnswerFile').attr("disabled", true);
            $('#answer_description').attr("disabled", true);
            $('#answer_digit').attr("disabled", true);
            $('#answer_number').attr("disabled", true);
            $('#upload-answer-btn').attr("disabled", true);
            $('#upload-answer-btn').removeClass('btn-success');
            $('#upload-answer-btn').addClass('btn-default');
            // clean and handle stuff on background
            // view.$('#answer_description').val('');
            // view.$('#uploadAnswerFile').val('');
        }
    },

    /*
    * Upload Transfer
    */
    uploadTransfer: function(event){
        'use strict';
        event.preventDefault();

        var view = this,
            transferDescription,
            upload,
            rules,
            validationRules,
            validForm,
            form;

        upload = this.model;

        form = $('#transfer-sound-form');

        rules = {
            rules: {
                uploadTransferFile: {
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){
            // transferDescription = this.campaignDescription.val();
            transferDescription = $('#transfer_description').val();

            // set flag to backend that will handle the upload.
            upload.set({
                'account': fun.utils.format('accounts:%s', this.account),
                'transfer_description': fun.utils.format('sounds:transfer:description:%s', transferDescription),
            });

            upload.save();
            event.preventDefault();
            $('#uploadTransferFile').attr("disabled", true);
            $('#transfer_description').attr("disabled", true);
            $('#upload-transfer-button').attr("disabled", true);
            $('#upload-transfer-button').removeClass('btn-success');
            $('#upload-transfer-button').addClass('btn-default');
            // clean and handle stuff on background
            // view.$('#campaign_description').val('');
            // view.$('#transfer_number').val('');
            // view.$('#max_transfers').val('');
            // view.$('#transfer_digit').val('1');
            // view.$('#uploadTransferFile').val('');
        }
    },

    /*
    * Upload Answering Machine
    */
    uploadAnsweringMachine: function(event){
        'use strict';
        event.preventDefault();

        var view = this,
            machineDescription,
            upload,
            rules,
            validationRules,
            validForm,
            form;

        upload = this.model;

        form = $('#answer-machine-sound-form');

        rules = {
            rules: {
                uploadAnsweringMachineFile: {
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){
            machineDescription = this.machineDescription.val();

            // set flag to backend that will handle the upload.
            upload.set({
                'account': fun.utils.format('accounts:%s', this.account),
                'machine_description': fun.utils.format('sounds:machine:description:%s', machineDescription),
            });

            upload.save();
            event.preventDefault();
            $('#uploadAnsweringMachineFile').attr("disabled", true);
            $('#machine_description').attr("disabled", true);
            $('#upload-machine-button').attr("disabled", true);
            $('#upload-machine-button').removeClass('btn-success');
            $('#upload-machine-button').addClass('btn-default');
            // clean and handle stuff on background
            // view.$('#machine_description').val('');
            // view.$('#uploadAnsweringMachineFile').val('');
        }
    },

    /*
    * Upload Do Not Call
    */
    uploadDoNotCall: function(event){
        'use strict';
        event.preventDefault();

        var view = this,
            doNotCallDescription,
            doNotCallDigit,
            upload,
            rules,
            validationRules,
            validForm,
            form;

        upload = this.model;

        form = $('#do_not_call-sound-form');

        rules = {
            rules: {
                uploadDoNotCallFile: {
                    required: true
                },
                do_not_call_digit: {
                    required: true
                }
            }
        };

        validationRules = $.extend(rules, fun.utils.validationRules);

        form.validate(validationRules);

        validForm = form.valid();
        if(validForm){
            doNotCallDescription = this.doNotCallDescription.val();
            doNotCallDigit = this.doNotCallDigit.val();

            // set flag to backend that will handle the upload.
            upload.set({
                'account': fun.utils.format('accounts:%s', this.account),
                'do_not_call_description': fun.utils.format('sounds:dnd:description:%s', doNotCallDescription),
                'do_not_call_digit': fun.utils.format('sounds:dnd:digit:%s', doNotCallDigit),
            });

            upload.save();
            event.preventDefault();
            $('#uploadDoNotCallFile').attr("disabled", true);
            $('#do_not_call_description').attr("disabled", true);
            $('#do_not_call_digit').attr("disabled", true);
            $('#upload-do-not-call-button').attr("disabled", true);
            $('#upload-do-not-call-button').removeClass('btn-success');
            $('#upload-do-not-call-button').addClass('btn-default');
            // clean and handle stuff on background
            // view.$('#do_not_call_description').val('');
            // view.$('#do_not_call_digit').val('1');
            // view.$('#uploadDoNotCallFile').val('');
        }
    },

    showNext: function(event){
        'use strict';
        event.preventDefault();
        var firstDiv = $('#partOne');
        var secondDiv = $('#partTwo');
        var nextButtons = $('#nextButtonCombo');
        var backButtons = $('#backButtonCombo');
        secondDiv.addClass('show');
        secondDiv.removeClass('hide');
        firstDiv.addClass('hide');
        firstDiv.removeClass('show');
        nextButtons.removeClass('show');
        nextButtons.addClass('hide');
        backButtons.removeClass('hide');
        backButtons.addClass('show');
    },

    showBack: function(event){
        'use strict';
        event.preventDefault();
        var firstDiv = $('#partOne');
        var secondDiv = $('#partTwo');
        var nextButtons = $('#nextButtonCombo');
        var backButtons = $('#backButtonCombo');
        secondDiv.addClass('hide');
        secondDiv.removeClass('show');
        firstDiv.addClass('show');
        firstDiv.removeClass('hide');
        nextButtons.removeClass('hide');
        nextButtons.addClass('show');
        backButtons.removeClass('show');
        backButtons.addClass('hide');
    },

    changeCampaignType: function(){
        if($('#campaign_type_inbound').is(':checked')){
            $('#campaignIconOutbound').removeClass('show');
            $('#campaignIconOutbound').addClass('hide');
            $('#campaignIconInbound').removeClass('hide');
            $('#campaignIconInbound').addClass('show');
        } else {
            $('#campaignIconInbound').removeClass('show');
            $('#campaignIconInbound').addClass('hide');
            $('#campaignIconOutbound').removeClass('hide');
            $('#campaignIconOutbound').addClass('show');
        }
    },

    /*
    * Campaign details
    */
    campaignDetails: function(event){
        'use strict';
        event.preventDefault();
        //view cache
        var view = this,
            name,
            campaign,
            campaignUuid,
            campaignAcccount,
            campaignActive,
            campaignCallerid,
            campaignType,
            campaignName,
            campaignPaused,
            campaignRetry,
            campaignServiceLevel,
            campaignStatus,
            campaignStrategy,
            campaignTimeOut,
            campaignWrapUpTime,
            campaignMaxLen,
            campaignHasScript,
            campaignDescription;

        campaignUuid = this.$('#inbound-campaign-uuid');
        campaignAcccount = this.$('#inbound-campaign-account');
        campaignActive = this.$('#inbound-campaign-active');
        campaignCallerid= this.$('#inbound-campaign-callerid');
        campaignType = this.$('#inbound-campaign-type');
        campaignDescription = this.$('#inbound-campaign-description');
        campaignHasScript = this.$('#inbound-campaign-has-script');
        campaignMaxLen = this.$('#inbound-campaign-max-len');
        campaignName = this.$('#inbound-campaign-name');
        campaignPaused = this.$('#inbound-campaign-paused');
        campaignRetry = this.$('#inbound-campaign-retry');
        campaignServiceLevel = this.$('#inbound-campaign-service-level');
        campaignStatus = this.$('#inbound-campaign-status');
        campaignStrategy = this.$('#inbound-campaign-strategy');
        campaignTimeOut = this.$('#inbound-campaign-time-out');
        campaignWrapUpTime = this.$('#inbound-campaign-wrap-up-time');
        

        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        campaign = new fun.models.InboundCampaign({'uuid':name});

        campaign.fetch({
            success: function(response){
                campaignUuid.html(response.get('uuid'));
                campaignAcccount.html(response.get('account'));
                campaignActive.html(response.get('active'));
                campaignCallerid.val(response.get('callerid'));
                campaignType.html(response.get('campaign_type'));
                campaignDescription.html(response.get('description'));
                campaignHasScript.html(response.get('has_script'));
                campaignMaxLen.val(response.get('max_len'));
                campaignName.html(response.get('name'));
                campaignPaused.html(response.get('paused'));
                campaignRetry.val(response.get('retry'));
                campaignServiceLevel.val(response.get('service_level'));
                campaignStatus.html(response.get('status'));
                campaignStrategy.html(response.get('strategy'));
                campaignTimeOut.val(response.get('time_out'));
                campaignWrapUpTime.val(response.get('wrap_up_time'));

                $('#campaignModal').modal({
                    'show': true
                });
            },
            error: function(error){
                console.log(error);
            }
        });
        
    },

    /*
    * Update Inbound Details
    */
    updateInboundDetails: function(event){
        'use strict';
        //event.preventDefault();
        var view = this,
            update,
            updateCampaignData,
            campaignUuid = this.$('#inbound-campaign-uuid'),
            campaignAcccount = this.$('#inbound-campaign-account'),
            campaignCallerid= this.$('#inbound-campaign-callerid'),
            campaignMaxLen = this.$('#inbound-campaign-max-len'),
            campaignRetry = this.$('#inbound-campaign-retry'),
            campaignServiceLevel = this.$('#inbound-campaign-service-level'),
            campaignStatus = this.$('#inbound-campaign-status'),
            campaignStrategy = this.$('#inbound-campaign-strategy'),
            campaignTimeOut = this.$('#inbound-campaign-time-out'),
            campaignWrapUpTime = this.$('#inbound-campaign-wrap-up-time'),
            callbacks;

        /*this.status = this.$('#inbound-campaign-status');
        this.uuid = this.$('#inbound-campaign-uuid');
        this.account = this.$('#inbound-campaign-account');*/

        /*status = this.status.text();       
        campaignUuid = this.uuid.text();*/

        update = new fun.models.InboundCampaign({'uuid':campaignUuid.text()});

        updateCampaignData = {
            'account': campaignAcccount.text(),
            'status': campaignStatus.text(),
            'callerid': campaignCallerid.val(),
            'max_len': campaignMaxLen.val(),
            'retry': campaignRetry.val(),
            'service_level': campaignServiceLevel.val(),
            'time_out': campaignTimeOut.val(), 
            'wrap_up_time': campaignWrapUpTime.val(),
            'strategy': campaignStrategy.text()
        };

        update.save(updateCampaignData, {patch: true});

        view.listenTo(update, 'change', view.updateCampaigns);

        $('#campaignModal').modal('hide');

    },

    /*
    * Close Inbound Details
    */
    closeInboundDetails: function(event){
        'use strict';
        event.preventDefault();
        var view = this,
                   callbacks;

        $('#campaignModal').modal('hide');
    }
});