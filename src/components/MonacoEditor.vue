<template>
	<div id='editor'></div>
</template>
<script setup>
import { onMounted } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import debounce from 'lodash/debounce';
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const storage = useFirebaseStorage()
const editorFileRef = storageRef(storage, 'editor/page.js')

const { upload } = useStorageFile(editorFileRef)

function uploadPage(data) {
	const blob = new Blob([data], { type: 'text/plain' })
	upload(blob)
}

onMounted(() => {
	const editor = monaco.editor;
	editor.create(document.getElementById('editor'), {
		value: "function hello() {\n\talert('Hello world!');\n}",
		automaticLayout: true,
		language: 'javascript',
		theme: 'vs-dark',
		minimap: { enabled: false },
	})

	const activeEditor = editor.getEditors()[0]

	const saveEditorValue = (value) => uploadPage(value)
	// Debounce the save action with a 500ms delay
	const debounceSave = debounce(saveEditorValue, 500)

	// Listen for the change event on the editor
	activeEditor.onDidChangeModelContent(() => {
		const value = activeEditor.getValue()
		debounceSave(value)
	});
})
</script>
<style>
#editor {
	width: 1200px;
	height: 500px;
}
</style>