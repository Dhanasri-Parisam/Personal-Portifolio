import { useMemo, useState } from "react";

const LOCATIONS = [
  {
    id: "vizag",
    name: "Visakhapatnam",
    address: "Beach Road, Visakhapatnam, Andhra Pradesh",
    mapQuery: "Beach Road, Visakhapatnam, Andhra Pradesh",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    address: "Hitech City, Hyderabad, Telangana",
    mapQuery: "Hitech City, Hyderabad, Telangana",
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    address: "Koramangala, Bengaluru, Karnataka",
    mapQuery: "Koramangala, Bengaluru, Karnataka",
  },
];

const Contact = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(LOCATIONS[0].id);

  const selectedLocation = useMemo(
    () => LOCATIONS.find((location) => location.id === selectedLocationId) || LOCATIONS[0],
    [selectedLocationId]
  );

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedLocation.mapQuery
  )}&z=14&output=embed`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-6 overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm lg:grid-cols-[320px_1fr] lg:p-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
          <p className="mt-2 text-sm text-slate-600">Select a branch to view it on the live map.</p>

          <div className="mt-4 space-y-2">
            {LOCATIONS.map((location) => {
              const isActive = location.id === selectedLocation.id;
              return (
                <button
                  key={location.id}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-orange-300 bg-orange-50 text-orange-700"
                      : "border-slate-200 text-slate-700 hover:border-orange-200 hover:bg-orange-50"
                  }`}
                  onClick={() => setSelectedLocationId(location.id)}
                  type="button"
                >
                  {location.name}
                </button>
              );
            })}
          </div>

          <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {selectedLocation.address}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <iframe
            className="h-[380px] w-full"
            title={`${selectedLocation.name} location map`}
            src={mapUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
