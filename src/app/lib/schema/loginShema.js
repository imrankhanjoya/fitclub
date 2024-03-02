import * as z  from "zod";

const loginShema = z.object({
    email: z.string().email({ message: "Enter valid email" }),
    password: z.string({ message: "Password is required" }),
});

export default loginShema