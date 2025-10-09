import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import { toast } from "../hooks/useToast";

const RestaurantInfo = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Form state
  const [formData, setFormData] = useState({
    restaurantName: "",
    referralCode: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    countryCode: "+91",
    whatsappUpdates: true,
    sameAsOwnerPhone: true,
    restaurantPhone: "",
    location: "",
    address: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (currentStep === 1 && !formData.restaurantName.trim()) {
      toast({
        title: "Restaurant name required",
        description: "Please enter your restaurant name",
        variant: "destructive",
      });
      return false;
    }
    if (currentStep === 2) {
      if (
        !formData.ownerName.trim() ||
        !formData.ownerEmail.trim() ||
        !formData.ownerPhone.trim()
      ) {
        toast({
          title: "Owner details required",
          description: "Please fill in all owner details",
          variant: "destructive",
        });
        return false;
      }
    }
    if (currentStep === 3 && !formData.location.trim()) {
      toast({
        title: "Location required",
        description: "Please add your restaurant address",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/success");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Restaurant information</h1>
          <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full text-sm font-medium">
            {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Form Content */}
      <div className="container max-w-2xl mx-auto px-4 py-6">
        {/* Step 1: Restaurant Name */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Restaurant name
              </h2>
              <p className="text-muted-foreground text-sm">
                Customers will see this name on Zomato
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="restaurantName"
                className="text-sm text-muted-foreground"
              >
                Restaurant name*
              </label>
              <input
                id="restaurantName"
                value={formData.restaurantName}
                onChange={(e) =>
                  handleInputChange("restaurantName", e.target.value)
                }
                placeholder="Enter restaurant name"
                className="w-full h-12 text-base rounded-md border border-border px-3 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <button
              onClick={() => {}}
              className="w-full border border-border rounded-xl p-4 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
            >
              <span className="text-foreground">
                Did someone refer you to this platform?
              </span>
              <ChevronLeft className="w-5 h-5 rotate-180 text-secondary" />
            </button>
          </div>
        )}

        {/* Step 2: Owner Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Owner details
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Owner details
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Zomato will use these details for all business communications
                  and updates
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="ownerName"
                      className="text-sm text-muted-foreground"
                    >
                      Full name*
                    </label>
                    <input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) =>
                        handleInputChange("ownerName", e.target.value)
                      }
                      placeholder="Full name"
                      className="h-12 w-full border border-border rounded-md px-3 mt-1 focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ownerEmail"
                      className="text-sm text-muted-foreground"
                    >
                      Email address*
                    </label>
                    <input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) =>
                        handleInputChange("ownerEmail", e.target.value)
                      }
                      placeholder="Email address"
                      className="h-12 w-full border border-border rounded-md px-3 mt-1 focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ownerPhone"
                      className="text-sm text-muted-foreground"
                    >
                      Phone number*
                    </label>
                    <div className="flex gap-2 mt-1">
                      <div className="flex items-center bg-muted rounded-lg px-3 border border-input">
                        <span className="text-2xl mr-2">🇮🇳</span>
                        <span className="font-medium">+91</span>
                      </div>
                      <input
                        id="ownerPhone"
                        type="tel"
                        value={formData.ownerPhone}
                        onChange={(e) =>
                          handleInputChange("ownerPhone", e.target.value)
                        }
                        placeholder="6381410753"
                        className="h-12 flex-1 border border-border rounded-md px-3 focus:ring-2 focus:ring-primary outline-none"
                      />
                      <button className="h-12 px-4 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-colors">
                        Verify
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="whatsappUpdates"
                      type="checkbox"
                      checked={formData.whatsappUpdates}
                      onChange={(e) =>
                        handleInputChange("whatsappUpdates", e.target.checked)
                      }
                      className="w-4 h-4 accent-primary"
                    />
                    <label
                      htmlFor="whatsappUpdates"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Get restaurant updates via Whatsapp
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Restaurant's primary contact number
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Customers, delivery partners and Zomato may call on this
                  number for order support
                </p>

                <div className="flex items-center gap-2">
                  <input
                    id="sameAsOwner"
                    type="checkbox"
                    checked={formData.sameAsOwnerPhone}
                    onChange={(e) =>
                      handleInputChange("sameAsOwnerPhone", e.target.checked)
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  <label
                    htmlFor="sameAsOwner"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Same as owner mobile number
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Restaurant location
              </h2>
              <p className="text-muted-foreground text-sm">
                Help customers find you easily
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="relative bg-muted rounded-xl overflow-hidden h-64 border border-border">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Map view</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 right-4">
                <div className="bg-card rounded-lg shadow-lg p-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for area, street name"
                    className="flex-1 bg-transparent outline-none text-sm"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg relative">
                  Your order will be picked up from here
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary" />
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <MapPin className="w-8 h-8 text-primary fill-primary" />
              </div>
            </div>

            <button
              className="w-full h-12 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2"
              onClick={() => handleInputChange("location", "Connaught Place")}
            >
              <MapPin className="w-5 h-5" />
              Use current location
            </button>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-1">
                {formData.location || "Connaught Place"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Hanuman Road Area, New Delhi
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container max-w-2xl mx-auto">
          <button
            onClick={handleNext}
            className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-medium rounded-md transition-colors"
            disabled={
              (currentStep === 1 && !formData.restaurantName) ||
              (currentStep === 2 &&
                (!formData.ownerName ||
                  !formData.ownerEmail ||
                  !formData.ownerPhone))
            }
          >
            {currentStep === totalSteps ? "Add restaurant address" : "Next"}
          </button>
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-20 right-6 bg-primary text-primary-foreground rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 font-medium">
        <span className="text-lg">💬</span>
        Help
      </button>

      <div className="h-20" />
    </div>
  );
};

export default RestaurantInfo;
