Description of Login and Refresh Token Functionality
In this document, we will describe the functionality of the code related to login and refresh token in a web application. The code is written in JavaScript using the Node.js runtime environment and the Express framework.

Login and Refresh Token Controllers
The loginAdmin function is responsible for logging in the admin user. When a user tries to log in, the function first tries to find an admin user with the given email in the database. If there is no such user, it throws an error. If the user is found, it compares the password provided by the user with the hashed password stored in the database. If the passwords do not match, it throws an error. If the passwords match, it creates an access token and a refresh token. The access token has a short lifespan of 15 minutes, while the refresh token is stored in a cookie and has a long lifespan of 30 days. The function then returns the access token and its expiry time to the client.

The refreshToken function is responsible for refreshing the access token. When a user tries to refresh the access token, the function first checks if the refresh token is valid and not expired. If the refresh token is valid, it creates a new access token with a new expiry time and returns it to the client.

Routes
The web application has the following routes related to login and refresh token functionality:

/register: This route is used to register a new admin user.
/login: This route is used to log in an admin user. It calls the loginAdmin function.
/refresh: This route is used to refresh the access token. It requires a valid refresh token. It calls the refreshToken function.
Token Manager
The createToken function is responsible for creating the access token. It takes an admin user id as input and returns a token and its expiry time. The token is signed using the jsonwebtoken library.

The createRefreshToken function is responsible for creating the refresh token. It takes an admin user id and a response object as input. It returns a cookie containing the refresh token. The refresh token is signed using the jsonwebtoken library.

Middlewares
The web application has the following middlewares related to login and refresh token functionality:

requireRefreshToken: This middleware is used to check if the refresh token is valid and not expired. It extracts the refresh token from the cookie and verifies it using the jsonwebtoken library. If the refresh token is valid, it sets the admin user id in the req object and calls the next middleware. Otherwise, it returns an error message.
requireToken: This middleware is used to check if the access token is valid and not expired. It extracts the access token from the Authorization header and verifies it using the jsonwebtoken library. If the access token is valid, it sets the admin user id in the req object and calls the next middleware. Otherwise, it returns an error message.
Conclusion
The login and refresh token functionality is an important aspect of a web application's security. By using short-lived access tokens and long-lived refresh tokens, the web application can ensure that the user's information is protected from vulnerabilities.