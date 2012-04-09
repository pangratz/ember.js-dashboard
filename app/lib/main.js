require('dashboard/core');
require('dashboard/controllers');
require('dashboard/views');
require('dashboard/datasource');

// this is for testing purpose: if you add ?fixtures=true to your local url,
// the pre-fetched sources are used and so you don't waste API calls during development
if (window.location.search.indexOf('fixtures') !== -1) {
    Dashboard.dataSource = Dashboard.DataSource.create({
        getLatestTweets: function(callback) {
            this.getJSON('twitter.json', callback);
        },
        getLatestGitHubEvents: function(callback) {
            this.getJSON('github.json', callback);
        },
        getLatestStackOverflowQuestions: function(callback) {
            this.getJSON('stackoverflow.json', callback);
        },
        getLatestRedditEntries: function(callback) {
            this.getJSON('reddit.json', callback);
        },
        getJSON: function(json, callback) {
            Ember.$.getJSON('/test_sources/' + json, callback);
        }
    });
} else {
    Dashboard.dataSource = Dashboard.DataSource.create();
}

// create da controllers
Dashboard.redditController = Dashboard.RedditController.create({
    dataSourceBinding: 'Dashboard.dataSource'
});
Dashboard.githubEventsController = Dashboard.GitHubController.create({
    dataSourceBinding: 'Dashboard.dataSource'
});
Dashboard.questionsController = Dashboard.StackOverflowController.create({
    dataSourceBinding: 'Dashboard.dataSource'
});
Dashboard.tweetsController = Dashboard.TwitterController.create({
    dataSourceBinding: 'Dashboard.dataSource'
});

Ember.run.sync();

// fetch initial data
Dashboard.githubEventsController.loadLatestEvents();
Dashboard.tweetsController.loadLatestTweets();
Dashboard.questionsController.loadLatestQuestions();
Dashboard.redditController.loadLatestEntries();

// create da views
Ember.View.create({
    tweetsBinding: 'Dashboard.tweetsController',
    templateName: 'dashboard/~templates/tweets'
}).replaceIn('.tweets');

Ember.View.create({
    questionsBinding: 'Dashboard.questionsController',
    templateName: 'dashboard/~templates/questions'
}).replaceIn('.stackoverflow');

Ember.View.create({
    eventsBinding: 'Dashboard.githubEventsController',
    templateName: 'dashboard/~templates/github'
}).replaceIn('.github');

Ember.View.create({
    entriesBinding: 'Dashboard.redditController',
    templateName: 'dashboard/~templates/reddits'
}).replaceIn('.reddit');
