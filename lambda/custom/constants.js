/* CONSTANTS */

const skill = {
  appId: '',
  dynamoDBTableName: 'sampleDB',
};

const persistentAttributesAtStart = {
  newUser: true,
};

// this is useful for keeping track of what's in the menu
// good for cards, or help, etc...
const menuItems = ['item 1', 'item 2', 'item 3', 'item 4'];

const responses = {
  launchResponse: {
    speechText: 'Would you like me to say "hello world"?',
    cardParams: { cardTitle: 'Title', cardBody: 'Card Body' },
  },
  helloWorldResponse: {
    speechText: 'Hello World',
    cardParams: { cardTitle: 'Title', cardBody: 'Card Body' },
  },
  helpResponse: {
    speechText:
      'I sent a sample card to your device. Say "exit" to quit, or "hello world" to hear me say "hello world".',
    cardParams: { cardTitle: 'HELP', cardBody: 'Card Body' },
  },
  fallbackResponse: {
    speechText:
      'Sorry, that is not an option. If you are not sure of the options, you can say help.',
    repromptText: 'You can say help to get the complete list of options.',
  },
};

const phrasePool = {
  salutation: [
    '<say-as interpret-as="interjection">Aloha</say-as>, welcome back!',
    '<say-as interpret-as="interjection">Bazinga</say-as>, welcome back!',
    '<say-as interpret-as="interjection">Hip hip hooray</say-as> , Great to see you back!',
    '<say-as interpret-as="interjection">Howdy</say-as> , Good to see you!',
    '<say-as interpret-as="interjection">Oh boy</say-as> , here we go!',
    '<say-as interpret-as="interjection">Spoiler alert</say-as> , this skill is awesome!',
  ],
  valediction: [
    '<say-as interpret-as="interjection">Arrivederci</say-as>',
    '<say-as interpret-as="interjection">au revoir</say-as>',
    '<say-as interpret-as="interjection">bon voyage</say-as>',
    '<say-as interpret-as="interjection">cheerio</say-as>',
    '<say-as interpret-as="interjection">cheers</say-as>',
    'good-bye',
  ],
  fallback: [
    '<say-as interpret-as="interjection">Aw man</say-as>, I didn’t understand that request. Perhaps try phrasing it a different way.',
    '<say-as interpret-as="interjection">Blah</say-as> , I’m afraid I didn’t understand that. Can you try saying it differently?',
    '<say-as interpret-as="interjection">Blarg</say-as> , I didn’t quite catch that, say again?',
    '<say-as interpret-as="interjection">Blast</say-as> , I was totally spacing out and didn’t hear that. Can you repeat the request?',
    '<say-as interpret-as="interjection">Darn</say-as> , Totally missed that one. What did you ask me?',
    '<say-as interpret-as="interjection">D’oh</say-as> , Too busy dreaming about donuts, can you repeat that request?',
    '<say-as interpret-as="interjection">Good grief</say-as> , I have no idea what you’re asking. Let’s try this again.',
    '<say-as interpret-as="interjection">Jeepers creepers</say-as> , You scared me!   What were we doing?',
    '<say-as interpret-as="interjection">le sigh</say-as> , I know it’s frustrating when I don’t understand. Let’s see if we can’t get you the information you need.',
    '<say-as interpret-as="interjection">ruh roh</say-as> , I didn’t really understand that. Maybe we can try something else? ',
  ],
};

module.exports = {
  skill,
  menuItems,
  responses,
  phrasePool,
  persistentAttributesAtStart,
};
