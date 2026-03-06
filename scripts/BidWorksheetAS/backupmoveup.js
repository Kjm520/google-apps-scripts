// function moveUp() {

//   var start = new Date();

//   sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bids");

//   //row = sheet.getLastRow();
//   row = 20;

//   for (i=0;i<row-1;i++) {

//     range = sheet.getRange(row-i,12,1,5);
//     range.setBackgroundColor("#ADD8E6");
//     //range.setBorder(true, null, false, null, null, null, "black", SpreadsheetApp.BorderStyle.DOTTED);

//     var isblank = (range.getValues().toString() == ",,,,")

//     if (isblank) {
//       range.deleteCells(SpreadsheetApp.Dimension.ROWS);
//       continue
//     }
//     range.setBackgroundColor("white");
//   };

//   var end = new Date();
//   Logger.log((end-start));
//   fixFormat();
// }
