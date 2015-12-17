function profilePostHandler(req, res) {
  req.user.givenName = req.body.givenName;
  req.user.surname = req.body.surname;
  req.user.customData.favoriteBeer = req.body.favoriteBeer;

  /**
   * TODO: consolidate into a single save call when this issue is resolved:
   * https://github.com/stormpath/express-stormpath/issues/156
   */
  req.user.save(function(err){
    if(err){
      res.status(err.status || 400).json(err);
    }else{
      req.user.customData.save(function (err){
        if(err){
          res.status(err.status || 400).json(err);
        }else{
          res.end();
        }
      });
    }
  });
}
module.exports = profilePostHandler;