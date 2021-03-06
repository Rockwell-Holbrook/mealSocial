const data = require("../data/databaseConnection");

exports.getRecipes = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [req.params.name];
  let sql = "SELECT * FROM Recipe WHERE name=?";

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(rows);
  });

  data.closeDataConnection(db);
};

exports.createRecipe = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [
    req.body.recipeName,
    req.body.imageUrl,
    req.body.notes,
    req.body.ingredientId,
    req.body.name,
  ];
  let sql =
    "INSERT INTO Recipe(recipeName, imageUrl, notes, ingredientId, name) VALUES (?, ?, ?, ?, ?)";

  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(400);
    } else {
      db.get(
        "SELECT * FROM Recipe ORDER BY id DESC LIMIT 1;",
        [],
        (err, rows) => {
          if (err) {
            console.log(err);
            throw err;
          }
          res.send(rows);
        }
      );
    }
  });

  data.closeDataConnection(db);
};

exports.getRecipeById = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [req.params.id];
  let sql = "SELECT * FROM Recipe WHERE id=?";

  db.get(sql, params, (err, row) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(row);
  });

  data.closeDataConnection(db);
};

exports.editRecipe = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [
    req.body.recipeName,
    req.body.imageUrl,
    req.body.notes,
    req.body.ingredientId,
    req.body.name,
    req.params.id,
  ];
  let sql =
    "UPDATE Recipe SET recipeName=?, imageUrl=?, notes=?, ingredientId=?, name=?  WHERE id=?";

  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });

  data.closeDataConnection(db);
};

exports.deleteRecipe = function (req, res, next) {
  let db = data.openDataConnection();
  let sql = "DELETE FROM Recipe WHERE id=?";

  db.run(sql, req.params.id, (err) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });

  data.closeDataConnection(db);
};
