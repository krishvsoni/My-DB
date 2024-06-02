# My-DB 
My-DB is a simple in-memory or file-based database system that allows you to perform CRUD (Create, Read, Update, Delete) operations on collections of JSON documents.

<img width="414" alt="image" src="https://github.com/krishvsoni/My-DB/assets/67964054/3931890f-de26-4f7d-87be-d405086a705e">


## Endpoints
### POST /
- Description: Performs CRUD operations on collections.
- Request Body:
- collection: The name of the collection.
- storageMethod (optional): The storage method for the collection. Defaults to "file".
- One of the following operations:
   - insertOne: Inserts a new document into the collection.
   - findOne: Retrieves a single document from the collection.
   - updateOne: Updates a document in the collection.
   - deleteOne: Deletes a document from the collection.
- Response:
  - JSON object with operation-specific data.

### Example Usage
- Insert a Document
```javascript
{
  "collection": "books",
  "insertOne": {
    "title": "My Book",
    "author": "John Doe"
  }
}
```

- Find a Document
```javascript
{
  "collection": "books",
  "findOne": {
    "filter": {
      "_id": 123
    }
  }
}
```

- Update a Document
```javascript  
{
  "collection": "books",
  "updateOne": {
    "filter": {
      "_id": 123
    },
    "data": {
      "title": "Updated Book Title"
    }
  }
}
```

- Delete a Document
```javascript
{
  "collection": "books",
  "deleteOne": {
    "filter": {
      "_id": 123
    }
  }
}
```
