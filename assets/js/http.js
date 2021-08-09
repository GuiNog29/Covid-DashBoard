function fetchJson(url) {
  return fetch(url).then((r) => {
    if(r.ok)
      return r.json();
    else
      throw new Error(r.statusText);
  });
}
