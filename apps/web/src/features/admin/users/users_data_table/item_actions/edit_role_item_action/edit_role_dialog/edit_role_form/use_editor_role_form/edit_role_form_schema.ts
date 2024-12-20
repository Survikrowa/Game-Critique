import { z } from "zod";

export const EditRoleFormSchema = z.object({
  roleId: z.string().min(1),
});
