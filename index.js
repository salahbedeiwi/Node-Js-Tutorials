//Project Back End Server
//server side render
//#1 this const below represents everthing in my express library
const express = require("express");

//#2 initialize my express web serve or create an instance of express
var app = express();
//mongodb+srv://bedei001:<password>@cluster0.o4uxcay.mongodb.net/?retryWrites=true&w=majority
//connect to db using above link
const mongoose = require("mongoose");
// console.log(mongoose);
// //Above code connect function returns promise .then & .catch and this will have
// //any error issues shown
//## call model Article
// const Article = require("./models/Article.js");
//so this entity Article, i'll be able to CRUD from this Article Collections
const Article = require("./models/Article"); //this and above code works
//also note whenever you connecting to db. better to define your username & password on .env file
//so they can be secures. don't write real un and pswrd directly on your link.
mongoose
  .connect(
    "mongodb+srv://bedei001:pMTO7kyrO67xSaox@cluster0.o4uxcay.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB is connected successfully");
  })
  .catch((error) => {
    console.log("DB connection failed:: ", error);
  });
//end of connecting to DB

app.use(express.json()); // this line is helpful while working with body params requests to return json
//CREATE URL FOR FRONTEND USER WHILE ACCESSING YOUR SITE

//create user url requests
//create a get request get(url, (we take request, and return a response) => {})
//http://localhost:3008/hello
app.get("/dashboard", (req, res) => {
  // website.com/dashboard
  //the response once user visited this url
  res.send("<h1>you've requested to get dashboard page</h1>");
});
app.get("/contact", (req, res) => {
  // website.com/contact
  //the response once user visited this url
  res.send("you visited contact us page");
});
app.get("/", (req, res) => {
  // website.com/
  //the response once user visited this url
  res.send("you visited main website page");
});
app.get("/count100", (req, res) => {
  // website.com/count100
  let num = "";
  for (let i = 0; i <= 100; i++) {
    num += i + " - "; // let i = i + " - ";
  }
  res.send(`The numbers are ${num}`);
});
//this will not work when calling http://localhost:3008/addComment since its post
//so for this, user postman
app.post("/addComment", (req, res) => {
  res.send("<h1>post request on /addComment path</h1>");
});
//create endpoint or router or path with type get/put/post http request
app.put("/updateComment", (req, res) => {
  // website.com/updateComment
  //the response once user visited this url
  res.send("you've requested to update comment");
});
app.delete("/deleteComment", (req, res) => {
  // website.com/deleteComment
  res.send("<h1 style='color:blue;'>you've requested to delete Comment</h1>");
});
//create a param request from front end to this end-point
//parameters are different type: query, path & body

//path parameters example as req.params
//its part of my url http://localhost:3008/posts/:postNum/:postId
//http://localhost:3008/posts/1/123
app.get("/posts/:postNum/:postId", (req, res) => {
  //note this console will only show on this terminal not frontend
  //whenever the user runs http://localhost:3008/posts/1/321 on his local machine
  //it will be found on this terminal below
  const postNum = req.params.postNum;
  const postId = req.params.postId;
  console.log(req.params); // { postNum: '1', postId: '321' }
  res.send(`Fetching data for post No #${postNum} & Id #${postId}`);
});

//body parameters example as req.body
/*
    => could be a json, form-data from UI or postman to test it (Body -> row -> json)
    "
        {
            "firstName" : "Salah",
            "lastName" : "Bedeiwi"
        }
    "
*/
app.get("/user/info", (req, res) => {
  // This will be via body param.
  //it will be found on this terminal below
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  //note req.body will not work if you haven't defined this line at the top
  // app.use(express.json()); after const app = express()
  //very much telling my app to accept json type from UI
  console.log(req.body); // { "firstName" : "Salah", "lastName" : "Bedeiwi"}
  res.send(`Welcome ${firstName} ${lastName}`);
});

