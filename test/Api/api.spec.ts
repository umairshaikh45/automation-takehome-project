import { expect } from 'chai';
import { test} from '@playwright/test';
import axios from 'axios';

test.describe('Api Test', () => {
  
  test('Check status of API as 200', async ({}) => {
      const response = await axios.post(`http://localhost:3000/findProduct`, {
          searchTerm: 'laptop',
          maxProducts: 3,
          url: 'https://www.amazon.com',
      });

      expect(response.status).to.equal(200);
      expect(response.data.success).to.be.true;
      expect(response.data.message).to.equal('Completed successfully.');
  });

  test("Check status of API as 400 when parameter is missing.", async ({}) => {
      try {
          const response = await axios.post(`http://localhost:3000/findProduct`, {
              searchTerm: "laptop",
              url: "https://www.amazon.com"
          });
          expect(response.status).to.equal(400);
          expect(response.data.success).to.equal(false);
          expect(response.data.message).to.equal("One of the required parameters is missing.");
      } catch (error) {
          console.log(error);
      }
  });
})