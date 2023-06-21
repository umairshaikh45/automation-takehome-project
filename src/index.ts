import * as express from 'express';
import { createObjectCsvWriter } from 'csv-writer';
import {
    chromium,
    Browser,
    Page
} from 'playwright';


interface Product {
    name: string;
    price: string;
    link: string;
}

class EcommerceAutomation {
    private browser: Browser;
    private page: Page;

    constructor() {}

    async initialize() {
        this.browser = await chromium.launch({
            headless: true,
            args: [`--headless=new`]
        });
        this.page = await this.browser.newPage();
    }

    async navigateTo(url: string,searchTerm: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState();
        await this.page.fill('#twotabsearchtextbox', searchTerm);
        await this.page.click('input[type="submit"]');
        await this.page.waitForSelector("div.s-search-results");
        await this.page.waitForLoadState();
    }
   
    async extractProductInformation(maxProducts: number) {
      const products = await this.page.$$eval(
        'div[data-component-type="s-search-result"]',
        (elements, max) => {
          const nameSelector = 'span.a-size-medium.a-color-base.a-text-normal';
          const priceSelector = '.a-price-whole';
          const linkSelector = 'a.a-link-normal.a-text-normal';
    
          const allProducts = elements.slice(0, max).map((element) => {
            const name = element.querySelector(nameSelector)?.textContent || '';
            const price = element.querySelector(priceSelector)?.textContent || '';
            const link = element.querySelector(linkSelector)?.getAttribute('href') || '';
    
            return {
              name,
              price,
              link,
            };
          });
    
          const selectedProducts = allProducts
            .filter((product) => product.price !== '') 
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) 
            .slice(0, 3); 
    
          return selectedProducts;
        },
        maxProducts
      );
    
      return products;
    }

    async  writeProductsToCSV(products: Product[], searchTerm: string) {
      const csvWriter = createObjectCsvWriter({
        path: `products_${searchTerm}.csv`,
        header: [
          { id: 'name', title: 'Product' },
          { id: 'price', title: 'Price' },
          { id: 'searchTerm', title: 'SearchTerm' },
          { id: 'link', title: 'Link' },
        ],
      });
    
      const records = products.map(product => ({
        name: product.name,
        price: product.price,
        searchTerm: searchTerm, 
        link: product.link,
      }));
    
      await csvWriter.writeRecords(records);
    }
    
    async close() {
        await this.browser.close();
    }
}

function startServer(): express.Application {
  const app = express();

  const port = 3000;
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });

  return app;
}

const app = startServer();
app.use(express.json());

app.post('/findProduct', async (req, res) => {
    const ecommerce = new EcommerceAutomation();
    await ecommerce.initialize();
    try {
        const {
            searchTerm,
            maxProducts,
            url
        } = req.body;
        if (searchTerm && maxProducts && url) {
            await ecommerce.navigateTo(url,searchTerm);
            // Extract product information
            const products = await ecommerce.extractProductInformation(maxProducts);
            await ecommerce.writeProductsToCSV(products, searchTerm);
            await ecommerce.close();
            res.status(200).json({
                success: true,
                message: 'Completed successfully.',
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'One of the required parameters is missing.',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during the Process.',
        });
    }
});

export default startServer;