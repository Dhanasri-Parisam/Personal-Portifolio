import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_API_URL } from "../utils/urlConstants";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withPromoted } from "./RestaurantCard"; 

const Body = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [mindItems, setMindItems] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showTopRated, setShowTopRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const RestaurantCardWithPromotedLabel = withPromoted(RestaurantCard);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setHasError(false);
      const apiCandidates = [
        RESTAURANT_LIST_API_URL,
        `https://corsproxy.io/?${encodeURIComponent(RESTAURANT_LIST_API_URL)}`,
      ];

      console.log(restaurantData);

      let restaurants = [];
      let categories = [];

      for (const apiUrl of apiCandidates) {
        try {
          const response = await fetch(apiUrl);
          const json = await response.json();
          const cards = json?.data?.cards || [];

          categories =
            cards.find((card) => card?.card?.card?.imageGridCards?.info)?.card?.card
              ?.imageGridCards?.info ||
            cards.find((card) => card?.card?.card?.gridElements?.infoWithStyle?.info)
              ?.card?.card?.gridElements?.infoWithStyle?.info ||
            [];

          restaurants =
            cards.find(
              (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

          if (restaurants.length > 0) break;
        } catch (_) {
          // Try next endpoint candidate.
        }
      }

      setRestaurantData(restaurants);
      setFilteredRestaurants(restaurants);
      setMindItems(categories);
      setHasError(restaurants.length === 0);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (text, topRated) => {
    let next = restaurantData;

    if (topRated) {
      next = next.filter((res) => Number(res?.info?.avgRating) > 4);
    }

    if (text.trim()) {
      next = next.filter((res) =>
        res?.info?.name?.toLowerCase().includes(text.toLowerCase())
      );
    }

    setFilteredRestaurants(next);
  };
  const { isOnline } = useOnlineStatus();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6">
      {!isOnline && (
        <h2 className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          You are offline. Please check your internet connection.
        </h2>
      )}
      {hasError && (
        <h2 className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
          Unable to load restaurants right now.
        </h2>
      )}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            className="rounded-full border border-orange-300 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100"
            onClick={() => {
              const nextState = !showTopRated;
              setShowTopRated(nextState);
              applyFilters(searchText, nextState);
            }}
          >
            {showTopRated ? "Show All" : "Top Rated Restaurants"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            className="w-full rounded-full border border-orange-300 bg-orange-50 px-4 py-2 text-sm text-orange-700 placeholder:text-orange-500 focus:outline-none sm:w-72"
            type="text"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => {
              const text = e.target.value;
              setSearchText(text);
              applyFilters(text, showTopRated);
            }}
          />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
            onClick={() => applyFilters(searchText, showTopRated)}
            aria-label="Search restaurants"
            type="button"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm7.65 11.74 2.85 2.85-1.41 1.41-2.85-2.85 1.41-1.41z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {mindItems.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-slate-800">What's on your mind?</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {mindItems.map((item, index) => {
              const imageId = item?.imageId || item?.image?.id;
              const name = item?.action?.text || item?.accessibility?.altText || "Item";
              const imageUrl = imageId
                ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`
                : "";

              return (
                <div className="flex w-24 flex-none flex-col items-center" key={`${name}-${index}`}>
                  {imageUrl ? (
                    <img
                      className="h-20 w-20 rounded-full border border-gray-200 object-cover shadow-sm"
                      src={imageUrl}
                      alt={name}
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-800">Top restaurant chains</h2>
        {isLoading ? (
          <Shimmer />
        ) : (
          <div className="grid grid-cols-1 gap-4 pb-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants.map((restaurant) => {
              const isPromoted = Boolean(
                restaurant?.info?.promoted ||
                  restaurant?.info?.ribbon?.text
                    ?.toLowerCase?.()
                    .includes("promot") ||
                  restaurant?.info?.ribbon?.some?.((r) =>
                    `${r?.type ?? ""} ${r?.text ?? ""}`
                      .toLowerCase()
                      .includes("promot")
                  ) ||
                  restaurant?.info?.badges?.imageBadges?.some?.((b) =>
                    `${b?.description ?? ""} ${b?.imageId ?? ""} ${b?.text ?? ""}`
                      .toLowerCase()
                      .includes("promot")
                  )
              );

              return (
                <Link
                  className="block"
                  to={`/restaurant/${restaurant?.info?.id}`}
                  key={restaurant?.info?.id}
                >
                  {isPromoted ? (
                    <RestaurantCardWithPromotedLabel resData={restaurant} />
                  ) : (
                    <RestaurantCard resData={restaurant} />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Body;
