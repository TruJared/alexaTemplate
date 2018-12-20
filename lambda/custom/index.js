const Alexa = require('ask-sdk');

const constants = require('./constants');
const functions = require('./functions');

const { responses } = constants;
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const persistentAttributes =
      (await attributesManager.getPersistentAttributes()) ||
      constants.persistentAttributesAtStart;
    const { menuItems } = constants;
    const cardString = `${menuItems.sort().join(' · ')}`.toUpperCase(); // make menu look nice
    const { speechText, cardParams } = responses.launchResponse;
    const salutation = !persistentAttributes.newUser
      ? functions.shuffle(constants.phrasePool.salutation)[0]
      : 'Hello!';
    const repromptText = speechText;
    persistentAttributes.passTo = 'HelloWorldIntentHandler';

    if (persistentAttributes.newUser) {
      persistentAttributes.newUser = false;
    }
    persistentAttributes.repeatText = speechText;

    // * set persistentAttributes to sessionAttributes * //
    attributesManager.setSessionAttributes(persistentAttributes);
    return responseBuilder
      .speak(salutation + speechText)
      .reprompt(repromptText)
      .withSimpleCard(cardParams.cardTitle, cardString)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'HelloWorldIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { speechText } = responses.helloWorldResponse;
    sessionAttributes.repeatText = speechText;
    sessionAttributes.passTo = 'false';

    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();
    return responseBuilder.speak(speechText).getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { menuItems } = constants;
    const cardString = `${menuItems.sort().join(' · ')}`.toUpperCase(); // make menu look nice
    const { speechText, cardParams } = responses.helpResponse;
    const repromptText = speechText;
    sessionAttributes.repeatText = speechText;
    sessionAttributes.passTo = false;

    return responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .withSimpleCard(cardParams.cardTitle, cardString)
      .getResponse();
  },
};

const YesIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.passTo) {
      switch (sessionAttributes.passTo) {
        case 'HelloWorldIntentHandler':
          console.log(sessionAttributes);
          return HelloWorldIntentHandler.handle(handlerInput);
        default:
          throw new Error(
            `In yes intent switch. Most likely this error is because of an invalid 'passTo' value >>> sessionAttributes.passTo = ${
              sessionAttributes.passTo
            } <<<`
          );
      }
    }

    // alexa didn't as a yes/no question --> fallback //
    return FallBackHandler.handle(handlerInput);
  },
};

const NoIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();

    if (sessionAttributes.passTo) {
      switch (sessionAttributes.passTo) {
        case 'HelloWorldIntentHandler':
          return responseBuilder
            .speak(functions.shuffle(constants.phrasePool.valediction)[0])
            .getResponse();
        default:
          throw new Error(
            `In no intent switch. Most likely this error is because of an invalid 'passTo' value >>> sessionAttributes.passTo = ${
              sessionAttributes.passTo
            } <<<`
          );
      }
    }

    // alexa didn't ask a yes/no question --> fallback //
    return FallBackHandler.handle(handlerInput);
  },
};

const RepeatIntentHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.RepeatIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const speechText = sessionAttributes.repeatText;
    const repromptText = speechText;

    return responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
};

const ResetIntentHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' && request.intent.name === 'ResetIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    sessionAttributes.testReset = true; // this line is just for running tests
    attributesManager.setSessionAttributes({});
    attributesManager.setPersistentAttributes(
      constants.persistentAttributesAtStart
    );
    await attributesManager.savePersistentAttributes();
    return responseBuilder.speak('Skill is reset. Good-bye').getResponse();
  },
};

const FallBackHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name ===
        'AMAZON.FallbackIntent'
    );
  },
  async handle(handlerInput) {
    const { responseBuilder } = handlerInput;
    const speechText = functions.shuffle(constants.phrasePool.fallback)[0];
    const repromptText = speechText;

    return responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name ===
        'AMAZON.StopIntent' ||
        handlerInput.requestEnvelope.request.intent.name ===
          'AMAZON.CancelIntent')
    );
  },
  async handle(handlerInput) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();

    console.log('user stopped, or canceled some request');
    return responseBuilder
      .speak(functions.shuffle(constants.phrasePool.valediction)[0])
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${
        handlerInput.requestEnvelope.request.reason
      }`
    );
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  async handle(handlerInput, error) {
    const { attributesManager, responseBuilder } = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    console.log(`Error handled: ${error}`);
    console.log(`handlerInput: ${JSON.stringify(handlerInput)}`);
    const speechText =
      'There appears to be something wrong. Please try again in a few moments';

    attributesManager.setPersistentAttributes(sessionAttributes);
    await attributesManager.savePersistentAttributes();
    return responseBuilder.speak(speechText).getResponse();
  },
};

const SystemExceptionHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type ===
      'System.ExceptionEncountered'
    );
  },
  handle(handlerInput) {
    console.log(
      `System exception encountered: ${
        handlerInput.requestEnvelope.request.reason
      }`
    );
  },
};

// a little extra info in the logs //
const LogJsonRequestInterceptor = {
  async process(handlerInput) {
    console.log(
      `REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    HelloWorldIntentHandler,
    YesIntentHandler,
    NoIntentHandler,
    RepeatIntentHandler,
    ResetIntentHandler,
    CancelAndStopIntentHandler,
    FallBackHandler,
    SystemExceptionHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName(constants.skill.dynamoDBTableName)
  .withAutoCreateTable(true)
  .addRequestInterceptors(LogJsonRequestInterceptor)
  .lambda();
