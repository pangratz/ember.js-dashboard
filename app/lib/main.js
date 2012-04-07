require('dashboard/core');
require('dashboard/controllers');
require('dashboard/views');

Dashboard.redditController = Dashboard.RedditController.create();
Dashboard.githubEventsController = Dashboard.GitHubController.create();
Dashboard.questionsController = Dashboard.StackOverflowController.create();
Dashboard.tweetsController = Dashboard.TwitterController.create();

Dashboard.githubEventsController.loadLatestEvents();
Dashboard.tweetsController.loadLatestTweets();
Dashboard.questionsController.loadLatestQuestions();
Dashboard.redditController.loadLatestEntries();

Ember.View.create({
    tweetsBinding: 'Dashboard.tweetsController',
    templateName: 'dashboard/~templates/tweets'
}).appendTo('.tweets');

Ember.View.create({
    questionsBinding: 'Dashboard.questionsController',
    templateName: 'dashboard/~templates/questions'
}).appendTo('.stackoverflow');

Ember.View.create({
    eventsBinding: 'Dashboard.githubEventsController',
    templateName: 'dashboard/~templates/github'
}).appendTo('.github');

Ember.View.create({
    entriesBinding: 'Dashboard.redditController',
    templateName: 'dashboard/~templates/reddit'
}).appendTo('.reddit');
