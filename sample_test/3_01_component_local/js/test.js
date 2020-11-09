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

// 例：（2）ローカルコンポーネント -（1）カスタムタグ方式
// Vue.component(タグネーム(=コンポーネント名), {オプション})

// globalは汚染等もあるので、特定のVueインスタンス内でしか使えないローカルコンポーネントを登録出来る。

// 親となるVueインスタンスや、Vueコンポーネントのオブジェクトにcomponentsオブジェクトを定義して使う



// ■テンプレートを構築するその他の手段
// ・text/x-template
// ・インラインテンプレート ... 説明無し
// ・描画関数
// ・JSX ... 5章コラム
// ・単一ファイルコンポーネント ... 6章

// text/x-template
/*
<script type="text/x-template" id="fruits-list-title"> ※標準化してないMIMEタイプには、x-をつける決まりになっている
    <h1>フルーツ一覧</h1>
</script>

Vue.component('fruits-list-title', {
    template: '#fruits-list-title'
});

*/

// ■描画関数
// renderオプションを使う事で、コンポーネント内でコードを使う事が出来る
/*
<div id="app">
    <input-date-with-today></input-date-with-today>
</div>

Vue.component('input-date-with-today', {
    render: function(createElement) {
        return createElement(
            'input',{
                attrs: {
                    type: 'data',
                    value: new Date().toISOString().substring(0, 10)
                }
            }
        )
    }
});

*/


// ■コンポーネントの命名規則
// ケバブケースを推奨


// ■コンポーネントのライフサイクル
// コンポーネントはVueインスタンスと同様に自身のライフサイクルとライフサイクルフックを持つ


// ■コンポーネントのデータ
// Vueインスタンスと同様に、Vueコンポーネントが持つデータをdataオプションで定義出来る
// ★Vueコンポーネントでは、dataは関数で定義する
/*
Vue.component('simple-counter', {
    template: '<h1>フルーツ一覧</h1>',
    data: function () {
        return {
            fruits: ['りんご', 'みかん']
        }
    }
});
*/

