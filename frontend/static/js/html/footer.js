class Footer extends HTMLElement{

    connectedCallback(){
        this.innerHTML = `
            <div id="footer" class="footer">COPYRIGHT © 2022 台北一日遊</div>
        `;
    };
    
};

customElements.define("main-footer", Footer);