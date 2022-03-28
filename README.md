# @Ifycode/buuks-react-client
<br/>

> Hosted on Netlify: https://buuks.netlify.app

#

<img width="1680" alt="Screenshot 2022-03-28 at 11 55 03 PM" src="https://user-images.githubusercontent.com/45185388/160500282-d785cac1-b469-405f-826f-e48a1889d850.png">

This is the frontend client for the [buuks-express-api](https://buuks-express-api.herokuapp.com/), built with react, typescript and tailwind css. Through the app's user interface, an (authenticated) user to interact with a database made for storing books. The app is able to do the following: 
- User signup and login (authentication)
- Create Read Update Delete operations for books which are saved in the database
- PDF file upload to Cloudinary 

## Run client app in development
The buuks client app is created with create-react-app and therefore runs at localhost port 3000. Use the command below to start the client app in development:
````
yarn start
````

## Connecting to backend/database in development
Add the line below in the client app's .env file to connect to the heroku backend deployment:
````
REACT_APP_BASE_URL=https://buuks-express-api.herokuapp.com
````

Alternatively, run the [backend repo](https://github.com/Ifycode/buuks-express-api) locally on your computer. Then use the localhost url you supplied as the API_HOST_URL from the backend's .env file, as the value for REACT_APP_BASE_URL in the client app's .env file.

## Helpful resources 
- For conditional header links rendering: [MWO's answer to stackoverflow question | Hide a component in Login in react Routes](https://stackoverflow.com/a/71158389/15012852)

- For navigating to another page on button click: [Mohamed MILADI's useNavigate answer | Attempted import error: 'useHistory' is not exported from 'react-router-dom'](https://stackoverflow.com/a/66971821/15012852)

- For PDF and form-data upload: [StackedQ's answer to stackoverfolow question: How to send values like form-data postman - react js](https://stackoverflow.com/a/53209439/15012852)

- For PDF and form-data upload: [MDN - A special case: sending files](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data#a_special_case_sending_files)

- For PDF and form-data upload: [handelChangeImage function from Ana Jentel's stackoverflow question](https://stackoverflow.com/q/48834530/15012852)

- [window.atob() github comment](https://github.com/microsoft/TypeScript/issues/45566#issuecomment-905059122)
