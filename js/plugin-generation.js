// Create a new instance of JSZip
const zip = new JSZip();


zip.file("sh_plugin.lua", "-- Your sh_plugin.lua content here");
zip.file("sv_plugin.lua", "-- Your sv_plugin.lua content here");


const items = zip.folder("items");
items.file("sh_item.lua", "-- Your sh_item.lua content here");



document.getElementById('test').addEventListener('click', () => {
    zip.generateAsync({type:"blob"})
    .then(function(blob) {
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "test-plugin.zip";


    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    });
});