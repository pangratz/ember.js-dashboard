require('dashboard/core');

Dashboard.DataSource = Ember.Object.extend({
    getLatestTweets: function(callback) {
        Ember.$.getJSON('http://search.twitter.com/search.json?callback=?&q=ember.js%20OR%20emberjs%20OR%20ember-data%20OR%20emberjs', callback);
    },

    getLatestStackOverflowQuestions: function(callback) {
        Ember.$.getJSON('https://api.stackexchange.com/2.0/search?pagesize=20&order=desc&sort=activity&tagged=ember.js&site=stackoverflow&callback=?', callback);
    },

    getLatestRedditEntries: function(callback) {
        Ember.$.getJSON('http://www.reddit.com/r/emberjs/new.json?sort=new&jsonp=?', callback);
    },

    getLatestGitHubEvents: function(callback) {
        Ember.$.getJSON('https://api.github.com/repos/emberjs/ember.js/events?page=1&per_page=100&callback=?', callback);
    }
});