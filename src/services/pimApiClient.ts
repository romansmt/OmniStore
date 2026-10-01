import type { Product, ProductFilters } from "@/types/product";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p-1001",
    sku: "IH-4471-SS",
    name: "Stainless Steel Mounting Bracket, Heavy Duty",
    category: "Industrial Hardware",
    price: 24.5,
    stockStatus: "In Stock",
    attributes: { material: "304 Stainless Steel", loadRating: "250kg", finish: "Brushed" },
    imageUrl: "https://picsum.photos/seed/ih-4471/480/360",
    description:
      "Corrosion-resistant mounting bracket rated for high-load industrial fixture installation.",
  },
  {
    id: "p-1002",
    sku: "EC-2209-RELAY",
    name: "24V DC Industrial Relay Module",
    category: "Electrical Components",
    price: 12.75,
    stockStatus: "In Stock",
    attributes: { voltage: "24V DC", contactRating: "10A", mounting: "DIN Rail" },
    imageUrl: "https://picsum.photos/seed/ec-2209/480/360",
    description: "DIN-rail relay module for PLC-driven switching in control cabinets.",
  },
  {
    id: "p-1003",
    sku: "NW-8834-SW24",
    name: "24-Port Managed Gigabit Switch",
    category: "Networking",
    price: 389.0,
    stockStatus: "Low Stock",
    attributes: { ports: 24, throughput: "52 Gbps", compatibility: "802.3af PoE+" },
    imageUrl: "https://picsum.photos/seed/nw-8834/480/360",
    description: "Rack-mountable managed switch with PoE+ for enterprise network closets.",
  },
  {
    id: "p-1004",
    sku: "SE-1190-HH",
    name: "ANSI Class 3 Hard Hat, Vented",
    category: "Safety Equipment",
    price: 18.2,
    stockStatus: "In Stock",
    attributes: { standard: "ANSI Z89.1 Class C", color: "Hi-Vis Orange", weight: "380g" },
    imageUrl: "https://picsum.photos/seed/se-1190/480/360",
    description: "Lightweight vented hard hat compliant with ANSI Class C electrical standards.",
  },
  {
    id: "p-1005",
    sku: "FS-3302-M8",
    name: "M8 x 40mm Hex Bolt, Zinc-Plated (Box of 100)",
    category: "Fasteners",
    price: 9.99,
    stockStatus: "In Stock",
    attributes: { thread: "M8 x 1.25", length: "40mm", finish: "Zinc Plated", gradeRating: "8.8" },
    imageUrl: "https://picsum.photos/seed/fs-3302/480/360",
    description: "Grade 8.8 hex bolts for structural and machine assembly applications.",
  },
  {
    id: "p-1006",
    sku: "PT-5567-DRV",
    name: "Cordless Impact Driver, Brushless 18V",
    category: "Power Tools",
    price: 159.0,
    stockStatus: "Out of Stock",
    attributes: { voltage: "18V", torque: "180Nm", batteryIncluded: "No" },
    imageUrl: "https://picsum.photos/seed/pt-5567/480/360",
    description: "Brushless impact driver body for high-torque fastening on production lines.",
  },
  {
    id: "p-1007",
    sku: "EC-2311-PSU",
    name: "Industrial DIN Rail Power Supply, 240W",
    category: "Electrical Components",
    price: 64.4,
    stockStatus: "Low Stock",
    attributes: { voltage: "24V DC Output", wattage: "240W", efficiency: "92%" },
    imageUrl: "https://picsum.photos/seed/ec-2311/480/360",
    description: "Compact switch-mode power supply for automation and control cabinets.",
  },
  {
    id: "p-1008",
    sku: "NW-8901-CAB",
    name: "Cat6A Shielded Patch Cable, 3m",
    category: "Networking",
    price: 7.6,
    stockStatus: "In Stock",
    attributes: { category: "Cat6A", shielding: "S/FTP", length: "3m", compatibility: "10GBase-T" },
    imageUrl: "https://picsum.photos/seed/nw-8901/480/360",
    description: "Shielded patch cable for 10-gigabit runs in dense server room environments.",
  },
  {
    id: "p-1009",
    sku: "SE-1244-GLV",
    name: "Cut-Resistant Work Gloves, Level A4",
    category: "Safety Equipment",
    price: 11.3,
    stockStatus: "In Stock",
    attributes: { standard: "ANSI A4", material: "HPPE Blend", size: "L" },
    imageUrl: "https://picsum.photos/seed/se-1244/480/360",
    description: "High-dexterity cut-resistant gloves for metal fabrication and glass handling.",
  },
  {
    id: "p-1010",
    sku: "IH-4520-CAST",
    name: "Cast Iron Pipe Flange, 4-inch",
    category: "Industrial Hardware",
    price: 42.15,
    stockStatus: "Low Stock",
    attributes: { material: "Cast Iron", diameter: "4in", pressureRating: "150 PSI" },
    imageUrl: "https://picsum.photos/seed/ih-4520/480/360",
    description: "ASME-rated pipe flange for industrial fluid and gas distribution systems.",
  },
];

function matchesFilters(product: Product, filters?: ProductFilters): boolean {
  if (!filters) return true;

  if (filters.categories && filters.categories.length > 0) {
    if (!filters.categories.includes(product.category)) return false;
  }

  if (filters.stockStatus && product.stockStatus !== filters.stockStatus) {
    return false;
  }

  if (filters.minPrice !== undefined && product.price < filters.minPrice) {
    return false;
  }

  if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
    return false;
  }

  if (filters.query && filters.query.trim().length > 0) {
    const needle = filters.query.trim().toLowerCase();
    const haystack = [
      product.name,
      product.sku,
      product.category,
      product.description,
      ...Object.values(product.attributes).map(String),
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }

  return true;
}

const SIMULATED_LATENCY_MS = 220;

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  return MOCK_PRODUCTS.filter((product) => matchesFilters(product, filters));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  return MOCK_PRODUCTS.find((product) => product.id === id);
}

export function getAvailableCategories(): Product["category"][] {
  return Array.from(new Set(MOCK_PRODUCTS.map((product) => product.category)));
}

export function getPriceBounds(): { min: number; max: number } {
  const prices = MOCK_PRODUCTS.map((product) => product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
