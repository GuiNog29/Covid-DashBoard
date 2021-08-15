(() => {
  document.getElementById("combo").addEventListener("change", countrySelected);
  document.getElementById("today").addEventListener("change", countrySelected);

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
  let date = new Date();
  document.getElementById("tconfirmed").textContent = data.Global.TotalConfirmed.toLocaleString("PT");
  document.getElementById("tdeath").textContent = data.Global.TotalDeaths.toLocaleString("PT");
  document.getElementById("trecovered").textContent = data.Global.TotalRecovered.toLocaleString("PT");
  document.getElementById("actives").textContent = "Update";
  document.getElementById("tactive").textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function countrySelected() {
  let country = document.getElementById("combo").value;

  if (country != "Global") {
    let startDate = new Date(document.getElementById("today").value);

    let endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1,
      -3, // Retirando 3h do fuso horário
      0,  // minuto
      1,  // 1 segundo de diferença entre as datas
      0   // milissegundo
    );

    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 1,
      -3,
      0,
      0,
      0
    );

    fetch(`https://api.covid19api.com/country/${country}?from=${startDate.toISOString()}&to=${endDate.toISOString()}`)
      .then((response) => response.json())
      .then((json) => loadData(json));
  }
}

function loadData(data) {

  let confirmed = data[1].Confirmed - data[0].Confirmed;
  let deaths = data[1].Deaths - data[0].Deaths;
  let recovered = data[1].Recovered - data[0].Recovered;
  let active = data[1].Active - data[0].Active;

  let totalConfirmed = data[2].Confirmed - data[1].Confirmed;
  let totalDeaths = data[2].Deaths - data[1].Deaths;
  let totalRecovered = data[2].Recovered - data[1].Recovered;
  let totalActives = data[2].Active - data[1].Active;

  document.getElementById("confirmed").innerText = data[2].Confirmed.toLocaleString("PT");
  document.getElementById("death").innerText = data[2].Deaths.toLocaleString("PT");
  document.getElementById("recovered").innerText = data[2].Recovered.toLocaleString("PT");
  document.getElementById("active").innerText = data[2].Active.toLocaleString("PT");
  document.getElementById("actives").innerText = "Total Ativos";

  insertDailyData("tconfirmed", totalConfirmed, totalConfirmed > confirmed);

  insertDailyData("tdeath", totalDeaths, totalDeaths > deaths);

  insertDailyData("trecovered", totalRecovered, totalRecovered > recovered);

  insertDailyData("tactive", totalActives, totalActives > active);
}

function insertDailyData(element, value, increase) {
  if (increase) {
    document.getElementById(element).innerHTML =
      `<img src= '/assets/img/up.png'> Diary: ${value.toLocaleString("PT")}`
  } else {
    document.getElementById(element).innerHTML =
      `<img src= '/assets/img/down.png'> Diary: ${value.toLocaleString("PT")}`
  }
}
