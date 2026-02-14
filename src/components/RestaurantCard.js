import { IMAGE_CDN_URL, PLACEHOLDER_IMAGE_URL } from "../utils/urlConstants";

const RestaurantCard = ({ resData }) => {
    const {
        cloudinaryImageId,
        name,
        cuisines,
        costForTwo,
        locality,
        areaName,
        avgRating,
        totalRatingsString,
        sla,
    } = resData?.info || {};

    const imgUrl = cloudinaryImageId
        ? `${IMAGE_CDN_URL}${cloudinaryImageId}`
        : PLACEHOLDER_IMAGE_URL;
    const costForTwoMessage = costForTwo || "Price unavailable";
    const location = locality || areaName || "Location unavailable";
    const slaText = sla?.slaString || `${sla?.deliveryTime || "--"} mins`;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <img
                src={imgUrl}
                alt={name || "Restaurant"}
                className="h-40 w-full object-cover"
            />
            <div className="space-y-1 p-3">
                <h3 className="truncate text-base font-semibold text-slate-900">{name}</h3>
                <p className="truncate text-sm text-slate-600">
                    {cuisines?.join(", ") || "Cuisines unavailable"}
                </p>
                <p className="truncate text-xs text-slate-500">{location}</p>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="rounded bg-emerald-600 px-1.5 py-0.5 font-medium text-white">
                        {avgRating || "N/A"} {"\u2605"}
                    </span>
                    <span>{"\u2022"}</span>
                    <span>{slaText}</span>
                </div>
                <p className="text-xs text-slate-500">{totalRatingsString || "No ratings yet"}</p>
                <p className="text-sm font-medium text-slate-800">{costForTwoMessage}</p>
            </div>
        </div>
    );
};

// Higher Order component

// input - RestaurantCard => RestaurantCardPromoted

export const withPromoted = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label>Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}

export default RestaurantCard;
