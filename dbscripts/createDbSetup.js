db.createCollection("movies", {
  validator: {
    $and: [
      {
        actors: {
          $type: "array"
        },
        producers: {
          $type: "array"
        }
      }
    ]
  }
});

db.createCollection("actors");
db.createCollection("producers");
