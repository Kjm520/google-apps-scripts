function onEdit(e) {
  const sh = e.range.getSheet();
  const sheetName = sh.getName();

  // Map sheet -> ID prefix
  const prefixMap = {
    "Expense Log": "EX",
    "Reimbursement Log": "RI",
  };

  const code = prefixMap[sheetName];
  if (!code) return; // ignore other tabs

  const row = e.range.getRow();
  const col = e.range.getColumn();

  // Only when editing Date column (A), ignore header
  if (col !== 1 || row < 2) return;

  const dateVal = sh.getRange(row, 1).getValue();
  if (!(dateVal instanceof Date)) return;

  const idCell = sh.getRange(row, 2); // ID in column B
  if (idCell.getValue()) return; // never overwrite existing IDs

  const tz = sh.getParent().getSpreadsheetTimeZone();
  const yyyymmdd = Utilities.formatDate(dateVal, tz, "yyyyMMdd");
  const prefix = `${code}-${yyyymmdd}-`;

  // Scan existing IDs in col B, find max seq for this date/prefix
  const lastRow = sh.getLastRow();
  const idValues = sh.getRange(2, 2, Math.max(0, lastRow - 1), 1).getValues(); // B2:B
  let maxSeq = 0;

  for (const [v] of idValues) {
    if (typeof v !== "string") continue;
    if (!v.startsWith(prefix)) continue;

    const m = v.match(/-(\d{3,})$/);
    if (!m) continue;

    const n = parseInt(m[1], 10);
    if (n > maxSeq) maxSeq = n;
  }

  const nextSeq = String(maxSeq + 1).padStart(3, "0");
  idCell.setValue(prefix + nextSeq);
}
