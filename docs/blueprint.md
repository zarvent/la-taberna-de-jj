# **App Name**: Moscow Tavern Finder

## Style Guidelines:

- Primary color: Blue (#003399), inspired by the blue in the Russian flag and winter sky.
- Secondary color: Light Blue (#ADD8E6), reminiscent of frozen rivers and winter landscapes.
- Accent color: Gold (#FFD700), a touch of opulence inspired by Russian Imperial design.
- Use a mix of traditional and modern fonts, such as a Cyrillic-inspired font for headings and a clean sans-serif font for body text, ensuring readability.
- Incorporate custom, detailed icons with a Russian cultural influence, such as matryoshka dolls, samovars, or Kremlin stars, to enhance the thematic consistency.
- Implement a clear, structured layout with a mobile-first approach, adapting to different screen sizes while maintaining a visually appealing and intuitive user experience.


## Core Features:

- Age Verification: Age verification modal to ensure users are over 18. Implemented using Firebase Authentication to control access based on verified status.
- Location Selection: Detect user's location (North/South Santa Cruz) via manual input or GPS. Persist the preference for future sessions.
- Smart Beverage Search: Enable intelligent search with filters for type, brand, and origin. Display results in a clear, sortable list.
- Store Locator & Availability: Show nearby liquor stores on a map with markers indicating real-time stock availability.
- Store Details & Pricing: Details of each store: address, hours, catalog, prices, and photos, all pulled from Firestore. Prioritize using edge functions or a similar caching strategy to minimize reads and latency.

