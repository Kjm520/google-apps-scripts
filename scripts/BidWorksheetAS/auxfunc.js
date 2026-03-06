function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu("Functions")
    .addItem('Log', 'log')
    .addItem('Move Up', 'moveUp')
    .addItem('Fix Format', 'fixFormat')
    .addToUi();
}