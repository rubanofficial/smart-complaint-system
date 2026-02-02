import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  FileSearch,
  Calendar,
  MessageSquare,
  Info,
} from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { complaintService } from "@/services/complaintService";

const statusIcons = {
  submitted: <Clock className="h-12 w-12 text-info" />,
  in_review: <FileSearch className="h-12 w-12 text-warning" />,
  resolved: <CheckCircle className="h-12 w-12 text-success" />,
  rejected: <XCircle className="h-12 w-12 text-destructive" />,
};

const statusDescriptions = {
  submitted: "Your complaint has been received and is awaiting review.",
  in_review: "Your complaint is currently being reviewed by our team.",
  resolved: "Your complaint has been successfully resolved.",
  rejected: "Your complaint was rejected. Please check the remarks below for details.",
};

export default function TrackComplaintPage() {
  const [searchParams] = useSearchParams();
  const [complaintId, setComplaintId] = useState(
    searchParams.get("id") || ""
  );
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setComplaintId(id);
      handleSearch(id);
    }
  }, [searchParams]);

  const handleSearch = async (id) => {
    const searchId = id || complaintId.trim();
    if (!searchId) {
      setError("Please enter a Complaint ID");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setError(null);

    try {
      const res = await complaintService.trackComplaint(searchId);
      if (res) {
        setResult(res);
      } else {
        setResult(null);
        setError("No complaint found with this ID");
      }
    } catch {
      setError("Failed to retrieve complaint status");
      setResult(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const formatDate = (date) => {
    if (!date) return 'Not updated yet';
    try {
      return new Date(date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] py-8 md:py-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl mb-3 shadow-md">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Track Complaint Status</h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Enter your Complaint ID to check the current status and updates
              </p>
            </div>

            {/* Info Banner */}
            <div className="mb-6 bg-primary/5 border border-primary/20 rounded-lg p-3">
              <div className="flex gap-2.5">
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your Complaint ID was provided when you submitted your complaint. It's a unique code like <span className="font-mono text-foreground">CMP-XXXX-XXXX</span>
                </p>
              </div>
            </div>

            {/* Search Card */}
            <Card className="border-2 shadow-lg mb-6">
              <CardContent className="p-5 md:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="complaint-id" className="text-sm font-semibold">
                      Complaint ID
                    </Label>
                    <Input
                      id="complaint-id"
                      value={complaintId}
                      onChange={(e) =>
                        setComplaintId(e.target.value.toUpperCase())
                      }
                      placeholder="CMP-XXXX-XXXX"
                      className="text-center font-mono text-base h-11 border-2 hover:border-primary/50 focus:border-primary transition-colors tracking-wider"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 font-semibold shadow-md hover:shadow-lg transition-all"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Track Complaint
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Error State */}
            {error && hasSearched && (
              <Card className="border-2 border-destructive/30 bg-destructive/5 shadow-lg animate-in fade-in-50 duration-300">
                <CardContent className="p-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-destructive mb-1">Complaint Not Found</p>
                      <p className="text-sm text-destructive/80">{error}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Please verify your Complaint ID and try again.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Result Card */}
            {result && (
              <Card className="border-2 shadow-xl animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                <CardHeader className="text-center pb-4 border-b bg-gradient-to-b from-muted/30 to-transparent">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center shadow-md">
                      {statusIcons[result.status]}
                    </div>
                  </div>
                  <div className="flex justify-center mb-3">
                    <StatusBadge status={result.status} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    {statusDescriptions[result.status]}
                  </p>
                </CardHeader>

                <CardContent className="p-5 md:p-6 space-y-5">
                  {/* Complaint ID Display */}
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-lg p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5 text-center">
                      Your Complaint ID
                    </p>
                    <code className="block font-mono text-lg font-bold text-primary text-center tracking-wider">
                      {result.complaintId}
                    </code>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                    </div>
                    <span className="text-sm font-semibold">{formatDate(result.lastUpdated)}</span>
                  </div>

                  {/* Admin Remarks */}
                  {result.adminRemarks && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <Label className="text-sm font-semibold">Admin Remarks</Label>
                      </div>
                      <div className="bg-muted/50 border border-border rounded-lg p-4">
                        <p className="text-sm leading-relaxed text-foreground">
                          {result.adminRemarks}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status Timeline Hint */}
                  <div className="pt-2 border-t">
                    <p className="text-xs text-center text-muted-foreground">
                      You will be notified of any status changes. Keep your Complaint ID safe.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State - Only show if searched but no result and no error */}
            {!result && !error && hasSearched && !isSearching && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  No results found. Try searching with a valid Complaint ID.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}