//Query Parameters Ex. req.query
// http://localhost:3008/user/data?phone=6126441634&name=SalahBedeiwi&id=50
//This can be viewed on UI  or postman
app.get("/user/data", (req, res) => {
  const phone = req.query.phone;
  const name = req.query.name;
  const id = req.query.id;
  console.log(req.query);
  //You will see post man added this query parameters as key & value
  // res.send(`View this user data: ${name} with an id #${id} and Phone number ${phone}`);
  //LET'S SAY I WANT TO RETURN JSON FOR THE END USER.. GOOD FOR API PRACTICES
  res.json({
    name: name,
    phone: phone,
    id: id,
  });
});

//Better user EJS template to organize your work
app.get("/numbers/show", (req, res) => {
  let numbers = "";
  let addSeperator = " - ";
  for (let i = 0; i <= 20; i++) {
    if (i > 19) {
      addSeperator = "";
    }
    numbers += i + addSeperator;
  }
  //call the file to be rendered
  //to send parameters to html file, must install EJS
  // res.sendFile(__dirname+ "/views/number.ejs");
  //main_folder/views/numbers.ejs
  //note HTML file extension change to ejs
  //now i need to pass parameters to ejs file
  //now disable res.sendFile();
  res.render("number.ejs", {
    name: "Salah Bedeiwi",
    age: 35,
    numbers: numbers,
  }); //note i didn't write views path
  //that's because it automatically calls views folder
  //if you change views folder to different name, it won't work
  //send parameters now to ejs file
});
//npm install ejs
//views->number.html very much write your html and import it to user
//to call this html. res.sendFile("path of this file")
//#3 my web server will need to  be listening to all user requests above
//listen(port to run my site, ) http://localhost:3008/hello
//create an end-point to use article END-POINT
app.post("/articles", async (req, res) => {
  console.log("Create new article");
  const newArticle = new Article();
  //the best to send these data via body parameters
  newArticle.title = req.body.title;
  newArticle.body = req.body.body;
  newArticle.numOfLikes = req.body.numOfLikes;
  //you may need to validate data before saving them to DB
  //thanks to Mongoose :)
  //now save it to db
  await newArticle.save(); //asyn function, and return promise...
  //this take time and then later return a response
  //two ways to use this promise: then and catch or async & await
  //async my work and then save it.. once saved do next line below
  //await very much pause the code till the line is successfully done
  //   res.send("new article has been stored..");
  res.json(newArticle); //return new article as a json
});
//Get all articles.. note get method is /articles same as post end-point above
//but no conflict since two different methods...
app.get("/articles", async (req, res) => {
  const myArticles = await Article.find(); //gets all articles for me
  console.log("view my articles...:", myArticles);
  res.json(myArticles);
});
//get specific article by id
app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId; //NOTE I am expecting :articleID to be on my url
  //http://localhost:3008/articles/1
  try {
    const article = await Article.findById(id);
    res.json({ error: false, articleData: article });
    console.log(`view this article with an id of ${id} =>:`, article);
    return;
  } catch (e) {
    console.log(`something is wrong with this id of ${id}`, e);
    res.json({ error: true, message: e, note: "This ID isn't found on DB" }); //return error to UI
  }
});
app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    //this findByIdAndDelete() looks for only 12 digits..
    //but check if the return is null... then article id doesn't exist
    const article = await Article.findByIdAndDelete(id);
    if (article != null) {
      //
      res.json({
        error: false,
        deleted: true,
        articeId: id,
        deletedArtice: article,
      });
      console.log(`Deleted article with an id of ${id} =>:`, article);
      return;
    } else {
      res.json({
        deleted: false,
        error: true,
        note: "This ID does not exist on DB",
      }); //return error to UI
    }
  } catch (e) {
    console.log(`something is wrong this id of ${id}`, e);
    //res.json(e);
    return res.json({
      deleted: false,
      error: true,
      message: e,
      note: "This ID isn't found on DB",
    }); //return error to UI
  }
});
//get all articles but as html
app.get("/showArticles", async (req, res) => {
  try {
    const articles = await Article.find(); //get all articles
    console.log("View All Articles:", articles);
    res.render("showAllArticles.ejs", { articles });
    // res.render("showAllArticles.ejs", { "allArticles": articles });
    //if i have allArticles, this what i have to pass to showAllArticles as param.
    //but if i don't use allArticles, then articles itself will be my object
  } catch (e) {
    console.log(`something is while showing all articles`, e);
  }
});
//update article
app.post("/u/article/:ID", async (req, res) => {
  const artId = req.params.ID;
  const artTitle = req.body.title;
  const artBody = req.body.body;
  const artNumOfLikes = req.body.numOfLikes;
  console.log("Updated article ID: ", artId);
  console.log("Updated article title: ", artTitle);
  console.log("Updated article body: ", artBody);
  console.log("Updated num of likes: ", artNumOfLikes);
  res.send("success" + "- " + artId + "- " + artTitle  + "- " +  artBody  + "- " +  artNumOfLikes);
  // const article = await Article.findByIdAndUpdate(
  //     {
  //         artId
  //     },
  //     //here add data to be updated
  //     {
  //         title: artTitle,
  //         body: artBody,
  //         numOfLikes: artNumOfLikes
  //     },
  //     // //if any error happens
  //     (err, data) => {
  //         if(data == null){ //if err
  //             res.json({"updated": false, "error": true, "note": "Nothing found with this ID..", "errorMessage": err});
  //         } else { //if success
  //             res.json({"error": false, "updated": true, articeId: id, "newUpdatedArticle" : article});
  //         }
  //     }
  // );
  // try {
  //     //first find id
  //     //second update data if id is present
  //     const article = await Article.findOneAndDelete(
  //         {
  //             id: artId
  //         },
  //         //here add data to be updated
  //         {
  //             $set: {
  //                 title: artTitle,
  //                 body: artBody,
  //                 numOfLikes: artNumOfLikes
  //             }
  //         },{
  //             new: true
  //         },
  //         // //if any error happens
  //         (err, data) => {
  //             if(data == null){ //if err
  //                 res.json({"updated": false, "error": true, "note": "0. Nothing found with this ID..", "errorMessage": err});
  //             } else { //if success
  //                 res.json({"error": false, "updated": true, articeId: id, "newUpdatedArticle" : article});
  //             }
  //         }
  //     );
  //     if(article !== null){
  //         res.json({"updated": false, "error": true, "note": "1.Nothing found with this ID..", "errorMessage": err});
  //     } else {
  //         res.json({"error": false, "updated": true, articeId: id, "newUpdatedArticle" : article});
  //     }
  // } catch (e) {
  //     console.log(`something is wrong this id of ${artId}`, e);
  //     return res.json({"updated": false, "error": true, "message": e, "note": "2. This ID isn't found on DB"}); //return error to UI
  // }
//   try {
    // const article = await Article.findOneAndDelete(
    //     {
    //         'id': artId
    //     },
    //     //here add data to be updated
    //     {
    //         $set: {
    //             'title': artTitle,
    //             'body': artBody,
    //             'numOfLikes': artNumOfLikes
    //         }
    //     },
    //     {
    //         new: false
    //     },
    //     // //if any error happens
    //     (err, data) => {
    //         if(data == null){ //if err
    //             res.json({"updated": false, "error": true, "note": "0. Nothing found with this ID..", "errorMessage": err});
    //             return;
    //         } else { //if success
    //             res.json({"error": false, "updated": true, articeId: artId, "newUpdatedArticle" : article});
    //             return;
    //         }
    //     }
    // );
    // console.log("You've'updated this article: ",article);
//     console.log("Updated article body: ", artBody);
//   } catch (e) {
//     res.json({
//       updated: false,
//       error: true,
//       note: "1. Nothing found with this ID..",
//       errMsg: "Error Message: "+e
//     });
//   }
});
//this line below it is better to be in then() promise in mongoose.connect().then(){}
//so whenever any user is calling any data.. it only listens to it if user is connected to DB

app.listen(3008, () => {
  console.log("My Node Js App is Now Listening to Port 3008..");
});

//to run node js app: node index.js
