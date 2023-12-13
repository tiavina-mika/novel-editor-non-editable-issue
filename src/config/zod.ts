import * as z from "zod";

export const errorMap: z.ZodErrorMap = (error, ctx) => {
  /*
  This is where you override the various error codes
  */

  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (
        error.expected === "string" ||
        error.expected === "number" ||
        error.expected === "boolean"
      ) {
        return { message: "Champ obligatoire" };
      }
      break;
    case z.ZodIssueCode.custom: {
      // produce a custom message using error.params
      // error.params won't be set unless you passed
      // a `params` arguments into a custom validator
      const params = error.params ?? {};
      if (params.myField) {
        return { message: `Mauvaise entrée: ${params.myField}` };
      }
      break;
    }
  }

  // fall back to default message!
  return { message: ctx.defaultError };
};
