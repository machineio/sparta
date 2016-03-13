fun.views.dashboard = Backbone.View.extend({
    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #today-btn': 'today',
        'click #this-week-btn': 'thisWeek',
        'click #this-month-btn': 'thisMonth',
        'click #this-year-btn': 'thisYear',
        'click #incoming-form-btn': 'showHideForm',
        'click #ws-test-btn': 'wsTest',
        'click .campaign-popup': 'giveMe',
        'click .inbound-campaign-popup': 'showInboundModal',
        'click .outbound-campaign-popup': 'showOutboundModal',
        'click .task-popup': 'showTaskModal',
        'click .contacts-directory-popup': 'giveMeTee',
        'click #close-campaign-dashboard-btn': 'closeCampaign',
        'click #campaign-agents-btn': 'showAgents',
    },

    initialize: function(options){
        // Initialize view constructor
        'use strict';
        fun.containers.dashboard = this.$el;
    },

    render: function(account, summary, billing){
        // Render view function
        'use strict';
        var template;

        if (typeof(account) === 'undefined'){
            this.account = localStorage.getItem("username");
        } else {
            this.account = account;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.dashboard)
        )({'account':this.account});

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        this.renderTodaySummary(this.account, summary, billing);
        this.renderTodayActivityChart();
        //this.renderLatestRecords();
        this.renderRecordType();
    },

    giveMe: function(){
        $('#dashboardCampaignModal').modal({
            'show': true
        });

    },

    giveMeTee: function(){
        console.log('give me tee');
        $('#dashboardContactsDirectoryModal').modal({
            'show': true
        });
    },

    giveMeKfe: function(){
        console.log('give me kfe');
    },

    showOutboundModal: function(){
        $('#dashboardOutboundCampaignModal').modal({
            'show': true
        });

    },

    showInboundModal: function(){
        $('#dashboardInboundCampaignModal').modal({
            'show': true
        });

    },

    showTaskModal: function(){
        $('#dashboardTaskModal').modal({
            'show': true
        });
    },

    renderBoo: function(){
        'use strict';
        console.log('corporate warfare');
    },

    renderBooBoo: function(){
        'use strict';
        console.log('Welcome to corporate warfare on mars via websockets');
        var message = sessionStorage.getItem("obelix");
        var stuff = JSON.parse(message);
        console.log(stuff)
        $('#pvtScriptModal').modal('show');
    },

    renderTodaySummary: function(summary, billing){
        // Render today summary
        'use strict';
        var data,
            template,
            todaySummary;

        if(summary){
            this.summary = summary;
        }

        if(billing){
            this.billing = billing;
        }

        if(summary && billing){
            data = _.extend(this.summary.toJSON(),
                            this.billing.toJSON());
        } else {
            data = {
                minutes: 0,
                records: 0,
                billing: 0,
                record_avg: 0
            };
        }
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.todaySummary)
        )(data);

        todaySummary = this.$('#fun-today-summary');
        todaySummary.html(template);
    },

    renderTodayActivityChart: function(summary){
        // Render today activity chart

        // This hole summary can be parsed in a single requests
        // directly to the flot.js library.
        'use strict';
        var data = [],
            minutes = [],
            records = [],
            x,
            template,
            todayActivityChart;

        // check if response from the server
        if(summary){
            this.summary = summary;
            this.minutes = summary.get('minutes');
            this.records = summary.get('records');
        }

        // push the minutes
        for (x in this.minutes){
            
            minutes.push([moment.unix(Number(x)).format('x'), this.minutes[x]]);
        }

        // push the records
        for (x in this.records){
            records.push([moment.unix(Number(x)).format('x'), this.records[x]]);
        }

        data.push({
            data: minutes,
            label: 'Minutes'
        });

        data.push({
            data: records,
            label: 'Records',
            lines: {lineWidth: 2, fill: false}
        });

        // html template
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.todayActivityChart)
        )(data);

        todayActivityChart = this.$('#fun-today-activity-chart');
        todayActivityChart.html(template);

        // clean charts
        Charts.line('#line-chart', data);
    },

    renderLatestRecords: function(collection){
        // Render latest records
        'use strict';
        var template,
            latestRecords;

        if (collection !== undefined && collection !== null) {
            this.collection = collection;
        } else {
            this.collection = 0;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.latestRecords)
        );

        latestRecords = this.$('#fun-latest-records');
        latestRecords.html(template);

        this.tbody = this.$('#records-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderRows();
    },

    renderRecordType: function(){
        // Render records type
        'use strict';
        var data,
            vonCount,
            recordType,
            template;

        // Randomly Generated Data
        data = [],

        data[0] = {'label': "Answered", data: Math.floor(Math.random() * 100) + 1}
        data[1] = {'label': "No Answer", data: Math.floor(Math.random() * 100) + 1}
        data[2] = {'label': "Machine", data: Math.floor(Math.random() * 100) + 1}
        data[3] = {'label': "Wrong Number", data: Math.floor(Math.random() * 100) + 1}
        data[4] = {'label': "Transferred", data: Math.floor(Math.random() * 100) + 1}

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.recordType)
        )(data);

        recordType = this.$('#fun-record-type');
        recordType.html(template);

        $.plot('#pie-chart', data, {
            series: {
                pie: {
                    show: true
                }
            }
        });
    },

    renderRows: function(){
        // Render rows
        'use strict';
        var vonCount = 0,
            length,
            rows,
            data,
            template;

        length = this.collection.length;

        if (length !== undefined || length !== null && length > 7) {

            // table rows
            rows = this.tbody.html('');

            _.each([0,1,2,3,4,5,6], function(value) {

                data = _.extend(this.collection.at(vonCount).toJSON(), {counter:vonCount});

                vonCount = vonCount + 1;

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.recordRow)
                )(data);

                rows.append(template);

            }, this);
        } else {
            this.noRecords();
        }
    },

    noRecords: function() {
        // No records
        'use strict';
        var template,
            noRecords;
        // No records
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noRecords = this.$('#no-records');

        noRecords.html(template);
    },

    today: function(event){
        'use strict';
        // Today
        console.log('today event');
    },

    thisWeek: function(event) {
        'use strict';
        // This week
        console.log('this week event');
    },

    thisMonth: function(event){
        'use strict';
        // This month
        console.log('this month event');
    },

    thisYear: function(event){
        'use strict';
        // This year
        console.log('this year event');
    },

    showHideForm: function(){
        if($('#formView').hasClass('hide')){
            $('#pills').removeClass('show');
            $('#pills').addClass('hide');
            $('#formView').removeClass('hide');
            $('#formView').addClass('show');
            $('#incoming-form-btn').text(fun.strings.contact);
        } else {
            $('#formView').removeClass('show');
            $('#formView').addClass('hide');
            $('#pills').removeClass('hide');
            $('#pills').addClass('show');
            $('#incoming-form-btn').text(fun.strings.form);
        }
    },

    showAgents: function(){
        if($('#agentList').hasClass('hide')){
            $('#agentList').removeClass('hide');
            $('#agentList').addClass('show');
            $('#campaignStatus').removeClass('show');
            $('#campaignStatus').addClass('hide');
        } else {
            $('#agentList').removeClass('show');
            $('#agentList').addClass('hide');
            $('#campaignStatus').removeClass('hide');
            $('#campaignStatus').addClass('show');
        }
    },

    closeCampaign: function(){
        $('#dashboardCampaignModal').modal('hide');
    },

    wsTest: function(){
        fun.utils.updater.start();
    }

});
