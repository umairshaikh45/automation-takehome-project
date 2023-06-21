console.log("\n\n");
console.log("Starting pre-build tests...")

console.log("\n");

require("./Api/api.spec");


// import { expect } from 'chai';
// import  axios from "axios"
// import  fkill from 'fkill';
// // import  startServer  from '../../src/index.js';

// describe("Api Tests", () => {

//   before(async () => {
//     try {
//       await fkill('3000', { force: true });
//       // await startServer();
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   it("Check status of API as 400 when parameter is missing.", async function() {
//     try {
//       const response = await axios.post('http://localhost:3000/findProduct', {
//         searchTerm: "laptop",
//         url: "https://www.amazon.com"
//       });

//       expect(response.status).to.equal(400);
//       expect(response.data.success).to.equal(false);
//       expect(response.data.message).to.equal("One of the required parameters is missing.");
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   });