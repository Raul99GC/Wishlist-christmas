import { LitElement, css, html } from 'lit';

export class WishlistComponent extends LitElement {

  static get properties() {
    return {
      productsList: { type: Array },
      value: { type: String }
    }
  }

  constructor() {
    super()
    this.productsList = []
    this.value = ''
  }

  static get styles() {
    return css`
    :host {
      box-sizing: border-box;
      background-color: black;
      display: block;
      height: 100%;
    }
    
    .main-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

    }

    hr {
      border: none;
      height: 1px;
      margin: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
    }

    .wishlist-container {
      box-sizing: border-box;
      height:auto;
      padding: 3rem;
      flex: 1;
      background: radial-gradient(circle at center, #c55146, #531c17);
      margin: 0 3rem;
      width: calc(100% - 6rem);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .title {
      color: white;
      font-size: 5rem;
      text-align: center;
    }

    .image_wrapper {
      width: 15%;
    }

    .wishlist_collection {
      margin-top: 2.5rem;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .wishlist-card {
      position: relative;
      box-sizing: border-box;
      max-width: 30rem;
      height: 37rem;
      background-color: #E6DFD7;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .wishlist-border {
      height: 100%;
        border: 2px solid black;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .wishlist-title {
        font-size: 2.5rem;
        font-weight: bold;
        font-weight: 600;
        color: black;
        margin-bottom: 1rem;
    }

    .wishlist-image {
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
    }

    img {
      width: 70%;
      border-radius: 1rem;
    }

    .label {
        color: #4B5563;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        display: block;
    }

    .select-container {
        position: relative;
        width: 70%;
    }

    .wishlist-select {
        width: 100%;
        background-color: transparent;
        color: #4B5563;
        padding: 0.75rem 1rem;
        border-radius: 0.375rem;
        border: 1px solid #9CA3AF;
        outline: none;
    }

    .select-icon {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        padding: 0 0.75rem;
        color: #4B5563;
    }

    .action-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        width: 60%;

    }

    .btn {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: 700;
      border-radius: 0.6rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-done {
        background-color: #E53E3E;
        color: white;
        box-shadow: 0 4px #C53030;
    }

    .btn-remove {
        background-color: #2D3748;
        color: white;
        box-shadow: 0 4px #1A202C;
    }

    .btn-done:hover {
        background-color: #C53030;
    }

    .btn-remove:hover {
        background-color: #1A202C;
    }

    .done-message {
        font-size: 0.75rem;
        color: #9CA3AF;
        text-align: center;
    }

    .done-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: background-color 2s, backdrop-filter 2s; /* Transiciones de 2s */
      pointer-events: none; /* Para que los eventos del overlay no interfieran */
      z-index: 1; /* Asegúrate de que esté encima del contenido de la tarjeta */
    }

    .article-done {
      pointer-events: none; /* Para que los eventos del overlay no interfieran */
    }

    .article-done .done-overlay {
      background-color: rgba(46, 204, 113, 0.5); /* Color verde suave con más opacidad */
    }
    
    `
  }

  render() {

    const productsListArr = []

    this.productsList.forEach((tarea, i) => {
      productsListArr.push(
        html`
          <article class="wishlist-card">
            <div class='wishlist-border'>
                <p class="wishlist-title">${tarea}</p>
                <div class="wishlist-image">
                  <img src="../images/incognit.jpeg" alt="Christmas tree with decorations, gifts, and a Santa hat illustration" />
                </div>
                <div class="select-container">
                    <select id="image" class="wishlist-select">
                      <option>Image?</option>
                    </select>
                    <div class="select-icon">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div class="action-buttons">
                  <button class="btn btn-done" @click=${this.doneClick} .value="${tarea}">Done</button>
              </div>
              <div class="done-overlay"></div>
            </div>
          </article>
        `
      )
    })

    return html`
    <div class='main-container'>
      <herader-component @keydown="${this.inputKeyDown}" value=${this.value} @addToWishlist="${this.addToWishlist}"></herader-component>
      <hr/>

      <div class='wishlist-container'>
        <h2 class='title'>My Wish List</h2>
        <div class='image_wrapper'>
          <slot slot='santa-img'></slot>
        </div>
        <div class='wishlist_collection'>

        ${productsListArr}


        </div>
        
      </div>
      
    </div>
    `
  }

  doneClick(e) {
    const word = e.target.value;
    const button = e.target;
    const article = button.closest('.wishlist-card'); // Busca el elemento padre con la clase .wishlist-card
    if (article) {
      article.classList.add('article-done');
      setTimeout(() => {
        const newArr = this.productsList.filter((item) => item !== word);
        article.classList.remove('article-done');
        console.log(newArr);
        this.productsList = newArr;
      }, 2000);
  
      
    }
  }

  addToWishlist(e) {
    console.log(e)
    this.productsList.push(this.value);
    this.resetTexto(e);
  }

  inputKeyDown(e) {
    this.value = e.target.value;
    if (e.key === 'Enter') {
      this.productsList.push(this.value);
      console.log(this.productsList)
      this.resetTexto(e);
    }
  }

  resetTexto(e) {
    this.value = '';
    e.target.value = '';
  }

}
customElements.define('wishlist-component', WishlistComponent);
