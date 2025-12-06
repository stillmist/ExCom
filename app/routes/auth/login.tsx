import image from "public/pwa-512x512.png";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background -mt-28">
      <div className="w-full max-w-sm">
        <LoginForm />

        {/** For displaying login messages */}
        <Toaster richColors position="top-center" />
      </div>
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
          <div className="flex flex-col items-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-md">
                <img src={image} />
              </div>
              <span className="sr-only">ExCom</span>
            </a>
            <h1 className="text-2xl font-bold -mt-4 mb-3">ExCom</h1>
          </div>
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
            <Button type="submit" className="w-full bg-blue-600 text-white">
              Login
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
