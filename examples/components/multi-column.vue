<template>
  <div>
    <div class="masonry">
      <div 
        v-for="item in Data"
        :key="item.id"
        class="item"
      >
        <img :src="item.img" />
        <span class="title">{{item.value}}</span>
      </div>
      <!-- more items-->
    </div>
  </div>
</template>

<script>
import Data from '../data/data.json'    
export default {
  name: "multiColumn",
  data () {
      return {
        Data
      }
  }
};
</script>

<style>
.masonry {
  column-count: 5;
  column-gap: 10px;
}
.masonry .item {
  border: 1px solid #999;
  margin-bottom: 10px;
  break-inside: avoid;
}
.masonry .item img {
  width: 100%;
}
</style>