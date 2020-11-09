console.log("test 3-1 component");

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

    data() {
        return {
            // キー：値
        }
    }
});



// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;


// ■UIコンポーネント
// ヘッダー、フッター、リンク、ログインボタン、フォーム等の画面を構成するパーツ（部品）

// ■コンポーネント化のメリット
// ・再利用性が高まり、開発効率が上がる、※クラスと同じような考え
// ・利用されている既存のコンポーネントを使う事で、品質を保てる
// ・コンポーネントを疎結合で作成する事により、保守性が高まる
// ・コンポーネントをカプセル化で作成する事により、開発の範囲が限定される（他に影響を及ぼさない）

// Vue.jsのコンポーネント＝Vueのインスタンス

// コンポーネントの表記
/*
Vue.component('list-item', {
    template : '<li>foo</li>'
});
*/

// コンポーネントの使用方法
/*
<ul id="example">
    <list-item></list-item> // ■コンポーネントをHTMLタグ名として記載
</ul>
*/

// VueコンポーネントはVueインスタンスでもあるので、テンプレート構文も使用可能
/*
Vue.component('list-item', {
    template : `<li>foo {{ contents }}</li>`
});
*/


// ■Vueコンポーネントの定義
// （1）グローバルコンポーネント（2）ローカルコンポーネント
// （1）カスタムタグ方式（2）サブコンストラクタ方式

// 例：（1）グローバルコンポーネント -（1）カスタムタグ方式
// Vue.component(タグネーム(=コンポーネント名), {オプション})

// オプション一覧
// {
//  data: ... UIお状態、データ
//  filters: ... データを文字列として整形する
//  methods: ... イベントが発生した時の振る舞い
//  computed: ... データから算出される値
//  template: ... コンポーネントのテンプレート ※コンポーネントで使用
//  props: ... 親から子へのデータの受け渡し ※コンポーネントで使用
//  created他: ... ライフサイクルハック
// }

// 親子コンポーネント
/*
Vue.component('fruits-list-title', { // ※子
    template: "<h1>フルーツ一覧</h1>"
});

Vue.component('fruits-list', { // ※親
    template: "<div><fruits-list-title></fruits-list-title></div>"
});
*/

// 例：（1）グローバルコンポーネント -（2）サブコンストラクタ方式
// Vue.extend()というグローバルAPIを使ってもコンポーネントを作成出来る
/*
let FruitsListTitle = Vue.extend({
    template: "<h1>フルーツ一覧</h1>"
});

new FruitsListTitle().$mount('#fruits-list');
//又は
Vue.component('fruits-list-tile', FruitsListTitle);
*/




