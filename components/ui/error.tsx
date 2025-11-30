"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaHome, FaRedo } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type ErrorAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: IconType | LucideIcon;
  variant?: "default" | "outline";
};

type ErrorProps = {
  title: string;
  subtitle?: string;
  description: string;
  error?: Error & { digest?: string };
  icon?: IconType | LucideIcon;
  iconColor?: "primary" | "secondary" | "destructive";
  primaryAction?: ErrorAction;
  secondaryAction?: ErrorAction;
  className?: string;
};

const defaultPrimaryAction: ErrorAction = {
  label: "Try Again",
  onClick: () => window.location.reload(),
  icon: FaRedo,
  variant: "default",
};

const defaultSecondaryAction: ErrorAction = {
  label: "Go Home",
  href: "/",
  icon: FaHome,
  variant: "outline",
};

export function Error({
  title,
  subtitle,
  description,
  error,
  icon: Icon,
  iconColor = "destructive",
  primaryAction = defaultPrimaryAction,
  secondaryAction = defaultSecondaryAction,
  className,
}: ErrorProps) {
  const PrimaryIcon = primaryAction.icon;
  const SecondaryIcon = secondaryAction.icon;

  // Use error message if available, otherwise use provided description
  const displayDescription = error?.message || description;

  return (
    <div
      className={`container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-20 ${className || ""}`}
    >
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-3 pb-4">
          {Icon && (
            <div className="relative mx-auto">
              <div
                className={`${
                  iconColor === "primary"
                    ? "bg-primary/10 text-primary"
                    : iconColor === "secondary"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-destructive/10 text-destructive"
                } mx-auto flex h-20 w-20 items-center justify-center rounded-2xl`}
              >
                <Icon className="h-10 w-10" />
              </div>
              <div
                className={`${
                  iconColor === "primary"
                    ? "bg-primary/5"
                    : iconColor === "secondary"
                      ? "bg-secondary/5"
                      : "bg-destructive/5"
                } absolute -inset-2 -z-10 rounded-2xl blur-xl`}
              />
            </div>
          )}
          <div className="space-y-2">
            <CardTitle className="font-heading text-3xl font-bold">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {displayDescription}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {primaryAction && (
              <Button
                variant={primaryAction.variant || "default"}
                className="flex-1 gap-2"
                size="lg"
                onClick={primaryAction.onClick}
                asChild={primaryAction.href ? true : false}
              >
                {primaryAction.href ? (
                  <Link href={primaryAction.href}>
                    {PrimaryIcon && <PrimaryIcon className="h-4 w-4" />}
                    {primaryAction.label}
                  </Link>
                ) : (
                  <>
                    {PrimaryIcon && <PrimaryIcon className="h-4 w-4" />}
                    {primaryAction.label}
                  </>
                )}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || "outline"}
                className="flex-1 gap-2"
                size="lg"
                onClick={secondaryAction.onClick}
                asChild={secondaryAction.href ? true : false}
              >
                {secondaryAction.href ? (
                  <Link href={secondaryAction.href}>
                    {SecondaryIcon && <SecondaryIcon className="h-4 w-4" />}
                    {secondaryAction.label}
                  </Link>
                ) : (
                  <>
                    {SecondaryIcon && <SecondaryIcon className="h-4 w-4" />}
                    {secondaryAction.label}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
