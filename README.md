# Meisterwerk Quote Manager

This project is a quote management application with a focus on handling data offline, without an internet connection, using `expo-sqlite`. This library is particularly useful for offline handling as it is lightweight and an efficient way to store and retrieve data locally.

Quotes retrieved from `GET` requests are stored locally and are used instead of performing a new fetch when offline. Additionally, for creating new quotes, if there’s no internet connection, instead of a `POST` request, the quote is added to the local database with an `isSynced` field set to `false` (0).

There is a component to display the number of unsynced quotes, along with a button to manually trigger syncing once the internet is online. Upon successful syncing, these quotes are marked in the local database as `isSynced` (1) to indicate they’re up-to-date.

## Project Structure

- **API**: [`api/quotes.ts`](./api/quotes.ts) - Handles API requests for managing quotes.
- **Components**: UI components like `QuotesList`, `QuoteItem`, `Loading`, and `Error`.
- **Database**: [`database/quotesService.ts`](./database/quotesService.ts) - Defines SQLite CRUD operations for offline persistence.
- **Context**: [`context/QuotesContext.tsx`](./context/QuotesContext.tsx) - Manages quotes state and sync logic, handling offline scenarios.
- **Navigation**: [`navigation/QuotesStack.tsx`](./navigation/QuotesStack.tsx) - Manages navigation between screens.
- **Screens**: Screens for adding quotes and viewing the quotes list.
- **Config**: [`config/appInitializer.ts`](./config/appInitializer.ts) - Initializes app setup and configurations.

## Key Features

- **Offline Persistence**: Quotes are stored in SQLite for offline access, allowing to view quotes without internet connection.
- **Queued Offline Posting**: New quotes created offline are flagged as unsynced.
- **Manual Syncing**: Users can sync unsynced quotes manually when back online.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/diegonicolas250/meisterwerk-quote-manager.git
   cd meisterwerk-quote-manager
   npm install
   expo start
   ```
