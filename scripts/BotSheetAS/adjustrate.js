function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Rate Tools')
    .addItem('Adjust Selected IDs', 'adjustSelectedIdsRatesSafe')
    .addToUi();
}

function adjustSelectedIdsRatesSafe() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getActiveSheet();
  const ratesSheet = ss.getSheetByName('Rates');

  if (sourceSheet.getName() !== 'Worksheet') {
    ui.alert('Run this only from the "Worksheet" sheet.');
    return;
  }

  if (!ratesSheet) {
    ui.alert('Sheet "Rates" was not found.');
    return;
  }

  const range = sourceSheet.getActiveRange();
  if (!range) {
    ui.alert('Please select one or more ID cells in column E.');
    return;
  }

  if (range.getColumn() !== 5 || range.getNumColumns() !== 1) {
    ui.alert('Please select only ID cell(s) from column E.');
    return;
  }

  const selectedIds = range.getValues()
    .flat()
    .map(v => String(v).trim());

  if (selectedIds.some(v => v === '')) {
    ui.alert('Selection contains blank cells. Aborting.');
    return;
  }

  const uniqueIds = [...new Set(selectedIds)];

  const response = ui.prompt(
    'Adjust Rates',
    'Enter amount to change by. Example: 25 or -25',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) return;

  const delta = Number(response.getResponseText().replace(/[$,\s]/g, ''));
  if (isNaN(delta)) {
    ui.alert('Invalid amount entered.');
    return;
  }

  const lastRow = ratesSheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('No data found on Rates sheet.');
    return;
  }

  const idsOnRates = ratesSheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  const ratesMap = new Map();
  const duplicateIds = [];

  idsOnRates.forEach((id, i) => {
    const cleanId = String(id).trim();
    if (!cleanId) return;

    const actualRow = i + 2;

    if (ratesMap.has(cleanId)) {
      duplicateIds.push(cleanId);
    } else {
      ratesMap.set(cleanId, actualRow);
    }
  });

  if (duplicateIds.length) {
    ui.alert(
      'Duplicate ID(s) found on Rates sheet. Aborting.\n\n' +
      [...new Set(duplicateIds)].slice(0, 20).join('\n')
    );
    return;
  }

  const missingIds = uniqueIds.filter(id => !ratesMap.has(id));
  if (missingIds.length) {
    ui.alert(
      'Some selected IDs were not found on Rates sheet. Aborting.\n\n' +
      missingIds.slice(0, 20).join('\n')
    );
    return;
  }

  const preview = uniqueIds.map(id => {
    const row = ratesMap.get(id);
    const currentRate = ratesSheet.getRange(row, 2).getValue();

    if (typeof currentRate !== 'number') {
      throw new Error(`Rate for ID ${id} in row ${row} is not numeric.`);
    }

    return `${id}: ${currentRate} -> ${currentRate + delta}`;
  });

  const confirm = ui.alert(
    'Confirm Rate Changes',
    `About to update ${uniqueIds.length} rate(s) by ${delta >= 0 ? '+' : ''}${delta}.\n\n` +
    preview.slice(0, 10).join('\n') +
    (preview.length > 10 ? `\n...and ${preview.length - 10} more.` : ''),
    ui.ButtonSet.OK_CANCEL
  );

  if (confirm !== ui.Button.OK) return;

  uniqueIds.forEach(id => {
    const row = ratesMap.get(id);

    const rateCell = ratesSheet.getRange(row, 2);       // B
    const lastUpdateCell = ratesSheet.getRange(row, 8); // H
    const countCell = ratesSheet.getRange(row, 9);      // I

    const currentRate = rateCell.getValue();
    if (typeof currentRate !== 'number') {
      throw new Error(`Rate for ID ${id} in row ${row} is not numeric.`);
    }

    const currentCount = Number(countCell.getValue());
    const nextCount = isNaN(currentCount) ? 1 : currentCount + 1;

    rateCell.setValue(currentRate + delta);
    rateCell.setBackground('#fff2cc');
    lastUpdateCell.setValue(new Date());
    countCell.setValue(nextCount);
  });

  ui.alert(`Done. Updated ${uniqueIds.length} rate(s).`);
}