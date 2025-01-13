quill.on('text-change', (delta, oldDelta, source) => {
    const content = quill.getContents();
    console.log(content)
    convertRichTextToHtml(content)
});

function convertRichTextToHtml(content) {

    let html = ""
    content.ops.forEach(block => {
        let output = block.insert

        output = output.replaceAll("\n", "<beer>")

        let attributes = block.attributes
        if (attributes) {
            if (attributes["bold"]) output = `<strong>${output}</strong>`
            if (attributes["italic"]) output = `<em>${output}</em>`
            if (attributes["script"]) {
                if (attributes["script"] === "super") output = `<sup>${output}</sup>`
            }
            if (attributes["link"]) output = `<a href="${attributes["link"]}">${output}</a>`
        }
        html += output;
    })

    html = DOMPurify.sanitize(html);

    updateText(html)

    document.getElementById("preview").innerHTML = html
}