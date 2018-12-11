const { Router } = require("express");
const Busboy = require("busboy");
const csv = require("csv-streamify");

const rootRouter = Router();


rootRouter.post("/search", (req, res) => {
  const query = String(req.body.query);
  const limit = Number.isInteger(req.body.limit) ? req.body.limit : 20;

  req.stateContainer
    .search(query, limit)
    .then(mapListsToObj)
    .then(results => res.json({ results }));
});

rootRouter.post("/import", acceptMultipart, (req, res) => {
  const multipartStream = new Busboy({ headers: req.headers });
  const parseStream = csv();

  parseStream.on("data", function (line) {
    req.stateContainer.put(line);
  });

  multipartStream.on("file", function(_fieldname, file, filename) {
    if ( !(/.*\.csv$/.test(filename)) ) {
      res.json(415, "Expects mimetype \"text/csv\"");
    } else {
      file.pipe(parseStream);
    };
  });

  multipartStream.on("finish", function() {
    res.sendStatus(201);
  });

  return req.pipe(multipartStream);
});


module.exports = rootRouter;


// HELPERS
function acceptMultipart (req, res, next) {
  if (req.is("multipart/form-data")) {
    next();
  } else {
    res.status(415).send("Expects Content-Type multipart/form-data");
  };
};

const mapListsToObj = (lists) => lists.map(listToObject);
const listToObject = (list) => ({
  id: Number(list[0]),
  name: String(list[1]),
  age: Number(list[2]),
  address: String(list[3]),
  team: String(list[4])
});