<template>
    <div>
      <Nav :count="count"></Nav>
    </div>
</template>
<script>
  import Vue from 'vue';
  import Nav from '@/components/nav.vue'

  export default {
    data () {
      return {
        count:[
          {navclassName:'icon iconfont icon-shouye',navMsg:'首页'},
        ],
      }
    },
    methods:{
      
    },
    components: {Nav}
  }
</script>
<style>

</style>
