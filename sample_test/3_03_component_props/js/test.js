console.log("test 3-3 component");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

// ■Vueインスタンス前に定義する
Vue.component('fruits-item-name', {
    props: {
        fruitsItem: { // テンプレート内ではケバブケースに
            type: Object,
            required: true
        }
    },
    template: `<li>{{ fruitsItem.name}}</li>`
});


const vm = new Vue({
    el: "#fruits-component",
    data() {
        return {
            fruitsItems: [
                { name: '梨' },
                { name: 'イチゴ' }
            ]
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

// ■親から子コンポーネントへのデータ伝播
/*
Vue.component(コンポーネント名, {
    props : {
        親から受け取る属性名: {
            type: String型等,
            default: デフォルト値,
            required: 必須かどうあｋのブール値,
            validator: バリデーション用の関数
        }
    }
})
// tepmplate内で「親から受け取る属性」が使える
*/

// ■実際の渡し方
// props側にキャメルケースで「itemName」と書いた時、テンプレート側の属性名にはケバブケースで「item-name」と書く
/*
<div id="app">
    <item-desc v-bind:item-name="myItem"></item-desc>
</div >

    Vue.component('item-desc', {
        prosp: {
            itemName: {
                type: String
            }
        }
    template: `<p>{{ item-name }}は便利です</p>`
    });

new Vue({
    el: '#app',
    data: { myItem: 'pen' }
})
*/
