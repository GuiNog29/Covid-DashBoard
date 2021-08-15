(() => {
  document.getElementById("combo");
  document.getElementById("today");

  (async () => {
    let response = await Promise.allSettled([
      fetch("https://api.covid19api.com/countries"),
      fetch("https://api.covid19api.com/summary"),
    ]);

    if (response[0].status == "fulfilled") {
      loadCountries(await response[0].value.json());
    }
  })();
})();

function loadCountries(data) {
  let combo = document.getElementById("combo");

  data.sort((a, b) => {
    let x = a.Country.toUpperCase();
    let y = b.Country.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1;
  });

  for (index in data) {
    combo.options[combo.options.length] = new Option(
      data[index].Country,
      data[index].Country
    );
  }
}
