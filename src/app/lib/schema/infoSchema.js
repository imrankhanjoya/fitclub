import * as z  from "zod";

const infoShema = z.object({
    description: z.string().min(20,{ message: "Enter valid description" }),
    url: z.string({ message: "Valid url" }).optional(),
    image: z.string({ message: "valid Image url" }).optional(),
});

export default infoShema