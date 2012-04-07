require('dashboard/views');

module("Dashboard.ActorView");

test("it exists",
function() {
    ok(Dashboard.ActorView, "view exists");
    ok(Ember.View.detect(Dashboard.ActorView), "it is a subclass of Ember.View");
});

test("has a property href which returns link to GitHub profile",
function() {
    var view = Dashboard.ActorView.create({
        actor: Ember.Object.create({
            login: 'buster'
        })
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(Ember.$('#qunit-fixture').find('a[href="https://github.com/buster"]').length, 1, "rendered view has a link to GitHub repo");
});

module("Dashboard.EventView");

test("it exists",
function() {
    ok(Dashboard.EventView, "view exists");
    ok(Ember.View.detect(Dashboard.EventView), "it is a sublcass of Ember.View");
});

test("it returns a templateName based on the event.type property",
function() {
    var view = Dashboard.EventView.create({
        event: Ember.Object.create({
            type: 'CommitCommentEvent'
        })
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(view.get('templateName'), 'dashboard/~templates/github/CommitCommentEvent-template', "returns template for given event type");
});