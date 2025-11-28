import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCompass, FaHome } from "react-icons/fa";
import type { IconType } from "react-icons";

type NotFoundAction = {
  label: string;
  href: string;
  icon?: IconType;
  variant?: "default" | "outline";
};

type NotFoundProps = {
  title: string;
  subtitle?: string;
  description: string;
  icon?: IconType;
  iconColor?: "primary" | "secondary";
  primaryAction?: NotFoundAction;
  secondaryAction?: NotFoundAction;
  className?: string;
};

const defaultPrimaryAction: NotFoundAction = {
  label: "Browse Tours",
  href: "/tours",
  icon: FaCompass,
  variant: "default",
};

const defaultSecondaryAction: NotFoundAction = {
  label: "Go Home",
  href: "/",
  icon: FaHome,
  variant: "outline",
};

export function NotFound({
  title,
  subtitle,
  description,
  icon: Icon,
  iconColor = "primary",
  primaryAction = defaultPrimaryAction,
  secondaryAction = defaultSecondaryAction,
  className,
}: NotFoundProps) {
  const PrimaryIcon = primaryAction.icon;
  const SecondaryIcon = secondaryAction.icon;

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
                    : "bg-secondary/10 text-secondary"
                } mx-auto flex h-20 w-20 items-center justify-center rounded-2xl`}
              >
                <Icon className="h-10 w-10" />
              </div>
              <div
                className={`${
                  iconColor === "primary" ? "bg-primary/5" : "bg-secondary/5"
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
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {primaryAction && (
              <Button
                asChild
                variant={primaryAction.variant || "default"}
                className="flex-1 gap-2"
                size="lg"
              >
                <Link href={primaryAction.href}>
                  {PrimaryIcon && <PrimaryIcon className="h-4 w-4" />}
                  {primaryAction.label}
                </Link>
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || "outline"}
                asChild
                className="flex-1 gap-2"
                size="lg"
              >
                <Link href={secondaryAction.href}>
                  {SecondaryIcon && <SecondaryIcon className="h-4 w-4" />}
                  {secondaryAction.label}
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
