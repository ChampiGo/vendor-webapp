import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Upload,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { toast } from "../hooks/useToast";

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const totalSubSteps = 3;

  // Form state
  const [formData, setFormData] = useState({
    profileImage: null,
    profileImagePreview: null,
    selectedCuisines: [],
    deliveryTimings: {
      Monday: { open: true, slots: [] },
      Tuesday: { open: true, slots: [] },
      Wednesday: { open: true, slots: [] },
      Thursday: { open: true, slots: [] },
      Friday: { open: true, slots: [] },
      Saturday: { open: true, slots: [] },
      Sunday: { open: true, slots: [] },
    },
  });

  const [cuisineSearch, setCuisineSearch] = useState("");
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [tempSlots, setTempSlots] = useState([{ startTime: "", endTime: "" }]);
  const [copyToAllDays, setCopyToAllDays] = useState(false);

  const availableCuisines = [
    "Whiskey",
    "Beer",
    "Vodka",
    "Rum",
    "Gin",
    "Brandy",
    "Wine",
    "Cocktails",
    "Liqueurs",
    "Tequila",
    "Mead",
    "Sake",
    "Cider",
    "Absinthe",
  ];

  const filteredCuisines = availableCuisines.filter((cuisine) =>
    cuisine.toLowerCase().includes(cuisineSearch.toLowerCase())
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image less than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          profileImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCuisine = (cuisine) => {
    setFormData((prev) => {
      const selected = prev.selectedCuisines;
      if (selected.includes(cuisine)) {
        return {
          ...prev,
          selectedCuisines: selected.filter((c) => c !== cuisine),
        };
      } else {
        return {
          ...prev,
          selectedCuisines: [...selected, cuisine],
        };
      }
    });
  };

  const openTimeModal = (day) => {
    setSelectedDay(day);
    const existingSlots = formData.deliveryTimings[day].slots;
    setTempSlots(
      existingSlots.length > 0
        ? [...existingSlots]
        : [{ startTime: "", endTime: "" }]
    );
    setShowTimeModal(true);
  };

  const addTimeSlot = () => {
    setTempSlots([...tempSlots, { startTime: "", endTime: "" }]);
  };

  const removeTimeSlot = (index) => {
    setTempSlots(tempSlots.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index, field, value) => {
    const updated = [...tempSlots];
    updated[index][field] = value;
    setTempSlots(updated);
  };

  const saveTimings = () => {
    if (tempSlots.some((slot) => !slot.startTime || !slot.endTime)) {
      toast({
        title: "Incomplete timings",
        description: "Please fill all time slots or remove empty ones",
        variant: "destructive",
      });
      return;
    }

    setFormData((prev) => {
      const updated = { ...prev.deliveryTimings };

      if (copyToAllDays) {
        Object.keys(updated).forEach((day) => {
          updated[day].slots = [...tempSlots];
        });
      } else {
        updated[selectedDay].slots = [...tempSlots];
      }

      return { ...prev, deliveryTimings: updated };
    });

    setShowTimeModal(false);
    setCopyToAllDays(false);
  };

  const toggleDayOpen = (day) => {
    setFormData((prev) => ({
      ...prev,
      deliveryTimings: {
        ...prev.deliveryTimings,
        [day]: {
          ...prev.deliveryTimings[day],
          open: !prev.deliveryTimings[day].open,
        },
      },
    }));
  };

  const validateStep = () => {
    if (currentSubStep === 1 && !formData.profileImage) {
      toast({
        title: "Profile image required",
        description: "Please upload a restaurant profile picture",
        variant: "destructive",
      });
      return false;
    }
    if (currentSubStep === 2 && formData.selectedCuisines.length === 0) {
      toast({
        title: "Cuisine selection required",
        description: "Please select at least one cuisine",
        variant: "destructive",
      });
      return false;
    }
    if (currentSubStep === 3) {
      const hasTimings = Object.values(formData.deliveryTimings).some(
        (day) => day.open && day.slots.length > 0
      );
      if (!hasTimings) {
        toast({
          title: "Delivery timings required",
          description: "Please add timings for at least one day",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentSubStep < totalSubSteps) {
      setCurrentSubStep((prev) => prev + 1);
    } else {
      // Navigate to next main step or success
      navigate("/success");
    }
  };

  const handleBack = () => {
    if (currentSubStep > 1) {
      setCurrentSubStep((prev) => prev - 1);
    } else {
      navigate("/onboarding");
    }
  };

  const getStepTitle = () => {
    switch (currentSubStep) {
      case 1:
        return "Add restaurant profile image";
      case 2:
        return "Select upto 8 cuisines";
      case 3:
        return "Restaurant delivery timings";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header */}
      <header className="bg-white border-b border-gray-400 sticky top-0 z-40">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Menu & operational details</h1>
          <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full text-sm font-medium">
            {currentSubStep} of 3
          </div>
        </div>
      </header>

      {/* Form Content */}
      <div className="container max-w-2xl mx-auto px-4 py-6">
        {/* Sub-step 1: Profile Image */}
        {currentSubStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-muted-foreground text-sm">
                This will be your restaurant's profile picture on Zomato — so
                use your best food shot!
              </p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-primary/5">
              <input
                type="file"
                id="profileImage"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Upload restaurant profile picture
                </h3>
                <p className="text-sm text-muted-foreground">
                  jpeg, png or jpg formats up-to 5MB
                </p>
              </label>
            </div>

            {/* Image Preview */}
            {formData.profileImagePreview && (
              <div className="relative rounded-xl overflow-hidden border border-border">
                <img
                  src={formData.profileImagePreview}
                  alt="Profile preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      profileImage: null,
                      profileImagePreview: null,
                    }))
                  }
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Guidelines Link */}
            <button className="text-primary font-medium text-sm underline">
              Guidelines to upload profile picture
            </button>

            {/* Example Section */}
            <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-foreground">
                  Example of profile picture
                </h3>
                <span className="text-lg">✨</span>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Example food image
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-step 2: Cuisines */}
        {currentSubStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-muted-foreground text-sm">
                Your restaurant will appear in searches for these cuisines
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for cuisines"
                value={cuisineSearch}
                onChange={(e) => setCuisineSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Selected Count */}
            {formData.selectedCuisines.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {formData.selectedCuisines.length} of cuisines selected
              </p>
            )}

            {/* Cuisine Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredCuisines.map((cuisine) => {
                const isSelected = formData.selectedCuisines.includes(cuisine);
                return (
                  <button
                    key={cuisine}
                    onClick={() => toggleCuisine(cuisine)}
                    className={`h-12 rounded-lg border-2 font-medium transition-all ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-background border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {cuisine}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sub-step 3: Delivery Timings */}
        {currentSubStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {getStepTitle()}
              </h2>
            </div>

            {/* Days List */}
            <div className="space-y-3">
              {Object.keys(formData.deliveryTimings).map((day) => {
                const dayData = formData.deliveryTimings[day];
                return (
                  <div
                    key={day}
                    className="bg-card border border-border rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold text-foreground">
                          {day}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {dayData.open ? "Open" : "Closed"}
                        </span>
                        <button
                          onClick={() => toggleDayOpen(day)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            dayData.open ? "bg-success" : "bg-muted"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              dayData.open ? "translate-x-6" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {dayData.open && (
                      <button
                        onClick={() => openTimeModal(day)}
                        className="text-primary font-medium text-sm flex items-center gap-1"
                      >
                        +{" "}
                        {dayData.slots.length > 0
                          ? "Edit Time"
                          : "Add/Edit Time"}
                      </button>
                    )}

                    {dayData.slots.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {dayData.slots.map((slot, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-muted-foreground"
                          >
                            {slot.startTime} - {slot.endTime}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Time Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-card w-full max-w-2xl sm:rounded-xl rounded-t-xl border border-border shadow-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedDay}</h3>
              <button
                onClick={() => setShowTimeModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {tempSlots.map((slot, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Slot {index + 1}</h4>
                    {tempSlots.length > 1 && (
                      <button
                        onClick={() => removeTimeSlot(index)}
                        className="text-destructive p-2 hover:bg-destructive/10 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <select
                        value={slot.startTime}
                        onChange={(e) =>
                          updateTimeSlot(index, "startTime", e.target.value)
                        }
                        className="w-full h-12 px-3 rounded-lg border border-border bg-background appearance-none"
                      >
                        <option value="">Start Time</option>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <option
                            key={hour}
                            value={`${hour.toString().padStart(2, "0")}:00`}
                          >
                            {hour.toString().padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        value={slot.endTime}
                        onChange={(e) =>
                          updateTimeSlot(index, "endTime", e.target.value)
                        }
                        className="w-full h-12 px-3 rounded-lg border border-border bg-background appearance-none"
                      >
                        <option value="">End Time</option>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <option
                            key={hour}
                            value={`${hour.toString().padStart(2, "0")}:00`}
                          >
                            {hour.toString().padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addTimeSlot}
                className="text-primary font-medium text-sm"
              >
                + Add more time slots
              </button>

              <div className="flex items-center gap-2 pt-4">
                <input
                  id="copyToAll"
                  type="checkbox"
                  checked={copyToAllDays}
                  onChange={(e) => setCopyToAllDays(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="copyToAll" className="text-sm cursor-pointer">
                  Copy above timings to all days
                </label>
              </div>

              <div className="pt-2">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Total duration:{" "}
                  {tempSlots.reduce((total, slot) => {
                    if (!slot.startTime || !slot.endTime) return total;
                    const start = parseInt(slot.startTime.split(":")[0]);
                    const end = parseInt(slot.endTime.split(":")[0]);
                    return total + (end - start);
                  }, 0)}{" "}
                  hrs
                </p>
                <button
                  onClick={saveTimings}
                  className="w-full h-12 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
        <div className="container max-w-2xl mx-auto">
          <button
            onClick={handleNext}
            className={`w-full h-12 text-base font-medium rounded-md transition-colors ${
              (currentSubStep === 1 && formData.profileImage) ||
              (currentSubStep === 2 && formData.selectedCuisines.length > 0) ||
              (currentSubStep === 3 &&
                Object.values(formData.deliveryTimings).some(
                  (d) => d.open && d.slots.length > 0
                ))
                ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            disabled={
              (currentSubStep === 1 && !formData.profileImage) ||
              (currentSubStep === 2 && formData.selectedCuisines.length === 0)
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-20 right-6 bg-foreground text-background rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 font-medium">
        <span className="text-lg">💬</span>
        Help
      </button>
    </div>
  );
};

export default OnboardingStep2;
