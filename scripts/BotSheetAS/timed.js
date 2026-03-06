function condformats() {
  var ratessheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Rates');

  // Rule 1: Highlight duplicates in column A
  const rule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=COUNTIF($A$1:$A, $A1)>1')
    .setBackground('#e6b8af')
    .setRanges([ratessheet.getRange('A1:A')])
    .build();

  // Rule 2: Highlight column B red if less than column I on the same row
  const rule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$B1<$J1')
    .setBackground('#ff9999')
    .setRanges([ratessheet.getRange('B1:B')])
    .build();

  const rule3 = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$F1:G="Yes"')
    .setBackground('#b7e1cd')
    .setRanges([ratessheet.getRange('F1:G')])
    .build();

  // Apply the rules
  ratessheet.setConditionalFormatRules([rule1, rule2, rule3]);
}

function backupBotSheet() {

  const tz = Session.getScriptTimeZone();
  const stamp = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd_HHmmss');

  const source = SpreadsheetApp.openById(BOTSHEET_ID);
  const backupName = `${source.getName()}_backup_${stamp}`;

  // Create a fresh spreadsheet (no bound script) and copy selected sheets into it
  const backup = SpreadsheetApp.create(backupName);
  SHEETS_TO_BACKUP.forEach(name => {
    const sheet = source.getSheetByName(name);
    if (sheet) sheet.copyTo(backup);
  });

  // Remove the default blank sheet that comes with a new spreadsheet
  const defaultSheet = backup.getSheetByName('Sheet1');
  if (defaultSheet) backup.deleteSheet(defaultSheet);

  // Move the backup file into the archive folder (out of root)
  const backupFile = DriveApp.getFileById(backup.getId());
  DriveApp.getFolderById(ARCHIVE_FOLDER_ID).addFile(backupFile);
  DriveApp.getRootFolder().removeFile(backupFile);

  const url = backup.getUrl();
  Logger.log('Backup created (data only, no script): ' + url);
  return url;
}

function logRateCount() {
  const ss = SpreadsheetApp.getActive();
  const stats = ss.getSheetByName('Stats');

  const rateCount = stats.getRange('T3').getValue();
  const unratedCount = stats.getRange('T4').getValue();
  const excludedCount = stats.getRange('T8').getValue();
  const laneCount = stats.getRange('T5').getValue();
  const bidCount = stats.getRange('K4').getValue();
  const coverageCount = stats.getRange('T6').getValue();
  const uniqueOrigins = stats.getRange('T10').getValue();
  const uniqueDestinations = stats.getRange('T11').getValue();
  const uniqueModes = stats.getRange('T12').getValue();
  const cMaxLanes = stats.getRange('T13').getValue();
  const cCoverage = stats.getRange('T14').getValue();
  const combinedUniques = uniqueDestinations + uniqueModes + uniqueOrigins;

  const logName = 'CountLog';
  const log = ss.getSheetByName(logName);
  const date = new Date();

  const row = [date, rateCount, unratedCount, excludedCount, laneCount, bidCount, coverageCount, uniqueModes, uniqueOrigins, uniqueDestinations, combinedUniques, cMaxLanes, cCoverage];
  //log.appendRow(row);
  const newRowLocation = log.getRange(2,1,1,row.length);

  newRowLocation.insertCells(SpreadsheetApp.Dimension.ROWS);
  newRowLocation.setValues([row]);

  const lastRow = log.getLastRow();
  log.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd');
}

function timed() {
  condformats();
}
