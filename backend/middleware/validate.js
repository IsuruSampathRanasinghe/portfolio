// const validate = (schema) => {
//   return (req, res, next) => {
//     try {
//       req.body = schema.parse(req.body);

//       next();
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.errors[0].message,
//       });
//     }
//   };
// };

// export default validate;

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message:
          result.error.issues[0]?.message ||
          "Invalid request data.",
        errors: result.error.issues,
      });
    }

    req.body = result.data;

    next();
  };
};

export default validate;