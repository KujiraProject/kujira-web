import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('kujira/info-box', 'Integration | Component | kujira/info box', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{kujira/info-box}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#kujira/info-box}}
      template block text
    {{/kujira/info-box}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
