// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserX, Loader2 } from "lucide-react";
// import { PublicLayout } from "@/components/PublicLayout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { complaintService } from "@/services/complaintService";

// export default function AnonymousComplaintPage() {
//   const navigate = useNavigate();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [acknowledged, setAcknowledged] = useState(false);
//   const [complaintText, setComplaintText] = useState("");
//   const [category, setCategory] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!category || !complaintText.trim() || !acknowledged) {
//       setError("Please fill all required fields");
//       return;
//     }

//     setIsSubmitting(true);
//     setError("");

//     try {
//       const res = await complaintService.submitComplaint({
//         isAnonymous: true,
//         complaintText,
//         category,
//       });

//       navigate(`/submitted/${res.complaintId}`);
//     } catch {
//       setError("Failed to submit complaint. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <PublicLayout>
//       <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
//         <Card className="card-institutional">
//           <CardHeader className="text-center">
//             <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
//               <UserX className="h-6 w-6 text-accent" />
//             </div>
//             <CardTitle>Anonymous Complaint</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {/* Category */}
//             <div className="space-y-2">
//               <Label>Type of Problem *</Label>
//               <Select value={category} onValueChange={setCategory}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select complaint category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="academic">Academic</SelectItem>
//                   <SelectItem value="hostel">Hostel</SelectItem>
//                   <SelectItem value="infrastructure">Infrastructure</SelectItem>
//                   <SelectItem value="safety">Safety</SelectItem>
//                   <SelectItem value="harassment">Harassment</SelectItem>
//                   <SelectItem value="financial">Financial</SelectItem>
//                   <SelectItem value="transport">Transport</SelectItem>
//                   <SelectItem value="library">Library</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Complaint Text */}
//             <div className="space-y-2">
//               <Label>Complaint Description *</Label>
//               <Textarea
//                 rows={6}
//                 placeholder="Describe your issue in detail..."
//                 value={complaintText}
//                 onChange={(e) => setComplaintText(e.target.value)}
//               />
//             </div>

//             {/* Acknowledgement */}
//             <div className="flex items-start gap-2">
//               <Checkbox
//                 checked={acknowledged}
//                 onCheckedChange={(v) => setAcknowledged(!!v)}
//               />
//               <Label className="text-sm leading-snug">
//                 I understand this complaint is anonymous and no personal details
//                 will be collected.
//               </Label>
//             </div>

//             {/* Error */}
//             {error && <p className="text-destructive text-sm">{error}</p>}

//             {/* Submit */}
//             <Button disabled={isSubmitting} className="w-full" size="lg">
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Submitting...
//                 </>
//               ) : (
//                 "Submit Complaint"
//               )}
//             </Button>
//           </CardContent>
//         </Card>
//       </form>
//     </PublicLayout>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserX, Loader2, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { complaintService } from "@/services/complaintService";

export default function AnonymousComplaintPage() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [complaintText, setComplaintText] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !complaintText.trim() || !acknowledged) {
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await complaintService.submitComplaint({
        isAnonymous: true,
        complaintText,
        category,
      });

      navigate(`/submitted/${res.complaintId}`);
    } catch {
      setError("Failed to submit complaint. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] py-6 md:py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl mb-3 shadow-md">
                <UserX className="h-6 w-6 text-accent" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold mb-1.5">Anonymous Complaint</h1>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Your identity will remain completely confidential. Submit your complaint securely.
              </p>
            </div>

            {/* Info Banner */}
            <div className="mb-5 bg-accent/5 border border-accent/20 rounded-lg p-3">
              <div className="flex gap-2.5">
                <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-accent">Privacy Protected</p>
                  <p className="text-muted-foreground leading-relaxed">
                    No personal information is collected. You'll receive a unique Complaint ID to track your submission.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Form Card */}
            <form onSubmit={handleSubmit}>
              <Card className="border-2 shadow-lg">
                <CardContent className="p-5 md:p-6 space-y-5">
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-1.5">
                      Category <span className="text-destructive">*</span>
                    </Label>
                   <Select value={category} onValueChange={setCategory}>
  <SelectTrigger className="h-11 border-2 hover:border-primary/50 focus:border-primary transition-all bg-background">
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
                    <Label className="text-sm font-semibold flex items-center gap-1.5">
                      Complaint Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      rows={6}
                      placeholder="Describe your complaint in detail. Include relevant information such as dates, locations, and any witnesses if applicable..."
                      value={complaintText}
                      onChange={(e) => setComplaintText(e.target.value)}
                      className="text-sm border-2 hover:border-primary/50 focus:border-primary transition-colors resize-none"
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Minimum 100 characters ({complaintText.length} / 100)
                    </p>
                  </div>

                  {/* Acknowledgement Checkbox */}
                  <div className="bg-muted/30 rounded-lg p-3.5 border border-border">
                    <div className="flex items-start gap-2.5">
                      <Checkbox
                        id="acknowledge"
                        checked={acknowledged}
                        onCheckedChange={(v) => setAcknowledged(!!v)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor="acknowledge" 
                          className="text-xs font-medium leading-relaxed cursor-pointer"
                        >
                          I understand and acknowledge that:
                        </Label>
                        <ul className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
                          <li className="flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span>
                            This complaint is submitted anonymously
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span>
                            No personal details will be collected or stored
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span>
                            I will only be able to track this using the Complaint ID
                          </li>
                        </ul>
                      </div>
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
                          Submit Anonymous Complaint
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Footer Note */}
              <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed max-w-xl mx-auto">
                Your complaint will be reviewed within 48 hours. Make sure to save your Complaint ID after submission to track the status.
              </p>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}