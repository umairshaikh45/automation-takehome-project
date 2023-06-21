import * as express from 'express';
import { expect } from 'chai';
import startServer from '../../src/index';
import axios from 'axios';

describe('API Tests', () => {
  let app: express.Application;
  let server: any;

  before(async () => {
        try {
          app = startServer();
          server = app.listen(3000); 
        } catch (error) {
          console.error(error);
        }
      });

  it('Check status of API and response body', async () => {
    const response = await axios.post('http://localhost:3000/findProduct', {
      searchTerm: 'laptop',
      maxProducts: 3,
      url: 'https://www.amazon.com',
    });

    expect(response.status).to.equal(200);
    expect(response.data.success).to.be.true;
    expect(response.data.message).to.equal('Completed successfully.');
  });
});
