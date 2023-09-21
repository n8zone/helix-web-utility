

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = {
        "Home": "index.html",
        "Item Generator": "item-generator.html",
        "Plugin Generator": "plugin-generator.html",
    }

    let navHTML = "<ul>";

    Object.entries(navLinks).forEach(([key, value]) => {
        navHTML += `<li><a href="${value}">${key}</a></li>`;
    })

    navHTML += "</ul>";

    document.getElementById("nav-bar").innerHTML = navHTML;
});