<template>
	<section class="listHeader">
      <template v-for="(item , i) in count">
        <router-link :to="item.link || ''">
          <i :class="item.navclassName"></i><span style="margin: 0 8px">{{item.navMsg}}</span>
        </router-link>
        <span v-if="i<count.length-1" style="margin: 0 8px;"> >> </span>
      </template>
	</section>
</template>
<script>
  export default{
    name:'navText',
    data(){
      return {

      }
    },
    props: {
      count: {
        type: Array,
        isRequired: true
      }
    }
  }
</script>
<style type="text/css">
  .listHeader{
    height: 50px;
    line-height: 50px;
    margin-bottom: 10px;
	}
</style>
