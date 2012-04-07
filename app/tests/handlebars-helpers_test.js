require('dashboard/core');
require('dashboard/handlebars-helpers');

module("handlebars-helpers - echo");

test("helper is available",
function() {
    ok(Ember.Handlebars.helpers.echo, "echo helper is available");
});

test("returns the specified property",
function() {
    var view = Ember.View.create({
        obj: Ember.Object.create({
            action: 'dingdong'
        }),
        template: Ember.Handlebars.compile('{{#with obj}}{{echo "action"}}{{/with}}')
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(Ember.$('#qunit-fixture').text(), "dingdong", "echo helper outputs correct value");
});

module("handlebars-helpers - ago");

test("helper is available",
function() {
    ok(Ember.Handlebars.helpers.ago, "ago helper is availbale");
});

test("ago can handle Date objects",
function() {
    var view = Ember.View.create({
        time: new Date(),
        template: Ember.Handlebars.compile('{{ago time}}')
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(Ember.$('#qunit-fixture').text(), "a few seconds ago", "ago helper outputs correct value");
});

test("ago can handle numbers",
function() {
    var view = Ember.View.create({
        time: new Date().getTime(),
        template: Ember.Handlebars.compile('{{ago time}}')
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(Ember.$('#qunit-fixture').text(), "a few seconds ago", "ago helper outputs correct value");
});

test("ago respects 'isSeconds' parameter",
function() {
    var nowInSeconds = new Date().getTime() / 1000;
    var view = Ember.View.create({
        time: nowInSeconds,
        template: Ember.Handlebars.compile('{{ago time isSeconds=true}}')
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(Ember.$('#qunit-fixture').text(), "a few seconds ago", "ago helper outputs correct value");
});

module("handlebars-helpers - parseTweet");

test("helper is available",
function() {
    ok(Ember.Handlebars.helpers.parseTweet, "parseTweet helper is available");
});

test("parseTweet uses context.text as tweet text",
function() {
    var view = Ember.View.create({
        tweet: Ember.Object.create({
            text: "@user #tag http://google.com"
        }),
        template: Ember.Handlebars.compile('{{#with tweet}}{{parseTweet}}{{/with}}')
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(Ember.$('#qunit-fixture').text(), "@user #tag http://google.com", "output text is the same");
    var links = Ember.$('#qunit-fixture').find('a');
    equal(links.length, 3, "parsed tweet should contain 3 links");
    equal(Ember.$(links[0]).text(), "user", "first link has the user as text");
    equal(Ember.$(links[1]).text(), "#tag", "second link has the #tag as text");
    equal(Ember.$(links[2]).text(), "http://google.com", "third link has the url as text");
});

test("if a parameter is specified, parseTweet uses this as path to the tweet",
function() {
    var view = Ember.View.create({
        tweet: "@user #tag http://google.com",
        template: Ember.Handlebars.compile('{{parseTweet tweet}}')
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal(Ember.$('#qunit-fixture').text(), "@user #tag http://google.com", "output text is the same");
    var links = Ember.$('#qunit-fixture').find('a');
    equal(links.length, 3, "parsed tweet should contain 3 links");
    equal(Ember.$(links[0]).text(), "user", "first link has the user as text");
    equal(Ember.$(links[1]).text(), "#tag", "second link has the #tag as text");
    equal(Ember.$(links[2]).text(), "http://google.com", "third link has the url as text");
});
