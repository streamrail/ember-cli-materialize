import Ember from 'ember';

export function toString(params/*, hash*/) {
  return params[0] + '';
}

export default Ember.Helper.helper(toString);