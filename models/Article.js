//#1 This my article model
const mongoose = require("mongoose");
//build my schema or my plan for this table
//like address, body, date of publician
//#2 call my schema class
const Schema = mongoose.Schema;
//This Schema is class
//#3 build my schema
const articeSchema = new Schema({
  //have all fields
  //like key and value (type of my value as well)
  title: String,
  body: String,
  numOfLikes: Number,
});
//#4 define my model or my collection
//model two parts: name of my table, and the plan of my model
//veru much name this collection as the file name
const Article = mongoose.model("Article", articeSchema);
//This collection
//#5 This Article defined above will be used on the end-point on index.js
//so very much we will use exports and return whatever you like
//so whenever this model is called or imported, they will have access to all
//pass values or what you want them to see/access
module.exports = Article;
//so this is how it will be called from my index.js
//const Article = require("./models/Article.js");
//const Article = require("./models/Article"); //or without .js
