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
});

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
      })
    })

    it("if called with any other route excepting '/api/topics', '/api/articles', '/api', '/api/users', '/api/comments' to have the return code 404 and message Route not found ", ()=>{
        return request(app)
        .get("/api/blabla")
        .expect(404)
        .then((response) => {
             expect(response.res.statusMessage).toBe("Not Found");
        })
     })

    it("returns all endpoints when called with /api",()=>{
        return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
            expect(typeof response).toBe("object");
            expect(response.body).toEqual(endpoints);
        })
    })

    //4-get-api-articles-article_id
    it("test to return an article as an object and specific properties", () => {
        const expectedObject = {
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: 1594329060000,
            votes: 100,
            article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            };
        return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((response) => {
                const { article } = response.body;
                for (const key in expectedObject) {
                    expect(article.key).toEqual(expectedObject.key);
                }
            })
    })

    it("400 error for no article id", () => {
        return request(app)
          .get("/api/articles/bla")
          .expect(400)
          .then(({body}) => {
                expect(body.msg).toBe("Bad Request")
            })
      })

    it("404 error message when passed valid article_id but not found", () => {
        return request(app)
          .get("/api/articles/111")
          .expect(404)
          .then(({body}) => {
                expect(body.msg).toBe("requested article not available")
            })
    })
    // 5-get-api-all-articles
    it("GET/api/articles/: will receive 200 and an array of article objects with the defined properties", () => {
        return request(app)
            .get("/api/articles/")
            .expect(200)
            .then((response) => {
                const { articles } = response.body;
                articles.forEach((article) => {
                    expect(article).toHaveProperty("author");
                    expect(article).toHaveProperty("title",);
                    expect(article).toHaveProperty("article_id");
                    expect(article).toHaveProperty("topic");
                    expect(article).toHaveProperty("created_at");
                    expect(article).toHaveProperty("votes");
                    expect(article).toHaveProperty("article_img_url");
                })
            })
    })
  
    it("GET/api/articles/: will receive 200 and should include the comment count ", () => {
        return request(app)
            .get("/api/articles/")
            .expect(200)
            .then((response) => {
                const { articles } = response.body;
                articles.forEach((article) => {
                    expect(article).toHaveProperty("comment_count");
                    if (article.article_id === 1) {expect(article.comment_count).toBe("11")}
                    if (article.article_id === 9) {expect(article.comment_count).toBe("2")}
                    })
            })
    })

    it("GET/api/articles/ should be sorted descending(by date)", () => {
        return request(app)
            .get("/api/articles/")
            .expect(200)
            .then((response) => {
                const { articles } = response.body;
                const isSortedDescending = (arr, key) => {
                    for (let i = 1; i < arr.length; i++) {
                      if (arr[i - 1][key] < arr[i][key]) {return false}
                    }
                    return true;
                  }
                  expect(isSortedDescending(articles, "created_at")).toBe(true);
            })
    })

    it("GET: 200 / articles should not have a body property", () => {
        return request(app)
            .get("/api/articles/")
            .expect(200)
            .then((response) => {
                const { articles } = response.body;
                articles.forEach((article) => {
                    expect(article).not.toHaveProperty("body");
                })
            })
    })


})

