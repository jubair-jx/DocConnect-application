import { z } from "zod";

const createSpecialitesValidation = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
});

export const specialitesValidation = {
  createSpecialitesValidation,
};
