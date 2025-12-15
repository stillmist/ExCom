import { redirect, useFetcher, useLoaderData } from "react-router";

import { useEffect } from "react";
import { toast } from "sonner";
import { ThemeToggle } from "~/components/theme-toggle";
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
import { Spinner } from "~/components/ui/spinner";
import { supabase } from "~/lib/supabase";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/login";
import image from "/pwa-512x512.png?url";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const searchParams = new URL(request.url).searchParams;
  if (session) {
    return redirect(searchParams.get("redirect") || "/");
  }

  return { redirected: searchParams.get("redirected") === "1" };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.clone().formData();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const searchParams = new URL(request.url).searchParams;
  const redirectUrl = searchParams.get("redirect") || "/";

  return redirect(redirectUrl);
}

export default function LoginPage() {
  const { redirected } = useLoaderData<typeof clientLoader>();

  useEffect(() => {
    if (redirected) {
      toast.info("Must login to continue");
    }
  }, []);

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
              <ThemeToggle />
            </CardAction>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.ok) {
      toast.success("Logged in successfully");
    } else if (fetcher.data?.error) {
      // Error
      toast.error("Error logging in", {
        description: fetcher.data.error,
      });
    }
  }, [fetcher.data]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <fetcher.Form method="post">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="one@excom.com"
                name="email"
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
              className={`w-full bg-primary text-primary-foreground cursor-pointer ${busy ? "disabled" : ""}`}
            >
              {busy ? (
                <>
                  <Spinner className="size-6" /> Logging you in
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
}
