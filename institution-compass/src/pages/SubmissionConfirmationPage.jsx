import { Link, useParams } from "react-router-dom";
import { CheckCircle, Copy, Search } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function SubmissionConfirmationPage() {
  const { complaintId } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!complaintId) return;
    await navigator.clipboard.writeText(complaintId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PublicLayout>
      <div className="py-16 bg-muted/30 min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-6 max-w-xl">
          <Card className="card-institutional text-center">
            <CardHeader className="pb-4">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <CardTitle className="text-2xl text-success">
                Complaint Submitted Successfully
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Your complaint has been received. Use the Complaint ID
                below to track the status.
              </p>

              <div className="bg-muted rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Your Complaint ID
                </p>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-2xl font-mono font-bold text-primary">
                    {complaintId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 w-8 p-0"
                  >
                    <Copy
                      className={`h-4 w-4 ${copied ? "text-success" : ""
                        }`}
                    />
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-success mt-2">
                    Copied to clipboard!
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={`/track?id=${complaintId}`} className="flex-1">
                  <Button className="w-full gap-2">
                    <Search className="h-4 w-4" />
                    Track Status
                  </Button>
                </Link>
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
