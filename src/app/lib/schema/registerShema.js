import * as z  from "zod";

const registerShema = z.object({
    name: z.string().min(2,{ message: "Enter your name." }),
    type: z.enum(['Individual','Organization'],{ message: "Select type of role." }),
    email: z.string().email(),
    password: z.string().min(6,{ message: "Password is required, must be min 6 character(s)" }).max(16,{ message: "Password must be less then 16 character(s)" }),
});

export default registerShema