"use client";

import { createClient } from "@/utils/supabase/client";
import type { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OneTapComponent = () => {
  const supabase = createClient();
  const router = useRouter();

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(
      String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
    );
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return [nonce, hashedNonce];
  };

  useEffect(() => {
    const initializeGoogleOneTap = async () => {
      console.log("Initializing Google One Tap");

      const [nonce, hashedNonce] = await generateNonce();
      console.log("Nonce: ", nonce, hashedNonce);

      // check if there's already an existing session before initializing the one-tap UI
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session", error);
      }
      if (data.session) {
        router.push("/");
        return;
      }
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        console.error("Google client ID is not set");
        return;
      }
      /* global google */
      const google = window.google;

      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: CredentialResponse) => {
          try {
            // send id token returned in response.credential to supabase
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: response.credential,
              nonce,
            });

            if (error) throw error;
            console.log("Session data: ", data);
            console.log("Successfully logged in with Google One Tap");

            // redirect to protected page
            router.push("/");
          } catch (error) {
            console.error("Error logging in with Google One Tap", error);
          }
        },
        nonce: hashedNonce,
        // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
        use_fedcm_for_prompt: true,
      });
      google.accounts.id.prompt(); // Display the One Tap UI
    };

    initializeGoogleOneTap();

    window.addEventListener("load", initializeGoogleOneTap);
    return () => window.removeEventListener("load", initializeGoogleOneTap);
  }, []);

  return (
    <>
      {/* <div id="oneTap" className="fixed top-0 right-0 z-[100]" /> */}
      <div
        id="g_id_onload"
        data-client_id="558058766557-3u5fb1vcjvpk4ppgfcqkac5us9ojmru2.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>
    </>
  );
};

export default OneTapComponent;
