import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visio-svg-display', 'Integration | Component | visio svg display', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visio-svg-display}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visio-svg-display}}
      template block text
    {{/visio-svg-display}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
