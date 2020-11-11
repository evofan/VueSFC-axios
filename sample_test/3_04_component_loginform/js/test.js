console.log("test 3-4 login form");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

let auth = {
    login: function (id, pass) {
        window.alert("userid: " + id + "  password: " + pass);
    }
}

// ■Vueインスタンス前に定義する
Vue.component('user-login', {
    template: '#login-template',
    data() {
        return {
            userid: '',
            password: ''
        }
    },
    methods: {
        login: function () {
            auth.login(this.userid, this.password)
        }
    }
});


const vm = new Vue({
    el: "#login-example",
    data() {
        return {
            //
        }
    }
});



// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;


// ■ログインフォームコンポーネントの作成
// 