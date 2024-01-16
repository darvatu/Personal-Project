const request = require("supertest");
const app = require("../db/app");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const endpoints=require("../endpoints.json")

beforeEach(() => {
 return seed(data);
});
afterAll(()=>{ 
 return db.end();
})

describe(" test BD for requests", () => {
    
  it("if returns an array of topic objects with 2 keys of description and slug when called with GET /api/topics", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0)
        response.body.forEach((topic)=>{
        expect(topic).toHaveProperty("description");
        expect(topic).toHaveProperty("slug");
        })
      });
    });

  it("if called with any other route excepting '/api/topics', '/api/articles', '/api', '/api/users', '/api/comments' to have the return code 404 and message Route not found ", ()=>{
    return request(app)
    .get("/api/blabla")
    .expect(404)
    .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
        });
    });

  it ("returns all endpoints when called with /api",()=>{
    return request(app)
    .get("/api")
    .expect(200)
    .then((response) => {
        expect(typeof response).toBe("object")
        expect(response.body).toEqual(endpoints)
    })
    })
})
