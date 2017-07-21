import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

export default Ember.Component.extend(ChildMixin, {
  tagName: '',

  _oldClass: '',
  _selected: null,

  didLoadSvg(svg) {
    this._findSelectedSvgElements();
    this._styleSvg();
  },

  didUpdateAttrs() {
    this._super();
    const old = this.get("_oldAttrs") || {};
    const attrs = this.attrs;
    this.set("_oldAttrs", attrs);
    let filterChanged = false;
    if (attrs.shapeType !== old.shapeType)
    {
      filterChanged = true;
    }
    else
    {
      for (var key in attrs)
      {
        if (key.startsWith('prop')) {
          if (attrs[key] !== old[key]) {
            filterChanged = true;
            break;
          }
        }
      }
    }
    if (filterChanged)
    {
      this._findSelectedSvgElements();
    }
    if (filterChanged || attrs.addClass !== old.addClass)
    {
      this._styleSvg();
    }
  },

  willDestroyParent() {
    // this component is being destroyed and we know that the parent is not yet destroyed
    this._clearSvg();
  },

  _findSelectedSvgElements() {
    const svgShapes = this.get("parentComponent._svgShapes");
    const shapeType = this.get("shapeType");
    const props = {};
    for (var key in this.attrs)
    {
      if (key.startsWith('prop')) {
        props[key.slice(4)] = this.attrs[key];
      }
    }
    this.set("_oldSelected", this.get("_selected"));
    let selected = [];

    for (let shape of svgShapes) {
      // filter by type
      if (!shapeType || shape.type === shapeType) {
        
        // filter by properties
        let propMatch = true;
        for(let key in props)
        {
          if (!shape.props.hasOwnProperty(key) || shape.props[key] !== props[key])
          {
            propMatch = false;
            break;
          }
        }
        if (propMatch) {
          selected.push(shape.svg);
        }
      }
    }
    this.set("_selected", selected);
  },

  _styleSvg() {
    const newClass = this.get("addClass");
    const oldClass = this.get("_oldClass");

    const oldSelected = this.get("_oldSelected");
    if (oldSelected) {
      for (var elm of oldSelected)
      {
        elm.removeClass(oldClass);
      }
      this.set("_oldSelected", null);
    }
    const selected = this.get("_selected");
    this.set("_oldClass", newClass);
    if (selected)
    {
      for (var elm of selected)
      {
        elm.removeClass(oldClass);
        elm.addClass(newClass);
      }
    }
  },

  _clearSvg() {
    const oldClass = this.get("_oldClass");
    const selected = this.get("_selected");
    if (selected)
    {
      for (var elm of selected)
      {
        elm.removeClass(oldClass);
      }
    }
  }

});