import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Welcome to ResumeGenius
        </h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "hsl(var(--primary))",
                  brandAccent: "hsl(var(--primary))",
                },
              },
            },
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_input_placeholder: "Your email address",
                password_input_placeholder: "Your password",
              },
              sign_up: {
                email_input_placeholder: "Your email address",
                password_input_placeholder: "Your password",
              }
            }
          }}
          redirectTo={`${window.location.origin}/dashboard`}
        />
      </div>
    </div>
  );
};

export default Login;