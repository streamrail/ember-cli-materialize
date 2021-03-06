import Ember from 'ember';
import $ from 'jquery';
import UsesSettings from '../mixins/uses-settings';
import layout from '../templates/components/md-modal';
import { EKMixin, keyUp } from 'ember-keyboard';

const { Component, on, computed, computed: { oneWay } } = Ember;

export default Component.extend(EKMixin, UsesSettings, {
  layout,

  keyboardActivated: true,
  keyboardFirstResponder: true,
  attributeBindings: ['style:inlineStyle'],
  concatenatedProperties: ['modalClassNames'],

  overlayClassName: 'lean-modal',

  inlineStyle: computed(function() {
    return new Ember.Handlebars.SafeString('z-index: 1000;');
  }),

  isFooterFixed: oneWay('_mdSettings.modalIsFooterFixed'),

  modalClassNames: ['modal', 'show'],
  _modalClassString: computed('modalClassNames.[]', 'isFooterFixed', function() {
    const names = this.get('modalClassNames');
    if (this.get('isFooterFixed')) {
      names.push('modal-fixed-footer');
    }
    return names.join(' ');
  }),

  didInsertElement() {
    this._super(...arguments);
    var onInsert = this.getAttr('onInsert');
    var bodyClassName = this.getAttr('bodyClassName');
    if (bodyClassName) {
      $('body').addClass(bodyClassName);
    }
    if (onInsert) {
      onInsert();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    var onDestroy = this.getAttr('onDestroy');
    var bodyClassName = this.getAttr('bodyClassName');
    if (bodyClassName) {
      $('body').removeClass(bodyClassName);
    }
    if (onDestroy) {
      onDestroy();
    }
  },

  cancel: on(keyUp('Escape'), function() {
    this.closeModal();
  }),

  actions: {
    closeModal() {
      this.closeModal();
    }
  },

  closeModal(){
    if (this.getAttr('onClose')){
      this.getAttr('onClose')();
    } else {
      this.sendAction('close');  
    }
  }

});

