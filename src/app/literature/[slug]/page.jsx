"use client";
import { useParams } from "next/navigation";
import Ramayana from "../../pages/Ramayana";
import BhagavadGita from "../../pages/BhagavadGita";
import Mahabharat from "../../pages/Mahabharat";
import Vedas from "../../pages/Vedas";

export default function LiteraturePage() {
  const params = useParams();
  const slug = params?.slug;

  // Render the appropriate component based on the slug
  switch(slug) {
    case 'ramayana':
      return <Ramayana />;
    case 'bhagavad-gita':
      return <BhagavadGita />;
    case 'mahabharat':
      return <Mahabharat />;
    case 'vedas':
      return <Vedas />;
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Literature not found
            </h1>
            <a
              href="/literature"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Back to Literature
            </a>
          </div>
        </div>
      );
  }
}

