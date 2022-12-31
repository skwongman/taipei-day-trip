class LoadingEffect extends HTMLElement{

    connectedCallback(){
        this.innerHTML = `
        <div class="loading">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>
        `;
    };
    
};

customElements.define("main-loading-effect", LoadingEffect);