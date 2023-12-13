import { LitElement, html, css } from 'lit';

export class InputComponent extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        flex: 1;

      }

      input {
        width: 90%;
        height: 5rem;
        display: block;
        border-radius: 1rem;
        border: none;
        outline: none;
        font-family: 'Sunshiney', cursive;
        font-weight: bold;
        font-size: 2.5rem;
        color: black;
        padding-left: 3rem;
        text-transform: capitalize;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: String }
    }
  }


  render() {
    return html`
    <input type="text" placeholder="Nombre del produto" @input="${this.inputKeyDown}" .value="${this.value}"/>
    `;
  }

  inputKeyDown(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('keydown', {
      detail: this.target
    }));
  }
  


}
customElements.define('input-component', InputComponent);
