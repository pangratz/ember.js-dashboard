require('dashboard/core');

Dashboard.RedditController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestEntries: function() {
        var that = this;
        var ds = this.get('dataSource');
        ds.getLatestRedditEntries(function(response) {
            that.pushObjects(response.data.children.getEach('data'));
        });
    }
});

Dashboard.GitHubController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestEvents: function() {
        var that = this;
        var ds = this.get('dataSource');
        ds.getLatestGitHubEvents(function(response) {
            that.pushObjects(response.data);
        });
    }
});

Dashboard.StackOverflowController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestQuestions: function() {
        var that = this;
        var ds = this.get('dataSource');
        ds.getLatestStackOverflowQuestions(function(response) {
            that.pushObjects(response.items);
        });
    }
});

Dashboard.TwitterController = Ember.ArrayProxy.extend({
    content: [],
    loadLatestTweets: function() {
        var that = this;
        var ds = this.get('dataSource');
        ds.getLatestTweets(function(response) {
            that.pushObjects(response.results);
        });
    }
});
