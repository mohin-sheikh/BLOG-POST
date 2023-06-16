const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    const routeFiles = fs.readdirSync(__dirname).filter((file) => file !== 'index.js');

    routeFiles.forEach((file) => {
        const routePath = path.join(__dirname, file);
        const route = require(routePath);
        route(app);
    });
};
