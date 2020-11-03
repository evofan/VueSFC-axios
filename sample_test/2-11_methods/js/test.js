console.log("test 2-11 methods");

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

    methods: {
        doBuy() {
            // 本来はここでサーバーとの通信を行う
            alert(this.totalPriceWithTax + "円のお買い上げ！");
            this.items.forEach(element => {
                element.quantity = 0;
            });
        }
    },

    computed: {
        totalPrice: function () {
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

// ■メソッド ... Vueインスタンスのメソッドとして機能する。データの変更や、サーバーにHTTPリクエストを送るのに使用
/*
methods: {
    メソッド名: function(){
        // 処理
    }
},
*/

// 定義されたメソッドはVueのインスタンスとして呼び出せる。
// よくある例は、v-onディレクティブの属性値にバインディングして、ビューのイベントが発生した時に呼び出す形
// テンプレート内でも、{{メソッド名}}の形で呼び出す事も出来る

// 例：ボタンを押した時の購入処理
//  <button v-bind:disabled="!canBuy" v-on:click="doBuy">購入</button>

// v-onディレクティブの属性値には、メソッドまたは式を指定出来る
// メソッド名を指定した場合、イベントオブジェクトがデフォルトの引数として渡される
// このイベントオブジェクトは、$eventで参照可能
//  <button v-bind:disabled="!canBuy" v-on:click="doBuy($event)">購入</button>


// ■イベントオブジェクト
// イベントオブジェクトには、イベントが発生した要素や座標等の情報が含まれている
// （addEventListenerで渡されるイベント情報と同じもの）
/*
methods: {
    メソッド名: (event) {
        // 引数はイベントオブジェクト
    }
},
*/

// これを利用して、preventDefault（遷移）やstopPropagation（イベントが先祖へ伝播するのを防ぐ）を呼び出せる
//  <button v-bind:disabled="!canBuy" v-on:click.prevent="doBuy">購入</button>

// ★算出プロパティとメソッドの使い分け
// 「算出プロパティは、データが変更されない限り、キャッシュした結果を使う」のが通常のメソッドとの違い
// つまり、上のサンプルで合計額の計算を算出プロパティで行った場合＝個数が変わらない限り再計算されない
// が、メソッドで同じ事を行った場合＝メソッドが呼ばれる度に再計算される

// 但し、計算のキャッシュはVueインスタンスのデータに対してのみ有効なので、Dateオブジェクトで秒数が変わっただけでは再計算されないので注意