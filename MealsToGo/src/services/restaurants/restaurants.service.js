import camelize from "camelize";
import { mocks, mockImages } from "./mock";

export const restaurantsRequest = async (location) => {
  return new Promise((resolve, reject) => {
    const restaurantsMock = mocks[location];

    if (!restaurantsMock) {
      reject("No restaurants found in this location :(");
    }

    resolve(restaurantsMock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    //? Alternate way to set random mock images:
    // restaurant.photos = restaurant.photos.map((p) => {
    //   return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    // });

    return {
      ...restaurant,
      photos: restaurant.photos.map((p) => {
        return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
      }),
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
