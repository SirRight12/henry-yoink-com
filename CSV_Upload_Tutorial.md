# CSV Upload Tutorial

This website supports four schedule data files. You can upload one file at a time from the settings menu.

## The Four CSV Types

### 1. Main Schedule

**Purpose:** Defines when each class or period starts and ends on each kind of school day.

**Header:**

```text
Campus\tGrade Level Category/Group\tDay/s of the Week(M,T,W,Th, and/or F)\tHour/Period\tStart Time (24 hr)\tEnd Time (24 hr)
```

**Columns:**

| Column | Meaning | Example |
| --- | --- | --- |
| Campus | Campus or school location | `Vinland` |
| Grade Level Category/Group | Grade or school group | `High School` |
| Day/s of the Week | Days when this row applies | `M, T, Th` |
| Hour/Period | Period name or code | `1`, `L`, `HRM` |
| Start Time | Start time using a 24-hour clock | `8:15:01` |
| End Time | End time using a 24-hour clock | `8:58` |

**Example:**

```text
Campus,Grade Level Category/Group,Day/s of the Week(M,T,W,Th, and/or F),Hour/Period,Start Time (24 hr),End Time (24 hr)
Vinland,High School,"M, T, Th",1,8:15:01,8:58
Vinland\tHigh School\tW, F\t1\t8:59\t9:40
```

Use `M`, `T`, `W`, `Th`, and `F` for Monday through Friday. Separate multiple days with commas and put the whole day list in quotation marks. All four files are comma-separated.

### 2. Countdown

**Purpose:** Defines events shown in the countdown menu, such as breaks, quarter ends, and the end of the school year.

**Header:**

```text
Name,Campus,Grade Level Category/Group,"Date (Month Day, Year)",Time (24 hrs), Name in Spanish
```

**Columns:**

| Column | Meaning | Example |
| --- | --- | --- |
| Name | Event name in English | `End of QTR 1` |
| Campus | Campus or school location | `Vinland` |
| Grade Level Category/Group | Grade or school group | `High School` |
| Date | Event date written as Month Day, Year | `October 16, 2026` |
| Time | Event time using a 24-hour clock | `15:25:00` |
| Name in Spanish | Optional Spanish event name | `Fin del trimestre 1` |

**Example:**

```csv
Name,Campus,Grade Level Category/Group,"Date (Month Day, Year)",Time (24 hrs), Name in Spanish
End of QTR 1,Vinland,High School,"October 16, 2026",15:25:00,Fin del trimestre 1
```

If a value contains a comma, surround that value with quotation marks.

### 3. Special Schedule Days

**Purpose:** Defines days that do not follow the normal schedule, including no-school days, breaks, early releases, finals, and special weeks.

**Header:**

```text
Name,Campus,Grade Level Category/Group,Date/s (mm/dd/yyyy),Hour/Period,Start Time (24 hr),End Time (24 hr), Name in Spanish
```

**Columns:**

| Column | Meaning | Example |
| --- | --- | --- |
| Name | Name of the special day | `Early Release` |
| Campus | Campus or school location | `Vinland` |
| Grade Level Category/Group | Grade or school group | `High School` |
| Date/s | One date, a date range, or several dates | `11/25/2026` |
| Hour/Period | Optional period or special mode | `Normal` |
| Start Time | Optional replacement start time | `8:15` |
| End Time | Optional replacement end time | `12:00` |
| Name in Spanish | Optional Spanish name | `Salida temprana` |

**Examples:**

```csv
Name,Campus,Grade Level Category/Group,Date/s (mm/dd/yyyy),Hour/Period,Start Time (24 hr),End Time (24 hr), Name in Spanish
No School,Vinland,High School,02/15/2027,,,,
Spring Break,Vinland,High School,03/22/2027-03/26/2027,,,,
Early Release,Vinland,High School,11/25/2026,Normal,8:15,12:00,Salida temprana
```

For multiple dates in one field, quote the field, for example:

```csv
No School PD,Vinland,High School,"09/18/2026, 10/16/2026, 11/13/2026",,,,
```

### 4. Period Text

**Purpose:** Gives friendly names and descriptions to period codes used by the Main Schedule file.

**Header:**

```text
Code,Text, Text in Spanish
```

**Columns:**

| Column | Meaning | Example |
| --- | --- | --- |
| Code | The exact period code used in Main Schedule | `WH` |
| Text | English display text | `Warrior Hour` |
| Text in Spanish | Optional Spanish display text | `Hora del Guerrero` |

**Example:**

```csv
Code,Text, Text in Spanish
C,Chapel,Capilla
WH,Warrior Hour,Hora del Guerrero
L,Lunch,Almuerzo
1,1st period,1er periodo
```

The Code must match the value in the Main Schedule `Hour/Period` column. If it does not match, the friendly text will not be applied.

## How To Edit A CSV

1. Make a copy of the example file before editing it.
2. Keep the first row as the header. Do not rename or remove required columns.
3. Edit one row per schedule item, event, special day, or period code.
4. Keep times in 24-hour format. For example, 3:25 PM is `15:25:00`.
5. Use the date format required by that file type.
6. Put quotation marks around a field that contains commas.
7. Do not add extra notes above the header or below the data.
8. Save the file as `.csv` using UTF-8 when your spreadsheet program asks for an encoding.
9. Keep every file comma-separated. Put quotation marks around Main Schedule day lists and any other field containing commas.

## How To Upload A CSV

1. Open the website settings.
2. Open **Schedule Data**.
3. In **CSV type to upload**, select the type of file you are uploading:
   - Main Schedule
   - Countdown
   - Special Days
   - Period Text
4. Click **Choose CSV File**.
5. Select one `.csv` file.
6. The website saves the contents in this browser and reloads the page.

The dropdown selection tells the site where to save the file. For example, selecting **Countdown** and uploading `CountDownToDate.csv` saves it as the custom Countdown data.

## Local And Global Data Rules

The website has two data sources:

- **Local:** The CSV files included in the website folder.
- **Global:** The connected Google Sheets data.

For each of the four data types, the priority is:

1. A valid uploaded CSV for that type.
2. The selected source: Local CSV or Global Google Sheet.
3. If Google Sheets fails while Global is selected, the bundled Local CSV is used.

A valid upload for one type does not replace the other types. For example, uploading a Main Schedule file does not replace Countdown data.

## Upload Errors

The website checks the file extension and required header names. If the file cannot be read or does not match the selected type:

- The upload is marked as having an error.
- The website tells the user which upload failed.
- With **Local** selected, the bundled local CSV is used for that type.
- With **Global** selected, Google Sheets is used for that type.
- The error state remains until a valid replacement CSV is uploaded.

The error message looks like:

```text
The uploaded mainSchedule CSV has an error. Using the fallback data.
```

## Where The Files Are Stored

Uploaded file contents are stored in the browser's `localStorage`, not written back into the website folder. They remain available after closing and reopening the page in the same browser on the same device.

They can disappear if browser/site data is cleared, private browsing is used, a different browser or device is used, or **Reset Settings** is selected.

## Clearing An Uploaded CSV

To remove a saved upload, open the browser developer console and run the matching command:

```js
localStorage.removeItem("customSchedule_mainSchedule");
localStorage.removeItem("customSchedule_countdown");
localStorage.removeItem("customSchedule_specialScheduleDays");
localStorage.removeItem("customSchedule_periodText");
```

Then reload the website. The affected type will use the selected Local or Global source again.
