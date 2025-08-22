"use client";

import { useEffect, useState } from "react";
import { Switch, SwitchIndicator, SwitchWrapper } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or nothing until mounted
    return <div className="h-6 w-10" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center space-x-2.5">
        <SwitchWrapper>
          <Switch
            size="md"
            checked={theme === "light"} // or === "dark"
            onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
          />
          <SwitchIndicator state="off">
            <Moon className="text-primary-foreground size-4 transition-colors duration-300" />
          </SwitchIndicator>
          <SwitchIndicator state="on">
            <Sun className="text-muted-foreground size-4 transition-colors duration-300" />
          </SwitchIndicator>
        </SwitchWrapper>
      </div>
    </div>
  );
}
