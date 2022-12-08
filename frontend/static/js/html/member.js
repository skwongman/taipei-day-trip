class Member extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <div id="layer" class="layer"></div>

            <div id="signin-frame" class="signin-frame">
                <div class="signin-menu">
                    <img id="signin-close" class="signin-close" src="/img/icon_close.png">
                    <div class="signin-cover"></div>
                    <div class="signin-title">登入會員帳戶</div>
        
                    <div class="signin-input-frame">
                        <input id="signinEmail" class="signin-input" type="text" placeholder="輸入電子信箱">
                    </div>
        
                    <div class="signin-input-frame">
                        <input id="signinPassword" class="signin-input" type="password" placeholder="輸入密碼">
                    </div>
        
                    <div class="signin-button-frame">
                        <div id="signin-button" class="signin-button">登入帳戶</div>
                    </div>
        
                    <div id="signinMessage"></div>
                    
                    <div class="signin-register">還沒有帳戶？<span id="signin-register-click" class="signin-register-click">點此註冊<span></div>
        
                </div>
            </div>
        
            <div id="register-frame" class="register-frame">
                <div id="register-menu" class="register-menu">
                    <img id="register-close" class="register-close" src="/img/icon_close.png">
                    <div class="register-cover"></div>
                    <div class="register-title">註冊會員帳戶</div>
        
                        <div class="register-input-frame">
                            <input id="registerName" class="register-input" type="text" name="name" placeholder="輸入姓名">
                            <p class="register-verify">抱歉！只能接受中文字母、英文字母(a-z)和數字(0-9)。</p>
                        </div>
        
                        <div class="register-input-frame">
                            <input id="registerEmail" class="register-input" type="text" name="email" placeholder="輸入電子信箱">
                            <p class="register-verify">抱歉！請輸入正確電子信箱格式。</p>
                        </div>
        
                        <div class="register-input-frame">
                            <input id="registerPassword" class="register-input" type="password" name="password" placeholder="輸入密碼">
                            <p class="register-verify">請設定8個字元或以上的密碼。</p>
                        </div>
        
                    <div class="register-button-frame">
                        <div id="register-button" class="register-button">註冊新帳戶</div>
                    </div>
        
                    <div id="registerMessage"></div>
        
                    <div class="register-signin">已經有帳戶了？<span id="register-signin-click" class="signin-register-click">點此登入</span></div>
                </div>
            </div>
        `;
    };
};

customElements.define("main-member", Member);