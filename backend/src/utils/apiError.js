
export const apiError = (
  res,
  statusCode = 500,
  message = "Something went wrong",
  errors = []
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
