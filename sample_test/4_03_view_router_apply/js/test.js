console.log("test 4-3 view router応用");

// Vueがロードされてグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

// ルーターの定義
let router = new VueRouter({
    // コンポーネントをマッピングしたルート定義を配列で返す
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページです</div>'
            }
        },
        {
            path: '/users',
            component: {
                template: '<div>ユーザー一覧ページです</div>'
            }
        }

    ]
});

const vm = new Vue({
    el: "#app",

    router: router,

    data() {
        return {
            // キー：値
        }
    }
});



// JSFIDDLEでconsoleからvmアクセスする用
window.vm = vm;

Vue.config.devtools = true;


// ■パターンマッチング
// SPAでは、アクセスするURLにパターンマッチングでパラメーターを渡したい場合が出る
// 例:/user/:userID/にアクセス

// このような場合には、path内のURLに「:」を利用してパターンを記述する
// マッチしたURL上のパラメーターは、コンポーネント内の$route.paramsから同じ名前でアクセス出来る
/*
let router = new VueRouter({
    // コンポーネントをマッピングしたルート定義を配列で返す
    routes: [
        {
            // コロンで始まるパターンマッチング
            path: '/user/:userID',
            component: {
                template: '<div>ユーザーIDは、{{ user.params.userID }}です。</div>'
            }
        }
    ]
});
*/


// ■名前付きルート
// ↑上記マッチングしたURLを呼び出したい場合のHTML側の指定方法は、
/*
<router-link :to="{ name: 'user', params: { userId: 123 }}">ユーザー詳細ページ</router-link>
*/


// ■router.pushを使った遷移
// <router-link>を使う書き方は宣言的である。
// プログラム上で遷移するには、router.pushを使う
/*
router.push({ name: 'user', params: { userId: 123 }});
*/


// ■フック関数
// Vue Routerでは、「ページ遷移が実行される前後に処理を追加できるフック関数」がある
// ★リダイクレトや、ページ遷移前の確認はフック関数で実装する
// （1）グローバルのフック関数（2）ルート単位のフック関数（3）コンポーネント内のフック関数の3つがある

// （1）グローバルのフック関数
/*
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    // ユーザー一覧ページへアクセスした際に/topへリダイレクトする例
    if (to.path === '/users') {
        next('/top');
    } else {
        // 引数無しで呼び出すと通常の遷移
        next();
    }
})
*/

// （2）ルート単位のフック関数
// 特定のルート単位でフック関数を使いたい時は、Vue Routerの初期化時に個別に設定する
/*
let router = new VueRouter({
    // コンポーネントをマッピングしたルート定義を配列で返す
    routes: [
        {
            path: '/user/:users',
            component: userList,
            // ルーティング前のフックを追加
            beforeEnter: (to, from, next) => {
                // '/users?redirect=true'でアクセスされた時のみ/topへリダイレクトする例
                if (to.query.redirect === 'true') {
                    next('/top');
                } else {
                    // 引数無しで呼び出すと通常の遷移
                    next();
                }
            }
        }
    ]
});
*/

// （3）コンポーネント内のフック関数の3つがある
// コンポーネント側でもフック関数を定義出来る
/*
let userList = {
    template: '#user-list',

    data() {
        return {
            // キー：値
            users: function () { return {} },
            error: null
        }
    },

    // 「ページ遷移が行われて、コンポーネントが初期化される前に呼び出される」
    beforeRouteEnter(to, from, next) {
        // ...
        getUsers((function (err, users) {
            if (err) {
                this.err = err.toString();
            } else {
                // nextに渡すコールバックをコンポーネント自身でアクセス可
                next(function (vm) {
                    vm.users = users;
                })
            }

        }).bind(this))
    }
}
*/

