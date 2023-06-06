<template>
	<div id='editor'></div>
</template>
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import debounce from 'lodash/debounce';
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
export default {
	// state
	data() {
		return {
			editorContent: ''
		}
	},
	async mounted() {
		const storage = useFirebaseStorage()
		const editorFileRef = storageRef(storage, 'editor/page.txt')
		const url = await getDownloadURL(editorFileRef);

		// Get Editor Content
		const getEditorContent = (url) => new Promise((resolve, reject) => {
			fetch(url)
				.then((response) => {
					response.blob().then(async (content) => resolve(await content.text()))
				})
				.catch(error => reject(error))
		})
		this.editorContent = await getEditorContent(url)

		// Create Editor
		const editor = monaco.editor
		editor.create(document.getElementById('editor'), {
			value: this.editorContent,
			automaticLayout: true,
			language: 'plaintext',
			theme: 'vs-dark',
			minimap: { enabled: false },
		})

		/**
		 * Update Content in the Firebase Storage file
		 * @param {*} value 
		 */
		const saveEditorValue = (value) => uploadPage(value)
		// Debounce the save action with a 500ms delay
		const debounceSave = debounce(saveEditorValue, 500)
		/**
		 * Upload editor page
		 * @param {*} data 
		 */
		const uploadPage = (data) => {
			const { upload } = useStorageFile(editorFileRef)
			const blob = new Blob([data], { type: 'text/plain' })
			upload(blob)
		}

		const activeEditor = editor.getEditors()[0]
		/**
		 * Listen for the change event on the editor
		 */
		activeEditor.onDidChangeModelContent(() => {
			const value = activeEditor.getValue()
			debounceSave(value)
		})
	}
}

</script>
<style>
#editor {
	width: 1200px;
	height: 500px;
}
</style>