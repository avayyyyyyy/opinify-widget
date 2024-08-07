import React from "react";
import ReactDOM from "react-dom";
import { CustomWidget } from "./components/custom-widget";

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const container = document.createElement("div");
    this.shadowRoot?.appendChild(container);
    ReactDOM.render(
      React.createElement(CustomWidget, {
        projectid: props.projectid,
        ...props,
      }),
      container
    );
  }

  getPropsFromAttributes() {
    const props: { [key: string]: string } = {};
    for (const attr of Array.from(this.attributes)) {
      props[normalizeAttribute(attr.name)] = attr.value;
    }
    return props;
  }
}

customElements.define("widget-web-component", WidgetWebComponent);
export default WidgetWebComponent;
