import * as z  from "zod";

const postSchema = z.object({
    description: z.string().min(20,{ message: "Enter post detail." }),
    address: z.string().min(2,{ message: "Enter address line." }),
    region: z.string().min(2,{ message: "Enter region." }),
    city: z.string().min(2,{ message: "Enter city." }),
    country: z.string().min(2,{ message: "Enter country." }),
    mode: z.string().min(2,{ message: "Enter reqired channel to reach you." }),
    mode: z.string().min(2,{ message: "Enter reqired channel to reach you." }),
});

export default postSchema