import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserX,
  User,
  AlertTriangle,
  Shield,
  Clock,
  Loader2,
  Save,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { complaintService } from "@/services/complaintService";
import { authService } from "@/services/authService";

const statusOptions = [
  { value: "submitted", label: "Submitted" },
  { value: "in_review", label: "In Review" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

export default function ComplaintDetailPage() {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newStatus, setNewStatus] = useState("submitted");
  const [remarks, setRemarks] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (complaintId) loadComplaint();
  }, [complaintId]);

  const loadComplaint = async () => {
    try {
      const data = await complaintService.getComplaint(complaintId);
      if (!data) {
        navigate("/admin/complaints");
        return;
      }
      setComplaint(data);
      setNewStatus(data.status);
      setRemarks(data.adminRemarks || "");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!complaint) return;
    setIsSaving(true);
    try {
      const admin = await authService.getCurrentAdmin();
      const success = await complaintService.updateComplaintStatus(
        complaint.complaintId,
        newStatus,
        remarks,
        admin?.name
      );
      if (success) await loadComplaint();
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!complaint) return;
    await navigator.clipboard.writeText(complaint.complaintId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!complaint) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/complaints">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-mono font-bold">{complaint.complaintId}</h1>
            <Button size="sm" variant="ghost" onClick={handleCopy}>
              <Copy className={copied ? "text-success" : ""} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Submitted on {formatDate(complaint.createdAt)}
          </p>
        </div>

        <StatusBadge status={complaint.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complaint.category && (
                <div className="flex items-center gap-2">
                  <span className="capitalize">{complaint.category}</span>
                  {complaint.category === "safety" && (
                    <Shield className="text-warning h-4 w-4" />
                  )}
                </div>
              )}

              <div className="bg-muted p-4 rounded">
                <p className="whitespace-pre-wrap text-sm">
                  {complaint.complaintText}
                </p>
              </div>
            </CardContent>
          </Card>

          {!complaint.isAnonymous && complaint.identity && (
            <Card>
              <CardHeader>
                <CardTitle>Complainant Info</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p>{complaint.identity.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Roll No</p>
                  <p>{complaint.identity.rollNumber}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {complaint.isAnonymous && (
            <Card className="bg-muted/30">
              <CardContent className="flex gap-2 items-center">
                <UserX />
                <span>Anonymous complaint</span>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Admin Remarks</Label>
              <Textarea
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
