const GROCERY_SECTIONS = [
  {
    id: "fruits",
    title: "Fresh Fruits",
    items: [
      { name: "Banana", price: 49, unit: "1 dozen" },
      { name: "Apple", price: 129, unit: "1 kg" },
      { name: "Pomegranate", price: 159, unit: "1 kg" },
      { name: "Papaya", price: 59, unit: "1 pc" },
      { name: "Orange", price: 119, unit: "1 kg" },
      { name: "Watermelon", price: 89, unit: "1 pc" },
    ],
  },
  {
    id: "vegetables",
    title: "Daily Vegetables",
    items: [
      { name: "Tomato", price: 39, unit: "1 kg" },
      { name: "Potato", price: 35, unit: "1 kg" },
      { name: "Onion", price: 45, unit: "1 kg" },
      { name: "Carrot", price: 54, unit: "500 g" },
      { name: "Capsicum", price: 72, unit: "500 g" },
      { name: "Beans", price: 59, unit: "500 g" },
    ],
  },
  {
    id: "dairy",
    title: "Dairy & Breakfast",
    items: [
      { name: "Milk", price: 30, unit: "500 ml" },
      { name: "Curd", price: 35, unit: "400 g" },
      { name: "Butter", price: 58, unit: "100 g" },
      { name: "Eggs", price: 69, unit: "12 pcs" },
      { name: "Bread", price: 40, unit: "1 pack" },
      { name: "Paneer", price: 95, unit: "200 g" },
    ],
  },
];

const Grocery = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">Grocery Store</h1>
        <p className="mt-2 text-sm text-slate-600">
          Choose your item from our Grocery.
        </p>
      </div>

      {GROCERY_SECTIONS.map((section) => (
        <article key={section.id}>
          <h2 className="mb-4 text-xl font-bold text-slate-900">{section.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {section.items.map((item) => (
              <div
                key={`${section.id}-${item.name}`}
                className="w-52 flex-none rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-emerald-100 to-lime-50" />
                <h3 className="truncate text-base font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.unit}</p>
                <p className="mt-2 text-sm font-bold text-slate-900">{"\u20B9"} {item.price}</p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-emerald-700"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
};

export default Grocery;
