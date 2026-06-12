import { test as base, expect } from '@playwright/test';

let counter = 0;

const test = base.extend<{ counterFixture: number }>({
    counterFixture: [async ({ }, use) => {
        counter++;
        await use(counter);
    },
    {scope: 'worker'}]
})

// For {scope: 'worker'}], logged 1 and for {scope: 'test'}] logged 1 
test("Test 1", async ({ counterFixture }) => {
    console.log("Counter in Test 1: ", counterFixture);
});

// For {scope: 'worker'}], logged 1 and for {scope: 'test'}] logged 2 
test("Test 2", async ({ counterFixture }) => {
    console.log("Counter in Test 2: ", counterFixture);
});

// For {scope: 'worker'}], logged 1 and for {scope: 'test'}] logged 3 
test("Test 3", async ({ counterFixture }) => {
    console.log("Counter in Test 3: ", counterFixture);
});