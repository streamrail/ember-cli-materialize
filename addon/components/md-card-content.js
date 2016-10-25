import Ember from 'ember';
import layout from '../templates/components/md-card-content';

const { Component, computed } = Ember;

export default Component.extend({
  layout,

  classNames: ['card-content'],

  classNameBinding: 'class',
  cardTitleClass: computed('titleClass', function() {
    return this.get('titleClass') || 'black-text';
  })
});

