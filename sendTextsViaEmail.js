/**
 * Sends emails with data from the current spreadsheet
 * Based on https://developers.google.com/apps-script/articles/sending_emails
 * Based on http://ce170.groups.et.byu.net/syllabus/vbaprimer/xtra-email/index.php
 * (c) Riley Hales, RCH Engineering, 2020
 */

function sendTextsViaEmail() {
  // json for lookups converting carrier to email domain
  var carrierDomains = {
    "Sprint": "messaging.sprintpcs.com",
    "AT&T": "mmode.com",
    "Cingular":	"mobile.mycingular.com",
    "Nextel": "messaging.nextel.com",
    "T-Mobile":	"tmomail.net",
    "Verizon": "vtext.com",
  }
  
  // get the data from the spreadsheet -> need to tailor startRows & numRows
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;
  var numRows = 1;
  var dataRange = sheet.getRange(startRow, 1, numRows, 7);
  
  // message template which you can customize using data from the spreadsheet rows
  var messageTemplate = "message template with [replaceable] keywords";
  
  // for each row in the Range, render the email address and message and send as an email
  var data = dataRange.getValues();
  for (var i in data) {
    var row = data[i];
    var emailAddress = String(row[2]).replace("(", "").replace(")", "").replace("-", "").replace(" ", "") + "@" + carrierDomains[row[3]];
    var subject = "";
    var message = messageTemplate.replace("[replaceable]", "content from the spreadsheet");
    MailApp.sendEmail(emailAddress, subject, message);
  }
}
