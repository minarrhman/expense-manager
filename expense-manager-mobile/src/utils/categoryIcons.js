import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const getCategoryIcon = (category) => {
    const icons = {
        Food: "food",
        Transport: "car",
        Shopping: "cart",
        Bills: "lightning-bolt",
        Utilities: "water",
        Health: "heart-pulse",
        Education: "school",
        Entertainment: "movie-open",
        Salary: "cash",
        Investment: "chart-line",
        Travel: "airplane",
        Rent: "home",
        Grocery: "basket",
        Gift: "gift",
        Freelance: "laptop",
    };

    return icons[category] || "tag";
};

export default MaterialCommunityIcons;