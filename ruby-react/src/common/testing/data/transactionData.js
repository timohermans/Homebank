import * as faker from 'faker';

export function createTransaction() {
    return {
        id: faker.random.number(),
        date: faker.date.recent().toDateString(),
        payee: faker.random.words(5),
        inflow: faker.finance.amount(0, 100, 2)
    };
}
