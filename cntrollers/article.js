"use strict";

const Article = require("../models/article");

const saveArticle = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    let imageUrl = null;

    if (req.file) {
      // si subieron imagen, la guardas
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
    });

    const saved = await article.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Error al guardar", error });
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener artículos", error });
  }
};

const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el artículo", error });
  }
};

const getLastTwoArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 }) // Ordena del más reciente al más antiguo
      .limit(2); // Solo los dos primeros

    res.status(200).json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los últimos artículos", error });
  }
};

const updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const updateData = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      updateData,
      { new: true } // para que retorne el documento actualizado
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.status(200).json({
      message: "Artículo actualizado correctamente",
      article: updatedArticle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el artículo",
      error,
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const deletedArticle = await Article.findByIdAndDelete(articleId);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.status(200).json({
      message: "Artículo eliminado correctamente",
      article: deletedArticle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el artículo",
      error,
    });
  }
};

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ninguna imagen" });
  }

  return res.status(200).json({
    message: "Imagen subida correctamente",
    filename: req.file,
    //path: req.file.path,
  });
};

const searchTitle = async (req, res) => {
  try {
    const titulo = req.params.title;
    //console.log(titulo);
    const articulos = await Article.find({
      title: { $regex: titulo, $options: "i" },
    }).sort({ createdAt: -1 }); // más recientes primero

    if (articulos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron artículos" });
    }

    res.json(articulos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

module.exports = {
  saveArticle,
  getArticles,
  getArticleById,
  getLastTwoArticles,
  updateArticle,
  deleteArticle,
  uploadImage,
  searchTitle,
};
