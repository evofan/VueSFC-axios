console.log("test 4-5 view routerサンプル");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

let userList = {
    template: '#user-list'
}

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
            component: userList
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

// ■4-4-2 APIによるデータ通信
// ★SPAでは、ページ遷移をした際に、APIを通じて取得したデータをUIに表示する処理が頻出する
// Vue RouterでAjaxによる非同期通信を行う場合は、
// ★createdとwatchを使って実装するのが一般的
// watchは算出プロパティを汎用的にしたVueコンポーネントのオプション
// （watchは$routeを監視して、ルートに変更がある度に処理を呼び出す）
// ★watchによる$routeの検出は頻出するパターン
