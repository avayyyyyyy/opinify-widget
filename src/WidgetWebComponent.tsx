import { createRoot } from "react-dom/client";
import React from "react";
import { CustomWidget } from "./components/custom-widget";

export const normalizeAttribute = (attribute: string): string => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

interface WidgetProps {
  [key: string]: string;
}

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const root = createRoot(this.shadowRoot as ShadowRoot);
    root.render(
      React.createElement(CustomWidget, {
        projectid: props.projectid,
        ...props,
      })
    );
  }

  getPropsFromAttributes(): WidgetProps {
    const props: WidgetProps = {};
    for (const attr of Array.from(this.attributes)) {
      props[normalizeAttribute(attr.name)] = attr.value;
    }
    return props;
  }
}

customElements.define("widget-web-component", WidgetWebComponent);

export default WidgetWebComponent;
