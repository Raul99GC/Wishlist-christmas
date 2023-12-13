import { LitElement, html, css } from 'lit';

export class HeraderComponent extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        height: 10rem;
        min-height: 10rem;
        padding-left: 3rem;
        padding-right: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: String },
      BtnValue: { type: String },
    }
  }

  constructor() {
    super()
    this.value = ''
  }

  render() {
    return html`
      <input-component value=${this.value} @keydown="${this.inputKeyDown}" ></input-component>
      <button-add-component value=${this.value} @addToWishlist="${this.handleButton}"></button-add-component>

    `;
  }

  inputKeyDown(e) {
    this.value = e.target.value;
  }



}
customElements.define('herader-component', HeraderComponent);
