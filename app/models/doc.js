import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  title: DS.attr('string'),
  _id: DS.attr('string')
});
