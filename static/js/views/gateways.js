fun.views.gateways = Backbone.View.extend({
    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
    },
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.gateways = this.$el;
    },
    /*
    * Render the gateways view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.gateways));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * Render all gateways list
    */
    renderAllGatewaysList: function(gateways){
        'use strict';
        var template,
            allGateways;
        console.log('render all gateways list');
        if (gateways) {
            this.gateways = gateways;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.gatewaysAllTab)
        );

        allGateways = this.$('#all-gateways-tab');

        allGateways.html(template);

        this.tbody = this.$('#all-gateways-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderAllGatewaysRows();
    },

    /*
    * Render all gateways rows
    */
    renderAllGatewaysRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.gateways.length;

        console.log('all gateways length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.gateways.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.gatewayRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noAllGateways();
        }
    },

    /*
    * No all gateways
    */
    noAllGateways: function(){
        'use strict';
        var template,
            noAllGateways;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noAllGateways = this.$('#no-all-gateways');

        noAllGateways.html(template);
    },


    /*
    * Render active gateways list
    */
    renderActiveGatewaysList: function(gateways){
        'use strict';
        var template,
            activeGateways;
        console.log('render active gateways list');
        if (gateways) {
            this.gateways = gateways;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.gatewaysActiveTab)
        );

        activeGateways = this.$('#active-gateways-tab');

        activeGateways.html(template);

        this.tbody = this.$('#active-gateways-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderActiveGatewaysRows();
    },

    /*
    * Render active gateways rows
    */
    renderActiveGatewaysRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.gateways.length;

        console.log('active gateways length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.gateways.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.gatewayRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noActiveGateways();
        }
    },

    /*
    * No active gateways
    */
    noActiveGateways: function(){
        'use strict';
        var template,
            noActiveGateways;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noActiveGateways = this.$('#no-active-gateways');

        noActiveGateways.html(template);
    },


    /*
    * Render monitored gateways list
    */
    renderMonitoredGatewaysList: function(gateways){
        'use strict';
        var template,
            monitoredGateways;
        console.log('render monitored gateways list');
        if (gateways) {
            this.gateways = gateways;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.gatewaysMonitoredTab)
        );

        monitoredGateways = this.$('#monitored-gateways-tab');

        monitoredGateways.html(template);

        this.tbody = this.$('#monitored-gateways-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderMonitoredGatewaysRows();
    },

    /*
    * Render monitored gateways rows
    */
    renderMonitoredGatewaysRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.gateways.length;

        console.log('monitored gateways length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.gateways.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.gatewayRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noMonitoredGateways();
        }
    },

    /*
    * No monitored gateways
    */
    noMonitoredGateways: function(){
        'use strict';
        var template,
            noMonitoredGateways;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noMonitoredGateways = this.$('#no-monitored-gateways');

        noMonitoredGateways.html(template);
    },

    /*
    * Render inbound gateways list
    */
    renderInboundGatewaysList: function(gateways){
        'use strict';
        var template,
            inboundGateways;
        console.log('render inbound gateways list');
        if (gateways) {
            this.gateways = gateways;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.gatewaysInboundTab)
        );

        inboundGateways = this.$('#inbound-gateways-tab');

        inboundGateways.html(template);

        this.tbody = this.$('#inbound-gateways-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderInboundGatewaysRows();
    },

    /*
    * Render inbound gateways rows
    */
    renderInboundGatewaysRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.gateways.length;

        console.log('inbound gateways length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.gateways.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.gatewayRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noInboundGateways();
        }
    },

    /*
    * No inbound gateways
    */
    noInboundGateways: function(){
        'use strict';
        var template,
            noInboundGateways;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noInboundGateways = this.$('#no-inbound-gateways');

        noInboundGateways.html(template);
    },


    /*
    * Render outbound gateways list
    */
    renderOutboundGatewaysList: function(gateways){
        'use strict';
        var template,
            outboundGateways;
        console.log('render outbound gateways list');
        if (gateways) {
            this.gateways = gateways;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.gatewaysOutboundTab)
        );

        outboundGateways = this.$('#outbound-gateways-tab');

        outboundGateways.html(template);

        this.tbody = this.$('#outbound-gateways-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderOutboundGatewaysRows();
    },

    /*
    * Render outbound gateways rows
    */
    renderOutboundGatewaysRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.gateways.length;

        console.log('outbound gateways length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.gateways.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.gatewayRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noOutboundboundGateways();
        }
    },

    /*
    * No outbound gateways
    */
    noOutboundboundGateways: function(){
        'use strict';
        var template,
            noOutboundboundGateways;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noOutboundboundGateways = this.$('#no-outbound-gateways');

        noOutboundboundGateways.html(template);
    },

});