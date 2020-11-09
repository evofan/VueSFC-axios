console.log("test 3-3 component");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

// ■Vueインスタンス前に定義する
let counterButton = Vue.extend({
    template: '<span>{{ counter }}個<button v-on:click="addToCart">追加</button></span>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        addToCart: function () {
            this.counter += 1;
            this.$emit('increment'); // incrementカスタムイベントの発火
        }
    },
});

const vm = new Vue({
    el: "#fruits-counter",
    components: {
        'counter-button': counterButton
    },
    data() {
        return {
            total: 0,
            fruits: [
                { name: '梨' },
                { name: 'イチゴ' }
            ]
        }
    },
    methods: {
        incrementCartStatus() {
            this.total += 1;
        }
    }
});



// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;


// ■コンポーネント間の通信
// Vue.jsは親から子コンポーネントへのみデータを受け渡せる
// propsというオプションを使用して通信を行う
// 子側も状態を把握するため、eventを使用して通信を行える

// ■子コンポーネントから親コンポーネントへの通信
// カスタムイベントを使用して行う
// 用途　　　　　　　インターフェイス
// イベントのlisten  $on(eventName)
// イベントのtrigger %emit(eventName)


// ■propsとeventを使わない親子間のやり取り
// $parentを使って可能だが、混乱をもたらすので基本使わない


// ■親子以外のコンポーネントでデータをやり取りする
// 例えば兄弟関係にある複数のコンポーネント同士で同じデータを共有する場合等
// →「ストア」というオブジェクトに状態を持たせてそこで管理する＝ストアパターン
// VueにはVuexというライブラリがあり、7章で解説


// ■子から親のネイティブDOMイベントを取得したい場合 → .native修飾子を使う


// ■propsの値に関して双方向バインディングを実現したい場合 → .sync修飾子を使う