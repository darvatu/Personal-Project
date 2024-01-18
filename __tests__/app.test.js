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
                expect(body.msg).toBe("Not Found")
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
  
    it("GET/api/articles/ will respond with 200 and with articles and should include the comment count ", () => {
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

    it("GET/api/articles/ will respond with 200 and with articles sorted descending(by date)", () => {
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

    it("GET/api/articles/ will respond with 200 and with articles without a body property", () => {
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

    // 6-get-api-articles-article_id-comments

    it("GET/api/articles/1/comments will respond with an array of all the comments on that given article and will have the required properties", () => {
            return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then((response) => {
                    const {comments} = response.body;
                    comments.forEach((comment) => {
                        expect(comment).toHaveProperty("comment_id");
                        expect(comment).toHaveProperty("body");
                        expect(comment).toHaveProperty("votes");
                        expect(comment).toHaveProperty("author");
                        expect(comment).toHaveProperty("article_id");
                        expect(comment).toHaveProperty("created_at");
                    })
                })
        })

    it("GET/api/articles/1/comments will return comments with most recent first", () => {
            return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then((response) => {
                    const {comments} = response.body;
                    expect(comments).toBeSortedBy("created_at", {descending: true})
                })
        })

    it("GET/api/articles/2/comments respond with an empty array as it is an article but no comments to it", () => {
            return request(app)
                .get("/api/articles/2/comments")
                .expect(200)
                .then((response) => {
                    const {comments} = response.body;
                    expect(comments.length).toBe(0);
                })
        })

    it("GET/api/articles/bla/comments will return  Bad Request", () => {
            return request(app)
                .get("/api/articles/bla/comments")
                .expect(400)
                .then((response) => {
                    const {msg} = response.body;
                    expect(msg).toBe("Bad Request");
                })
        })

    it("GET/api/articles/111/comments respond with Not Found as no article with that id number", () => {
            return request(app)
                .get("/api/articles/111/comments")
                .expect(404)
                .then((response) => {
                    const {msg} = response.body;
                    expect(msg).toBe("Not Found");
                })
        })
        
// 7-post-api-articles-article_id-comments

    it ("POST /api/articles/1/comments return 201, add the comment and respond with the new comment", () => {
        const newComment = {
            author: "butter_bridge",
            body: "Any good news if Trumps wins?"
            };
        return request(app)
            .post("/api/articles/1/comments")
            .send(newComment)
            .expect(201)
            .then((response) => {
                const { comment } = response.body;
                expect(comment.author).toBe("butter_bridge");
                expect(comment.body).toBe("Any good news if Trumps wins?");
                expect(comment.votes).toBe(0);
                expect(comment).toHaveProperty("article_id");
                expect(comment).toHaveProperty("created_at");
            })
    })

    it("POST/api/articles/bla/comments to return 400, Bad Request", () => {
        const newComment = {
            author: "butter_bridge",
            body: "Any good news if Trumps wins?"
            };
        return request(app)
            .post("/api/articles/bla/comments")
            .send(newComment)
            .expect(400)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Bad Request");
            })
    })

    it("POST/api/articles/111/comments should return 404, Not Found as there is no article", () => {
        const newComment = {
            author: "butter_bridge",
            body: "Any good news if Trumps wins?"
            };
        return request(app)
            .post("/api/articles/111/comments")
            .send(newComment)
            .expect(404)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Not Found");
            })
    })

    it("POST/api/articles/1/comments should return 404, Not Found if invalid author ", () => {
        const newComment = {
            author: "bla",
            body: "Any good news if Trumps wins?"
            };
        return request(app)
            .post("/api/articles/1/comments")
            .send(newComment)
            .expect(404)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Not Found");
            })
    })

    it("POST/api/articles/1/comments should return 400, Bad Request if missing comment_body", () => {
        const newComment = {
            author: "butter_bridge"
            };
        return request(app)
            .post("/api/articles/1/comments")
            .send(newComment)
            .expect(400)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Bad Request");
            })
    })

    it("POST/api/articles/1/comments 400 /1/comments with missing author should return Bad Request", () => {
        const newComment = {
        body: "Any good news if Trumps wins?"
            };
        return request(app)
            .post("/api/articles/1/comments")
            .send(newComment)
            .expect(400)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Bad Request");
            })
    })

    it("POST/api/articles/1/comments return 400, should return Bad Request when missing comment_body", () => {
        return request(app)
            .post("/api/articles/1/comments")
            .expect(400)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Bad Request");
            })
    })


    // 8-patch-api-articles-article_id


    it("PATCH/api/articles/1 return 200, votes increased by 1 at article_id=1 and tests the identifiers if remain the same at the end", () => {
        const newVote = { inc_votes: 100 };
        const expectedArticle = {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 200,
            article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        };
        return request(app)
            .patch("/api/articles/1")
            .send(newVote)
            .expect(201)
            .then((response) => {
                const { article } = response.body;
                for (const key in expectedArticle) {
                    expect(article[key]).toEqual(expectedArticle[key]);
                }
            })
    })

    it("PATCH/api/articles/1 returns 201 and votes decreased by 10 to article_id=1 ", () => {
        const newVote = { inc_votes: -10 };
        const expectedArticle = {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 90,
            article_img_url:"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        };
        return request(app)
            .patch("/api/articles/1")
            .send(newVote)
            .expect(201)
            .then((response) => {
                const { article } = response.body;
                for (const key in expectedArticle) {
                    expect(article[key]).toEqual(expectedArticle[key]);
                }
            })
    })

    it("PATCH/api/articles/bla returns 400, Bad Request for the invalid article number", () => {
        const newVote = { inc_votes: -10 };
        return request(app)
            .patch("/api/articles/invalid")
            .send(newVote)
            .expect(400)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Bad Request");
            })
    })

    it("PATCH/api/articles/1 returns 400, Bad Request if the votes are not a number", () => {
        const newVote= { inc_votes: "bla" };
        return request(app)
            .patch("/api/articles/1")
            .send(newVote)
            .expect(400)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Bad Request");
            })
    })

    it("PATCH/api/articles/111 returns 404, Not Found if article is not found", () => {
        const newVote= { inc_votes: -10 };
        return request(app)
            .patch("/api/articles/111")
            .send(newVote)
            .expect(404)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Not Found");
            })
    })

    it("PATCH/api/articles/1 returns 400, Bad Request if object with votes key and value is empty", () => {
        const newVote= {};
        return request(app)
            .patch("/api/articles/1")
            .send(newVote)
            .expect(400)
            .then((response) => {
                const { msg } = response.body;
                expect(msg).toBe("Bad Request");
            })
    });






























})

