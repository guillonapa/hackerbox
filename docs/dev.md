# Development Notes

This document is a work in progress.

## Environment

You will need a `.env` file at the root of `./server` with the following information:

```
DB_ROUTE=...
KEY_OR_SECRET=...
API_PORT=...
NEWS_API_KEY=...
```

## Local Database

For development of the online version of Hacker Box, you will need to set up a database instance locally.

TBD.

## Things to Do

- [x] Set the state at the root of the app: stories data.
- [x] Read the stories data (state) appropriately from cards.
- [x] Use a map to create all the Card components.
- [x] Set up the Suggest component correctly (including data sources).
- [x] Query News API after a new selection is made from Suggest.
- [x] Reload page with Home button.
- [x] Add help dialog to Help button.
- [x] Add menu to menu button.
- [x] Add a propper footer.
- [ ] Add database to application.
- [ ] Add users with username and password.
- [x] Add options to each story card (open, save, dismiss, copy link, etc.).
- [ ] Add table for 'Saved Stories'.
- [ ] Add section, tray, or page to show saved stories.
- [ ] Add profile page with settings.
