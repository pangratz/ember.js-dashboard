require('dashboard/core');

Dashboard.EventView = Ember.View.extend({
    layout: Ember.Handlebars.compile('<span class="timeline-time">{{timeAgoString}}</span> <li class="timeline-point">{{yield}}</li>'),
    defaultTemplate: Ember.Handlebars.compile('{{event.TYPE}}'),
    classNameBindings: 'event.TYPE'.w(),
    timestampProperty: 'event.created_at',

    timeAgo: function() {
        timestamp = Ember.getPath(this, this.get('timestampProperty'));
        if (this.get('isSeconds')) {
            // the given property represents seconds since UNIX epoch, so we multiply
            // by 1000 to get the date in milliseconds since UNIX epoch
            timestamp *= 1000;
        }
        return new Date(timestamp);
    }.property('timestampProperty', 'isSeconds').cacheable(),

    timeAgoString: function() {
        var timeAgo = this.get('timeAgo');
        return moment(timeAgo).fromNow();
    }.property('timeAgo')
});

Dashboard.StackOverflowEventView = Dashboard.EventView.extend({
    timestampProperty: 'event.last_activity_date',
    isSeconds: true,
    templateName: 'dashboard/~templates/question'
});

Dashboard.RedditEventView = Dashboard.EventView.extend({
    timestampProperty: 'event.created_utc',
    isSeconds: true,
    templateName: 'dashboard/~templates/reddit'
});

Dashboard.TwitterEventView = Dashboard.EventView.extend({
    templateName: 'dashboard/~templates/tweet',
    tweetUrl: function() {
        var user = Ember.getPath(this, 'event.from_user');
        var id = Ember.getPath(this, 'event.id_str');
        return 'http://twitter.com/#!/%@/status/%@'.fmt(user, id);
    }.property()
});

Dashboard.GitHubEventView = Dashboard.EventView.extend({
    templateName: 'dashboard/~templates/github/githubEvent',

    avatarUrl: function() {
        var gravatarId = Ember.getPath(this, 'event.actor.gravatar_id');
        return 'http://www.gravatar.com/avatar/%@'.fmt(gravatarId);
    }.property('event.actor.gravatar_id'),

    DetailView: Ember.View.extend({
        classNames: 'info'.w(),
        templateName: function() {
            var type = Ember.getPath(this, 'event.type');
            return 'dashboard/~templates/github/%@-template'.fmt(type);
        }.property('event.type').cacheable(),

        ActorView: Ember.View.extend({
            layoutName: 'dashboard/~templates/github/actor',
            defaultTemplate: Ember.Handlebars.compile(''),
            tagName: '',

            actorBinding: 'event.actor',
            eventBinding: 'parentView.event',

            href: function() {
                var login = Ember.getPath(this, 'actor.login');
                return 'https://github.com/%@'.fmt(login);
            }.property('actor.login')
        })
    })


});
