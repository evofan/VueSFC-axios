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

// ■イベントハンドリング（v-on）
// v-onでイベントが起きた時に属性値の式を実行出来る＝addEventListenerと同様
// v-on:イベント名="式として実行したい属性値"

// v-onの省略表記
// v-on:を@に置き換え可能、v-on:click -> @click

