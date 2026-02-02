import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div 
        className={`w-full max-w-2xl transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl mb-4 shadow-md">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>

        {/* Info Card */}
        <Card className="border-2 shadow-lg mb-6">
          <CardContent className="p-5 md:p-6">
            {/* Requested URL Display */}
            {/* <div className="bg-muted/30 rounded-lg p-3.5 border border-border mb-5">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    Requested URL:
                  </p>
                  <code className="text-xs font-mono text-destructive break-all block">
                    {location.pathname}
                  </code>
                </div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-3">
              <Button
                asChild
                className="w-full h-11 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Home
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full h-11 text-sm font-semibold border-2 hover:border-primary/50 transition-all"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-3.5">
          <div className="flex gap-2.5">
            <AlertCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-accent">Need Help?</p>
              <ul className="text-muted-foreground space-y-0.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-accent mt-0.5">•</span>
                  Check if the URL is spelled correctly
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-accent mt-0.5">•</span>
                  The page may have been moved or deleted
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-accent mt-0.5">•</span>
                  Return to the home page and navigate from there
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default NotFound;