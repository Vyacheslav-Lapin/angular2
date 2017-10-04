function fetchJson(url) {
    // noinspection JSUnresolvedFunction
    return fetch(url)
        .then(request => request.text())
        .then(text => JSON.parse(text))
        .catch(error => console.log(`ERROR: ${error.stack}`));
}

fetchJson('http://example.com/some_file.json')
    .then(obj => console.log(obj));
