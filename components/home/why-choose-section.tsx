import { FaShieldAlt, FaHeart, FaUsers, FaAward } from "react-icons/fa";

const features = [
  {
    icon: FaShieldAlt,
    title: "Eco-Certified",
    description:
      "All our tours are certified sustainable and aligned with UN SDG goals",
    color: "primary",
  },
  {
    icon: FaHeart,
    title: "Community First",
    description:
      "Supporting local communities and preserving cultural heritage",
    color: "secondary",
  },
  {
    icon: FaUsers,
    title: "Small Groups",
    description:
      "Intimate experiences with small group sizes for personalized attention",
    color: "primary",
  },
  {
    icon: FaAward,
    title: "Expert Guides",
    description:
      "Local guides with deep knowledge of Scotland's history and nature",
    color: "secondary",
  },
];

export function WhyChooseSection() {
  return (
    <section className="container mx-auto space-y-12 px-4 py-20">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="bg-secondary h-px w-12" />
          <span className="text-secondary text-sm font-semibold tracking-wider uppercase">
            Why Choose Us
          </span>
          <span className="bg-secondary h-px w-12" />
        </div>
        <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Your Trusted Travel Partner
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Experience Scotland with confidence, knowing every detail is crafted
          with sustainability and community in mind
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isPrimary = feature.color === "primary";
          return (
            <div
              key={index}
              className="group border-border bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div
                className={`${
                  isPrimary
                    ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                    : "bg-secondary/10 text-secondary group-hover:bg-secondary/20"
                } mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
