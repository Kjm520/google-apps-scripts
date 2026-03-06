function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Functions')
      .addItem('Clear Paid Loads', 'creportcheck')
      .addSeparator()
      .addItem('Fix Format', 'fixformat')
      .addSeparator()
      .addItem('Combine Words', 'combinewords')
      //.addSeparator()
      //.addItem('Combine Words', 'combinewords')
      .addToUi();
}

function menuItem2() {
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
     .alert('You clicked the second menu item!');
}