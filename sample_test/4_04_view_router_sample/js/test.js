console.log("test 4-5 view routerサンプル");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

// ルーターの定義
let router = new VueRouter({
    // コンポーネントをマッピングしたルート定義を配列で返す
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページです</div>'
            }
        },
        {
            path: '/users',
            component: {
                template: '<div>ユーザー一覧ページです</div>'
            }
        }

    ]
});

const vm = new Vue({
    el: "#app",

    router: router,

    data() {
        return {
            // キー：値
        }
    }
});



// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;


// ■例として、簡易的なユーザー情報登録・閲覧が可能なSPAを作成する
// （サーバー側のAPIについては割愛

// 「トップページ」
// 「ユーザー一覧ページ」→「ユーザー詳細ページ」
// 「新規ユーザー登録」（ログイン無し＝/login / ログイン有り＝/users/new）