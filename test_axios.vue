<template>
<div id="app">
<h2>Vue.js単一ファイルコンポーネント + axios サンプル</h2>
<p>アイテム購入履歴</p>
<div v-for="(key, value) in res" :key="value">
<table>
<tr><th colspan="2">	{{ value }}</th></tr>
<tr><td class="td-title">日付：</td><td>{{ key.date }}</td></tr>
<tr><td class="td-title">支払い方法：</td><td>{{ key.payment }}</td></tr>
<tr><td class="td-title">購入会社：</td><td>{{ key.company }}</td></tr>
<tr><td class="td-title">購入アイテム：</td><td>{{ key.item }}</td></tr>
<tr><td class="td-title">購入ゲーム：</td><td>{{ key.game }}</td></tr>
<tr><td class="td-title">購入金額：</td><td>{{ key.amount | aligenmentNum }}</td></tr>
<tr v-if="key.point!=='0'"><td class="td-title">ポイント付与：</td><td>{{ key.point + "pt" }}</td></tr>
</table>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      res: {}
    }
  },
  filters: {
    /**
     * 3桁ごとにカンマを入れる
     * param { number } num
     * returns { string } 0 or ”,”で区切りされた値
     */
    aligenmentNum : function(num){
      if(!num){
        return "0"
      }else{
        return num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
    }
  },
  mounted (){
    // テスト用JSONファイルの読み込み
    axios
    .get('sample_order.json')
    .then(response => (this.res = response.data.buy))
  }
}
</script>

<style scoped>
table{
  width: 400px;
  margin-bottom: 30px;
}
th{
  background-color: #333333;
  padding: 3px;
  color: #ff6633;
}
td{
  background-color: #fcfcfc;
  padding: 3px;
}
.td-title{
  font-weight: bold;
  color: #336666;
}
</style>
