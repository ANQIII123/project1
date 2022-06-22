PROJECT NAME AND SUMMARY

Project name: Food Singapore

Summary: This is an mobile-cnetered web-application aims to help users to identify places of interest with a simple search function. This web-application could show a list of all relevant places and users are able to visualise these places with the help of a local map. This web-application made use of Foursquare API and Leaflet map api. This ensures that all the location specific data are up to date. This application could also cluster the places together and shows an aggregate number on the map.

Motivation: The owner aism to create an open source project that allows great flexibility and customization. This project is uploaded to Github and could be edit or 'fork' by any creaters. This project is still at the beginning stages and may witness major changes in times to come.

Context: For example, people whose dietary preferences are vegetarian may face challenges when they are searching for restaurants. If they search the keyword 'vegetarian' on google map, only restaurants with 'vegetarian' in there name show up in the search result. Thus, some restaurant that serve vegetarian food without such keyword in their name are left out. This project all the users to filter and diisplay only vegetarian options. Thus user could search, for example, 'dining' and filter out the vegetarian options.

For another example, when people are searching for a bar, they may enter the keyword 'bar'. But when they are searching for dining placeswith a bar inside, it becomes difficult for them to search for such restaurant. This project allow people to search for a cuisine type, then filter out the bar. For example, user can search 'Italian' then filter out the bars to show only the italian restaurant with abr.

User and Organization goal: This project allow users to quickly select desired restaurants and visualise their locations. This project also allows organization to gain more publicity and show up in their customers' search result.

UX/UI:

The app follow a modern styling and a soft tone. This gives the user a friendly feeling when interacting with the app.
This app made use of bootstrap so that mobile users could use the app with no problems.


FEATURES

Interactive map: users can move and zoom the map

Search function: List out the relevant search result in the result box

Interactive search result: User can click on search result to move and zoom to that location. An pop up will be opened.

Pop up: Pop up display the information about the place's name, location and an image. These information are up to date and retrieved from Foursquare API.

Error handling: In cases where no image of the place is returned from foursquare, ie. Foursquare respond with 404, the application could continue the rest of the code and display the error in the console log.

Mobile centered: This web application could modify the display of the search result depending the screen size. If the user is on laptop, the result box is displayed on the top right. However, if the user is on mobile, the result box is on the bottom of the map. This is to ensure that the filter icon is interactive at all times.

Limitation: 

1. Toggle nearby on work when the filter is put on 'all'.
2. Image of places only work when the filter is put on 'all'.

Debugging: If there is any inconsistancy, user can reload the page.


TESTING

1. Enter 'Dining' in the search bar
2. Wait for the list of search result finish loading
3. Click on one of the list item in the result box. This will move and zoom the map to that location.
4. An pop up will open up with the details of that location.
5. User can close the pop up and zoom out.
6. User can click on the map control on the top right, user can click on vegetarian to view only the vegetarian restaurants.
7. User can click on bar to view only the restaurants with bars.
8. User then click on all
9. USer click on 'toggle nearby', this filter out the nearby places. This distance is calculated based on users' ip address.

Live Link:


credits and acknowledgement:

leaflet icons and clusters:
 https://leafletjs.com/examples/custom-icons/
https://leafletjs.com/reference.html

transparency for background images:
https://stackoverflow.com/questions/7241341/can-i-set-an-opacity-only-to-the-background-image-of-a-div

resizing buttons:
https://stackoverflow.com/questions/11689427/resizing-a-button


css styling:
https://www.w3schools.com/css/default.asp

bootstrap:
https://getbootstrap.com/
