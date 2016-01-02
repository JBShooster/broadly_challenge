# broadly_challenge
The challenge was solved with Node/Express. I used an npm package called ineed in order to simplify the scraping. I created a helper method called httpGet that allows the user to make asynchronous URL requests. This was critical in order to parse through the near-dozen URLs of class rooms.

Once the data is retrieved, we loop through it and add up the number of rooms as well as a full list of students. From there, we loop through the student list and create another list of only the ones who are 25 and older. From there, we return that list as well as the number of rooms, number of students 25+ and the average number of students per room.
