  // for (i=sheet.getLastRow();i>0;i--) {
    
  //   Logger.log(i);
  //   range = sheet.getRange(sheet.getLastRow(),2,1,6);
    
  //   range.setBorder(true, null, false, null, null, null, "black", SpreadsheetApp.BorderStyle.DOTTED);
    
  //   var isblank = (range.getValues().toString() == ",,,,,")

  //   if (isblank) {
  //     range.deleteCells(SpreadsheetApp.Dimension.ROWS);
  //     ;
  //   }
  // }





//   function moveUpOLD() {
//   var s = new Date();
//   sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bids");
//   row = 200;

//   for (i=0;i<row-1;i++) {

//     r = sheet.getRange(row-i,12,1,5);

//     if (r.getValues().toString() == ",,,,") {
//       r.deleteCells(SpreadsheetApp.Dimension.ROWS);
//     }
//   };

//   var e = new Date();
//   Logger.log((e-s)/1000);
//   fixFormat();
// }