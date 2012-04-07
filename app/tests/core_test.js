require('dashboard/core');

module("core");

test("Dashboard namespace is available",
function() {
    ok(Dashboard, "namespace is available	");
});

test("Dashboard namespace has a shortcut D",
function() {
    ok(D, "namespace is available");
    equal(Dashboard, D, "Dashboard equals D");
});