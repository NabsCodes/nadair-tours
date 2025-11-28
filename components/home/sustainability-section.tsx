import { FaLeaf, FaCity, FaRecycle, FaMountain } from "react-icons/fa";

const sdgGoals = [
  {
    number: "11",
    title: "Sustainable Cities",
    description: "Supporting local economies and preserving cultural heritage",
    icon: FaCity,
  },
  {
    number: "12",
    title: "Responsible Consumption",
    description: "Eco-friendly practices and waste reduction",
    icon: FaRecycle,
  },
  {
    number: "15",
    title: "Life on Land",
    description: "Protecting biodiversity and natural habitats",
    icon: FaMountain,
  },
];

export function SustainabilitySection() {
  return (
    <section
      id="sustainability"
      className="border-border bg-muted/30 relative border-y py-20"
    >
      <div className="relative container mx-auto space-y-12 px-4">
        <div className="space-y-4 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="bg-secondary/10 text-secondary flex h-12 w-12 items-center justify-center rounded-xl">
              <FaLeaf className="h-6 w-6" />
            </div>
            <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Our Commitment
            </h2>
          </div>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
            N'adair Tours is dedicated to sustainable tourism that aligns with
            the UN Sustainable Development Goals, ensuring our adventures
            benefit both travelers and the communities we visit.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
          {sdgGoals.map((goal, index) => {
            const Icon = goal.icon;
            const isPrimary = index % 2 === 0;
            return (
              <div
                key={goal.number}
                className="group relative text-center"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`border-border bg-background mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border transition-colors ${
                    isPrimary
                      ? "group-hover:border-primary/50 group-hover:bg-primary/5"
                      : "group-hover:border-secondary/50 group-hover:bg-secondary/5"
                  }`}
                >
                  <Icon
                    className={`text-muted-foreground h-8 w-8 transition-colors ${
                      isPrimary
                        ? "group-hover:text-primary"
                        : "group-hover:text-secondary"
                    }`}
                  />
                </div>
                <div className="space-y-3">
                  <h3
                    className={`font-heading text-4xl font-bold transition-colors ${
                      isPrimary
                        ? "text-primary/20 group-hover:text-primary"
                        : "text-secondary/20 group-hover:text-secondary"
                    }`}
                  >
                    {goal.number}
                  </h3>
                  <h4 className="text-foreground text-lg font-semibold">
                    {goal.title}
                  </h4>
                  <p className="text-muted-foreground mx-auto max-w-[250px] text-sm leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
