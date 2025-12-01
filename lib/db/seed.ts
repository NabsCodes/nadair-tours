import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import { tours, adminUsers } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const sampleTours = [
  {
    title: "Highland Adventure: Glencoe & Ben Nevis",
    description:
      "Embark on a breathtaking journey through Scotland's most iconic landscapes. This tour takes you through the dramatic Glencoe valley, known for its towering peaks and rich history, before ascending Ben Nevis, Britain's highest mountain. Along the way, you'll learn about sustainable highland practices and local conservation efforts.",
    price: "185.00",
    duration: "3 days",
    location: "Scottish Highlands",
    itinerary: [
      "Day 1: Depart Edinburgh, arrive Glencoe, guided valley walk",
      "Day 2: Ben Nevis ascent (guided), summit at 1,345m",
      "Day 3: Fort William town visit, return to Edinburgh",
    ],
    images: [
      "https://images.unsplash.com/photo-1552913902-b2cdb7c04e2b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590507788470-e5c85a1b0c5d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512850692650-a6133ee17d38?w=800&h=600&fit=crop",
    ],
    sdgGoals: [11, 15],
    maxCapacity: 12,
  },
  {
    title: "Isle of Skye: Coastal Wonders",
    description:
      "Discover the magical Isle of Skye, where rugged coastlines meet ancient castles. This eco-friendly tour prioritizes local communities, staying in family-run B&Bs and dining at farm-to-table restaurants. Experience the Old Man of Storr, Fairy Pools, and Dunvegan Castle while supporting sustainable tourism practices.",
    price: "220.00",
    duration: "4 days",
    location: "Isle of Skye",
    itinerary: [
      "Day 1: Ferry to Skye, Portree town orientation",
      "Day 2: Old Man of Storr hike, Fairy Pools swim",
      "Day 3: Dunvegan Castle, local craft workshop",
      "Day 4: Quiraing circular walk, return ferry",
    ],
    images: [
      "https://images.unsplash.com/photo-1539085043514-831e58b1e50e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556552169-9e8f56f5f5f5?w=800&h=600&fit=crop",
    ],
    sdgGoals: [11, 12, 15],
    maxCapacity: 10,
  },
  {
    title: "Edinburgh Heritage Walk",
    description:
      "Explore Edinburgh's UNESCO World Heritage sites on foot, learning about the city's sustainable urban development initiatives. This walking tour covers the Royal Mile, Edinburgh Castle, Holyrood Palace, and Arthur's Seat, with expert guides discussing the city's commitment to sustainable tourism and community engagement.",
    price: "75.00",
    duration: "1 day",
    location: "Edinburgh",
    itinerary: [
      "Morning: Royal Mile & Edinburgh Castle tour",
      "Lunch: Local sustainable restaurant",
      "Afternoon: Holyrood Palace & Arthur's Seat hike",
    ],
    images: [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587186416816-b43e6c0d0f73?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584746084849-44e97e81b64e?w=800&h=600&fit=crop",
    ],
    sdgGoals: [11],
    maxCapacity: 20,
  },
  {
    title: "Loch Ness & Urquhart Castle",
    description:
      "Journey to the legendary Loch Ness and explore the historic ruins of Urquhart Castle. This tour emphasizes responsible wildlife watching and supports local conservation efforts. Learn about the Loch's ecosystem, local legends, and ongoing environmental protection initiatives.",
    price: "95.00",
    duration: "1 day",
    location: "Loch Ness",
    itinerary: [
      "Morning: Depart Edinburgh via Highland scenic route",
      "Midday: Urquhart Castle guided tour",
      "Afternoon: Loch cruise & wildlife spotting",
      "Evening: Return to Edinburgh",
    ],
    images: [
      "https://images.unsplash.com/photo-1585330273913-f5114c6c2f4b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516704010858-e6e31a1e9c2f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604166088142-e2a85f9bada4?w=800&h=600&fit=crop",
    ],
    sdgGoals: [15],
    maxCapacity: 16,
  },
  {
    title: "Cairngorms National Park Wildlife Safari",
    description:
      "Experience Scotland's largest national park on this wildlife-focused safari. Track red deer, golden eagles, and Scottish wildcats with expert naturalist guides. This tour partners with local conservation groups and contributes to habitat restoration projects.",
    price: "160.00",
    duration: "2 days",
    location: "Cairngorms National Park",
    itinerary: [
      "Day 1: Wildlife tracking workshop, afternoon safari drive",
      "Day 2: Dawn bird watching, conservation center visit",
    ],
    images: [
      "https://images.unsplash.com/photo-1610878180933-123728745d22?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&h=600&fit=crop",
    ],
    sdgGoals: [15],
    maxCapacity: 8,
  },
  {
    title: "Stirling Castle & Wallace Monument",
    description:
      "Step back in time at Stirling Castle and the National Wallace Monument. This historical tour explores Scotland's fight for independence while highlighting modern sustainable heritage preservation practices. Learn how historic sites can drive community development and responsible tourism.",
    price: "85.00",
    duration: "1 day",
    location: "Stirling",
    itinerary: [
      "Morning: Stirling Castle guided tour",
      "Lunch: Local heritage café",
      "Afternoon: Wallace Monument climb & exhibits",
    ],
    images: [
      "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551616825-0b1b9d8ebce0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587916181338-06b1e6f87446?w=800&h=600&fit=crop",
    ],
    sdgGoals: [11],
    maxCapacity: 18,
  },
  {
    title: "Orkney Islands: Neolithic Heritage",
    description:
      "Venture north to the Orkney Islands, home to some of Europe's best-preserved Neolithic sites. This archaeological tour includes Skara Brae, Ring of Brodgar, and Maeshowe, emphasizing sustainable island tourism and supporting local artisan communities.",
    price: "280.00",
    duration: "5 days",
    location: "Orkney Islands",
    itinerary: [
      "Day 1: Ferry to Orkney, Kirkwall orientation",
      "Day 2: Skara Brae & Ring of Brodgar",
      "Day 3: Maeshowe & local craft workshop",
      "Day 4: Coastal walk & seabird watching",
      "Day 5: Return journey",
    ],
    images: [
      "https://images.unsplash.com/photo-1585288766827-c3e09fdc36f5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604881991249-3a58cfe6c1c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    ],
    sdgGoals: [11, 12],
    maxCapacity: 12,
  },
  {
    title: "West Highland Way Trekking",
    description:
      "Tackle Scotland's most famous long-distance trail over 4 days. This guided trek covers 95 miles from Milngavie to Fort William, staying in eco-friendly accommodations and supporting local communities along the route. Experience lochs, glens, and mountains while learning about sustainable hiking practices.",
    price: "450.00",
    duration: "5 days",
    location: "West Highland Way",
    itinerary: [
      "Day 1: Milngavie to Drymen (19km)",
      "Day 2: Drymen to Rowardennan (23km)",
      "Day 3: Rowardennan to Inverarnan (22km)",
      "Day 4: Inverarnan to Tyndrum (20km)",
      "Day 5: Tyndrum to Fort William (partial, 15km)",
    ],
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
    sdgGoals: [11, 12, 15],
    maxCapacity: 10,
  },
  {
    title: "St Andrews: Golf & Coastal Heritage",
    description:
      "Discover the home of golf in this cultural tour of St Andrews. Visit the historic Old Course, explore medieval ruins, and walk the coastal paths. This tour highlights sustainable sports tourism and the town's commitment to preserving its unique heritage.",
    price: "120.00",
    duration: "1 day",
    location: "St Andrews",
    itinerary: [
      "Morning: Old Course tour & British Golf Museum",
      "Lunch: Sustainable seafood restaurant",
      "Afternoon: St Andrews Cathedral ruins, coastal walk",
    ],
    images: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593786481405-d0e44e5e85e1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    sdgGoals: [11],
    maxCapacity: 15,
  },
  {
    title: "Whisky Trail: Speyside Distilleries",
    description:
      "Taste Scotland's finest single malts on this Speyside whisky tour. Visit four traditional distilleries, learn about sustainable production methods, and support family-run operations. Includes tastings, cooper demonstrations, and insights into the whisky industry's environmental initiatives.",
    price: "175.00",
    duration: "2 days",
    location: "Speyside",
    itinerary: [
      "Day 1: Glenfiddich & Macallan distillery tours",
      "Day 2: Glenlivet & Balvenie tours, cooper workshop",
    ],
    images: [
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1628952405168-3c0e46dcdc5d?w=800&h=600&fit=crop",
    ],
    sdgGoals: [12],
    maxCapacity: 12,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create admin user if it doesn't exist
    const [existingAdmin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, "admin"))
      .limit(1);

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await db.insert(adminUsers).values({
        username: "admin",
        password: hashedPassword,
        email: "admin@nadair-tours.com",
      });
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Check if tours exist
    const existingTours = await db.select().from(tours).limit(1);

    if (existingTours.length === 0) {
      await db.insert(tours).values(sampleTours);
      console.log(`✅ ${sampleTours.length} tours created`);
    } else {
      console.log("ℹ️  Tours already exist, skipping tour seed");
    }

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("✨ Seed complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seed failed:", error);
    process.exit(1);
  });
