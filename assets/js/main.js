searchCountries = () => {
  fetchJson("https://api.covid19api.com/countries").then((countries) => {
    for (let country of countries) {
      var combo = document.getElementById("combo");
      const option = document.createElement("option");
      option.textContent = country.Country;
      combo.appendChild(option);
    }
    });
};

async function searchPrincipalInformations() {
  let data = await fetchJson("https://api.covid19api.com/summary")
  let date = new Date(data.Global.Date);
  document.getElementById('tconfirmed').textContent = data.Global.TotalConfirmed;
  document.getElementById('tdeath').textContent = data.Global.TotalDeaths;
  document.getElementById('trecovered').textContent = data.Global.TotalRecovered;
  document.getElementById("actives").textContent = 'Atualização';
  document.getElementById('tactive').textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

searchCountries();
searchPrincipalInformations();



