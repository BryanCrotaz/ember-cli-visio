import Ember from 'ember';
import layout from './template';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  layout,
  tagName: '',

  didLoadSvg(svg) {
    svg.selectAll("g[id^=shape]")
    .forEach( function(elm, i) {
      const shapeType = elm.node.attributes["shapeType"].value;
      if (shapeType == "Rectangle") {
        elm.select("rect").addClass("offline");
      } 
    });
  }

});
