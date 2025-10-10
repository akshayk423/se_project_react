# ☔WTWR

WTWR (What To Wear) is an interactive React project that lets you organize clothing items you may want to wear in certain weather conditions. This uses the OpenWeatherMap API to get the current weather in your area.

# Features

### Location Data

The application will ask you for your location data to gather weather data using the OpenWeatherMap API using your latitude and longitude. Denying permissions to access your location will only show its default state of being in New York City and you will only see clothing items categorized in the `hot` category.

### Deleting Clothing Items

To delete a clothing item that is either shown in either in `/` or `/home`, you must click on the card and a modal will show to delete the respective clothing item. Then you will get a prompt that confirms if you want to delete and after you confirm it, the item will be deleted from the database.

### Adding Clothing Items

To add a clothing item, you must click on the `+ Add Clothes` Button in the header and you will be prompted to fill out a form that asks for the name of the clothing item, a URL of the image, and checking off if its either for hot, warm, or cold weather.

### Navigation

Currently you are able to navigate to the `/profile` by clicking on the username in the header or to back to home (`/`) by clicking either the logo or the `Back to home` button on the sidebar in the profile section. Inputting any sub-URL in the browser will render a Page Not Found in the main section of the application.

## Technologies used

- React (Frontend Framework)
- Vite (Project Setup)
- React-Router (Navigation)
- HTML (Frontend Markup)
- CSS (Frontend Styling)
- JavaScript (API & Functionality)
- json-server (Backend)

## Project Structure

### `main.jsx`

- The main root file for the project that sends all our JSX components to the `index.html` to be rendered on your browser

### `src/Components/` (Main React components)

All other components not listed are subcomponents of these directories:

- `/App/App.jsx` component is where we render all of the components in the application as well as creating routes, states, contexts, and making API calls for the application to function properly.

- `/Header/Header.jsx` is the component that renders all the components inside of the header itself and contains important UI elements such as the button to access the Add Garment form, the toggle switch between Fahrenheit and Celsius, and the navigation button to `/profile`by clicking on the username.

- `/Main/Main.jsx` is the component that renders all the contents in the main section of the home page and renders the weather card as well as the cards that correspond with the current weather gathered from the `weatherData` state from App.jsx.

- `/Profile/Profile.jsx` is the component that gets rendered over the main section of the page once the user clicks on the username in the header. It displays all clothing items inside of the database as well as a sidebar that allows the user to navigate back home.

- `/PageNotFound/PageNotFound.jsx` is the component that gets rendered over the main section of the page as well if the user happens to end up in a random sub URL of the application and will see Page Not Found in the main section of the application. This will be styled better with a navigation button to go back home. But for now, you can go back home by clicking the icon in the header.

### `/src/contexts/` (React context files)

- `ClothingCardContext.js`: The file that only exports our context for containing all data we may need for clothing cards inside the application, such as the card information themselves (`clothingItems`) as well as our handler functions for handling clothing card clicks and handle add garment `{handleCardClick, handleAddGarment}`.

- `WeatherDataContext.js`: This is also a JavaScript context file that exports the context to provide our components with the necessary weather data to function properly.

- `CurrentTemperatureUnitContext.js`: A key context file that makes the application be able to communicate directly between the header and the `/ToggleSwitch/ToggleSwitch.jsx` component inside the header what to do when the user clicks this switch and what is the current temperature unit being used in the application via the `{ currentTemperatureUnit, handleTemperatureUnitToggle }`

### `/utils/` (API Related)

- `api.js`: Contains our `/get`, `/delete`, and `/post` fetch request for our local database that is being persisted on `db.json` via `localhost:3001/items`.

- `weatherCardURLs.js`: contains an export of an array of objects that is used to translate the API's weather data call to be able to render the proper weather card on the UI.

- `weatherApi.js`: contains an API call function to the OpenWeatherMaps API that required the `VITE_WEATHER_API_KEY` env variable in the `.env`file to run. You can create a separate .env file with your own API key from OpenWeatherMap.org for free after creating an account. Another function also filters the data from the GET request from the API to be able to be used properly as a state variable in our App.jsx.

### `/hooks` (Custom hooks)

- `useFormWithValidation.js`: currently just exports react states as well as handler functions to deal with validating input and resetting the form after submitting the Add Garment form.

### `/assets` (Image assets)

- Default assets that are used for the application such as the logo, close button, and the user avatar currently.

### `/public/cards/` (weather card assets)

- Separated by `/Day` and `/Night` cards to be used inside of the Main.jsx component to render the proper weather card given the weather data from the API call or a default one if the user rejects location permissions.

### `/vendor/` (fonts and default styling)

- Contains files for the custom font used in the application as well as containing the `font.css` and `vendor.css` stylesheets.

- `font.css` : Stylesheet for importing the custom font which is Cabinet Grotesk with their respective font weights

- `vendor.css` : Stylesheet for containing fallback styles incase the user's browser cannot import specified fonts or styles used in the application src code.

Currently the backend is ran locally using `json-server` and uses the `db.json` file to have the application properly persist data, the command: `json-server --watch db.json --id _id --port 3001` must be ran in the git bash terminal in order for the backend of this application to work.

## Potential Updates

- Adding a feature to allow users to change their name and avatar
- Liking Cards and accessing liked clothing items via profile sidebar
- Allow clothing items to be worn in multiple weather conditions (possibly)
- Adaptive interface to support varying screen resolutions such as mobile or tablet.

# Github Deployment

(Publish on github pages)

# Video Pitch

[Click here](https://drive.google.com/file/d/1_QhAWcEbTdX7N8wKGv2u_HR6w9Kk5Xgx/view?usp=sharing)
