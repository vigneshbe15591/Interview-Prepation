import * as javascript from "./javascript";
import * as typescript from "./typescript";
import * as react from "./react";
import * as angular from "./angular";
import * as html5 from "./html5";
import * as css3 from "./css3";
import * as nodejs from "./nodejs";

export const topics = [html5, css3, javascript, typescript, react, angular, nodejs];

export function getTopic(id) {
  return topics.find((t) => t.meta.id === id);
}
