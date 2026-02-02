import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { Shield, LayoutDashboard, FileText, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    authService.getCurrentAdmin().then((a) => {
      if (!a) navigate("/admin/login");
      else setAdmin(a);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex">
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64`}>
        Sidebar
      </aside>

      <main className="flex-1">
        <header className="flex justify-between p-4">
          <Button onClick={() => setSidebarOpen(!sidebarOpen)} size="icon">
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
          <Link to="/">Public Site</Link>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
