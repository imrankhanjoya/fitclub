import * as z  from "zod";

const productSchema = z.object({
    title: z.string().min(2,{ message: "Enter your name." }),
});

export default productSchema