"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, type FieldArrayPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema } from "@/lib/validations";
import { createTour, updateTour } from "@/actions/tours";
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
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import type { z } from "zod";

type TourFormData = z.infer<typeof tourSchema>;

// Type-safe field array paths
type ItineraryPath = FieldArrayPath<TourFormData> & "itinerary";
type ImagesPath = FieldArrayPath<TourFormData> & "images";

type TourFormProps = {
  tour?: {
    id: number;
    title: string;
    description: string;
    price: string;
    duration: string;
    location: string;
    itinerary: string[];
    images: string[];
    sdgGoals: number[];
    maxCapacity: number | null;
  };
};

const sdgOptions = [
  { value: 11, label: "SDG 11: Sustainable Cities" },
  { value: 12, label: "SDG 12: Responsible Consumption" },
  { value: 15, label: "SDG 15: Life on Land" },
];

export function TourForm({ tour }: TourFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: tour
      ? {
          title: tour.title,
          description: tour.description,
          price: tour.price,
          duration: tour.duration,
          location: tour.location,
          itinerary: tour.itinerary,
          images: tour.images,
          sdgGoals: tour.sdgGoals,
          maxCapacity: tour.maxCapacity || 20,
        }
      : {
          title: "",
          description: "",
          price: "",
          duration: "",
          location: "",
          itinerary: [""],
          images: [""],
          sdgGoals: [],
          maxCapacity: 20,
        },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray<TourFormData, ItineraryPath>({
    control,
    name: "itinerary" as ItineraryPath,
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray<TourFormData, ImagesPath>({
    control,
    name: "images" as ImagesPath,
  });

  const selectedSdgs = watch("sdgGoals") || [];

  const toggleSdg = (sdg: number) => {
    const current = watch("sdgGoals") || [];
    const newSdgs = current.includes(sdg)
      ? current.filter((s) => s !== sdg)
      : [...current, sdg];
    setValue("sdgGoals", newSdgs);
  };

  const onSubmit = async (data: TourFormData) => {
    setIsSubmitting(true);
    try {
      if (tour) {
        await updateTour(tour.id, data);
      } else {
        await createTour(data);
      }
      router.push("/admin/tours");
      router.refresh();
    } catch (error) {
      console.error("Failed to save tour:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title *</FieldLabel>
                  <FieldContent>
                    <Input
                      id="title"
                      {...register("title")}
                      aria-invalid={!!errors.title}
                    />
                    <FieldError errors={[errors.title]} />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Description *</FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="description"
                      rows={6}
                      {...register("description")}
                      aria-invalid={!!errors.description}
                    />
                    <FieldError errors={[errors.description]} />
                    <FieldDescription>
                      At least 50 characters required
                    </FieldDescription>
                  </FieldContent>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="price">Price (£) *</FieldLabel>
                    <FieldContent>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price")}
                        aria-invalid={!!errors.price}
                      />
                      <FieldError errors={[errors.price]} />
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="duration">Duration *</FieldLabel>
                    <FieldContent>
                      <Input
                        id="duration"
                        placeholder="e.g., 3 days"
                        {...register("duration")}
                        aria-invalid={!!errors.duration}
                      />
                      <FieldError errors={[errors.duration]} />
                    </FieldContent>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="location">Location *</FieldLabel>
                  <FieldContent>
                    <Input
                      id="location"
                      {...register("location")}
                      aria-invalid={!!errors.location}
                    />
                    <FieldError errors={[errors.location]} />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="maxCapacity">Max Capacity</FieldLabel>
                  <FieldContent>
                    <Input
                      id="maxCapacity"
                      type="number"
                      {...register("maxCapacity", { valueAsNumber: true })}
                      aria-invalid={!!errors.maxCapacity}
                    />
                    <FieldError errors={[errors.maxCapacity]} />
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itinerary</CardTitle>
              <CardDescription>
                Add day-by-day activities for this tour
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                {itineraryFields.map((field, index) => (
                  <Field key={field.id}>
                    <FieldLabel htmlFor={`itinerary-${index}`}>
                      Day {index + 1}
                    </FieldLabel>
                    <FieldContent>
                      <div className="flex gap-2">
                        <Input
                          id={`itinerary-${index}`}
                          {...register(`itinerary.${index}`)}
                          aria-invalid={!!errors.itinerary?.[index]}
                        />
                        {itineraryFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItinerary(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FieldError errors={[errors.itinerary?.[index]]} />
                    </FieldContent>
                  </Field>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendItinerary("")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Day
                </Button>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                Add image URLs (Unsplash or other sources)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                {imageFields.map((field, index) => (
                  <Field key={field.id}>
                    <FieldLabel htmlFor={`image-${index}`}>
                      Image {index + 1} URL
                    </FieldLabel>
                    <FieldContent>
                      <div className="flex gap-2">
                        <Input
                          id={`image-${index}`}
                          type="url"
                          {...register(`images.${index}`)}
                          aria-invalid={!!errors.images?.[index]}
                        />
                        {imageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FieldError errors={[errors.images?.[index]]} />
                    </FieldContent>
                  </Field>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendImage("")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sustainable Development Goals</CardTitle>
              <CardDescription>
                Select which SDG goals this tour supports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="flex flex-wrap gap-2">
                  {sdgOptions.map((option) => {
                    const isSelected = selectedSdgs.includes(option.value);
                    return (
                      <Badge
                        key={option.value}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleSdg(option.value)}
                      >
                        {option.label}
                      </Badge>
                    );
                  })}
                </div>
                <FieldError errors={[errors.sdgGoals]} />
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : tour
                    ? "Update Tour"
                    : "Create Tour"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/admin/tours")}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
