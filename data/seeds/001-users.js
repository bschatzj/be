exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "test1",
          password: "1234",
          role: 1,
          first_name: "Test",
          last_name: "User 1",
          email: "test@testing.com",
        },
        {
          id: 2,
          username: "test2",
          password: "1234",
          role: 1,
          first_name: "Test",
          last_name: "User 2",
          email: "test@testing.com",
        },
        {
          id: 3,
          username: "test3",
          password: "1234",
          role: 1,
          first_name: "Test",
          last_name: "User 3",
          email: "test@testing.com",
        },
      ]);
    });
};