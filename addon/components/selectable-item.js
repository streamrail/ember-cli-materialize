import Ember from 'ember';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import SelectableItemGroup from './selectable-item-group';

const { computed, Component } = Ember;

export default Component.extend(ChildComponentSupport, {
  _parentComponentTypes: [SelectableItemGroup],
  checked: null,
  disabled: false,
  classNames: ['materialize-selectable-item'],

  _checked: computed('checked', 'group.selection', 'group.selection.[]', {
    get() {
      const group = this.get('group');
      if (!group) {
        return this.get('checked');
      } else {
        return group.isValueSelected(this.get('value'));
      }
    },
    set(key, val) {
      const group = this.get('group');
      if (!group) {
        this.set('checked', val);
      } else {
        group.setValueSelection(this.get('value'), val);
      }
      this.sendAction('action', { checked: !!val });
      return !!val;
    }
  }),

  isSelected: computed.alias('_checked'),

  _setupLabel() {
    const [$input] = this.$('.materialize-selectable-item-input, .materialize-selectable-item-input-container input').toArray();

    const inputId = $input ? $input.id : null;
    this.$('.materialize-selectable-item-label').attr('for', inputId);
  },

  didInsertElement() {
    this._super(...arguments);
    this._setupLabel();
  },

  group: computed(function() {
    return this.nearestWithProperty('__materializeSelectableItemGroup');
  })
});
