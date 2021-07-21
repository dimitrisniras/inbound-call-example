const path = require("path");
const user = "testuser";

const voiceEvent = async (req, res, next) => {
  const { logger } = req.nexmo;
  try {
    logger.info("event", { event: req.body });
    res.json({});
  } catch (err) {
    logger.error("Error on voiceEvent function");
  }
};

const voiceAnswer = async (req, res, next) => {
  const { logger } = req.nexmo;
  logger.info("req", { req_body: req.body });
  try {
    return res.json([
      {
        action: "talk",
        text: "Please wait while we connect you to an agent",
      },
      {
        action: "connect",
        endpoint: [
          {
            type: "app",
            user
          },
        ],
      },
    ]);
  } catch (err) {
    logger.error("Error on voiceAnswer function");
  }
};

const route = (app, express) => {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
};

module.exports = {
  route,
  voiceEvent,
  voiceAnswer,
};