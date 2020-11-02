console.log("test 2-9");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

let item_ary = [
    {
        name: "鉛筆",
        price: 300,
        quantity: 1
    },
    {
        name: "ノート",
        price: 400,
        quantity: 0
    },
    {
        name: "消しゴム",
        price: 500,
        quantity: 0
    },
];

const vm = new Vue({
    el: "#app",

    data() {
        return {
            // キー：値
            items: item_ary,
            loggedInButton: "ログイン済みの為、購入出来ます" // マウスオーバー時に表示される
        }
    },

    filters: {
        NumberWithDelimiter: function (value) {
            if (!value) { return }
            return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,'); // 三桁毎にカンマを入れる
        }
    },

    computed: {
        totalPrice: function () { // ★関数を定義したが呼び出す時はプロパティで＝()無しで呼び出し
            // this経由でインスタンス内のデータにアクセス
            return this.items.reduce((sum, item) => { return sum + (item.price * item.quantity) }, 0);
        },
        totalPriceWithTax: function () {
            // 算出プロパティに依存した算出プロパティも定義可能
            return Math.floor(this.totalPrice * 1.10); // thisはvueインスタンス自身を差す
        },
        canBuy: function () {
            return this.totalPrice >= 1000
        },
        errorMessageStyle: function () {
            return {
                border: this.canBuy ? '' : '1px solid red',
                color: this.canBuy ? '' : 'red'
            }
        }
    }
});

// vm.$mount();

// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;


// ■ディレクティブ
// HTMLに独自の属性を追加して、DOM操作を行う事、v-で始まる属性名で指定する
// 属性値にはJavaScriptの式（Vueインスタンスのdataや算出プロパティ）を指定する

// ディレクティブを使う事で、条件に応じた表示の切り替えや、繰り返しレンダリング等が出来る

// ディレクティブには、v-bind:class～のように特殊な指定方法のものもある

// ディレクティブはムスタシュ表記と並んでVueでよく使われるので覚えておく

// ・条件付きレンダリング（v-if, v-show）
// テンプレート中の要素の表示・非表示を切り替えたい時に使用する
/*
<p v-if="引数">
    // 真なら表示、偽なら非表示、★DOM要素に対して使用、コストはv-showより高い、式の評価結果が余り変わらない時に使用する（ログインしてるかどうか等）
</p>

<p v-show="引数">
    // 真なら表示、偽なら非表示、★スタイルのdiplay:に対して使用、頻繁に式の評価結果が変わる時に使用
</p>
*/


// ■クラスとスタイルのバインディング
// UIの実装で警告を赤い字で出す時等、スタイルを変えたい場合に使用

// 表記方法
// v-bind:属性名="データを展開した属性値"、属性名にclassやスタイルを使用する事で見た目を変えられる

// 属性値の解釈は、vue独特のものになる
// v-bind:class="オブジェクトor配列"
// v-bind:style="オブジェクトor配列"
// ★オブジェクトまたは配列で指定した内容が、結合され、文字列として評価される


// ・クラスのバインディング（v-bind:class=""）
// 値が真のプロパティ名を適用する
// <p v-bind:class="{shark: true, mecha false}"></p> ... sharkのクラスを適用

// 実用的な例では、
// <p v-bind:class="{error: !canBuy}">1000円以上からご購入頂けます。</p> ... canBuyがfalseの時にerrorクラスを適用する

// 規模が大きくなった時は、テンプレート内に直接記述するのではなく、算出プロパティとしてVueインスタンス内に記述するのが良い
/*
computed :{
    errorMessageClass: function() {
        return {
            error: !this.canBuy
        }
    }
}
<p v-bind:class="errorMessageClass">1000円以上からご購入頂けます。</p>
*/


// ・スタイルのバインディング（v-bind:style=""）
// 属性値のオブジェクトの「プロパティ：値」が、CSSの「プロパティ：値」になる
/*
<p v-bind:style="{color: red}">a</p>
*/

// 式と組み合わせて使用可能
/*
<p v-bind:style="{border: {canBuy ? '' : '1px solid red'}, color: {canBuy ? '' : 'red'}}">">1000円以上からご購入頂けます。</p>
*/

// 上記のように複雑な場合、算出プロパティに移した方がよい
/*
computed :{
    errorMessageStyle: function() {
        return {
            border: {canBuy ? '' : '1px solid red'},
            color: {canBuy ? '' : 'red'}
        }
    }
}
<p v-bind:style="errorMessageStyle">1000円以上からご購入頂けます。</p>
*/

// v-bindの省略記法
// v-bind:style="{color: red}" -> :style="{color: red}"
// v-bind:class="{error: !canBuy}" -> :class="{error: !canBuy}"


