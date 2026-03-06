function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var row = range.getRow();
  var col = range.getColumn();
  var lastRow = range.getLastRow();

  // Mileage Column
  if (col == 3 || col == 4){
    for(var i = 0; i <= lastRow - row; i++)
      if (row + i > 1 && (col == 3 || col == 4) && sheet.getName() == "CLPR") {
        var origin = sheet.getRange(row + i, 3).getValue();
        var destination = sheet.getRange(row + i, 4).getValue();
        if(origin && destination)
          sheet.getRange(row + i, 14).setValue(calculateMileage(origin, destination));
        else 
          sheet.getRange(row + i, 14).clearContent();
      };
    }

  // Margin Column
  if ((sheet.getName() == "CLPR" && (col == 5 || col == 6 || col == 7))){
    sell = sheet.getRange(row, 5).getValue();
    buy = sheet.getRange(row, 6).getValue();  
    if (buy !== "" && sell !== "") {
      margin = sell - buy;
      sheet.getRange(row,7).setValue(margin.toFixed(2));
    }
    else {
      sheet.getRange(row,7).clearContent();
    }
  }

  // Last Update Column
  if (sheet.getName() == "CLPR" && col == 8 && row >1){
    if ((e.value || !e.value) && sheet.getRange(row, 3).getValue()) {
      time = new Date();
      sheet.getRange(row, 15).setValue(time).setNumberFormat('hh:mm');
    }
  }
}
