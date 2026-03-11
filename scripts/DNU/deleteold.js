function deleteOld() {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DNU');
    data = sheet.getRange('A2:D');
    data.sort(4);
    
    while ((((new Date().getTime()) - (sheet.getRange(2,4).getValue().getTime())) / 86400000) > 1000) {
        sheet.deleteRow(2);
    }
    // in other words, being DNU'd gets you DNU'd for 1000 days
}
