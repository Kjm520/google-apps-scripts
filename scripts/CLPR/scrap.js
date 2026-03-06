

// function combinewords() {
//   ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Cart");
//   firstwords = ss.getRange("A2:A").getValues().flat();
//   middlewords = ss.getRange("B2:B").getValues().flat();
//   lastrow = ss.getLastRow();
//   //ss.getRange("F2:F").clearContent();

//   for (i=0;i<lastrow;i++) {
//     if (firstwords[i].length > 0) {
//       for (j=0;j<lastrow;j++) {
//         if (middlewords[j].length > 0) {
//           newword = [[firstwords[i],middlewords[j]]];
//           Logger.log(firstwords[i]);
//           Logger.log(middlewords[j]);
//           Logger.log(newword);
//           ss.getRange(2,6,1,2).insertCells(SpreadsheetApp.Dimension.ROWS);
//           ss.getRange(2,6,1,2).setValues(newword);
//         }
//       }
//     }
//   }
// }


// for (i=0;i<lastrow;i++) {
//   if (firstwords[i].length > 0) {
//     for (j=0;j<lastrow;j++) {
//       if (middlewords[j].length > 0) {
//         newword = (firstwords[i]+" "+middlewords[j]);
//         ss.getRange("F2").insertCells(SpreadsheetApp.Dimension.ROWS);
//         ss.getRange("F2").setValue(newword);
//       }
//     }
//   }
// }
