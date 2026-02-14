import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
        <div className="grid gap-8 bg-gradient-to-br from-orange-50 via-amber-50 to-white p-6 md:grid-cols-2 md:p-10">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
              About Us
            </span>
            <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              Cravings solved faster, fresher, and smarter.
            </h1>
            <p className="text-sm leading-7 text-slate-600">
              We are building a clean food-ordering experience where discovery is quick, menus are
              simple, and checkout feels effortless. This project is focused on practical React and
              product-level UI thinking.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                Fast Delivery
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                Real-Time Menus
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                Cart + Checkout Flow
              </span>
            </div>
            <Link
              to="/about/profile"
              className="inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
            >
              Show My Profile
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
              <p className="text-xs uppercase tracking-wide text-orange-600">Mission</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Deliver restaurant-style browsing with smooth interactions and reliable state flow.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
              <p className="text-xs uppercase tracking-wide text-orange-600">Stack</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                React, Router, Tailwind, and API fallback patterns for resilient UI.
              </p>
            </div>
            <div className="sm:col-span-2 rounded-2xl bg-slate-900 p-6 text-slate-100">
              <p className="text-xs uppercase tracking-wide text-orange-300">Current Focus</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Improving navigation quality, route-level UI polish, and cart experience from mock
                menu data.
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default About;
