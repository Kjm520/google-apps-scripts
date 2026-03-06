function creportcheck() {
  ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CLPR');
  archive = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Archive');
  crsheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Commission Report');
  var counter1 = 0;
  var counter2 = 0;
  var counter3 = 0;
  var paidloads = crsheet.getRange('B2:E').getValues();

  for (i = 2; i < ss.getLastRow() + 1; i) {
    var loadnum = ss.getRange(i, 2).getValue();
    var sell = ss.getRange(i, 5).getValue();
    var buy = ss.getRange(i, 6).getValue();
    var marg = ss.getRange(i, 7).getValue();
    var load = String(loadnum + ',' + sell + ',' + buy + ',' + marg);

    if (loadnum !== '' && paidloads.toString().includes(load)) {
      var row = ss.getRange(i, 1, 1, ss.getLastColumn()).getValues();
      var color = ss.getRange(i, 1, 1, ss.getLastColumn()).getBackground();
      archive
        .getRange(archive.getLastRow() + 1, 1, 1, 18)
        .setValues(row)
        .setBackground(color);
      ss.deleteRow(i);
      counter1++;
    }

    if (loadnum !== '' && !paidloads.toString().includes(load)) {
      i++;
      counter3++;
      continue;
    }

    if (loadnum == '') {
      i++;
      continue;
    }
  }
  for (i = 2; i < ss.getLastRow() + 1; i) {
    var loadnum = ss.getRange(i, 2).getValue();
    var load = String(loadnum);

    if (loadnum !== '' && paidloads.toString().includes(load)) {
      ss.getRange(i, 1, 1, ss.getLastColumn()).setBackground('#fff2cc');
      counter2++;
      i++;
      continue;
    }

    if (loadnum !== '' && !paidloads.toString().includes(load)) {
      i++;
      continue;
    }

    if (loadnum == '') {
      i++;
      continue;
    }
  }
  Ui = SpreadsheetApp.getUi();
  Ui.alert(
    'Transfer Complete',
    `Paid: ${counter1} \n Unpaid: ${
      counter3 - counter2
    } \n Mismatchs: ${counter2}`,
    Ui.ButtonSet.OK
  );
}
