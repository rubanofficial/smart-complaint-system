import { cn } from "@/lib/utils";

/* ---------- STATUS BADGE ---------- */
const statusStyles = {
  submitted: "status-badge status-submitted",
  in_review: "status-badge status-in-review",
  resolved: "status-badge status-resolved",
  rejected: "status-badge status-rejected",
};

export function StatusBadge({ status, className }) {
  if (!status) return null;

  return (
    <span className={cn(statusStyles[status], className)}>
      {status.replace("_", " ")}
    </span>
  );
}

/* ---------- PRIORITY BADGE ---------- */
const priorityStyles = {
  critical: "bg-destructive/15 text-destructive",
  high: "bg-warning/15 text-warning",
  medium: "bg-info/15 text-info",
  low: "bg-muted text-muted-foreground",
};

export function PriorityBadge({ priority, className }) {
  if (!priority) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize",
        priorityStyles[priority],
        className
      )}
    >
      {priority}
    </span>
  );
}
