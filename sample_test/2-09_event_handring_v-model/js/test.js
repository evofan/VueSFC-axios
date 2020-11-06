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

// ■イベントハンドリング（v-model）
// v-modelでもv-on同様の事が出来る
// 1つ1つの入力箇所にv-on:を記載するのは手間なので、v-modelで簡潔に記載出来る

// v-modelは双方向データバインディングを実現するディレクティブである＝ビュー（DOM）の変更をVueインスタンスにも反映出来る
// （Vueインスタンス側のデータに更新があった場合はビュー側に反映される＝再レンダリングする）

// <input type="number" v-model="item.quantity" min="0">

// v-on:changeと同じ振る舞いをする場合は、
// <input type="number" v-model.lazy="name" min="0">を使う＝ディレクティブ.修飾子(modifier)

