const axios = require('axios');
const JSZip = require('jszip');
const fs = require('fs');

const host = "http://34.125.207.38:2358/";
const codeContents = fs.readFileSync("./add.js").toString();
const setupContents = fs.readFileSync("./setup.js").toString();
const testContents = fs.readFileSync("./test.js").toString();

function formatStream(outputStream) {
    return atob(outputStream.replace(/(\r\n|\n|\r)/gm, ""));
}

(async () => {
    const submitURL = host + "submissions/?base64_encoded=true&wait=true";

    try {
        const zip = new JSZip();
        const testFolder = zip.folder("test");
        testFolder.file("test.js", testContents);
        zip.file("add.js", codeContents);

        const content = await zip.generateAsync({ type: "base64" });

        const response = await axios.post(submitURL, {
            "source_code": btoa(setupContents),
            "additional_files": content,
            "language_id": 163
        });

        const { stderr, stdout } = response.data;

        if (stderr) {
            console.log(formatStream(stderr));
        }
        else {
            console.log(formatStream(stdout));
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
})();

function atob(a) {
    return Buffer.from(a, 'base64').toString('binary');
}

function btoa(a) {
    return Buffer.from(a, 'binary').toString('base64');
}