module.exports = (err, req, res, next) => {
  console.log("------error", err);
  res.status(500).json({ msg: err.message });
};
