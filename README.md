# Custom Template For Voice Focused

Custom template for voice focused.

I have `eslint eslint-plugin-prettier eslint-config-prettier prettier` installed globally though `npm insall -g ...`, not sure if 100% required to be global.

## Scripts & Snippets

### How to use in VS code

- https://code.visualstudio.com/docs/editor/userdefinedsnippets

### Handler Snippet

```javascript
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

- https://gist.github.com/TruJared/61ea6024dac6036e8a116780c0f6b244

may not be regularly updated ☹️

### .eslintrc.js

- overkill, but it's the one I base mine on. easier than making my own

https://raw.githubusercontent.com/wesbos/dotfiles/master/.eslintrc

## About sessionAttributes.passTo