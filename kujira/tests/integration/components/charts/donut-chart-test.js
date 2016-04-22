import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/donut-chart', 'Integration | Component | charts/donut chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{charts/donut-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#charts/donut-chart}}
      template block text
    {{/charts/donut-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
