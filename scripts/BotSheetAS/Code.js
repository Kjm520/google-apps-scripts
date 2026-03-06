function onEdit(e) {
    var sheet = e.source.getActiveSheet();
    var range = e.range;
    var row = range.getRow();
    var col = range.getColumn();
    var lastRow = range.getLastRow();

    // Last Update Column
    if (sheet.getName() == 'Rates' && col == 2 && row > 1){
        if ((e.value || !e.value) && sheet.getRange(row, 1).getValue()) {
            time = new Date();

            if (sheet.getRange(row,9).getValue() >= 0){

                counter = sheet.getRange(row,9).getValue();
                sheet.getRange(row,9).setValue(counter + 1);

            }
            else {
                sheet.getRange(row,9).setValue(1);
            }

            sheet.getRange(row,8).setValue(time);
        }
    }
}
