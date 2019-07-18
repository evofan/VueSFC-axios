<template>
  <div id="app">
    <h2>Vue.js単一ファイルコンポーネント + axios サンプル</h2>
    <p>
      photoAC free asset sample list
      <br />
      <a href="https://www.photo-ac.com/" target="_blank">https://www.photo-ac.com/</a>
    </p>
    <div v-for="(key, value) in res" :key="value">
      <table>
        <tr>
          <th colspan="2">{{ value }}</th>
        </tr>
        <tr>
          <td class="td-title">タイトル：</td>
          <td>{{ key.title }}</td>
        </tr>
        <tr>
          <td class="td-title">クリエイター：</td>
          <td>{{ key.creator }}</td>
        </tr>
        <tr>
          <td class="td-title">ダウンロード：</td>
          <td>{{ key.download | aligenmentNum }}}</td>
        </tr>
        <tr>
          <td class="td-title">ID：</td>
          <td>{{ key.id }}</td>
        </tr>
        <tr>
          <td class="td-title">URL：</td>
          <td>{{ key.url }}</td>
        </tr>
        <tr v-if="key.point!=='0'">
          <td class="td-title">自サイトでの使用回数：</td>
          <td>{{ key.use + "回" }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      res: {}
    };
  },
  filters: {
    /**
     * 3桁ごとにカンマを入れる
     * @param { number } num
     * @returns { string } 0 or ”,”で区切りされた値
     */
    aligenmentNum: function(num) {
      if (!num) {
        return "0";
      } else {
        return num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
    }
  },
  mounted() {
    // テスト用JSONファイルの読み込み
    axios
      .get("sample_order.json")
      .then(response => (this.res = response.data.buy));
  }
};
</script>

<style scoped>
table {
  width: 400px;
  margin-bottom: 30px;
}
th {
  background-color: #333333;
  padding: 3px;
  color: #ff6633;
}
td {
  background-color: #fcfcfc;
  padding: 3px;
}
.td-title {
  font-weight: bold;
  color: #336666;
}
</style>
