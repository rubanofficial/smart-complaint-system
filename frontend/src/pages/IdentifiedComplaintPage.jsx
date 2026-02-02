import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Loader2 } from "lucide-react";
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
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
        <Card className="card-institutional">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Complaint With Identity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <Label>Full Name *</Label>
              <Input
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            {/* Roll Number */}
            <div className="space-y-1">
              <Label>Roll Number *</Label>
              <Input
                placeholder="University Roll Number"
                value={formData.rollNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value })
                }
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <Label>Department *</Label>
              <Input
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <Label>Type of Problem *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select complaint category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Complaint Text */}
            <div className="space-y-1">
              <Label>Complaint Description *</Label>
              <Textarea
                rows={6}
                placeholder="Describe your issue clearly..."
                value={formData.complaintText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    complaintText: e.target.value,
                  })
                }
              />
            </div>

            {/* Error */}
            {error && <p className="text-destructive text-sm">{error}</p>}

            {/* Submit */}
            <Button disabled={isSubmitting} className="w-full" size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Complaint"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </PublicLayout>
  );
}
