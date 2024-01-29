const latestNewsRouter = require("express").Router();
const LatestNews = require("../models/latest-news");

latestNewsRouter.get("/", async (request, response) => {
  const latestNews = await LatestNews.find({});
  response.json(latestNews);
});

latestNewsRouter.get("/:id", async (request, response) => {
  try{
    const latestNews = await LatestNews.findById(request.params.id);
    return response.status(200).json(latestNews);
  }
  catch(exception) {
    return response.status(500)
  }
});

latestNewsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.title === undefined) {
    return response
      .status(400)
      .json({
        error: "Title missing! Please provide title for the news article!",
      });
  } else if (body.date === undefined) {
    return response
      .status(400)
      .json({
        error: "Date missing! Please provide date for the news article!",
      });
  } else if (body.content === undefined) {
    return response
      .status(400)
      .json({
        error: "Content missing! Please provide content for the news article!",
      });
  }

  const newsArticle = new LatestNews({
    title: body.title,
    date: body.date,
    content: body.content,
  });

  try {
    const savedNews = await newsArticle.save();
    return response.status(200).json(savedNews);
  } catch (exception) {
    return response.status(500).json(exception);
  }
});

latestNewsRouter.delete("/:id", (request, response, next) => {
  LatestNews.findByIdAndDelete(request.params.id)
    .then(() => {
      response.json(204).end();
    })
    .catch((error) => next(error));
});

latestNewsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  if (body.title === undefined) {
    return response
      .status(400)
      .json({
        error: "Title missing! Please provide title for the news article!",
      });
  } else if (body.date === undefined) {
    return response
      .status(400)
      .json({
        error: "Date missing! Please provide date for the news article!",
      });
  } else if (body.content === undefined) {
    return response
      .status(400)
      .json({
        error: "Content missing! Please provide content for the news article!",
      });
  }

  const newsArticle = {
    title: body.title,
    date: body.date,
    content: body.content,
  };

  LatestNews.findByIdAndUpdate(request.params.id, newsArticle, {
    new: true,
    context: "query",
  })
    .then((updatedNews) => response.status(200).json(updatedNews))
    .catch((error) => next(error));
});

module.exports = latestNewsRouter;
