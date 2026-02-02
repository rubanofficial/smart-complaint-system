import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserX, Loader2 } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <PublicLayout>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
        <Card className="card-institutional">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <UserX className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Anonymous Complaint</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Category */}
            <div className="space-y-2">
              <Label>Type of Problem *</Label>
              <Select value={category} onValueChange={setCategory}>
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
            <div className="space-y-2">
              <Label>Complaint Description *</Label>
              <Textarea
                rows={6}
                placeholder="Describe your issue in detail..."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />
            </div>

            {/* Acknowledgement */}
            <div className="flex items-start gap-2">
              <Checkbox
                checked={acknowledged}
                onCheckedChange={(v) => setAcknowledged(!!v)}
              />
              <Label className="text-sm leading-snug">
                I understand this complaint is anonymous and no personal details
                will be collected.
              </Label>
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
