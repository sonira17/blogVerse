
const dummy = (req, res) => {
    
    res.status(200).json({ message: "This is a dummy message for the UI." });
  };
  
  module.exports = { dummy };
  