import SelectableItemGroup from './selectable-item-group';
import afterRender from  '../utils/after-render';

export default SelectableItemGroup.extend({
  classNames: ['md-radios'],
  selectableItemView: 'md-radios-radio',
  bindToInputs: afterRender(function(){
  	this.$().on(`change.${this.get('elementId')}`, 'input[type="radio"]:checked', event => {
  		if (this.attrs.onChange) {
  			this.attrs.onChange(event.target.value);
  		}
  	});
  }),

  willDestroyElement() {
    this._super(...arguments);
    this.$().off(`change.${this.get('elementId')}`);
  }
});