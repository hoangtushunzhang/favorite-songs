
import { RegisterFormSchema } from "@/lib/rules";
import { supabase } from "@/lib/supabase";
import { RegisterState } from "@/types";
import { redirect } from "next/navigation";

export async function register(state: RegisterState | undefined, formData: FormData): Promise<RegisterState> {

    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email") as string,
            success: false,
            message: "Invalid form data",
        }
    }

    const { email, password } = validatedFields.data;

    const { error } = await supabase.auth.signUp({
        email,
        password,
    });
    // console.log(email, password)

    if (error) {
        if (error.message.includes("User already registered")) {
            return {
                success: false,
                message: error.message,
                errors: { email: [error.message] },
            };
        }
    }

    redirect("/verify");

    return {
        success: true,
        message: "Registration successful",
    }
}