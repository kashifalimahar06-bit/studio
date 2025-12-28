import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <Logo />
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Please sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="employee" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employee">Employee</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="employee">
                <LoginForm role="employee" />
              </TabsContent>
              <TabsContent value="admin">
                <LoginForm role="admin" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Powered by Jeejal Amaan Public School
        </p>
      </div>
    </main>
  );
}
