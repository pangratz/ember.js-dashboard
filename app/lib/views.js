require('dashboard/core');

Dashboard.ActorView = Ember.View.extend({
    tagName: 'a',
    attributeBindings: 'href'.w(),
    href: function() {
        return 'https://github.com/%@'.fmt(Ember.getPath(this, 'actor.login'));
    }.property('actor.login'),
    template: Ember.Handlebars.compile('{{actor.login}}')
});

Dashboard.EventView = Ember.View.extend({
    templateName: function() {
        var type = Ember.getPath(this, 'event.type');
        return 'dashboard/~templates/github/%@-template'.fmt(type);
    }.property('event.type').cacheable(),

    _templateNameChanged: function() {
        this.rerender();
    }.observes('templateName')
});
