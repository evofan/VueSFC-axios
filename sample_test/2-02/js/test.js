console.log("test 2-2");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

/* 定義されていない場合はエラーが出る
test.js:4 Assertion failed: console.assert
(anonymous) @ test.js:4
test.js:6 Uncaught ReferenceError: Vue is not defined
    at test.js:6
*/

const app = new Vue({ // Vueのインスタンスを作成
    el: '#app',　// VueインスタンスをマウントするDOM要素（getElementByID等で取得したオブジェクト又はCSSのセレクタ文字列）
    data() {
        return {
            message: "こんにちは"
        };
    }
});

Vue.config.devtools = true;

// 実際はwebpackなどのバンドルツールで全体の環境構築を行う事が多いが、テストはscriptで読み込みでおｋ

// ■インスタンス内のオプションオブジェクト
// data ... UIの状態・データ
// el ... Vueインスタンスをマウントする要素
// filters ... データを文字列として整形する
// methods ... イベントなどのメソッド
// computed ... データから派生して算出される値

// ■MVVMパターン ... Model-View-ViewModelの略語
// ・Model - 内部処理やビジネスロジック
// ・View  - 見た目のレイアウト
// ・ViewModel - Viewを実現する為の情報管理を行う

// ■コンポーネント
// Vue内でインスタンスを分割、後出


// elプロパティでなくmountメソッドでも可能
/*
const app = new Vue({
    //
});
vm.$mount(el)
*/

// Vue.jsを既存のアプリケーションに導入する場合、同じようにDOM要素にマウントする
// 但し、Vue.jsのテンプレート記法（@clickや:disabled等）が組み込み先によってはエラーになる可能性がある
// ので、v-on:clickや、v-bind:disabledの様に省略しない書き方をする必要がある（v-～はHTMLの文法になるのでエラーにならない）

