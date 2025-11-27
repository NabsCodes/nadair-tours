"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { CalendarIcon } from "lucide-react";
import type { z } from "zod";
import { CardFooter } from "@/components/ui/card";

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
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const bookingDate = watch("bookingDate");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>
          We'll use this information to confirm your booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="customerName">Full Name *</FieldLabel>
              <FieldContent>
                <Input
                  id="customerName"
                  {...register("customerName")}
                  aria-invalid={!!errors.customerName}
                />
                <FieldError errors={[errors.customerName]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="customerEmail">Email *</FieldLabel>
              <FieldContent>
                <Input
                  id="customerEmail"
                  type="email"
                  {...register("customerEmail")}
                  aria-invalid={!!errors.customerEmail}
                />
                <FieldError errors={[errors.customerEmail]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="customerPhone">Phone *</FieldLabel>
              <FieldContent>
                <Input
                  id="customerPhone"
                  type="tel"
                  {...register("customerPhone")}
                  aria-invalid={!!errors.customerPhone}
                />
                <FieldError errors={[errors.customerPhone]} />
                <FieldDescription>
                  Format: 10-15 digits (e.g., 07123456789)
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="customerAddress">Address *</FieldLabel>
              <FieldContent>
                <Textarea
                  id="customerAddress"
                  {...register("customerAddress")}
                  aria-invalid={!!errors.customerAddress}
                />
                <FieldError errors={[errors.customerAddress]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="bookingDate">Booking Date *</FieldLabel>
              <FieldContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      type="button"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingDate ? (
                        format(bookingDate, "PPP")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={bookingDate}
                      onSelect={(date) => {
                        if (date) setValue("bookingDate", date);
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FieldError errors={[errors.bookingDate]} />
                <FieldDescription>
                  Select a date in the future for your tour
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="notes">Additional Notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Any special requests or requirements..."
                />
                <FieldDescription>
                  Optional: Let us know if you have any special requirements
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Complete Booking"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
