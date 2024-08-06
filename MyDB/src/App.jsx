import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [collection, setCollection] = useState("blocks");
  const [body, setBody] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [fetchedDocument, setFetchedDocument] = useState(null);
  const [storageMethod, setStorageMethod] = useState("file");

  const handleInsert = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3939", {
        collection,
        storageMethod,
        insertOne: { body },
      });
      setData(`Inserted ID: ${response.data.insertedId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post("http://127.0.0.1:3939", {
        collection,
        storageMethod,
        updateOne: {
          filter: { _id: documentId },
          data: { body },
        },
      });
      setData("Document updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFind = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3939", {
        collection,
        storageMethod,
        findOne: {
          filter: { _id: documentId },
        },
      });
      setFetchedDocument(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post("http://127.0.0.1:3939", {
        collection,
        storageMethod,
        deleteOne: {
          filter: { _id: documentId },
        },
      });
      setData("Document deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen  font-mono bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-md rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl text-center font-bold text-gray-600">Add Collection</h1>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div>
                  <label className="leading-loose">Collection:</label>
                  <input
                    type="text"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label className="leading-loose">Storage Method:</label>
                  <select
                    value={storageMethod}
                    onChange={(e) => setStorageMethod(e.target.value)}
                    className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="file">File</option>
                    <option value="memory">Memory</option>
                  </select>
                </div>
                <div>
                  <label className="leading-loose">Body:</label>
                  <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label className="leading-loose">Document ID:</label>
                  <input
                    type="text"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex justify-between space-x-2">
                  <button
                    onClick={handleInsert}
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800 mx-2"
                  >
                    Insert
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800 mx-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleFind}
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800 mx-2"
                  >
                    Find
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded hover:bg-gray-800 focus:outline-none focus:bg-gray-800 mx-2"
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <h2 className="text-xl text-gray-800 mt-4">Response</h2>
                  <pre>{data}</pre>
                  {fetchedDocument && (
                    <div>
                      <h2 className="text-xl text-gray-800 mt-4">Fetched Document</h2>
                      <pre>{JSON.stringify(fetchedDocument, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
