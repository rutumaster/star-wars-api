module.exports = function (context, request) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log('Bindings', context.bindings);
  context.log('Request', request);

  let planetService = require('../data/planets');
  let data = planetService.getPlanets();
  let planets = data.results;
  let response = {};

  if (request.query && request.query.id) {
    const id = parseInt(request.query.id);
    const match = planets.filter(p => p.id === id);
    const planet = match.length ? match[0] : {};
    response = {
      body: planet
    };
  }
  else {
    response = {
      body: data
    };
  }
  context.done(null, response);
};
