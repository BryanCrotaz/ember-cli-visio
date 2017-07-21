import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';

const {computed} = Ember;

const ObjectPromiseProxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

export default Ember.Component.extend(ParentMixin, {
  src: null,

  _lastSrc: null,

  _snapSvg: null,

  didReceiveAttrs() {
    this._super();
    const old = this.get("_oldAttrs") || {};
    const attrs = this.attrs || {};
    this.set("_oldAttrs", attrs);
    if (attrs.src !== old.src) {
      this._loadSvg();
    }
  },

  didLoadSvg(svg) {
    // correct the aspect of the containing div
    var x,y,w,h = 0;
    svg.selectAll("g").forEach(function(elm){			
      if(elm.node.attributes["v:groupContext"] && elm.node.attributes["v:groupContext"].value === "foregroundPage") {
        const visioPage = elm.node;
        x = visioPage.getBBox().x;
        y = visioPage.getBBox().y;
        w = visioPage.getBBox().width;
        h = visioPage.getBBox().height;
      }
    });
    const element = this.$();
    element.height( element.width() * h / w );
  },

  _loadSvg() {
    const src = this.get("src");
    const lastSrc = this.get("_lastSrc");
    if (src === lastSrc)
    {
      return;
    }
    if (src)
    {
      Ember.RSVP.cast($.get(src))
      .then(svg => {
        this.set("_lastSrc", src);
        Ember.run.schedule("afterRender", () => {
          // inject the svg into the DOM
          const element = this.get('element');
          element.appendChild(svg.documentElement);
          // set up Snap to parse the svg
          const snapSvg = Snap(element.lastChild);
          this.set("_snapSvg", snapSvg);
          // tell our descendants
          this.didLoadSvg(snapSvg); 
          // now tell the children
          this.get('childComponents').invoke('didLoadSvg', snapSvg);
        });
      });
    }
  }

});
