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
  submitted: <Clock className="h-8 w-8 text-info" />,
  in_review: <FileSearch className="h-8 w-8 text-warning" />,
  resolved: <CheckCircle className="h-8 w-8 text-success" />,
  rejected: <XCircle className="h-8 w-8 text-destructive" />,
};

const statusDescriptions = {
  submitted: "Your complaint has been received and is awaiting review.",
  in_review: "Your complaint is currently being reviewed.",
  resolved: "Your complaint has been resolved.",
  rejected: "Your complaint was rejected. See remarks for details.",
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

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <PublicLayout>
      <div className="py-12 bg-muted/30 min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-6 max-w-xl">
          <Card className="card-institutional mb-8">
            <CardHeader className="text-center">
              <Search className="h-8 w-8 mx-auto mb-4 text-primary" />
              <CardTitle>Track Complaint Status</CardTitle>
              <CardDescription>
                Enter your Complaint ID
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Label>Complaint ID</Label>
                <Input
                  value={complaintId}
                  onChange={(e) =>
                    setComplaintId(e.target.value.toUpperCase())
                  }
                  className="text-center font-mono"
                />
                <Button
                  type="submit"
                  className="w-full"
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
                      Track Status
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && hasSearched && (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="flex gap-3 pt-6 text-destructive">
                <AlertCircle />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="card-institutional">
              <CardHeader className="text-center">
                {statusIcons[result.status]}
                <StatusBadge status={result.status} />
                <p className="text-sm text-muted-foreground">
                  {statusDescriptions[result.status]}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center bg-muted p-4 rounded">
                  <code className="font-mono text-primary">
                    {result.complaintId}
                  </code>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Last Updated</span>
                  <span>{formatDate(result.lastUpdated)}</span>
                </div>

                {result.adminRemarks && (
                  <div className="bg-muted/50 p-3 rounded text-sm">
                    {result.adminRemarks}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
