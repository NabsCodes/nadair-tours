"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          success: "toast-success",
          error: "toast-error",
          info: "toast-info",
          warning: "toast-warning",
        },
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success": "var(--primary)",
          "--success-bg": "color-mix(in oklab, var(--primary) 8%, var(--card))",
          "--success-border": "var(--primary)",
          "--success-text": "var(--primary)",
          "--error": "var(--destructive)",
          "--error-bg":
            "color-mix(in oklab, var(--destructive) 8%, var(--card))",
          "--error-border": "var(--destructive)",
          "--error-text": "var(--destructive)",
          "--info": "var(--accent)",
          "--info-bg": "color-mix(in oklab, var(--accent) 8%, var(--card))",
          "--info-border": "var(--accent)",
          "--info-text": "var(--accent)",
          "--warning": "var(--secondary)",
          "--warning-bg":
            "color-mix(in oklab, var(--secondary) 8%, var(--card))",
          "--warning-border": "var(--secondary)",
          "--warning-text": "var(--secondary-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
