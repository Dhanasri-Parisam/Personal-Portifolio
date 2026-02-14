import { useEffect, useState } from "react";
import { FOODFIRE_MENU_API_URL } from "./urlConstants";
import SWIGGY_MENU_MOCK from "./mockdata";

const createUniqueMockItems = ({
  count,
  sectionPrefix,
  baseItems,
  startId,
  startPrice,
  priceStep,
}) => {
  const safeBaseItems = baseItems?.length ? baseItems : ["Special Item"];

  return Array.from({ length: count }, (_, index) => {
    const baseName = safeBaseItems[index % safeBaseItems.length]?.name || "Special Item";
    return {
      card: {
        info: {
          id: String(startId + index),
          name: `${sectionPrefix} ${baseName} ${index + 1}`,
          price: (startPrice + index * priceStep) * 100,
        },
      },
    };
  });
};

const buildMockCategoryCards = (restaurant) => {
  const recommendedItems = createUniqueMockItems({
    count: 10,
    sectionPrefix: "Chef's",
    baseItems: restaurant.menu,
    startId: 1000,
    startPrice: 119,
    priceStep: 12,
  });

  const southIndianItems = createUniqueMockItems({
    count: 22,
    sectionPrefix: "South Indian",
    baseItems: restaurant.menu,
    startId: 2000,
    startPrice: 89,
    priceStep: 8,
  });

  const tiffinItems = createUniqueMockItems({
    count: 6,
    sectionPrefix: "Tiffin",
    baseItems: restaurant.menu,
    startId: 3000,
    startPrice: 69,
    priceStep: 10,
  });

  return [
    {
      card: {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
          title: "Recomended (10)",
          itemCards: recommendedItems,
        },
      },
    },
    {
      card: {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
          title: "South Indian (22)",
          itemCards: southIndianItems,
        },
      },
    },
    {
      card: {
        card: {
          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
          title: "South Indian Tiffins (6)",
          itemCards: tiffinItems,
        },
      },
    },
  ];
};

const formatMockRestaurantAsSwiggyData = (restaurant) => {
  if (!restaurant) return null;

  const categoryCards = buildMockCategoryCards(restaurant);

  return {
    cards: [
      {
        card: {
          card: {
            info: {
              name: restaurant.name,
              cuisines: restaurant.cuisines || [],
              costForTwoMessage: restaurant.costForTwo,
              locality: "Demo Location",
              avgRating: restaurant.avgRating,
              totalRatingsString: `${restaurant.avgRating} ratings`,
              sla: {
                deliveryTime: restaurant?.sla?.deliveryTime || 30,
              },
            },
          },
        },
      },
      {},
      {
        groupedCard: {
          cardGroupMap: {
            REGULAR: {
              cards: [{}, {}, {}, ...categoryCards],
            },
          },
        },
      },
    ],
  };
};

const useRestaurantMenu = (resId) => {
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getStableMockIndex = (id) => {
      if (!SWIGGY_MENU_MOCK.length) return 0;
      const text = String(id || "");
      let hash = 0;

      for (let i = 0; i < text.length; i++) {
        hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
      }

      return hash % SWIGGY_MENU_MOCK.length;
    };

    const getMockMenuData = () => {
      const matchedRestaurant =
        SWIGGY_MENU_MOCK.find((item) => String(item.id) === String(resId)) ||
        SWIGGY_MENU_MOCK[getStableMockIndex(resId)];
      return formatMockRestaurantAsSwiggyData(matchedRestaurant);
    };

    const fetchRestaurantInfo = async () => {
      try {
        setHasError(false);
        setIsLoading(true);

        const response = await fetch(FOODFIRE_MENU_API_URL + resId);
        if (response.status === 404) {
          setRestaurant(getMockMenuData());
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.status}`);
        }

        const json = await response.json();
        setRestaurant(json?.data || getMockMenuData());
      } catch (error) {
        // Keep UI functional even when menu API is unavailable.
        const fallbackData = getMockMenuData();
        if (fallbackData) {
          setRestaurant(fallbackData);
          setHasError(false);
        } else {
          setHasError(true);
          setRestaurant(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (resId) {
      fetchRestaurantInfo();
    }
  }, [resId]);

  return { restaurant, isLoading, hasError };
};

export default useRestaurantMenu;
