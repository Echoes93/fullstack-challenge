const { Router } = require("express");
const Busboy = require("busboy");
const csv = require("csv-streamify");

const rootRouter = Router();

rootRouter.post("/search", (req, res) => {
  const { query, limit } = req.body;

  req.stateContainer
    .search(query, limit)
    .then(mapListsToObj)
    .then(results => res.json({ results }));
});

rootRouter.post("/import", (req, res) => {
  const multipartStream = new Busboy({ headers: req.headers });
  const parseStream = csv();

  parseStream.on("data", function (line) {
    req.stateContainer.put(line);
  });

  multipartStream.on("file", function(_fieldname, file) {
    file.pipe(parseStream);
  });

  multipartStream.on("finish", function() {
    res.json("ok");
  });

  return req.pipe(multipartStream);
});

module.exports = rootRouter;


// HELPERS
const mapListsToObj = (lists) => lists.map(listToObject);
const listToObject = (list) => ({
  id: Number(list[0]),
  name: String(list[1]),
  age: Number(list[2]),
  address: String(list[3]),
  team: String(list[4])
});