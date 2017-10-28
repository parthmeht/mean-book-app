var users = require('../../app/controllers/users.server.controller'),
menu = require('../../app/controllers/menu.server.controller');

module.exports = function(app) {
app.route('/api/menu/items')
 .get(menu.list)
 .post(users.requiresLogin, menu.create);

app.route('/api/menu/items/:itemId')
 .get(menu.read)
 .put(users.requiresLogin, menu.update)
 .delete(users.requiresLogin, menu.delete);

app.param('itemId', menu.itemByID);
};