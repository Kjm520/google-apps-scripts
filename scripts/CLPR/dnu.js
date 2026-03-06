function checkforDNU(e) {
  var range = e.range;
  var sheet = range.getSheet();

  // Check main DNU page - Yellow Warning
  if (sheet.getName() === "CLPR" && range.getColumn() >= 10 && range.getColumn() <= 13) {
    var value = range.getValue().toString();
    var dnuSheet = SpreadsheetApp.openById(DNU_SHEET_ID).getSheetByName("DNU");
    var dnuValues = dnuSheet.getRange("B2:B").getValues().flat();
    if (value !== "" && dnuValues.includes(value)) {
      range.setBackground("yellow");
    }
    if (value == "") {
      range.setBackground(null);
    }
  }

  // Check secondary DNU page - Grey Warning
  if (sheet.getName() === "CLPR" && range.getColumn() >= 10 && range.getColumn() <= 13) {
    var value = range.getValue().toString();
    var dnuSheet = SpreadsheetApp.openById(DNU_SHEET_ID).getSheetByName("DNU2");
    var dnuValues = dnuSheet.getRange("B2:B").getValues().flat();
    if (value !== "" && dnuValues.includes(value)) {
      range.setBackground("#add8e6");
    }
    if (value == "") {
      range.setBackground(null);
    }
  }
}