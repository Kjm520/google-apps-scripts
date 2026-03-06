function exportSpamFromEmailsCsv() {
    const QUERY = 'in:spam';
    const PAGE_SIZE = 100;

    const threads = [];
    let start = 0;

    while (true) {
        const batch = GmailApp.search(QUERY, start, PAGE_SIZE);
        if (!batch.length) break;
        threads.push.apply(threads, batch);
        start += PAGE_SIZE;
    }

    const emailSet = new Set();

    threads.forEach(thread => {
        thread.getMessages().forEach(message => {
            const rawFrom = message.getFrom();
            if (!rawFrom) return;

            // Extract only the email address using regex
            const match = rawFrom.match(/<([^>]+)>/);
            const email = match ? match[1] : rawFrom.trim();

            if (!email) return;

            // Skip your own email
            if (email.toLowerCase() === USER_EMAIL.toLowerCase()) return;

            emailSet.add(email.toLowerCase());
        });
    });

    const rows = [['email']];

    emailSet.forEach(e => rows.push([e]));

    const csv = rows
        .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
        .join('\r\n');

    const file = DriveApp.createFile('spam_from_emails.csv', csv, MimeType.CSV);
    Logger.log('Created file: ' + file.getUrl());
}
