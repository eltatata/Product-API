# Product-API

Description
This web application is designed to securely and efficiently manage images and user data. The application uses JavaScript with the Node.js runtime environment and the Express framework to provide login and admin authentication functionalities.

# API Functionalities:

In addition to admin authentication, the application also offers an API that allows users to download and delete images from both the server and the database.

# Admin Authentication:

The loginAdmin function is responsible for admin authentication. When a user attempts to log in, the function checks if an admin user with the provided email exists in the database. If no user is found with that email, an error occurs. If a user is found, the function compares the password provided by the user with the encrypted password stored in the database. If the passwords do not match, an error occurs. If the passwords match, an access token and a refresh token are created. The access token has a short lifespan of 15 minutes, while the refresh token is stored in a cookie and has a long lifespan of 30 days. The function returns the access token and its expiry time to the client.

The refreshToken function is responsible for refreshing the access token. When a user attempts to refresh the access token, the function first checks if the refresh token is valid and has not expired. If the refresh token is valid, a new access token with a new expiry time is created and returned to the client.

The application uses the following controllers for admin authentication:

loginAdmin: handles admin login.
refreshToken: handles access token refresh.

# Image and Database Handling:

The application offers an API for downloading and deleting images from both the server and the database. Users can use the following routes to access these functionalities:

/download/:id: downloads an image from the server with the specified ID.
/delete/:id: deletes an image from the server and database with the specified ID.
The application uses a database to store information about images and admin users. The database is secure and designed to minimize security vulnerabilities.

# Middlewares:

The application uses the following middlewares for admin authentication:

requireRefreshToken: checks if the refresh token is valid and has not expired.
requireToken: checks if the access token is valid and has not expired.

# Conclusion:

In summary, this web application provides secure and efficient functionalities for managing images and user data. The admin authentication and API for downloading and deleting images make the application easy to use and secure for user
