const dialogflow = require("dialogflow");
const config = require("../config/keys");

const sessionClient = new dialogflow.SessionsClient();
const util = require("util");

const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

var cors = require("cors");

module.exports = (app) => {
  app.use(cors());
  app.get("/", (req, res) => {
    res.send({ hello: "Johnny" });
  });

  app.post("/api/df_text_query", cors(), (req, res) => {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.text,
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };
    sessionClient
      .detectIntent(request)
      .then((responses) => {
        console.log("Detected intent");
        console.log(util.inspect(responses[0].queryResult, false, null, true));
        const result = responses[0].queryResult;
        res.send({
          result: `${result.fulfillmentText}`,
          intent: `${result.intent.displayName}`,
          parameters: `${result.parameters}`,
          errors: "",
        });
        // if (result.intent) {
        //   console.log(`  Intent: ${result.intent.displayName}`);
        // } else {
        //   console.log(`  No intent matched.`);
        // }
      })
      .catch((err) => {
        console.error("ERROR:", err);
        res.send({ errors: `${err}` });
      });
    // res.send({'do': 'text query'})
  });

  app.post("/api/df_event_query", (req, res) => {
    res.send({ do: "event query" });
  });
};
