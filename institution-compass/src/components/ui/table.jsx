import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full text-sm", className)} {...props} />
  </div>
));

const TableHeader = React.forwardRef((props, ref) => <thead ref={ref} {...props} />);
const TableBody = React.forwardRef((props, ref) => <tbody ref={ref} {...props} />);
const TableRow = React.forwardRef((props, ref) => <tr ref={ref} {...props} />);
const TableHead = React.forwardRef((props, ref) => <th ref={ref} {...props} />);
const TableCell = React.forwardRef((props, ref) => <td ref={ref} {...props} />);
const TableCaption = React.forwardRef((props, ref) => <caption ref={ref} {...props} />);

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
