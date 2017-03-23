import MaterializeInputField from './md-input-field';
import layout from '../templates/components/md-input';
import Ember from 'ember';
const {
	computed,
	isBlank
} = Ember;

export default MaterializeInputField.extend({
	layout,
	type: 'text',
	_previousValue: '',

	didInsertElement() {
		this._super(...arguments);
		// make sure the label moves when a value is bound.
		this._setupLabel();
		this.$('input').on('keyup paste', event => {
			Ember.run.scheduleOnce('afterRender', this, () => {
				if (this.get('_previousValue') !== event.target.value && this.getAttr('onChange')) {
					this.set('_previousValue', event.target.value);
					this.getAttr('onChange')(event.target.value);
				}
			})
		});
	},

	didReceiveAttrs(attrs){
		this._super(attrs);
		this.set('_previousValue', attrs.newAttrs.value);
	},

	intValue: computed('value', {

		set(key, value) {
			const parsedValue = parseFloat(value);
			const formattedValue = isNaN(parsedValue) ? '' : d3.format(',')(parsedValue);
			this.set('value', formattedValue);
			return value;
		},

		get() {
			var value = this.get('value');
			var intValue = /^[0-9,]+$/.test(value) ? parseFloat(value && value.replace ? value.replace(/,/g, '') : value) : NaN;
			if (isBlank(value)) {
				return null;
			} else {
				if (isNaN(intValue)) {
					const newValue = this.$('input').val().replace(/\D/g, '');
					const formattedNewValue = d3.format(',')(newValue);
					this.$('input').val(formattedNewValue);
					this.set('value', formattedNewValue);
					return parseFloat(newValue);
				} else {
					return intValue;
				}
			}
		}

	}),

	// intValue: computed('value', {

	// 	set(key, value) {
	// 		if (value !== this.get('intValue')) {
	// 			this.set('value', value);
	// 		}
	// 		return value;
	// 	},

	// 	get() {
	// 		var value = this.get('value');
	// 		var intValue = parseFloat(value);
	// 		if (isBlank(value)) {
	// 			return null;
	// 		} else {
	// 			return isNaN(intValue) ? NaN : intValue;
	// 		}
	// 	}

	// }),

	floatValue: computed('value', {

		set(key, value) {
			if (value !== this.get('floatValue')) {
				this.set('value', value);
			}
			return value;
		},

		get() {
			var value = this.get('value');
			var floatValue = parseFloat(value);
			if (isBlank(value)) {
				return null;
			} else {
				return isNaN(floatValue) ? NaN : floatValue;
			}
		}

	}),

	arrayValue: computed('value', {

		set(key, value = []) {
			var currentValue = this.get('value') || '';
			if (value === null) {
				return value;
			}
			if (value.join(',') === currentValue) {
				return value;
			} else {
				this.set('value', value.map((str) => {
					return str.trim();
				}).join(','));
				return value;
			}
		},

		get() {
			return this.get('value') ? this.get('value').split(',').map((str) => {
				return str.trim();
			}) : [];
		}

	})
});