require('dashboard/core');
require('dashboard/states/start');

App.stateManager = Ember.StateManager.create({

  rootElement: '#main',
  initialState: 'start',

  start: App.StartState

});
