fun.views.recordings = Backbone.View.extend({
	/**
	* Bind the event functions to the different HTML elements
	*/
	// click events missing
	events: {
	},
	/**
	* Class constructor
	*/
	initialize: function(options){
		fun.containers.recordings = this.$el;
	},

	/**
	* Render view
	*/
	render: function(){
		console.log('render recordings view');

		var template = _.template(fun.utils.getTemplate(fun.conf.templates.recordings));

		this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");
	},

	/*
    * Render all recordings list
    */
    renderAllRecordingsList: function(recordings){
        'use strict';
        var template,
            allRecordings;
        console.log('render all recordings list');
        if (recordings) {
            this.recordings = recordings;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.recordingsAllTab)
        );

        allRecordings = this.$('#all-recordings-tab');

        allRecordings.html(template);

        this.tbody = this.$('#all-recordings-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderAllRecordingsRows();
    },

    /*
    * Render now recordings rows
    */
    renderAllRecordingsRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.recordings.length;

        console.log('all recordings length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.recordings.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.recordingRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noAllRecordings();
        }
    },

    /*
    * No now recordings
    */
    noAllRecordings: function(){
        'use strict';
        var template,
            noAllRecordings;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noAllRecordings = this.$('#no-all-recordings');

        noAllRecordings.html(template);
    },

    /*
    * Render inbound recordings list
    */
    renderInboundRecordingsList: function(recordings){
        'use strict';
        var template,
            inboundRecordings;
        console.log('render inbound recordings list');
        if (recordings) {
            this.recordings = recordings;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.recordingsInboundTab)
        );

        inboundRecordings = this.$('#inbound-recordings-tab');

        inboundRecordings.html(template);

        this.tbody = this.$('#inbound-recordings-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderInboundRecordingsRows();
    },

    /*
    * Render inbound recordings rows
    */
    renderInboundRecordingsRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.recordings.length;

        console.log('inbound recordings length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.recordings.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.recordingRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noInboundRecordings();
        }
    },

    /*
    * No inbound recordings
    */
    noInboundRecordings: function(){
        'use strict';
        var template,
            noInboundRecordings;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noInboundRecordings = this.$('#no-inbound-recordings');

        noInboundRecordings.html(template);
    },

    /*
    * Render outbound recordings list
    */
    renderOutboundRecordingsList: function(recordings){
        'use strict';
        var template,
            outboundRecordings;
        console.log('render outbound recordings list');
        if (recordings) {
            this.recordings = recordings;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.recordingsOutboundTab)
        );

        outboundRecordings = this.$('#outbound-recordings-tab');

        outboundRecordings.html(template);

        this.tbody = this.$('#outbound-recordings-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderOutboundRecordingsRows();
    },

    /*
    * Render outbound recordings rows
    */
    renderOutboundRecordingsRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.recordings.length;

        console.log('outbound recordings length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.recordings.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.recordingRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noOutboundRecordings();
        }
    },

    /*
    * No inbound recordings
    */
    noOutboundRecordings: function(){
        'use strict';
        var template,
            noOutboundRecordings;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noOutboundRecordings = this.$('#no-outbound-recordings');

        noOutboundRecordings.html(template);
    },
});