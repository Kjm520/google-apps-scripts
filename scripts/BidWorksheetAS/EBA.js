/**
 * === Email Bid Anaylsis ===
 * This worked great and was replaced by the bot. It used a 1 min trigger and ran successfully for maybe 3 years?
 * Processing millions of emails.
 * But its time has come.
 */

// set global cariables and create regex constructors
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Email_Log');
//var times = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Times");

var regnum = new RegExp('[0-9]+');
var regnonum = new RegExp('[^0-9]+');
var regnodom = new RegExp('.*(?=\@)');

function processEmails() {
    //var start = new Date();
    const emailcount = 10;
    label = GmailApp.getUserLabelByName('Duke Energy');
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stats').getRange(29,12).setValue(new Date().toLocaleString());

    var threads = label.getThreads(0,emailcount);

    var currentinfo = sheet.getDataRange().getValues();
    for (i = 0;i < threads.length;i++) {
        Logger.log(i);

        var lastone = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stats').getRange(30,12).getValue();
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stats').getRange(30,12).setValue(lastone + 1);

        // get info from each email thread
        var message = threads[i].getMessages()[0];
        var subj = threads[i].getFirstMessageSubject();
        var sender = message.getFrom();
        var date = message.getDate();
        const time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        // pull numbers out of subject line and assign to variable
        try {
            var loadnum = regnum.exec(subj).toString();
        }
        catch {
            var loadnum = regnum.exec(subj);
        }

        // process emails that have matching subjects
        if (regnonum.exec(subj) == newquotesubj || regnonum.exec(subj) == decsubj || regnonum.exec(subj) == tendersubj) {

            if (sender === botsender) {
                var sender = 'Bot';
                if (regnonum.exec(subj) == newquotesubj) {
                    var status = 'Quote';
                }
                else if (regnonum.exec(subj) == decsubj) {
                    var status = 'Declined';
                }
            }

            if (sender !== botsender && regnonum.exec(subj) == tendersubj) {
                var status = 'Tender';
                var sender = regnodom.exec(sender);
            }

            var newinput = [[date, loadnum, status, sender, time]];
            var searchvalue = (loadnum + ',' + status);

            if (!currentinfo.toString().includes(searchvalue)) {
                sheet.getRange(2,1,1,newinput.flat().length).insertCells(SpreadsheetApp.Dimension.ROWS).setValues(newinput);
            }
        }
    }

    // var end = new Date();
    // var execution = ((end - start)/1000);
    // times.getRange(times.getLastRow()+1,1, 1, 2).setValues([[new Date(), execution]]);

}
