import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserX,
  User,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { complaintService } from "@/services/complaintService";

const ITEMS_PER_PAGE = 10;

export default function ComplaintsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: searchParams.get("status") || "all",
    category: searchParams.get("category") || "all",
    priority: searchParams.get("priority") || "all",
    page: Number(searchParams.get("page") || 1),
  });

  useEffect(() => {
    loadComplaints();
  }, [filters]);

  const loadComplaints = async () => {
    setIsLoading(true);
    try {
      const res = await complaintService.getAllComplaints({
        ...filters,
        status: filters.status === "all" ? undefined : filters.status,
        category: filters.category === "all" ? undefined : filters.category,
        priority: filters.priority === "all" ? undefined : filters.priority,
        limit: ITEMS_PER_PAGE,
      });
      setComplaints(res.complaints);
      setTotal(res.total);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Complaints</h1>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((c) => (
                  <TableRow key={c.complaintId}>
                    <TableCell className="font-mono">
                      {c.complaintId}
                    </TableCell>
                    <TableCell>
                      {c.isAnonymous ? <UserX /> : <User />}
                    </TableCell>
                    <TableCell>
                      {c.category === "safety" && <Shield className="inline" />}
                      {c.category}
                    </TableCell>
                    <TableCell>
                      {c.mlOutput && (
                        <PriorityBadge priority={c.mlOutput.priority} />
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/complaints/${c.complaintId}`}>
                        <Button size="sm" variant="ghost">
                          <Eye />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-between">
          <Button
            size="sm"
            disabled={filters.page <= 1}
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          >
            <ChevronLeft /> Prev
          </Button>
          <span>
            Page {filters.page} of {totalPages}
          </span>
          <Button
            size="sm"
            disabled={filters.page >= totalPages}
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          >
            Next <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
