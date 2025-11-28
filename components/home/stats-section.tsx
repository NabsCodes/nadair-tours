import { FaUsers, FaMapMarkerAlt, FaLeaf, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    value: "10K+",
    label: "Happy Travelers",
    color: "primary",
  },
  {
    icon: FaMapMarkerAlt,
    value: "50+",
    label: "Destinations",
    color: "secondary",
  },
  {
    icon: FaLeaf,
    value: "100%",
    label: "Eco-Certified",
    color: "primary",
  },
  {
    icon: FaStar,
    value: "4.9",
    label: "Average Rating",
    color: "secondary",
  },
];

export function StatsSection() {
  return (
    <section className="border-border bg-muted/20 border-y py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPrimary = stat.color === "primary";
            return (
              <div
                key={index}
                className="group flex flex-col items-center gap-4 text-center"
              >
                <div
                  className={`${
                    isPrimary
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                      : "bg-secondary/10 text-secondary group-hover:bg-secondary/20"
                  } flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <div
                    className={`${
                      isPrimary ? "text-primary" : "text-secondary"
                    } font-heading text-3xl font-bold md:text-4xl`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    {stat.label}
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
