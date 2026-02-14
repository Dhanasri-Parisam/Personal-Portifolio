import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { addCartItem } from "../utils/cartStorage";

const RestaurantMenu = () => {
  // Get dynamic route parameter
  const { resId } = useParams();
  const [addedIds, setAddedIds] = useState({});
  const [openSectionIndex, setOpenSectionIndex] = useState(0);

  const { restaurant, isLoading, hasError } = useRestaurantMenu(resId);

  if (isLoading || hasError || !restaurant) return <Shimmer />;

  // Extract restaurant info safely
  const restaurantInfo = restaurant?.cards?.[0]?.card?.card?.info || {};

  const {
    name,
    cuisines,
    costForTwoMessage,
    locality,
    avgRating,
    totalRatingsString,
    sla,
  } = restaurantInfo;

  const deliveryTime = sla?.deliveryTime;

  const regularCards =
    restaurant?.cards?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const menuSections = regularCards
    .map((sectionCard) => sectionCard?.card?.card)
    .filter((section) => section?.itemCards?.length)
    .map((section) => ({
      title: section?.title || `Section (${section?.itemCards?.length || 0})`,
      itemCards: section.itemCards,
    }));

  const handleAddToCart = (itemInfo, sectionIndex) => {
    const itemId = `${resId}-${sectionIndex}-${itemInfo?.id}`;
    addCartItem({
      id: itemId,
      itemId: itemInfo?.id,
      name: itemInfo?.name || "Menu Item",
      price: Math.round((itemInfo?.price || itemInfo?.defaultPrice || 0) / 100),
      restaurantId: resId,
      restaurantName: name || "Restaurant",
    });
    setAddedIds((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Restaurant Header */}
      <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
            <p className="mt-1 text-sm text-slate-600">{cuisines?.join(", ")}</p>
            <p className="mt-1 text-sm text-slate-500">{locality}</p>
          </div>

          <div className="w-fit rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-center">
            <h2 className="text-sm font-semibold text-slate-900">{"\u2B50"} {avgRating}</h2>
            <p className="text-xs text-slate-500">{totalRatingsString}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700">
          <div className="rounded-full bg-orange-50 px-3 py-1">{"\u{1F557}"} {deliveryTime} mins</div>
          <div className="rounded-full bg-orange-50 px-3 py-1">{"\u{1F4B5}"} {costForTwoMessage}</div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="mt-6">
        <div className="space-y-3">
          {menuSections.map((section, sectionIndex) => {
            const isOpen = openSectionIndex === sectionIndex;

            return (
              <div key={`${section.title}-${sectionIndex}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenSectionIndex(isOpen ? -1 : sectionIndex)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                  <span className="text-slate-600">{isOpen ? "\u25B2" : "\u25BC"}</span>
                </button>

                {isOpen && (
                  <ul className="space-y-3 border-t border-slate-100 p-4">
                    {section.itemCards.map((item) => {
                      const info = item?.card?.info;
                      const itemId = `${resId}-${sectionIndex}-${info?.id}`;
                      const itemPrice = Math.round((info?.price || info?.defaultPrice || 0) / 100);

                      return (
                        <li key={itemId} className="rounded-2xl border border-slate-200 bg-white p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="truncate text-base font-semibold text-slate-900">{info?.name}</h3>
                              <p className="mt-1 text-sm font-medium text-slate-700">{"\u20B9"} {itemPrice}</p>
                            </div>
                            <button
                              type="button"
                              className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
                              onClick={() => handleAddToCart(info, sectionIndex)}
                            >
                              {addedIds[itemId] ? "Added" : "Add to Cart"}
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RestaurantMenu;
