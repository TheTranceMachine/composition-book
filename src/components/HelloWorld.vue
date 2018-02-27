<template>
  <div class="hello_world">
    <select class="ui dropdown" multiple="" id="cb-dropdown-multiple--gender">
      <option value="">Gender</option>
      <option value="1">Male</option>
      <option value="0">Female</option>
    </select>
  </div>
</template>

<script>

var $ = require('jquery')

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  mounted: function () {
    $('#cb-dropdown-multiple--gender').dropdown()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
