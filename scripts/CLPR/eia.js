function getFuelPrices() {
  const apikey = "Cl8uD8d8tDVh8LaAzOhJUmkaw4vMAbB2e9MsV5Hv";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stats - All Time');
  const fuel_table = (sheet.getRange(35,10,5,2))
  const apiRoute = `https://api.eia.gov/v2/petroleum/pri/gnd/data/?frequency=weekly&data[0]=value&facets[series][]=EMD_EPD2D_PTE_NUS_DPG&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5&api_key=${apikey}`;

  const response = UrlFetchApp.fetch(apiRoute);
  const parsed = JSON.parse(response.getContentText());
  const data = parsed.response.data;
  const results = data.map(row => [row.period, row.value]);
  fuel_table.setValues(results)

}






