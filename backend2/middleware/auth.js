
module.exports = (req, res, next) => {
    const apiKey = req.header('x-api-key') || req.query.apiKey;
    if (!apiKey) {

      req.user = { id: 'demo_user', name: 'Demo User' };
      return next();
    }

    req.user = { id: 'api_user', name: 'API Key User' };
    next();
  };
  