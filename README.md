Building:
- Go to "c2g" directory and run: sudo npm install (this may take some time).

- run: sudo npm start (this will run local server).

- Open http://localhost:8080/ in browser.

Testing (Not much of an experience in writing test cases in Karma, but I learned from docs and tried writing some.)

- Go to "c2g" directory and run: sudo npm install (this may take some time).

- run: karma start.



Objective:
- A dropdown that displays all available car2go locations and when one location is chosen by the user,

- Focus the map on that location and display all cars on it.

- The vehicles are live data but are not streamed so, refresh them in an interval.

- Click on a car might also display some vehicle details in a modal.

- Unit Tests for business logic.



Tech Used:
AngularJS (FrontEnd) + Express & Node(Server) + Karma(testing) + Google Maps API




Directory Structure/Thoughts:
client
    - css (some css for styling, I have just created a bare minimum UI required. It can be further improved.)
    - img (all the images required)
    - js
        - libraries (Angular related stuff)
        - App.js (Angular app entry point)
        - controllers.js (all the controllers required for angular App)
        - services.js (Services which hit the express server which then hits Car2Go API to fetch data).
        - *.spec.js (test specs made using karma)

server
    - locations (Service to fetch data from Car2Go API and return the locations)
    - vehicles (Service to fetch data from Car2Go API and return the vehicles in a specific location)




Issues:

- When I tried to hit the endpoints using $http service, i got CORS. For the workaround I used JSONP, but still I was not able to get the response due to strict MIME type checking error.



