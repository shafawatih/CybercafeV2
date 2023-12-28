/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /login/admin:
 *   post:
 *     summary: Perform login admin
 *     tags:
 *       - Admin Access
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Admin created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         password: XYZ123
 */



/**
 * @swagger
 * /create/user:
 *   post:
 *     summary: Create a New User
 *     description: Register a new user
 *     tags:
 *       - User Management
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               idproof:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         idproof: XYZ123
 */


/**
 * @openapi
 * paths:
 *   /view/user/admin:
 *     get:
 *       summary: View List of Users
 *       tags:
 *         - User Management
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successfully retrieved user information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "Dr Lim"
 *                     id: "B0987"
 *         '401':
 *           description: Unauthorized. Only admin can view
 *           content:
 *             application/json:
 *               example:
 *                 error: "Unauthorized"
 *         '500':
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               example:
 *                 error: "Internal Server Error"
 */
/**



/**
 * @swagger
 * /create/visitor:
 *   post:
 *     summary: Register a New Visitor
 *     tags:
 *       - Visitor List
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitorname:
 *                 type: string
 *               idproof:
 *                 type: string
 *               entrytime:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Visitor created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         visitorname: JohnDoe
 *         idproof: XYZ123
 *         entrytime: 1530
 */


/**
 * @openapi
 * paths:
 *   /view/visitor/admin:
 *     get:
 *       summary: View List of Visitors
 *       tags:
 *         - Visitor List
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successfully retrieved visitor information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "Dr Lim"
 *                     idproof: "B0987"
 *                     entrytime: "1530"
 *         '401':
 *           description: Unauthorized. Only admin can view
 *           content:
 *             application/json:
 *               example:
 *                 error: "Unauthorized"
 *         '500':
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               example:
 *                 error: "Internal Server Error"
 */

/**
 * @openapi
 * paths:
 *   /delete/visitor/{idproof}:
 *     delete:
 *       summary: Delete a Visitor
 *       tags:
 *         - Visitor List
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: idproof
 *           required: true
 *       responses:
 *         '200':
 *           description: Successfully retrieved visitor information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "Dr Lim"
 *                     idproof: "B0987"
 *                     entrytime: "1530"
 *         '401':
 *           description: Unauthorized. Only admin can view
 *           content:
 *             application/json:
 *               example:
 *                 error: "Unauthorized"
 *         '500':
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               example:
 *                 error: "Internal Server Error"
 */

/**
 * @swagger
 * /create/visitorlog/admin:
 *   post:
 *     summary: Create a visitor log
 *     tags:
 *       - Visitor Log
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitorname:
 *                 type: string
 *               idproof:
 *                 type: string
 *               timespend:
 *                 type: string
 *               payment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Visitor Log created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         idproof: XYZ123
 */


/**
 * @openapi
 * /view/visitorlog/admin:
 *   get:
 *     summary: View visitor logs
 *     tags:
 *       - Visitor Log
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               - visitorname: Dr Lim
 *                 idproof: B0987
 *                 timespend: 2 hours 30 minutes
 *                 payment: $10
 *               - visitorname: Jane Doe
 *       401:
 *         description: Unauthorized
 */



/**
 * @swagger
 * /create/computer:
 *   post:
 *     summary: Create a Computer's Availability
 *     tags:
 *       - Computer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idproof:
 *                 type: string
 *               lanportno:
 *                 type: string
 *               available:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Computer created successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         idproof: XYZ123
 */


/**
 * @openapi
 * /view/computer/admin:
 *   get:
 *     summary: Find Computer's Availability
 *     tags:
 *       - Computer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               - idproof: B0987
 *                 lanportno: 31712
 *                 available: yes
 *               - visitorname: Jane Doe
 *       401:
 *         description: Unauthorized
 */


