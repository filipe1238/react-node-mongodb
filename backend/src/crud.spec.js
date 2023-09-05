const db = require("./dataBase/DB.js");

describe("EventRepository", () => {
  const repository = db.getRepository("users");


  /* beforeAll(async () => {
    const database = db.getClient().db("testdb");
    const collection = database.collection("users");
    repository = new EventRepository(collection);
  }); */

  afterAll(async () => {
    await db.getClient().close();
  });

  beforeEach(async () => {
    await repository.deleteAll();
  });

  test("findAll", async () => {
    const result = await repository.findAll();
    expect(result).toEqual([]);
  });

  test("create", async () => {
    const user = {
      name: "alice",
      password: "SecurePassword123",
      email: "alice@example.com",
    };
    const result = await repository.create(user);
    expect(result).toEqual(user);
  });

  /**
   * create and find by id
   */
  test("create and findById", async () => {
    const user = {
      name: "alice",
      password: "SecurePassword123",
      email: "alice@example.com",
    };
    const result = await repository.create(user);
    const found = await repository.findById(result._id);
    expect(found).toEqual(result);
  });
  /**
   * create and find by all
   */
  test("create and findAll", async () => {
    const user = {
      name: "alice",
      password: "SecurePassword123",
      email: "alice@example.com",
    };
    const result = await repository.create(user);
    const foundAll = await repository.findAll();
    expect(foundAll.length).toBe(1);
    expect(foundAll[0]).toStrictEqual(
      expect.objectContaining({
        name: "alice",
        password: "SecurePassword123",
        email: "alice@example.com",
      })
    );
  });

  test("Update an event", async () => {
    const user = {
      name: "alice",
      password: "SecurePassword123",
      email: "alice@example.com",
    };
    const result = await repository.create(user);
    await repository.update(result._id, { name: "alice123" });
    const found = await repository.findById(result._id);
    expect(found.name).toBe("alice123");
    expect(found.password).toBe("SecurePassword123");
    expect(found.email).toBe("alice@example.com");
  });

  test("Delete an event", async () => {
    const user = {
      name: "alice",
      password: "SecurePassword123",
      email: "alice@example.com",
    };
    const result = await repository.create(user);
    await repository.delete(result._id);
    const found = await repository.findById(result._id);
    expect(found).toBeNull();
  });
});
