const net = require("net");

async function run() {
  const port = 3939;
  const hostname = "127.0.0.1";

  const socket = new net.Socket();

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });

  socket.connect(port, hostname, async () => {
    console.log("Connected to server");

    try {
      const { insertedId } = await insertOne(socket, {
        collection: "blocks",
        insertOne: {
          body: "Hello World!",
        },
      });

      await updateOne(socket, {
        collection: "blocks",
        updateOne: {
          filter: {
            _id: insertedId
          },
          data: {
            body: "Goodbye World!"
          }
        }
      });

      const note = await findOne(socket, {
        collection: "blocks",
        findOne: {
          filter: {
            _id: insertedId,
          },
        },
      });

      console.log("Found document:", note);

      await deleteOne(socket, {
        collection: "blocks",
        deleteOne: {
          filter: {
            _id: insertedId
          }
        }
      });

      console.log("Operations completed");
    } catch (err) {
      console.error("Error during operations:", err);
    } finally {
      socket.end();
    }
  });
}

function insertOne(socket, { collection, insertOne }) {
  return new Promise((resolve, reject) => {
    socket.once("data", (data) => {
      try {
        resolve(JSON.parse(String(data)));
      } catch (err) {
        reject(err);
      }
    });

    socket.write(
      JSON.stringify({
        collection,
        insertOne
      })
    );
  });
}

function findOne(socket, { collection, findOne }) {
  return new Promise((resolve, reject) => {
    socket.once("data", (data) => {
      try {
        resolve(JSON.parse(String(data)));
      } catch (err) {
        reject(err);
      }
    });

    socket.write(
      JSON.stringify({
        collection,
        findOne
      })
    );
  });
}

function updateOne(socket, { collection, updateOne }) {
  return new Promise((resolve, reject) => {
    socket.once("data", () => {
      resolve();
    });

    socket.write(
      JSON.stringify({
        collection,
        updateOne
      })
    );
  });
}

function deleteOne(socket, { collection, deleteOne }) {
  return new Promise((resolve, reject) => {
    socket.once("data", () => {
      resolve();
    });

    socket.write(
      JSON.stringify({
        collection,
        deleteOne
      })
    );
  });
}

run();
