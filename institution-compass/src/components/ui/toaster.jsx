import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border-border shadow-lg",
          description: "text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
