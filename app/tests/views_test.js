require('dashboard/core');
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