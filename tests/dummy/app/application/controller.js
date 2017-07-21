import Ember from 'ember';

export default Ember.Controller.extend({

  connected: false,
  target: false,

  init() {
    Ember.run.later(() => this._toggle1(), 1000);
    Ember.run.later(() => this._toggle2(), 3000);
  },

  _toggle1() {
    this.toggleProperty("connected");
    Ember.run.later(() => this._toggle1(), 1000);
  },

  _toggle2() {
    this.toggleProperty("target");
    Ember.run.later(() => this._toggle2(), 3000);
  }

});
