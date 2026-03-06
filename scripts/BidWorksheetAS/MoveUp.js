function moveUp() {
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bids");
  sheet.getRange("L:P").sort([12,13,14,15,16]);
  fixFormat();
}