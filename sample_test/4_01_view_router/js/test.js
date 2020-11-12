console.log("test 4-1 view router");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

// ■Vueインスタンス前に定義する
Vue.component('fruits-list-title', {
    template: "<h1>フルーツ一覧</h1>"
});

Vue.component('fruits-list-descripttion', {
    template: "<p>季節の代表的なフルーツの一覧です。</p>"
});

Vue.component('fruits-list-table', {
    template: `
    <table>
        <tr>
        <th>季節</th>
        <th>フルーツ</th>
        </tr>
        <tr>
        <td>春</td>
        <td>いちご</td>
        </tr>
        <tr>
        <td>夏</td>
        <td>スイカ</td>
        </tr>
        <tr>
        <td>秋/td>
        <td>ぶどう</td>
        </tr>
        <tr>
        <td>冬/td>
        <td>みかん</td>
        </tr>     
    </table>
    `
});

const vm = new Vue({
    el: "#fruits-list",

    components: {
        'fruits-list-title': {
            template: '<h1>フルーツ一覧</h1>'
        }
    },

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



