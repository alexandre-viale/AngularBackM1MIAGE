# Angular digital workspace
 ### Backend
 
 Angular digital workspace is a website where users can see their assignments, subjects, marks, edit them and admins can manage all the users content.
 
 ## Video presenting the app
 https://youtu.be/IHyzLiQfI7Y

 ## Features
 
-  **Secure JWT login**
	- The JWT login in handled in front-end and also in back-end. It means that even if you bypass the angular application by trying custom queries and you don't have a JWT token for admin user, the back-end will block you if you want to delete an assignment for example.
---
-  **Users permissions**
	-  The user has the ability to create or modify but not to delete.
---
-  **Guest mode**
	- If you don't login, you still have the possibility to look at the assignments, but you cannot interract with them.
---
-  **Users profile** (username, profile picture, ...)
	- When an assignment is created, you can see the nae and the profile picture of the subject owner and also the creator of the assignment.
---
-  **Assignments list** (sort, search bar and filter)
	- The list is sortable by date, name and it can also be filtered by name and returning status.
	- The list is expandable when you click on an assignment so you can see the details directly without having to the page, it provides a smoother experience in our opinion.
	- In those details you can also see the image of the subject
---
-  **Assignments creation** (name, subject, mark, owner, comment)
	- By opening the sidebar, you have the possibility (if you are logged) to open the page to create an assignment.
	- You'll have the possibility to connect the subject of the assignment to previous subjects you created, you'll can also add a comment to it.
---
-  **Assignments edition**
	- As the creation, by opening the sidebar, you have the possibility (if you are logged) to open the page to edit an assignment.
---
-  **Subjects creation** (name, picture, teacher)
	- By opening the sidebar, you have the possibility (if you are logged) to open the page to create a subject.
	- You will have to add the url of the image you want for the subject.
---
-  **Actions notification** (snackbar)
---
 
 ## Tech
 
 Angular digital workspace uses a number of open source projects to work properly:
 
 - [Mongoose](https://mongoosejs.com/) - Casting, validation, query building schema-based solution.
 - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
 - [Express](http://expressjs.com) - Fast node.js network app framework.
 
 ## Installation
 
 1. Angular digital workspace requires [Node.js](https://nodejs.org/) to run.

 2. Download the project from [this repository](https://github.com/alexandre-viale/AngularFrontM1MIAGE) and extract it in your computer.

 3. Open a command line or terminal window and navigate to the project directory. Then, run the following command to install the project's dependencies:
 ```sh
 npm install
```

 4. Set up the environment variables in the .env file. You can use the .env.example file as a template. If you want to use the database provided by us, you can use the following values: 
```sh
  MONGO_URI=mongodb+srv://alex:alex@cluster0.ioyvs.mongodb.net/assignments?retryWrites=true&w=majority
  ACCESS_TOKEN_SECRET = //your secret
```

 5. Run the following command to start the project:
 
```sh
 npm run dev
```
 ## Project Management
We used Jira to organise ourselves and distribute the tasks.
![Le P correspond à LEDIG Ian, l'autre correspond à VIALE Alexandre](https://cdn.discordapp.com/attachments/938717552723505182/1063776504175140894/image.png)

 ## Development team
 - [VIALE Alexandre](https://github.com/alexandre-viale),
 - [LEDIG Ian](https://github.com/ian-ledig).
 
 ## License
 
 MIT
