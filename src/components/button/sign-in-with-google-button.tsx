"use client";

import { Button } from "@/components/ui/button";
import { useEffect, type ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SignInWithGoogleButton({ children, ...props }: Props) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <Button>
      <div
        id="g_id_onload"
        data-client_id="558058766557-3u5fb1vcjvpk4ppgfcqkac5us9ojmru2.apps.googleusercontent.com"
      />

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
      {/* <div
        id="g_id_onload"
        data-client_id="558058766557-3u5fb1vcjvpk4ppgfcqkac5us9ojmru2.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="redirect"
        data-login_uri="/login"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div> */}
    </Button>
  );
}
