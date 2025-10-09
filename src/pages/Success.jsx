import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card rounded-2xl p-8 shadow-card-lg border border-border">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Restaurant Information Saved!
            </h1>
            <p className="text-muted-foreground">
              Your restaurant details have been successfully submitted. You can
              now continue with the remaining setup steps.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/onboarding")}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium"
            >
              Continue Setup
            </button>
            <button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full h-12 text-base font-medium"
            >
              Go to Dashboard
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Redirecting automatically in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
