/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.3.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Compare Verison 0.3.0 with 0.2.0 and you will see the green markers with new items in version 0.3.0 and red markers with removed items since 0.2.0.
 *
 * @apiParam {Number} id The Users-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/4711
 *
 * @apiSuccess {Number}   id            The Users-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the User.
 * @apiSuccess {String[]} nicknames     List of Users nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Users age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Users options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function getUser() { return; }


/**
 * @api {post} /login Login a User
 * @apiVersion 0.3.0
 * @apiName loginUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} username Name of the User.
 * @apiParam {String} password Password of the User.
 *
 * @apiSuccess {Number} id         The new Users-ID.
 *
 * @apiUse CreateUserError
 */
function loginUser() { return; }

/**
 * @api {post} /register Register a New User
 * @apiVersion 0.3.0
 * @apiName registerUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} username Name of the User.
 * @apiParam {String} password Password of the User.
 *
 * @apiSuccess {Number} id         The new Users-ID.
 *
 * @apiUse CreateUserError
 */
function registerUser() { return; }

/**
 * @api {put} /changepassword/:id Change Password
 * @apiVersion 0.3.0
 * @apiName changePassword
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} passowrd  Old passowrd of the User.
 *
 * @apiUse CreateUserError
 */
function changePassword() { return; }

/**
 * @api {post} /home get Movies
 * @apiVersion 0.3.0
 * @apiName getMovies
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiSuccess {Object[]} options       List of Movies options (Array of Objects).
 *
 * @apiUse  CreateUserError
 */
function getMovies() { return; }

/**
 * @api {post} /home get Movies by title
 * @apiVersion 0.3.0
 * @apiName getMoviesBySearch
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
  * @apiParam {String} title Title of Movie.
 *
 * @apiSuccess {Object[]} options       List of Movies options (Array of Objects).
 *
 * @apiUse CreateUserError
 */
function getMovies() { return; }

