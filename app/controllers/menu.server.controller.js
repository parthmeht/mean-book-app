var mongoose = require('mongoose'),
Item = mongoose.model('Item');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else if(err.message){
    if (err.code) {
      switch (err.code) {
        // If a unique index error occurs set the message error
        case 11000:
        case 11001:
          message = 'Item already exists';
          break;
        // If a general error occurs set the message error
        default:
          message = 'Something went wrong';
      }
    }
    return message;
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res) {
    var item = new Item(req.body);
  
    item.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(item);
      }
    });
};

exports.list = function(req, res) {
    Item.find().exec(function(err, items) {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(items);
      }
    });
};
  
exports.itemByID = function(req, res, next, id) {
    Item.find({itemId:id}).exec(function(err, items) {
      if (err) return next(err);
      if (!items) return next(new Error('Failed to load item ' + id));
  
      req.item = items[0];
      next();
    });
};

exports.read = function(req, res) {
    res.json(req.item);
};

exports.update = function(req, res) {
    var item = req.item;

    item.name = req.body.name;
    item.category = req.body.category;
    item.price = req.body.price;

    item.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(item);
        }
    });
};
  
exports.delete = function(req, res) {
    var item = req.item;
  
    item.remove(function(err) {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(item);
      }
    });
};

