const CONFIG = {
  spreadsheetId: 'PASTE_GOOGLE_SHEET_ID_HERE',
  sheetNames: [
    'MainSchedule',
    'CountDownToDate',
    'SpecialScheduleDays',
    'PeriodText'
  ]
};

function doGet(request) {
  const requestedSheetName = request && request.parameter && request.parameter.sheet
    ? request.parameter.sheet
    : CONFIG.sheetNames[0];
  const format = request && request.parameter && request.parameter.format === 'csv'
    ? 'csv'
    : 'json';

  if (!CONFIG.sheetNames.includes(requestedSheetName)) {
    return createResponse({
      error: `Sheet tab is not allowed: ${requestedSheetName}`
    }, format);
  }

  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId)
    .getSheetByName(requestedSheetName);
  if (!sheet) {
    return createResponse({
      error: `Sheet tab not found: ${requestedSheetName}`
    }, format);
  }

  const values = sheet.getDataRange().getDisplayValues();
  if (format === 'csv') {
    return ContentService
      .createTextOutput(toCsv(values))
      .setMimeType(ContentService.MimeType.CSV);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      updatedAt: new Date().toISOString(),
      sheet: requestedSheetName,
      rows: values
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function toCsv(values) {
  return values.map(row => row.map(escapeCsv).join(',')).join('\n');
}

function escapeCsv(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function createResponse(body, format) {
  const response = format === 'csv'
    ? `error,${escapeCsv(body.error)}`
    : JSON.stringify({ error: body.error });

  return ContentService
    .createTextOutput(response)
    .setMimeType(format === 'csv'
      ? ContentService.MimeType.CSV
      : ContentService.MimeType.JSON);
}
