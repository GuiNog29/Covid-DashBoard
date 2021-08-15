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
    if (response[1].status == "fulfilled") {
      loadSummary(await response[1].value.json());
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

function loadSummary(data) {
  let date = new Date(data.Global.Date);
  document.getElementById("tconfirmed").textContent = data.Global.TotalConfirmed.toLocaleString("PT");
  document.getElementById("tdeath").textContent = data.Global.TotalDeaths.toLocaleString("PT");
  document.getElementById("trecovered").textContent = data.Global.TotalRecovered.toLocaleString("PT");
  document.getElementById("actives").textContent = "Atualização";
  document.getElementById("tactive").textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
