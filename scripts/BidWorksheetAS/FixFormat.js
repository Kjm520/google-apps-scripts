function fixFormat() {

  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bids");

  rows = sheet.getMaxRows();
  cols = sheet.getMaxColumns();

  fullsheet = sheet.getRange(1,1,rows,cols);

  fullsheet.setFontFamily("Arial")
  .setFontSize(9)
  .setHorizontalAlignment("center")
  .setVerticalAlignment("middle");

  sheet.getRange(1,1,1,sheet.getMaxColumns()).setFontWeight("bold");

  sheet.getRange(2,8,sheet.getMaxRows()-2).setNumberFormat("\"$\"#,##0");
  sheet.getRange(2,15,sheet.getMaxRows()-2).setNumberFormat("\"$\"#,##0");

  // sheet.getRange(2,2,rows-1,cols-2).setBackground("white").setBorder(null, null, null, null, false, false);
  // sheet.getRange(2,9,rows-1,cols-9).setBackground("white").setBorder(null, null, null, null, false, false);

  // sheet.getRange(2,1,rows-1,1).setBackground("#cccccc").setBorder(false, true, false, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID);
  // sheet.getRange(2,8,rows-1,1).setBackground("#cccccc").setBorder(false, true, false, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID);
  // sheet.getRange(2,13,rows-1,1).setBackground("#cccccc").setBorder(false, true, false, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID);
  // sheet.getRange(1,1,1,cols).setBackground("#f3f3f3").setBorder(false, false, false, false, false, false);

  // sheet.setColumnWidth(1, 4);
  // sheet.setColumnWidth(8, 4);
  // sheet.setColumnWidth(13, 4);

  // sheet.setColumnWidth(7, 15);
  // sheet.setColumnWidth(9, 15);
  // sheet.setColumnWidth(12, 15);

}


// //setBorder(top, left, bottom, right, vertical, horizontal)