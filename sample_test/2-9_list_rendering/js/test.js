console.log("test 2-9");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

let item_ary = [
    {
        name: "鉛筆",
        price: 300,
        quantity: 5
    },
    {
        name: "ノート",
        price: 400,
        quantity: 1
    },
    {
        name: "消しゴム",
        price: 500,
        quantity: 2
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

// ■リストレンダリング（v-for）
// v-forで配列またはオブジェクトのデータをリストレンダリング（繰り返しレンダリング）出来る
// v-for=(要素 in 配列)

// v-bind:key="～"でユニークなキーを与えられる＝レンダリングパフォーマンスに影響するので必須
/*
temp_ary = ['あ', 'い', 'う'];
<ul>
<li v-for="item in temp_ary" v-bind:key="item">{{item}}</li>
</ul>
↓
<ul>
<li>あ</li>
<li>い</li>
<li>う</li>
</ul>
*/

// ・インデックス使用する場合
/*
temp_ary = ['あ', 'い', 'う'];
<ul>
<li v-for="(item, index) in temp_ary" v-bind:key="item">{{index}} {{item}}</li>
</ul>
↓
<ul>
<li>0 あ</li>
<li>1 い</li>
<li>2 う</li>
</ul>
*/

// ・オブジェクトに対してv-forを使用する場合
// v-for="値 in オブジェクト"
// v-for="(値, index) in オブジェクト"
