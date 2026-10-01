import type { Metadata } from "next";
import CatalogView from "./CatalogView";

export const metadata: Metadata = {
  title: "Catalog — OmniStore",
  description: "Faceted browsing across the OmniStore mock PIM-backed B2B product catalog.",
};

export default function CatalogPage() {
  return <CatalogView />;
}
