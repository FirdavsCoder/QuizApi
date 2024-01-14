const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Quiz APIS',
            version: '1.0.0',
            description: 'API for user registration, login, and management',
            tags: [
                { name: 'users', description: 'Operations related to users' },
                { name: 'posts', description: 'Operations related to posts' },
            ],
            termsOfService: "https://example.com/terms/",
            contact: {
                name: "API Support",
                url: "https://www.example.com/support",
                email: "support@example.com"
            },
            license: {
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            },
        },
        servers: [
            {
                url: 'https://localhost:8080/'
            }
        ]
    },

    apis: ['src/modules/user/module.js'], // API manzillari
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
