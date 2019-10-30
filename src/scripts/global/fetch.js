/**
  * @param {String} url - address for the HTML to fetch
  * @return {String} the resulting HTML string fragment
  */

async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function fetch(target, page) {
    const content = document.getElementById(target);

    content.innerHTML = await fetchHtmlAsText('work/${page}.html');
}