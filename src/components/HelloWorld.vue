<template>
  <div class="hello_world">
    <select class="ui dropdown" multiple="" id="cb-dropdown-multiple--gender">
      <option value="">Gender</option>
      <option value="1">Male</option>
      <option value="0">Female</option>
    </select>
    <button class="ui button">Follow</button>
  </div>
</template>

<script>
import toastr from 'toastr'
var $ = require('jquery')

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  mounted: function () {
    $('#cb-dropdown-multiple--gender').dropdown()
    toastr.success('Welcome to Composition book!')
    var numbers = [1, 2, 3]
    var array = this._.isArray(numbers)
    console.log(array)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello_world {
    .ui.button {
      background-color: red;
    }
  }
</style>
