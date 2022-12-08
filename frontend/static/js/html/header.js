class Header extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <div class="header-frame">
                <div class="header">
                    <div class="title">
                        <div class="item">
                            <div><a id="test" class="item-text" href="/">台北一日遊</a></div>
                        </div>
                    </div>
                    <div class="nav">
                        <div class="item">預定行程</div>
                        <div id="signin" class="item">登入/註冊</div>
                        <div id="signout" class="item inactive">登出系統</div>
                    </div>
                </div>
            </div>
        `;
    };
};

customElements.define("main-header", Header);