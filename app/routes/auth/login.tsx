import { Form } from "react-router";

import image from "public/pwa-512x512.png";
import { ThemeToggler } from "~/components/nav";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center -translate-y-10 md:-translate-y-16 p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <div className="flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-md">
              <img src={image} />
              <span className="sr-only">ExCom</span>
            </div>
          </div>

          <CardHeader>
            <CardTitle>Login to Excom</CardTitle>
            <CardAction>
              <ThemeToggler />
            </CardAction>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>

      {/** For displaying login messages */}
      <Toaster richColors position="top-center" />
    </div>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form method="post">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="John Smith"
                name="username"
                autoComplete="off"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
            >
              Login
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
