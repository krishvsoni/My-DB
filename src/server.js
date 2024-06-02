const http = require("http");
const fs = require("fs");
const cors = require("cors");
const express = require("express");

const collections = {};
const port = 3939;
const hostname = "127.0.0.1";
const dbFolderName = "db";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

try {
  fs.statSync(dbFolderName);
} catch (err) {
  fs.mkdirSync(dbFolderName);
}

const filenames = fs.readdirSync(dbFolderName);
for (const filename of filenames) {
  const collectionName = filename.split(".")[0];
  const collectionFileContents = fs.readFileSync(`${dbFolderName}/${filename}`);
  if (collectionFileContents) {
    collections[collectionName] = JSON.parse(collectionFileContents);
  }
}

app.post("/", (req, res) => {
  const jsonData = req.body;
  const collectionName = jsonData.collection;
  const storageMethod = jsonData.storageMethod || "file"; 
  const collection = getCollection(collectionName);
  let response;

  if (jsonData.insertOne) {
    const _id = new Date().getTime();

    collection[_id] = {
      ...jsonData.insertOne,
      _id,
    };

    if (storageMethod === "file") {
      saveToFile(collectionName);
    }

    response = { insertedId: _id };
  } else if (jsonData.findOne) {
    const filter = jsonData.findOne.filter;
    if (filter._id) {
      const data = collection[filter._id];

      response = data;
    } else {
      response = {};
    }
  } else if (jsonData.updateOne) {
    const filter = jsonData.updateOne.filter;
    if (filter._id) {
      collection[filter._id] = {
        ...collection[filter._id],
        ...jsonData.updateOne.data,
      };

      if (storageMethod === "file") {
        saveToFile(collectionName);
      }

      response = { modifiedCount: 1 };
    } else {
      response = { modifiedCount: 0 };
    }
  } else if (jsonData.deleteOne) {
    const filter = jsonData.deleteOne.filter;
    if (filter._id) {
      delete collection[filter._id];

      if (storageMethod === "file") {
        saveToFile(collectionName);
      }

      response = { deletedCount: 1 };
    } else {
      response = { deletedCount: 0 };
    }
  } else {
    response = { error: "Invalid operation" };
  }

  res.json(response);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getCollection(collectionName) {
  if (!collections[collectionName]) {
    collections[collectionName] = {};
  }
  return collections[collectionName];
}

function saveToFile(collectionName) {
  fs.writeFileSync(
    `${dbFolderName}/${collectionName}.json`,
    JSON.stringify(getCollection(collectionName))
  );
}
