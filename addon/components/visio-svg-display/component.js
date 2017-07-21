import Ember from 'ember';
import DisplaySvg from '../svg-display/component';

export default DisplaySvg.extend({
  _svgShapes: null,

  init() {
    this._super(...arguments);
    this.set('_svgShapes', []);
  },

  didLoadSvg(svg) {
    this._super(...arguments);
    // move the title field to shapeType
    svg.selectAll("g").forEach( function(shapeNode, i) {
      if(shapeNode.select("title") && shapeNode.select("title").node) {
        var type = shapeNode.select("title").node.textContent; // get the title
        shapeNode.attr("shapeType", type.split('.', 1)[0]); // save the title in our own attribute
        shapeNode.select("title").remove(); // remove the original title
      }
    });

    const svgShapes = [];
    // find all the shapes
    svg.selectAll("g[id^=shape]") // select all the viso shapes (includes connectors)
    .forEach( function(shapeNode, i) {
      if (!shapeNode.node.attributes["shapeType"])
        {
          return;
        }
      // we have each visio shapes
      const shape = {
        svg: shapeNode,
        type: shapeNode.node.attributes["shapeType"].value,
        props: {}
      };
      
      // add css classes to separate shapes and connectors
      if (shape.type.endsWith("connector"))
      {
        shape.svg.addClass("connector");
      }
      else
      {
        shape.svg.addClass("shape");
      }

      // get the visio custom properties
      const props = shape.props;
      if( shapeNode.select("custProps") ) {
        var visioProps = shapeNode.select("custProps").selectAll("cp");
        for(var i=0; i<visioProps.length; i++) {
          if( visioProps[i].node.attributes["v:lbl"] && visioProps[i].node.attributes["v:val"] ) {
            const key = visioProps[i].node.attributes["v:lbl"].value;
            const value = visioProps[i].node.attributes["v:val"].value;
            props[key] = value.slice(4).slice(0,-1); // remove VT4(...)
          }
        }
      }
      svgShapes.push(shape);
    });
    this.set("_svgShapes", svgShapes);
  }
});
