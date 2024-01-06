/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     adminAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Perform Admin Login
 *     description: 
 *       - Authenticate admin user
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
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: Admin login successful
 *               hostsData: 
 *                 - hostName: "Host1"
 *                   ipAddress: "192.168.1.1"
 *                 - hostName: "Host2"
 *                   ipAddress: "192.168.1.2"
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 *     examples:
 *       'application/json':
 *         username: adminUser
 *         password: adminPassword
 */


/**
 * @swagger
 *   /login:
 *   post:
 *     summary: Perform Admin Login
 *     description: 
 *       - Authenticate admin user
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
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: Admin Created Successfully
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *       '500':
 *         description: Internal Server Error
 *
 *     examples:
 *       'application/json':
 *         username: JohnDoe
 *         password: XYZ123
 */



/**
 * @swagger
 * /register/user:
 *   post:
 *     summary: Create a New User
 *     description: 
 *       - Create a new user with a strong password.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *       400:
 *         description: Weak password. Please use a stronger password (Minimum of 8 characters, at least one lowercase letter (a-z), at least one uppercase letter (A-Z), at least one digit (0-9), at least one special character)
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
 *       summary: View List of Users (only admin)
 *       description: 
 *         - Get a list of all users (admin access required)
 *       tags:
 *         - User Management
 *       security:
 *         - bearerAuth: []
 *         - adminAuth: []
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
 * /create/visitor/user:
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
 *               timespend:
 *                 type: string
 *               age:
 *                 type: string
 *               phonenumber:
 *                 type: string
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
 * /create/test/visitor:
 *   post:
 *     summary: Create a Visitor with Security Approval
 *     tags:
 *       - Approved Visitor List 
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
 *                 type: string
 *               approval:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Visitor Created Successfully
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
 *         approval: yes
 */

/**
 * @openapi
 * paths:
 *   /view/test/visitor/admin:
 *     get:
 *       summary: View Approved Visitors
 *       tags:
 *         - Approved Visitor List
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successfully retrieved visitor information.
 *           content:
 *             application/json:
 *               example:
 *                 visitors:
 *                   - visitorname: "Nur"
 *                     idproof: "B23134"
 *                     entrytime: "1530"
 *                     approval: "yes"
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
 * /issue/visitorpass:
 *   post:
 *     summary: Issue a Visitor Pass for an Authenticated Admin
 *     tags:
 *       - Visitor Pass
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
 *               age:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               message: Visitor Pass issued successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 */



/**
 * @swagger
 * /create/visitorpass/admin:
 *   post:
 *     summary: Create a Visitor Pass
 *     tags:
 *       - Visitor Pass
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
 *               message: Visitor Pass created successfully
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
 * /view/visitorpass/admin:
 *   get:
 *     summary: View Visitor Passes
 *     tags:
 *       - Visitor Pass
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
 *                 idproof: J12345
 *                 timespend: 1 hour
 *                 payment: $5
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


