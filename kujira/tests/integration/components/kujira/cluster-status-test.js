import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('kujira/cluster-status', 'Integration | Component | kujira/cluster status', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{kujira/cluster-status}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#kujira/cluster-status}}
      template block text
    {{/kujira/cluster-status}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
