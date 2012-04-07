require('dashboard/core');

Dashboard.RedditController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestEntries: function() {
        var that = this;
        Ember.$.getJSON('http://www.reddit.com/r/emberjs/new.json?sort=new&jsonp=?',
        function(response) {
            that.pushObjects(response.data.children.getEach('data'));
        });
    }
});

Dashboard.GitHubEventsController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestEvents: function() {
        var that = this;
        Ember.$.getJSON('https://api.github.com/repos/emberjs/ember.js/events?page=1&per_page=100&callback=?',
        function(data) {
            that.pushObjects(data.data);
        });
    }
});

Dashboard.QuestionsController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestQuestions: function() {
        var that = this;
        Ember.$.getJSON('https://api.stackexchange.com/2.0/search?pagesize=20&order=desc&sort=activity&tagged=emberjs&site=stackoverflow&callback=?',
        function(data) {
            that.pushObjects(data.items);
        });
    }
});

Dashboard.TweetsController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestTweets: function() {
        var that = this;
        Ember.$.getJSON('http://search.twitter.com/search.json?callback=?&q=emberjs',
        function(data) {
            that.pushObjects(data.results);
        });
    }
});
