import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Edinburgh",
    rating: 5,
    text: "An absolutely incredible experience! The tour was well-organized, sustainable, and our guide was knowledgeable about every aspect of Scottish culture and nature.",
    color: "primary",
  },
  {
    name: "James Anderson",
    location: "Glasgow",
    rating: 5,
    text: "Best tour company in Scotland! They truly care about the environment and local communities. Highly recommend to anyone looking for authentic experiences.",
    color: "secondary",
  },
  {
    name: "Emma Thompson",
    location: "London",
    rating: 5,
    text: "The perfect blend of adventure and sustainability. We learned so much about Scotland's heritage while supporting local businesses. Will definitely book again!",
    color: "primary",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-border bg-muted/30 border-y py-20">
      <div className="container mx-auto space-y-12 px-4">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2">
            <span className="bg-primary h-px w-12" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Testimonials
            </span>
            <span className="bg-primary h-px w-12" />
          </div>
          <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            What Our Travelers Say
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Don't just take our word for it - hear from travelers who've
            experienced Scotland with us
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const isPrimary = testimonial.color === "primary";
            return (
              <div
                key={index}
                className={`${
                  isPrimary
                    ? "border-primary/20 bg-primary/5"
                    : "border-secondary/20 bg-secondary/5"
                } group relative rounded-xl border p-6 transition-all duration-300 hover:shadow-lg`}
              >
                <div
                  className={`${
                    isPrimary ? "text-primary" : "text-secondary"
                  } mb-4`}
                >
                  <FaQuoteLeft className="h-6 w-6 opacity-50" />
                </div>
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        isPrimary ? "text-primary" : "text-secondary"
                      } h-4 w-4 fill-current`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-border border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
