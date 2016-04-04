/*
 Seed models configuration
*/


/*
 * Store a version of Backbone.sync to call from the
 * modified version we create
 */
var backboneSync = Backbone.sync;

Backbone.sync = function(method, model, options){
    options || (options = {});
    options.crossDomain = true;

    /*
     * The jQuery 'ajax' method includes a 'headers' option
     * which lets you set any headers you like
     */
    //options.headers = {};
    
    /*
     * Call the stored original Backbone.sync method with
     * extra headers argument added
     */
    backboneSync(method, model, options);
};


fun.models.Account = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options){
        if (typeof(options) != "undefined"){
            this.account = options.account;    
        }
    },
    
    urlRoot: fun.conf.urls.user,
    
    url: function(){
        var url;
        if (this.account){
            url = this.urlRoot.replace(fun.conf.account, this.account);    
        }
        if (!this.isNew()){
            url += '/' + this.id;
        } else {
            url = fun.conf.urls.users;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Upload = Backbone.Model.extend({

    urlRoot: fun.conf.urls.upload,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options){
        // Post data as FormData object on create to allow file upload
        if(method == 'create'){
            var formData = new FormData();

            options || (options = {});
            options.contentType = false;
            options.processData = false;
            options.cache = false;

            // Loop over model attributes and append to formData
            _.each(model.attributes, function(value, key){
                formData.append(key, value);
            });

            options.data = formData;
        }
        return Backbone.sync(method, model, options);
    }
});


fun.models.login = Backbone.Model.extend({

    urlRoot: fun.conf.urls.login,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.logout = Backbone.Model.extend({

    urlRoot: fun.conf.urls.logout,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Membership = Backbone.Model.extend({

    idAttribute: 'username',

    initialize: function(options){

        if (typeof(options) != "undefined"){
            this.username = options.username;
            this.org = options.org;
        }
        
    },

    urlRoot: fun.conf.urls.membership,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){

            console.log('no es nuevo');
            url = this.urlRoot.replace(fun.conf.context, this.org);
            url = url.replace(fun.conf.account, this.username);
            
        } else {

            console.log('es nuevo');
            url = fun.conf.urls.memberships.replace(fun.conf.context, this.org);
        }
        console.log(url);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.PutMembership = Backbone.Model.extend({

    idAttribute: 'username',

    initialize: function(options){

        if (typeof(options) != "undefined"){
            this.username = options.username;
            this.org = options.org;
        }
        
    },

    urlRoot: fun.conf.urls.membership,

    url: function() {
        'use strict';
        var url = fun.conf.urls.memberships.replace(fun.conf.context, this.org);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});

fun.models.Memberships = Backbone.Collection.extend({

    model: fun.models.Membership,

    urlRoot: fun.conf.urls.memberships,

    url: function() {
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.Address = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.address,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidAddress, this.id);
        } else {
            url = fun.conf.urls.addresses;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Addresses = Backbone.Collection.extend({

    model: fun.models.Address,

    urlRoot: fun.conf.urls.addresses,

    url: function() {
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.AddressPrimary = Backbone.Collection.extend({

    model: fun.models.Address,

    urlRoot: fun.conf.urls.addressesPrimary,

    url: function() {
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.Daemon = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.daemon,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidDaemon, this.id);
        } else {
            url = fun.conf.urls.daemons;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Daemons = Backbone.Collection.extend({

    model: fun.models.Daemon,

    urlRoot: fun.conf.urls.daemons,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Resource = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.resource,

    url:function(){
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidResource, this.id);
        } else {
            url = fun.conf.urls.resources;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.Resources = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resources,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.ResourcesActive = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resourcesActive,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.ResourcesImps = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resourcesImps,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.ResourcesNodes = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resourcesNodes,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.Gateway = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.gateway,

    url:function(){
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidGateway, this.id);
        } else {
            url = fun.conf.urls.gateways;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.Gateways = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gateways,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.GatewaysActive = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysActive,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.GatewaysInbound = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysInbound,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.GatewaysOutbound = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysOutbound,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.GatewaysMonitored = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysMonitored,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
})


fun.models.User = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options) {
        this.account = options.account;
    },
    
    urlRoot: fun.conf.urls.user,
    
    url: function(){
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.account, this.account);
        } else {
            url = fun.conf.urls.users;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Users = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.users,
    
    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.UsersActive = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.usersActive,
    
    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.UsersDisable = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.usersDisable,
    
    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.UsersSuspended = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.usersSuspended,
    
    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Org = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options) {
        this.account = options.account;
    },
    
    urlRoot: fun.conf.urls.org,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.account, this.account);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
}); 


fun.models.Orgs = Backbone.Collection.extend({

    model: fun.models.Org,
    
    urlRoot: fun.conf.urls.orgs,
    
    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Record = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options) {
        this.recordId = options.recordId;
    },
    
    urlRoot: fun.conf.urls.record,
    
    url: function() {
        var url = this.urlRoot.replace(fun.conf.recordId, this.recordId);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Records = Backbone.Collection.extend({
    
    model: fun.models.Record,
    
    urlRoot: fun.conf.urls.records,
    
    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.RecordsStart = Backbone.Collection.extend({
    
    model: fun.models.Record,

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.recordsStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        //url = url.replace(fun.conf.startTime, this.start);
        return url;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.RecordsStartEnd = Backbone.Collection.extend({
    
    model: fun.models.Record,

    initialize: function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.recordsStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);

        url = url.replace(fun.conf.endTime, this.end);
        
        return url;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.LapseSummary = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options) {
        this.lapse = options.lapse;
    },
    
    urlRoot: fun.conf.urls.lapseSummary,
    
    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.LapseSummaries = Backbone.Collection.extend({
    
    model: fun.models.LapseSummary,

    initialize: function(options) {
        this.lapse = options.lapse;
    },

    urlRoot: fun.conf.urls.lapseSummaries,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        return url;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.LapseSummaryStart = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.lapse = options.lapse;
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.lapseSummaryStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        url = url.replace(fun.conf.startTime, this.start);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.LapseSummaryStartEnd = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options){
        this.lapse = options.lapse;
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.lapseSummaryStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        url = url.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Summary = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    urlRoot: fun.conf.urls.summary,
    
    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Summaries = Backbone.Collection.extend({
   
    model: fun.models.Summary,

    urlRoot: fun.conf.urls.summaries,

    url: function(){
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.SummaryStart = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.summaryStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.SummariesStart = Backbone.Collection.extend({
   
    model: fun.models.SummaryStart,

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.summariesStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        return url;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.SummaryStartEnd = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.summaryStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.SummariesStartEnd = Backbone.Collection.extend({
   
    model: fun.models.SummaryStartEnd,

    initialize:function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.summariesStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Billing = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    urlRoot: fun.conf.urls.billings,
    
    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Billings = Backbone.Collection.extend({

    model: fun.models.Billing,

    urlRoot: fun.conf.urls.billings,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.BillingStart = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.billingStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.BillingStartEnd = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.billingStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Contact = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.contact,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidContact, this.id);
        } else {
            url = fun.conf.urls.contacts;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Contacts = Backbone.Collection.extend({

    model: fun.models.Contact,

    urlRoot: fun.conf.urls.contacts,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.contacts;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Directory = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options) {
        this.directoryId = options.directoryId;
    },

    urlRoot: fun.conf.urls.directory,

    url: function() {
        var url = this.urlRoot.replace(fun.conf.directoryId, this.directoryId);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Directories = Backbone.Collection.extend({

    model: fun.models.Directory,

    urlRoot: fun.conf.urls.directories,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.directories;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Campaign = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.campaign,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidCampaign, this.id);
        } else {
            url = fun.conf.urls.campaigns;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.InboundCampaign = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.campaignInbound,

    url: function() {
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidCampaign, this.id);
        } else {
            url = fun.conf.urls.campaignsInbound;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});

fun.models.InboundCampaigns = Backbone.Collection.extend({

    model: fun.models.InboundCampaign,

    urlRoot: fun.conf.urls.campaignsInbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Campaigns = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaigns,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.CampaignsActive = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsActive,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.CampaignsPaused = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsPaused,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.CampaignsInbound = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsInbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.CampaignsOutbound = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsOutbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Alert = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.alert,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidAlert, this.id);
        } else {
            url = fun.conf.urls.alerts;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Alerts = Backbone.Collection.extend({

    model: fun.models.Alert,

    urlRoot: fun.conf.urls.alerts,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.alerts;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Recording = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.recording,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidRecording, this.id);
        } else {
            url = fun.conf.urls.alerts;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Recordings = Backbone.Collection.extend({

    model: fun.models.Recording,

    urlRoot: fun.conf.urls.recordings,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.recordings;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.RecordingsInbound = Backbone.Collection.extend({

    model: fun.models.Recording,

    urlRoot: fun.conf.urls.recordingsInbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.recordings;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.RecordingsOutbound = Backbone.Collection.extend({

    model: fun.models.Recording,

    urlRoot: fun.conf.urls.recordingsOutbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.recordings;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Message = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.message,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidMessage, this.id);
        } else {
            url = fun.conf.urls.messages;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Messages = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.messages,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.MessagesUnread = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.messagesUnread,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.MessagesAlerts = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.messagesAlerts,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Notifications = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.notifications,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Task = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.task,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidTask, this.id);
        } else {
            url = fun.conf.urls.tasks;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Tasks = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasks,

    url: function(response) {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.TasksContainer = Backbone.Model.extend({
    defaults: {
        dataPoints: new fun.models.Tasks(),
        unit: "quarts"
    },

    urlRoot: fun.conf.urls.tasks,

    url: function() {
        return this.urlRoot;
    },

    parse: function(obj) {
        // update the inner collection
        this.get("dataPoints").reset(obj.dataPoints);

        // this mightn't be necessary
        delete obj.dataPoints;

        return obj;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
    
});


fun.models.TasksNow = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasksNow,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.TasksLater = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasksLater,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.TasksDone = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasksDone,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Company = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.company,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidCompany, this.id);
        } else {
            url = fun.conf.urls.companies;
        }
        return url;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.Companies = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companies,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.CompaniesActive = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companiesActive,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.CompaniesDisable = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companiesDisable,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});


fun.models.CompaniesSuspended = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companiesSuspended,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    },

    sync: function(method, model, options) {
        options.contentType = 'application/json';
        return Backbone.sync(method, model, options);
    }
});