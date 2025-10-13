import { useNavigate } from "react-router-dom";
import { CheckCircle2, Circle, ChevronRight, ChevronLeft } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Restaurant information",
      description: "Add basic details about your restaurant",
      completed: false,
      route: "/onboarding/step1",
    },
    {
      id: 2,
      title: "Menu & Pricing",
      description: "Upload your menu and set prices",
      completed: false,
      route: "/onboarding/step2",
    },
    {
      id: 3,
      title: "Bank Details",
      description: "Add account for payments",
      completed: false,
      route: "/onboarding/step3",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/landing-page")}
            className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="container max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-foreground">
              Complete Your Profile
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Get your restaurant online in 3 simple steps
            </p>
          </div>
        </div>
      </header>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-6 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Setup Progress
              </h2>
              <p className="text-sm text-muted-foreground">
                0 of 3 steps completed
              </p>
            </div>
            <div className="text-3xl font-bold text-primary">0%</div>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 py-6 px-4">
        <div className="container max-w-4xl mx-auto space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:shadow-card transition-all duration-200 cursor-pointer"
              onClick={() => navigate(step.route)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {step.id}
                    </span>
                    {step.completed && (
                      <span className="bg-success/10 text-success px-2 py-0.5 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-border bg-card p-4">
        <div className="container max-w-4xl mx-auto">
          <button
            onClick={() => navigate(steps[0].route)}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium rounded-md transition-colors"
          >
            Start Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
