
import { z } from 'zod';

const registerschema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
  confirmPassword: z.string()
})
// in here we will check if password mayches confirm password
.refine((data) => data.password === data.confirmPassword, 
// now in here we set the error message and match the path to this belongs to
{message: "Passwords must match", 
path:["confirmPassword"]})

export default registerschema;
