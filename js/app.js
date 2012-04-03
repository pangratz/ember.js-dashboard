DB = Ember.Application.create({
    ready: function() {
        Ember.View.create({
            tweetsBinding: 'DB.tweetsController',
            templateName: 'recentTweets'
        }).append();
    }
});

DB.tweetsController = Ember.ArrayProxy.create({
    content: [],
    loadLatestTweets: function() {
        var that = this;
        Ember.$.getJSON('http://search.twitter.com/search.json?callback=?&q=emberjs',
        function(data) {
            data.results.forEach(function(item) {
                that.pushObject(item);
            });
        });
    }
});

DB.tweetsController.loadLatestTweets();
