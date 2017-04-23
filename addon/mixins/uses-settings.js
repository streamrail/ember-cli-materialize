import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({
  _mdSettings: computed(function() {
    return Ember.getOwner(this).lookup('service:materialize-settings');
  })
});
