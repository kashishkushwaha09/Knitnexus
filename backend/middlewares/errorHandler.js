module.exports= (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong !!";

   if (err.isOperational) {
    res.status(statusCode).json({ success: false, message: message });
  } else {
    console.error("Unexpected error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

}