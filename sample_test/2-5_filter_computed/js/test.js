console.log("test 2-5");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

let item_ary = [
    {
        name: "鉛筆",
        price: 300,
        quantity: 0
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
        }
    }
});

// vm.$mount();

// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;

// ■UIデータの定義（dataプロパティ）
// UIの状態となるデータのオブジェクトを指定する
// dataプロパティの値はVueのリアクティブシステムに乗るので、値が変わるとVueが検知して自動的に表示が変わる
// ＝★Vueインスタンス生成時にdataを与えておき、それをテンプレートで表示するのがVueの仕組みと言える
// dataにはオブジェクト又は関数を与える（※このサンプルではオブジェクトで与えているが、easy本では関数で与えている＝Vue.js推奨？）

// ★returnで返さないと、本のようにconsole.log(vm.items)が効かない（itemaが見れない）
// return後に、console.log(vm.items[0].name="万年筆")が効く


// ■$watch()メソッド
// Vueインスタンスの変更を検出した際に呼ばれる、開発中の動作確認等に使用する
/*
vm.$watch(() => {
    return this.items[0].quantity;
}, (quantity) => {
    console.log(quantity);
});
*/

vm.$watch(function () {
    return this.items[0].quantity; // 第一引数に監視対象の値を返す関数
}, function (quantity) {
    console.log("値が変更されました");
    console.log(quantity); // 第二引数に値が変わった時に呼ばれるコールバック
});

// test
vm.items[0].quantity = 10;


// ■テンプレート構文
// Vueインスタンスのデータとビュー（DOMツリー）の関係を宣言的に定義する
// これにより、データが決まればビューの内容が決定される
// ＝データの変更に応じて、ビューが更新される＝■「データバインディング」

// Vue.jsのテンプレート構文で大事なものは、
// （1）Mustache記法によるデータの展開 ... 例：<p>{{ item_ary[0].name }}</p>

// （2）ディレクティブによるHTML要素の拡張 ... 例：v-bind、v-if
// v-bind:属性名="データを展開した属性値"で行う


// ■filters（フィルタ）
// 汎用的なテキストfフォーマット処理を適用する仕組み
// 日付のフォーマットをYYYY/MM/DDに変換したり、0.5を50%に変換したりするのに使う
/*
filters: {
    フィルタ名: function (value) {
        // sreturn
    }
}

{{ 値 | フィルタ名1 | フィルタ名2（複数時） }}
*/


// ■算出プロパティ（computed）
// ★データそのものに何らかの処理を与えたものをプロパティとして使用したい場合に使う＝インスタンスに持たせてプロパティとして参照したい
// （主に、複雑な式をそのままテンプレートに入れると保守が困難になるので、その解決のために使用）
/*
computed: {
    算出プロパティ名: function (value) {
        // sreturn
    }
}
*/

