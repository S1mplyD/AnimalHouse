<template>
    <iframe :srcdoc="compiledHtml" :src="fileName"></iframe>
</template>
<script>
import axios from 'axios'

export default {
  name: 'TestPage',
  mounted () {
    axios({
      method: 'get',
      url: '../../../test/' + this.fileName
    })
      .then(result => {
        this.compiledHtml = result.data
      })
      .catch(error => {
        console.log('error getting file', error)
      })
  },
  data () {
    return {
      fileName: 'index.html',
      compiledHtml: ''
    }
  }
}
</script>
<style lang="scss">
    iframe {
        width: 1600px;
        height: 1000px;
    }
</style>
