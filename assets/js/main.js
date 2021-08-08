

countriesPromise.then((resp) =>{
  resp.json().then((countries) =>{
    console.log(countries)
  })
})

function showError(error) {
  console.log(error)
}
