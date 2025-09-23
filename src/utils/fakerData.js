import { faker } from "@faker-js/faker";

export const generateFakeBooks = (n = 1000) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      Title: faker.lorem.words(faker.number.int({ min: 2, max: 6 })),
      Author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      Genre: faker.music.genre(),
      PublishedYear: faker.number.int({ min: 1900, max: 2025 }).toString(),
      ISBN: faker.string.uuid().slice(0, 13),
    });
  }
  return data;
};
