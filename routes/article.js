"use strict";

const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const ArticleController = require("../cntrollers/article");

// router.post("/articles", ArticleController.saveArticle);
router.post("/articles", upload.single("image"), ArticleController.saveArticle);
router.get("/articles", ArticleController.getArticles);
router.get("/articles/last", ArticleController.getLastTwoArticles);
router.get("/search/:title", ArticleController.searchTitle);
router.post("/upload", upload.single("image"), ArticleController.uploadImage);
router.get("/articles/:id", ArticleController.getArticleById);
router.put(
  "/articles/:id",
  upload.single("image"),
  ArticleController.updateArticle
);
router.delete("/articles/:id", ArticleController.deleteArticle);

module.exports = router;
