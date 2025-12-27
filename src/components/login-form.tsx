"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  role: "employee" | "admin";
}

export function LoginForm({ role }: LoginFormProps) {
  const { signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: role === 'admin' ? "admin@example.com" : "employee@example.com",
      password: "password123",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: LoginFormValues) => {
    // Mock authentication logic
    const { email, password } = values;
    const isAdminLogin = role === "admin" && email === "admin@example.com" && password === "password123";
    const isEmployeeLogin = role === "employee" && email === "employee@example.com" && password === "password123";

    if (isAdminLogin || isEmployeeLogin) {
      try {
        await signIn(role);
        toast({
          title: "Login Successful",
          description: `Welcome! Redirecting to your dashboard...`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "An unexpected error occurred.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      {!isFirebaseConfigured && (
         <Alert variant="destructive" className="mb-4">
          <AlertTitle>Firebase Not Configured</AlertTitle>
          <AlertDescription>
            This is a demo using mock data. Please configure your Firebase credentials in 
            <code className="font-code mx-1 p-1 rounded-sm bg-destructive-foreground/20 text-destructive-foreground">.env.local</code> 
            to use real authentication.
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
