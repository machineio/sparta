fun.views.messages = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {

        'click #create-message-btn': 'createMessage',

    },
    
    /*
    * Class constructor
    */
    initialize: function(options) {
        fun.containers.messages = this.$el;
    },
    
    /*
    * Render the cubes view
    */
    render: function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.messages));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * Render all messages list
    */
    renderAllMessagesList: function(messages){
        'use strict';
        var template,
            allMessages;
        console.log('render all messages list');
        if (messages) {
            this.messages = messages;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.messagesAllTab)
        );

        allMessages = this.$('#all-messages-tab');

        allMessages.html(template);

        this.tbody = this.$('#all-messages-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderAllMessagesRows();
    },

    /*
    * Render all messages rows
    */
    renderAllMessagesRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.messages.length;

        console.log('all messages length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.messages.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.messagesRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noAllMessages();
        }
    },

    /*
    * No all messages
    */
    noAllMessages: function(){
        'use strict';
        var template,
            noAllMessages;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noAllMessages = this.$('#no-all-messages');

        noAllMessages.html(template);
    },

    /*
    * Render unread messages list
    */
    renderUnreadMessagesList: function(messages){
        'use strict';
        var template,
            unreadMessages;
        console.log('render unread messages list');
        if (messages) {
            this.messages = messages;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.messagesUnreadTab)
        );

        unreadMessages = this.$('#unread-messages-tab');

        unreadMessages.html(template);

        this.tbody = this.$('#unread-messages-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderUnreadMessagesRows();
    },

    /*
    * Render unread messages rows
    */
    renderUnreadMessagesRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.messages.length;

        console.log('unread messages length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.messages.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.messagesRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noUnreadMessages();
        }
    },

    /*
    * No unread messages
    */
    noUnreadMessages: function(){
        'use strict';
        var template,
            noUnreadMessages;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noUnreadMessages = this.$('#no-unread-messages');

        noUnreadMessages.html(template);
    },

    /*
    * Render notifications messages list
    */
    renderNotificationsMessagesList: function(messages){
        'use strict';
        var template,
            notificationsMessages;
        console.log('render notifications messages list');
        if (messages) {
            this.messages = messages;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.messagesNotificationsTab)
        );

        notificationsMessages = this.$('#notifications-messages-tab');

        notificationsMessages.html(template);

        this.tbody = this.$('#notifications-messages-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderNotificationsMessagesRows();
    },

    /*
    * Render notifications messages rows
    */
    renderNotificationsMessagesRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.messages.length;

        console.log('notifications messages length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.messages.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.messagesRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noNotificationsMessages();
        }
    },

    /*
    * No notifications messages
    */
    noNotificationsMessages: function(){
        'use strict';
        var template,
            noNotificationsMessages;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noNotificationsMessages = this.$('#no-notifications-messages');

        noNotificationsMessages.html(template);
    },

    /*
    * Render alerts messages list
    */
    renderAlertsMessagesList: function(messages){
        'use strict';
        var template,
            alertsMessages;
        console.log('render alerts messages list');
        if (messages) {
            this.messages = messages;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.messagesAlertsTab)
        );

        alertsMessages = this.$('#alerts-messages-tab');

        alertsMessages.html(template);

        this.tbody = this.$('#alerts-messages-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderAlertsMessagesRows();
    },

    /*
    * Render alerts messages rows
    */
    renderAlertsMessagesRows: function(){
        'use strict';
        var length,
            rows,
            template;
        // tasks length
        length = this.messages.length;

        console.log('alerts messages length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            _.each(this.messages.toJSON(), function(value){
                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.messagesRow)
                )(value);
                rows.append(template);
            });
        } else {
            this.noAlertsMessages();
        }
    },

    /*
    * No alerts messages
    */
    noAlertsMessages: function(){
        'use strict';
        var template,
            noAlertsMessages;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noAlertsMessages = this.$('#no-alerts-messages');

        noAlertsMessages.html(template);
    },

    /*
    * create message
    */
    createMessage: function(event){
        'use strict';
        event.preventDefault();
        console.log('create message');
    }

});