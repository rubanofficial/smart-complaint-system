import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  AlertTriangle,
  Shield,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  FileSearch,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { complaintService } from "@/services/complaintService";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await complaintService.getDashboardMetrics();
      setMetrics(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!metrics) {
    return <div className="text-destructive">Failed to load dashboard</div>;
  }

  const statusCards = [
    { status: "submitted", label: "Submitted", icon: Clock },
    { status: "in_review", label: "In Review", icon: FileSearch },
    { status: "resolved", label: "Resolved", icon: CheckCircle },
    { status: "rejected", label: "Rejected", icon: XCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/admin/complaints">
          <Button variant="outline" className="gap-2">
            View Complaints <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {statusCards.map((item) => (
          <Card key={item.status}>
            <CardContent className="p-4 flex items-center gap-4">
              <item.icon className="h-6 w-6" />
              <div>
                <p className="text-sm">{item.label}</p>
                <p className="text-xl font-bold">
                  {metrics.statusBreakdown[item.status]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
