const notfound = (req, res, next) => {
  // console.log("hello2");
  const error = new Error(`Not found - ${req.orignalUrl}`);
  res.status(404);

  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // console.log("hello1");
  res.status(statusCode);
  // console.log("hello1");
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });

  next();
};

export { notfound, errorHandler };
