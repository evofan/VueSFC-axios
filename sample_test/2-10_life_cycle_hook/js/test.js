console.log("test 2-10 lifecyclehook");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

const vm = new Vue({
    el: "#app",

    data() {
        return {
            // キー：値
            count: 0,
            timerId: null
        }
    },

    created() {
        console.log("created");
        let that = this;

        // データが参照できる
        console.log(this.count);

        // DOM要素はまだ紐づいてないので参照不可
        console.log(this.$el);

        // タイマー処理を開始する
        this.timerId = setInterval(function () {
            that.count += 1;

        }, 1000);

    },

    mounted() {
        console.log("mounted");
        // DOM要素が紐づいている
        console.log(this.$el);
    },

    beforeDestroy() {
        console.log("beforeDestroy");
        // タイマー処理の後始末をする
        clearInterval(this.timerId);
    },

});

// vm.$mount();

// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;

// ■ライフサイクルフック
// Vueインスタンスで呼ばれる処理を事前に登録しておいて、必要なタイミングで呼び出す処理

// ※文具購入サンプルでは説明が難しいので、後出のサンプルで詳細

// ■ライフサイクル一覧（フック名、呼ばれるタイミング）
// ・beforeCreate ... Vueインスタンスが生成され、データが初期化される前
// ・created ... Vueインスタンスが生成され、データが初期化された後
// ・beforeMount ... Vueインスタンスが、DOM要素にマウントされる前
// ・mounted ... Vueインスタンスが、DOM要素にマウントされた後
// ・beforeUpdate ... データが変更され、DOMに適用される前
// ・updated ... データが変更され、DOMに適用された後
// ・beforeDestroy ... Vueインスタンが破棄される前
// ・destroyed ... Vueインスタンが破棄された後

// ■ライフサイクルのフロー
// ※公式の図を参照

// よく使われるフック
// ・created ... Vueインスタンスが生成され、データが初期化される前＝DOM要素には紐づいてないので、DOM要素のアクセスは出来ない（getElementById等）
// このフックはVuexを導入していない小規模のアプリで、WebAPIと通信してデータ処理を開始したり、タイマー処理を開始したりするのに使用する

// ・mounted ... Vueインスタンスが、DOM要素にマウントされた後に呼ばれるので、DOM操作やイベントリスナーの登録に使用する

// ・beforeDestroy ... Vueインスタンが破棄される前に呼ばれるので、★DOM要素に登録したイベントリスナーの破棄や、タイマー処理のクリア等をここで行う
// （これを怠るとメモリーリークの原因になる）
