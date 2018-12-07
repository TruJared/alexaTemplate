# Custom Template For Alexa

Custom template for Alexa.

## How 'dis work 🤷‍

It assumes you have some experience with Alexa development. It also assumes you don't have too much experience, because if you do, you can probably build a better one yourself. It uses the [JavaScript SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs). Pretty much all the responses, skill info, menu info, etc... is stored in `constants.js`, all the code logic for Alexa is in `index.js` and the functions are, of course, in `functions.js`. I included some of the more commonly used functions.

For the most basic approach just copy and paste the `HelloWorldIntentHandler`, and change the appropriate information as needed. Add your response to `constansts.js` under `responses`, and the correct key to `const { speechText, cardParams } = responses.${key};`. If you're a champ, use the snippet below in VS code and tab your way to victory. 🍾🍾🍾

## What's In the Box 😱

### How to use snippets in VS code

- https://code.visualstudio.com/docs/editor/userdefinedsnippets

### Handler Snippet

```json
"Alexa - Handlers": {
    "prefix": "handler",
    "body": [
      "const ${1:handlerName} = {",
      "  canHandle(handlerInput) {",
      "    const { request } = handlerInput.requestEnvelope;",
      "    return request.type === 'IntentRequest' && request.intent.name === '${2:}';",
      "  },",
      "  async handle(handlerInput) {",
      "    const { attributesManager, responseBuilder } = handlerInput;",
      "    const sessionAttributes = attributesManager.getSessionAttributes();",
      "    const { speechText, cardParams } = responses.${3:};",
      "    const repromptText = speechText;",
      "    sessionAttributes.repeatText = speechText;",
      "    sessionAttributes.passTo = '${4:false}';",
      "",
      "    return responseBuilder",
      "      .speak(speechText)",
      "      .reprompt(repromptText)",
      "      .withSimpleCard(cardParams.cardTitle, cardParams.cardBody)",
      "      .getResponse();",
      "  },",
      "};"
    ],
    "description": "creates basic handler for this template"
  },
```

### constants.js --> if needed

I hope to keep adding things for the shuffle responses. Variety is the spice of life.

- https://gist.github.com/TruJared/61ea6024dac6036e8a116780c0f6b244

----> may not be regularly updated ☹️

### .eslintrc.js

- Thanks [Wes Bos](https://raw.githubusercontent.com/wesbos/dotfiles/master/.eslintrc)

### About sessionAttributes.passTo

I use `sessionAttributes.passTo` to represent the name of the handler I'm going to have the Yes or No intent hand off the response to. I think it keeps things a bit more clean. I suppose one could also use dialogue, but I have a hard time with that.

## Sample

You probably don't need this, but if I'm gonna' do something, I might as well do it right:

### index.js

```javascript
...
const LiveInATentIntentHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'LiveInATentIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    // next line is where the response info gets 'pulled' in
    const { speechText, cardParams } = responses.liveInATentResponse;
    sessionAttributes.repeatText = speechText;
    sessionAttributes.passTo = 'false';

    attributesManager.setPersistentAttributes(sessionAttributes);
    return responseBuilder.speak(speechText)
      .reprompt(repromptText)
      .withSimpleCard(cardParams.cardTitle, cardParams.cardBody)
      .getResponse();
  },
};
...
```

### constants.js

```javascript
...
const responses = {
  liveInATentResponse: {
    speechText: 'I have the intent to live in a tent.',
    cardParams: { cardTitle: 'Tents', cardBody: "Tent's are cool" },
  },
...
```

### Thanks

Hope you find this useful 👍
