// Set Variables
let covidApi;
let countriesData;

// Get Api Values
fetch('https://api.covid19api.com/summary').then(function (response) {
    return response.json();
}) .then(function (obj) {
    covidApi = obj;
    countriesData = covidApi.Countries;
    console.log(covidApi);
}) .catch(function (error) {
    console.error("Error get api");
    console.error(error);
});

function getResults() {

    // Get Input Values
    let facet = document.getElementById("facet");
    let facetV = facet.options[facet.selectedIndex].value;
    var facetL = facet.options[facet.selectedIndex].innerHTML;
    let top = document.getElementById("top");
    let topV = top.options[top.selectedIndex].value;    
    // Sort Array
    countriesData.sort((a, b) => (a[facetV] > b[facetV]) ? -1 : 1)

    // Slice Countries Array
    let slicedCountries = countriesData.slice(0, topV);
    //console.log(slicedCountries);

    // Set Card Img
    let cardTopImg = document.getElementById("cardTopImg");
    switch (facetV) {
        case "TotalConfirmed":
            cardTopImg.src = "https://images.impresa.pt/sicnot/2020-03-10-teste-positivo-coronavirus.jpg/original/mw-960";
            break;
        case "TotalDeaths":
            cardTopImg.src = "https://www.dnoticias.pt/binrepository/768x513/0c41/768d432/none/11506/TSVR/image_content_2844664_20200318181536.jpg";
            break;
        case "TotalRecovered":
            cardTopImg.src = "https://receitasmodernas.com/wp-content/uploads/2018/10/0-1.jpg";
            break;
    
    }

    // Set Card Title
    document.getElementById("cardTitle").innerHTML = facetL;

    // Get Top List Table by Id
    let topCovidTable = document.getElementById("topCovidTable");

    // Clear Table
    deleteRows(topCovidTable);
    // Create Table Content
    slicedCountries.forEach(element => {
        let topCovidTableRow = topCovidTable.insertRow(-1);
        console.log(element.TotalConfirmed);
        let cell1 = topCovidTableRow.insertCell(0);
        let cell2 = topCovidTableRow.insertCell(1);
        cell1.innerHTML = element.Country;
        cell2.innerHTML = element[facetV];
    });

    // Set Card Date
    let date = covidApi.Date.substring(0, 10);
    document.getElementById("cardDate").innerHTML = date;
    
    // Get Card
    let tableCard = document.getElementById("tableCard");
    if (tableCard.style.display === "none") {
        // Show Card
        tableCard.style.display = "block";
    }



}


function deleteRows(sTable) {
    let nRows = sTable.rows.length;
    for (let i = nRows -1; i > 0; i--) {
        sTable.deleteRow(i);
    }
    
}
