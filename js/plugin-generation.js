function getPluginInfo() {
    return {
        name: document.getElementById("plugin-name").value,
        desc: document.getElementById("plugin-desc").value,
        author: document.getElementById("plugin-author").value,
    }
}

function generateZip() {
    const plugin = new JSZip();
    const pluginFolder = plugin.folder("plugin-name");
    const folderSection = document.getElementById("plugin-folders-section");
    const fileSection = document.getElementById("plugin-files-section");
    const folders = folderSection.querySelectorAll("input[type=checkbox]");
    const files = fileSection.querySelectorAll("input[type=checkbox]");
    let checkedFolders = [...folders].filter((checkbox) => {
        return checkbox.checked;
    });

    let checkedFiles = [...files].filter((checkbox) => {
        return checkbox.checked;
    });

    checkedFolders.forEach((c) => {
        console.log(c.value);
        pluginFolder.folder(c.value);
    });

    checkedFiles.forEach((c) => {
        console.log(c.value);
        if (c.value === "sh_plugin.lua") {
            let pluginInfo = getPluginInfo();
            let content = `local PLUGIN = PLUGIN\nPLUGIN.Name = "${pluginInfo.name}"\nPLUGIN.Author = "${pluginInfo.author}"\nPLUGIN.desc = "${pluginInfo.desc}"`;
            checkedFiles.forEach((c2) => {
                if (c2.value !== "sh_plugin.lua") {
                    content += `\nix.util.Include("${c2.value}")`;
                }
            });
            pluginFolder.file(c.value, content);
        } else {
            pluginFolder.file(c.value, "-- Your content here");
        }
    });

    // download the zip
    plugin.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "plugin.zip");
    });
}

document.getElementById('plugin-download').addEventListener('click', generateZip);