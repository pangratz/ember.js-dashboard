Ember.Handlebars.registerHelper('echo', function(propertyName, options) {
    return Ember.getPath(options.contexts[0], propertyName);
});

Ember.Handlebars.registerHelper('parseTweet', function(options) {
    var tweet = options.contexts[0].text;
    var parsed = twttr.txt.autoLink(tweet);
    return new Handlebars.SafeString(parsed);
});

Ember.Handlebars.registerHelper('ago', function(propertyName, options) {
    var timestamp = Ember.getPath(options.contexts[0], propertyName);
    if (options.hash.isSeconds) {
        // the given property represents seconds since UNIX epoch, so we multiply
        // by 1000 to get the date in milliseconds since UNIX epoch
        timestamp *= 1000;
    }
    return moment(new Date(timestamp)).fromNow();
});

DB = Ember.Application.create({
    ready: function() {
        Ember.View.create({
            tweetsBinding: 'DB.tweetsController',
            templateName: 'tweets'
        }).appendTo('.tweets');

        Ember.View.create({
            questionsBinding: 'DB.questionsController',
            templateName: 'questions'
        }).appendTo('.stackoverflow');

        Ember.View.create({
            eventsBinding: 'DB.githubEventsController',
            templateName: 'github'
        }).appendTo('.github');
    }
});

DB.ActorView = Ember.View.extend({
    tagName: 'a',
    attributeBindings: 'href'.w(),
    href: function() {
        return 'https://github.com/%@'.fmt(Ember.getPath(this, 'actor.login'));
    }.property('actor.login'),
    template: Ember.Handlebars.compile('{{actor.login}}')
});

DB.EventView = Ember.View.extend({
    templateName: function() {
        var type = Ember.getPath(this, 'event.type');
        var templateName = '%@-template'.fmt(type);
        if (Ember.TEMPLATES[templateName]) {
            return templateName;
        }
        return 'event-template';
    }.property('event.type').cacheable(),

    _templateNameChanged: function() {
        this.rerender();
    }.observes('templateName')
});

DB.githubEventsController = Ember.ArrayProxy.create({
    content: [],
    loadLatestEvents: function() {
        var that = this;
        Ember.$.getJSON('https://api.github.com/repos/emberjs/ember.js/events?page=1&per_page=100&callback=?',
        function(data) {
            that.pushObjects(data.data);
        });
    }
});

DB.questionsController = Ember.ArrayProxy.create({
    content: [],
    loadLatestQuestions: function() {
        var that = this;
        Ember.$.getJSON('https://api.stackexchange.com/2.0/search?pagesize=20&order=desc&sort=activity&tagged=emberjs&site=stackoverflow&callback=?',
        function(data) {
            that.pushObjects(data.items);
        });
    }
});

DB.tweetsController = Ember.ArrayProxy.create({
    content: [],
    loadLatestTweets: function() {
        var that = this;
        Ember.$.getJSON('http://search.twitter.com/search.json?callback=?&q=emberjs',
        function(data) {
            that.pushObjects(data.results);
        });
    }
});

DB.githubEventsController.loadLatestEvents();
DB.tweetsController.loadLatestTweets();
DB.questionsController.loadLatestQuestions();