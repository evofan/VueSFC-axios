console.log("test 3-4 component design");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

let headerTemplate = `<div style="color:gray">
    <slot name="header">No title</slot>
</div>`;

let contentTemplate = `<div style="color:gray">
    <slot name="content">No contents</slot>
</div>`;


// ■Vueインスタンス前に定義する
Vue.component('page-header', {
    template: headerTemplate
});

Vue.component('page-content', {
    template: contentTemplate
});


const vm = new Vue({
    el: "#fruits-list",
    data() {
        return {
            //
        }
    }
});



// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;


// ■コンポーネントの設計
// 構造例：ツリーで妥当な範囲まで分割して考える
// ・ルート
// 　・ナビゲーションバー
// 　・サイドバー
//　　　・カテゴリx3
// 　・メイン
//　　　・アイテムx3


// ■コンポーネント自体の設計
// 再利用性（別の所でも外部から使える）を考えて設計する、蜜結合させてしまうと後で困るので注意


// ■Atomicデザインという考え方
// ・Atoms ... ボタン、ラベル、カラー、フォント等の最小構成要素
// ・Molecules ... 複数のAtomsを構成したもので、ラベル付きのフォーム等
// ・Organisms ... Moleculesを複数にしたもので、ログインフォームやナビゲーションバー等
// ・Templates ... Organismsを組み合わせたもので、ワイヤフレームや、ページの構成が分かるもの
// ・Pages ... 実際のデータをtemplatesに当てはめたもの、ページそのもの


// ■スロットコンテンツを生かしたヘッダーコンポーネントの作成
// webアプリケーションのヘッダーを、再利用可能なコンポーネントとして作成してみる

// pageという親コンポーネントの下にpage-headerと、ページのコンテンツを配置する
/*
<page>
    <page-header></page-header>
    <!--ページのコンテンツ-->
</page>
*/

// コンポーネント間の通信を使うほど複雑ではないので、
// ★スロットコンテンツという、親コンポーネント毎に子コンポーネントの内容を書き換えられる仕組みを使う
/*
let headerTemplate = `<div style="color:gray">
    <slot name="header">※親から何も受け取ってない場合、この文字が表示されます</slot>
</div>`

Vue.component('page-header', {
    template: headerTemplate
});

new Vue({
    el: "#fruits-list"
});
*/

// ■親コンポーネントからは、以下のように子コンポーネントに対し埋め込みを行う
/*
<div id="fruits-list">
    <page-header>
        <h1 slot="header">夏の果物</h1>
    </page-header>
    <ul>
        <li>スイカ</li>
        <li>マンゴー</li>
    </ul>
</div>
*/

// 実際にレンダリングされるHTMLは下記のようになる
/*
<div id="fruits-list">
    <div style="color:gray">
        <h1>夏の果物</h1>
    </div>
    <ul>
        <li>スイカ</li>
        <li>マンゴー</li>
    </ul>
</div>
*/

// 冬になってヘッダーを冬用に変更する場合
/*
<div id="fruits-list">
    <page-header>
        <h1 slot="header">冬の果物</h1>
    </page-header>
    <ul>
        <li>りんご</li>
        <li>イチゴ</li>
    </ul>
</div>
*/


// ■実際の例では、ヘッダーとコンテンツそれぞれにスロットを設置し、CSSでスタイルを定義する


