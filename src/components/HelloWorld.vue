<template>
  <div class="hello_world">
    <div class="ui two column centered grid">
      <div class="eight wide column" v-for="project in projects" v-bind:key="project.title">
        <div class="ui raised segments">
          <div class="ui inverted segment">
            <p>{{ project.title }}</p>
          </div>
          <div class="ui segment">
            <p>Author: {{ project.author }}</p>
          </div>
          <div class="ui segment">
            <p>Description: {{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <select class="ui dropdown" multiple="" id="cb-dropdown-multiple--gender">
      <option value="">Gender</option>
      <option value="1">Male</option>
      <option value="0">Female</option>
    </select>
    <button class="ui button">Follow</button>
  </div>
</template>

<script>
import { firebaseProjects } from 'firebase-config'
import toastr from 'toastr'
var $ = require('jquery')

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  firebase: {
    projects: firebaseProjects
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
