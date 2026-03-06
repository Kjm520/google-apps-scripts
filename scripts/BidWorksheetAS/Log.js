function log() {
    var declinedchange = 0.98;

    s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bids');
    ls = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bid_Log');

    for (i = 0; i < 100; ) {
        var bidline = s.getRange(2 + i, 12, 1, 5);
        var bid = bidline.getValues();
        var result = bid[0][4].toUpperCase();
        noblank = !bid.flat().includes('');

        if (noblank && result == 'DECLINED') {
            newline = bid.flat();
            newline.unshift(new Date());
            newline.pop();

            newline.push(newline[4] * declinedchange);

            logspot = ls.getRange(2, 1, 1, newline.length);
            logspot.insertCells(SpreadsheetApp.Dimension.ROWS);
            logspot.setValues([newline]);
            bidline.deleteCells(SpreadsheetApp.Dimension.ROWS);
            continue;
        }

        if (noblank && result == 'ACCEPTED') {
            bidline.deleteCells(SpreadsheetApp.Dimension.ROWS);
            continue;
        }

        if (bid.flat().every((e) => e === '')) {
            i++;
            continue;
        } else i++;
    }
    moveUp();
}
