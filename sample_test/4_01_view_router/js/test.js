console.log("test 4-1 view router");

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


// ■Vue Router、公式プラグイン
// 単体のビュー層ライブラリであるVue.jsだけでは複数ページのインタラクションをもたらすのは難しいので、
// 公式のVuew Routerを組み込んで、URL遷移を伴う動作を実現出来る


// ■Single Page Application（SPA）
// 初めに1つのページ（HTML）をロードし、以後はユーザーのインタラクションに応じてAjaxでデータをロードし、
// 動的にページを更新するアプリケーションの事

// SPA構築時に留意するべきこと
// ・クライアント側でのページ遷移、履歴管理
// ・非同期通信によるデータ取得
// ・Viewのレンダリング
// ・モジュール化されたコードの管理

// ■Vue Routerとは
// Vue.js上でのルーティング（ページ遷移等）を行う公式ライブラリ
// ・宣言的にページ遷移のルールを定義する
// ・リンククリック時に対応するVueのコンポーネントを表示する

// ページ遷移以外では、
// ・ネスト↓ルーティング
// ・リダイクレトとエイリアス
// ・HTML5 History APIと、URL Hashによる履歴管理
// ・自動的にCSSクラスがアクティブになるリンクの仕組み
// ・Vue.jsのトランジッションを使った遷移時のエフェクト
// ・スクロールの振る舞いのカスタマイズ


// ■ルーティングの基礎

// ルーターのインストール
// ※今回はCDNで

// ルーティング設計
// ルーティングを実装するには、ルートとコンストラクタを使う

// ・ルート
// 　→このURLの時はこのページを表示するという情報
// 　　/goodsのアドレスなら、goodsコンポーネントを表示する等

// ・コンストラクタ
// 　→ルーターコンストラクタを用いて、ルーター初期化時にrouteオプションに設定する

// HTML側
// router-view要素にレンダリングされるので、それを埋め込む



