import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Loader2, AlertCircle, CheckCircle2, Info, Lock } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { complaintService } from "@/services/complaintService";

export default function IdentifiedComplaintPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    department: "",
    category: "",
    complaintText: "",
  });

  const categories = [
    { value: "academic", label: "Academic Issues", icon: "📚" },
    { value: "hostel", label: "Hostel Facilities", icon: "🏠" },
    { value: "infrastructure", label: "Infrastructure", icon: "🏗️" },
    { value: "safety", label: "Safety Concerns", icon: "🛡️" },
    { value: "harassment", label: "Harassment", icon: "⚠️" },
    { value: "financial", label: "Financial Issues", icon: "💰" },
    { value: "transport", label: "Transport", icon: "🚌" },
    { value: "library", label: "Library Services", icon: "📖" },
    { value: "other", label: "Other", icon: "📝" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, rollNumber, department, category, complaintText } =
      formData;

    if (
      !fullName ||
      !rollNumber ||
      !department ||
      !category ||
      !complaintText.trim()
    ) {
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await complaintService.submitComplaint({
        isAnonymous: false,
        identity: {
          fullName,
          rollNumber,
          department,
        },
        category,
        complaintText,
      });

      navigate(`/submitted/${res.complaintId}`);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] py-6 md:py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl mb-3 shadow-md">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold mb-1.5">Identified Complaint</h1>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Submit with your details for personalized follow-up and faster resolution
              </p>
            </div>

            {/* Info Banner */}
            <div className="mb-5 bg-primary/5 border border-primary/20 rounded-lg p-3">
              <div className="flex gap-2.5">
                <Lock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-primary">Confidentiality Guaranteed</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Your information is kept strictly confidential and will only be used for complaint resolution purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Form Card */}
            <form onSubmit={handleSubmit}>
              <Card className="border-2 shadow-lg">
                <CardContent className="p-5 md:p-6 space-y-5">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <User className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold">Personal Information</h3>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-1.5">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="h-11 border-2 hover:border-primary/50 focus:border-primary transition-colors"
                      />
                    </div>

                    {/* Roll Number & Department - Side by Side */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rollNumber" className="text-sm font-medium flex items-center gap-1.5">
                          Roll Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="rollNumber"
                          placeholder="Your roll number"
                          value={formData.rollNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, rollNumber: e.target.value })
                          }
                          className="h-11 border-2 hover:border-primary/50 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-sm font-medium flex items-center gap-1.5">
                          Department <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="department"
                          placeholder="e.g. Computer Science"
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({ ...formData, department: e.target.value })
                          }
                          className="h-11 border-2 hover:border-primary/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Complaint Details Section */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold">Complaint Details</h3>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-semibold flex items-center gap-1.5">
                        Category <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger id="category" className="h-11 border-2 hover:border-primary/50 focus:border-primary transition-all bg-background">
                          <SelectValue placeholder="Choose complaint category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                            Select Category
                          </div>
                          {categories.map((cat) => (
                            <SelectItem 
                              key={cat.value} 
                              value={cat.value} 
                              className="cursor-pointer focus:bg-accent/50"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-base">{cat.icon}</span>
                                <span className="font-medium">{cat.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Complaint Description */}
                    <div className="space-y-2">
                      <Label htmlFor="complaintText" className="text-sm font-semibold flex items-center gap-1.5">
                        Complaint Description <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="complaintText"
                        rows={6}
                        placeholder="Describe your complaint in detail. Include relevant information such as dates, locations, and any witnesses if applicable..."
                        value={formData.complaintText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            complaintText: e.target.value,
                          })
                        }
                        className="text-sm border-2 hover:border-primary/50 focus:border-primary transition-colors resize-none"
                      />
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Minimum 20 characters ({formData.complaintText.length} / 20)
                      </p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-2.5 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                      <p className="text-xs text-destructive font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-1">
                    <Button 
                      type="submit"
                      disabled={isSubmitting} 
                      className="w-full h-11 text-sm font-semibold shadow-lg hover:shadow-xl transition-all" 
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Your Complaint...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Submit Complaint
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Footer Note */}
              <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed max-w-xl mx-auto">
                Your complaint will be reviewed within 48 hours. You'll receive a Complaint ID to track the status.
              </p>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}