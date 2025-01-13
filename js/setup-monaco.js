require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
    let monacoEditor = monaco.editor.create(document.getElementById('code-container'), {
        value: [
            '',
        ].join('\n'),
        language: 'html',
        theme: 'vs',
        minimap: { enabled: false },
        automaticLayout: true
    });

    function updateText(text) {
        monacoEditor.setValue(text)
        //monacoEditor.trigger("editor", "editor.action.formatDocument");
    }

    window.updateText = updateText
});
