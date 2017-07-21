import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('visio-shape-text', 'Integration | Component | visio shape text', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{visio-shape-text}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#visio-shape-text}}
      template block text
    {{/visio-shape-text}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
