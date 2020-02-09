# Proto Type to the Words of Glory Page

## Table of Contents
- About the project
- Server Side Dependencies
- Client Side Dependencies
- Future Development

## About Words of Glory
This is a project from a relatively new ministry named No Limits Ministries. Inside are lessons for anyone who wishes to read them. The home site, when completed will be named, "Words of Glory." However, this is a test site in order to showcase the material that will be on the actual site as well as enable viewers the opportunity to see some of the features that will be included in the final product of Words of Glory. 

## Server 
The server contains dependencies from JsonWebToken, SendGrid, Encrypt, Google Authentication Library and Facebook Authentication. The structure of the administration system was developed using a course from Udemy on MERN stack authentication techniques, where the correct application of authentication was necessary with both administration and user access for this project. In the future, this might carry on to further development and access. 

Sendgrid ensures that the emails being produced are authentic so that individuals or bots do not inflate the data with faulty information. This was not as necessary on the test cite, but will be important on the fully developed cite. Code is written that was commented out that can remove sendgrid from the test cite will providing unchecked authentication. 

Google and Facebook logins are available through their individual libraries. 

Administration and user authentication divides what the users are capable of seeing vs the administrators. This enables the addition of more lessons on the website without constantly updating the total website. 

## Client
The Client side contains dependencies from Bootstrap, Wysiwyg which is an application off of draftJS, as well as Axios, Bible-API and react-draggable. All these packages enable an easier and interactive client-side experience. 

Wysiwyg is a project that incoporates draftJS, an editor rich project with typical word document features for writing. This is then translated directly to html and can be posted as was written. This particular feature needs more work, but is currently working on the administrative end.

React-draggable enables notes on the user side to be relocated around the screen. If you are taking notes on a particular lesson, you should be able to move those notes around as needed to continue note-taking. 

Bible-API provides a quick and easy way to grab the scriptures related to a lesson without the administrator having to code each scripture in by hand. 

Bootstrap was the framework that enabled much of the organizational techniques seen in this file. 

## Future Development

This project needs to be cleaned up further with better interactivity. There might not be a user file with note taking directly on the actual website. This was created for the purposes of having an element for user interactivity for the final project in GA Tech bootcamp. However much of the administration side needs to be ironed out further with implementation of a table for a chosen "lesson of the day" and a fully functional searchbar in the library. Since there are far more lessons than are posted here, better organizational techniques will need to be implemented. Currently looking into Sliders much like netflix uses as well as remaking features on tables to include summaries in order to purvey information clearly. 