Ember.Handlebars.registerHelper('echo',
function(propertyName, options) {
    return Ember.getPath(options.contexts[0], propertyName);
});

Ember.Handlebars.registerHelper('parseTweet',
function(propertyPath, options) {
    var tweet;
    if (!options) {
        options = propertyPath;
        tweet = options.contexts[0].text;
    } else {
        tweet = Ember.getPath(options.contexts[0], propertyPath);
    }
    var parsed = twttr.txt.autoLink(tweet);
    return new Handlebars.SafeString(parsed);
});

Ember.Handlebars.registerHelper('ago',
function(propertyName, options) {
    var timestamp = Ember.getPath(options.contexts[0], propertyName);
    if (options.hash.isSeconds) {
        // the given property represents seconds since UNIX epoch, so we multiply
        // by 1000 to get the date in milliseconds since UNIX epoch
        timestamp *= 1000;
    }
    return moment(new Date(timestamp)).fromNow();
});

Ember.Handlebars.registerHelper('event',
function(path, options) {
    var eventType = Ember.getPath(options.contexts[0], 'TYPE');
    var viewClass = 'Dashboard.%@View'.fmt(eventType);
    return Ember.Handlebars.ViewHelper.helper(this, viewClass, options);
});