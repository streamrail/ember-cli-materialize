import MaterializeInput from './md-input';
import layout from '../templates/components/md-input-hour';

export default MaterializeInput.extend({
  layout,

  selectMonths: true,
  numberOfYears: 15,
  autoFormat: true,
  dateFormat: 'YYYY-MM-DD',
  inputDateFormat: 'DD MMMM[,] YYYY',

  didInsertElement() {
    this._super(...arguments);
    this._setupPicker();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._teardownPicker();
  },

  _setupPicker() {
    this.$('.clockpicker').pickatime({
    	autoclose: true,
    	twelvehour: false,
    	afterDone: () => {
    		if (this.getAttr('onChange')) {
    			this.getAttr('onChange')(this.$('.clockpicker').val());	
    		} else {
    			this.set('value', this.$('.clockpicker').val());
    		}
    	}
  	});
    // .pickadate(Ember.$.extend(hourPickerOptions, {
    //   onSet: _onDateSet,
    //   onClose: _onClose
    // }));
    var value = this.getAttr('value');

    this.updateHourPicker({
      value
    });
  },

  _teardownPicker() {
    const $pickadate = this.$('.clockpicker').data('clockpicker').remove();
    if ($pickadate) {
      $pickadate.stop();
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    var value = this.getAttr('value');
    this.updateHourPicker({
      value
    });
  },

  updateHourPicker(options) {
    var { value } = options;
    if (value) {
      this.$('.clockpicker').val(value || this.getAttr('default') || '');
    }
  }

});
