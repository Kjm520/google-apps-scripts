function timeclear() {
  ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CLPR");
  ss.getRange("O2:O").clearContent();
  condformatrulings();
}

function fixformat() {
  ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CLPR");
  ss.getRange("J2:J").setNumberFormat("000000");
  ss.getRange("N2:N").setNumberFormat("#");
  ss.getRangeList(["A2:A", "R2:R"]).setNumberFormat('M/d');
}

function condformatrulings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // ===== Sheet: CLPR (existing rules) =====
  const sheet = ss.getSheetByName("CLPR");
  const existingRules = sheet.getConditionalFormatRules();

  // Rule 1 — Column O (existing logic)
  const rangeO = sheet.getRange("O2:O");
  const ruleO = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=TIMEVALUE(NOW()) > (TIMEVALUE($O2) + (2/24))')
    .setBackground('#FFFF00')
    .setRanges([rangeO])
    .build();

  // Rule 2 — Column A (90+ days old)
  const rangeA = sheet.getRange("A2:A");
  const ruleA = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($A2<>"", TODAY() - $A2 > 90)')
    .setBackground('#FFFF00')
    .setRanges([rangeA])
    .build();

  existingRules.push(ruleO, ruleA);
  sheet.setConditionalFormatRules(existingRules);

  // ===== Sheet: Search (new rule) =====
  const searchSheet = ss.getSheetByName("Search");
  const searchRules = searchSheet.getConditionalFormatRules();

  // Rule 3 — Range I2:W, if date in column I is older than 1 year -> gray text
  const rangeIW = searchSheet.getRange("I2:W");
  const ruleIW = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($I2<>"", $I2 < EDATE(TODAY(), -12))')
    .setFontColor('#999999')
    .setRanges([rangeIW])
    .build();

  searchRules.push(ruleIW);
  searchSheet.setConditionalFormatRules(searchRules);
}
