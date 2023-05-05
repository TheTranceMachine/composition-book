<script setup lang="ts">
// See https://vueuse.org/core/useFileDialog
import { useFileDialog } from '@vueuse/core'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const { files, open } = useFileDialog()
const storage = useFirebaseStorage()
const mountainFileRef = storageRef(storage, 'images/mountains.jpg')

const {
  url,
  uploadTask,
  upload,
} = useStorageFile(mountainFileRef)

function uploadPicture() {
  const data = files.value?.item(0)
  if (data) {
    upload(data)
  }
}

</script>

<template>
  <form @submit.prevent="uploadPicture">
    <!-- disable the form while uploading -->
    <fieldset :disabled="!!uploadTask">
      <button
        type="button"
        @click="open({ accept: 'image/*', multiple: false })"
      >
        <template v-if="files?.length === 1">
          Selected file: {{ files.item(0).name }} (Click to select another)
        </template>
        <template v-else> Select one picture </template>
      </button>

      <br />

      <button>Upload</button>
    </fieldset>
  </form>
  <img v-if="url" :src="url" />
</template>
