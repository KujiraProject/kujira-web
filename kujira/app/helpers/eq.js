import Ember from 'ember';

export function eq(params) {
  if (params[0] === params[1]) {
      return true;
  }
  return false;
}

export default Ember.Helper.helper(eq);
