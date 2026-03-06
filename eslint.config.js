export default [
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        // Google Apps Script globals
        SpreadsheetApp: "readonly",
        DriveApp: "readonly",
        GmailApp: "readonly",
        UrlFetchApp: "readonly",
        PropertiesService: "readonly",
        ScriptApp: "readonly",
        HtmlService: "readonly",
        Utilities: "readonly",
        Logger: "readonly",
        Session: "readonly",
        Browser: "readonly",
        CalendarApp: "readonly",
        DocumentApp: "readonly",
        FormApp: "readonly",
        SitesApp: "readonly",
        MailApp: "readonly",
        Maps: "readonly",
        console: "readonly",
      },
    },
    rules: {
      // Formatting
      "indent": ["warn", 4],
      "quotes": ["warn", "single"],
      "semi": ["warn", "always"],
      "comma-dangle": ["warn", "never"],
      "no-trailing-spaces": "warn",
      "eol-last": ["warn", "always"],
      "space-before-function-paren": ["warn", "never"],
      "keyword-spacing": ["warn", { "before": true, "after": true }],
      "space-infix-ops": "warn",
      "no-multiple-empty-lines": ["warn", { "max": 1 }],
    },
  },
];
