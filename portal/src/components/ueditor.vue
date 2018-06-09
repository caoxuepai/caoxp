<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  import '../../static/UE/ueditor.config.js';
  import '../../static/UE/ueditor.all.js';
  import '../../static/UE/lang/zh-cn/zh-cn.js';
  import '../../static/UE/ueditor.parse.min.js';
  export default {
    name: 'UE',
    data() {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config);
      this.editor.addListener('ready', function() {
        _this.editor.setContent(_this.defaultMsg);
      })
    },
    methods: {
      getUEContent() {
        return this.editor.getContent();
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
<style>

</style>
