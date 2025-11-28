"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStickyNote,
  FaSpinner,
} from "react-icons/fa";
import type { z } from "zod";
import { cn } from "@/lib/utils";

type BookingFormData = z.infer<typeof bookingSchema>;

type BookingFormProps = {
  onSubmit: (data: BookingFormData) => Promise<void>;
  isSubmitting?: boolean;
};

export function BookingForm({
  onSubmit,
  isSubmitting = false,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, isValid },
    trigger,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const bookingDate = useWatch({ control, name: "bookingDate" });
  const customerName = useWatch({ control, name: "customerName" });
  const customerEmail = useWatch({ control, name: "customerEmail" });
  const customerPhone = useWatch({ control, name: "customerPhone" });
  const customerAddress = useWatch({ control, name: "customerAddress" });

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">
          Customer Information
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          We'll use this information to confirm your booking and send you
          updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="customerName"
                className="text-base font-medium"
              >
                Full Name <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <FaUser
                    className={cn(
                      "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors",
                      errors.customerName
                        ? "text-destructive"
                        : customerName
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  />
                  <Input
                    id="customerName"
                    className={cn(
                      "h-11 pl-10",
                      errors.customerName && "border-destructive",
                    )}
                    placeholder="John Doe"
                    autoComplete="name"
                    {...register("customerName", {
                      onBlur: () => trigger("customerName"),
                    })}
                    aria-invalid={!!errors.customerName}
                  />
                </div>
                <FieldError errors={[errors.customerName]} />
                <FieldDescription>
                  Enter your full legal name as it appears on your ID
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="customerEmail"
                className="text-base font-medium"
              >
                Email Address <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <FaEnvelope
                    className={cn(
                      "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors",
                      errors.customerEmail
                        ? "text-destructive"
                        : customerEmail
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  />
                  <Input
                    id="customerEmail"
                    type="email"
                    className={cn(
                      "h-11 pl-10",
                      errors.customerEmail && "border-destructive",
                    )}
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                    {...register("customerEmail", {
                      onBlur: () => trigger("customerEmail"),
                    })}
                    aria-invalid={!!errors.customerEmail}
                  />
                </div>
                <FieldError errors={[errors.customerEmail]} />
                <FieldDescription>
                  We'll send your booking confirmation to this email
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="customerPhone"
                className="text-base font-medium"
              >
                Phone Number <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <FaPhone
                    className={cn(
                      "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors",
                      errors.customerPhone
                        ? "text-destructive"
                        : customerPhone
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  />
                  <Input
                    id="customerPhone"
                    type="tel"
                    className={cn(
                      "h-11 pl-10",
                      errors.customerPhone && "border-destructive",
                    )}
                    placeholder="07123456789"
                    autoComplete="tel"
                    {...register("customerPhone", {
                      onBlur: () => trigger("customerPhone"),
                    })}
                    aria-invalid={!!errors.customerPhone}
                  />
                </div>
                <FieldError errors={[errors.customerPhone]} />
                <FieldDescription>
                  Format: 10-15 digits (e.g., 07123456789 or +44 7123 456789)
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="customerAddress"
                className="text-base font-medium"
              >
                Address <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <FaMapMarkerAlt
                    className={cn(
                      "absolute top-3 left-3 h-4 w-4 transition-colors",
                      errors.customerAddress
                        ? "text-destructive"
                        : customerAddress
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  />
                  <Textarea
                    id="customerAddress"
                    className={cn(
                      "min-h-20 pt-3 pl-10",
                      errors.customerAddress && "border-destructive",
                    )}
                    placeholder="123 Main Street, Edinburgh, EH1 1AA, Scotland"
                    autoComplete="street-address"
                    {...register("customerAddress", {
                      onBlur: () => trigger("customerAddress"),
                    })}
                    aria-invalid={!!errors.customerAddress}
                  />
                </div>
                <FieldError errors={[errors.customerAddress]} />
                <FieldDescription>
                  Include street address, city, and postal code
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="bookingDate"
                className="text-base font-medium"
              >
                Booking Date <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-11 w-full justify-start text-left font-normal",
                        errors.bookingDate && "border-destructive",
                        !bookingDate && "text-muted-foreground",
                      )}
                      type="button"
                    >
                      <FaCalendarAlt
                        className={cn(
                          "mr-2 h-4 w-4",
                          bookingDate
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      />
                      {bookingDate ? (
                        format(bookingDate, "EEEE, MMMM d, yyyy")
                      ) : (
                        <span>Select your preferred tour date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={bookingDate}
                      onSelect={(date) => {
                        if (date) {
                          setValue("bookingDate", date, {
                            shouldValidate: true,
                          });
                        }
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FieldError errors={[errors.bookingDate]} />
                <FieldDescription>
                  Select a date today or in the future for your tour
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="notes" className="text-base font-medium">
                Additional Notes (optional)
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <FaStickyNote
                    className={cn(
                      "absolute top-3 left-3 h-4 w-4 transition-colors",
                      customerAddress
                        ? "text-secondary"
                        : "text-muted-foreground",
                    )}
                  />
                  <Textarea
                    id="notes"
                    className="min-h-24 pt-3 pl-10"
                    placeholder="Any special requests, dietary requirements, accessibility needs, or questions..."
                    {...register("notes")}
                  />
                </div>
                <FieldDescription>
                  Optional: Let us know if you have any special requirements or
                  questions
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>

          <CardFooter className="border-t-border border-t p-0">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting || !isDirty || !isValid}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Booking"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
