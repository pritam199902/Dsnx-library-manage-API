const errorHandle = (req, res, errMsg) => {
  return res.json({
    error: true,
    message: errMsg,
  });
};

module.exports = errorHandle
