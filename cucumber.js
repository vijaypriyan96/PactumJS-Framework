const args = require('minimist')(process.argv.slice(2));

const baseUrl = args.baseurl || process.env.BASE_URL || "https://restful-booker.herokuapp.com";
process.env.BASE_URL = baseUrl;  // Make it available everywhere

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/test/hooks/**/*.ts',
      'src/test/world/**/*.ts',
      'src/test/steps/**/*.ts'
    ],
    format: ['progress'],
    tags: args.tags || '',
    paths: ['src/test/features/**/*.feature']
  }
};
