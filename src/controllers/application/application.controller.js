const status = async (req, res) => {
  return res.status(200).json({
    error: false,
    message: "La API esta funcionando ejecuadose",
    data: null,
  });
};

module.exports = {
  status,
};
