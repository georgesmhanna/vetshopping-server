const subtractLight = (color, amount) => ***REMOVED***
  const cc = parseInt(color,16) - amount;
  let c = (cc < 0) ? 0 : (cc);
  c = (c.toString(16).length > 1 ) ? c.toString(16) : `0$***REMOVED***c.toString(16)***REMOVED***`;
  return c;
***REMOVED***;

export const darken = (colour, amount) => ***REMOVED***
  let color = (colour.indexOf("#")>=0) ? colour.substring(1,colour.length) : colour;
  const percentage = parseInt((255*amount)/100, 10);
  color = `#$***REMOVED***subtractLight(color.substring(0,2), percentage)***REMOVED***$***REMOVED***subtractLight(color.substring(2,4), percentage)***REMOVED***$***REMOVED***subtractLight(color.substring(4,6), percentage)***REMOVED***`;
  return color;
***REMOVED***;
