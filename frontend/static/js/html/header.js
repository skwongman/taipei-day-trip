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
                        <div id="booking" class="item">預定行程</a></div>
                        <div id="signin" class="item">登入/註冊</div>
                        <div id="signout" class="item inactive">會員中心
                        <div class="profile-popup-menu">
                            <div class="profile-popup-menu-inner-frame">
                                <a class="profile-popup-item" href="/profile">設定</a>
                            </div>
                            <div class="profile-popup-separator"></div>
                            <div class="profile-popup-menu-inner-frame">
                                <a id="profileSignout" class="profile-popup-item">登出</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
    
};

customElements.define("main-header", Header);