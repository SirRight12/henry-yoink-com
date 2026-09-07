The Google Sheet must contain these tabs:

- `MainSchedule`
- `CountDownToDate`
- `SpecialScheduleDays`

The selection is saved in the browser. The default is set in `Scripts/googleSheets.js`:

```js
window.databaseSource = "local";
```

Use `"local"` or `"google"` there when needed.

## Apps Script setup

1. Create the Google Sheet with the three tabs above.
2. Copy `AppsScript/GetDataForGoogleSheets.gs` into Google Apps Script.
3. Set the spreadsheet ID:

   ```js
   spreadsheetId: 'YOUR_GOOGLE_SHEET_ID'
   ```

4. Deploy it as a web app, executing as **Me**, with access for **Anyone with the link**.
5. Put the web app URL in `Scripts/googleSheets.js`:

   ```js
   endpoint: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'
   ```