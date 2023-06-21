# automation-takehome-project

Project for candidates to complete as a hiring assessment.

## Instructions

1. Fork repo to your own project.
2. Send link to the forked repo by the provided due date.

## Project Requirements

The objective is to build an automation application, meaning a program that performs a manual workflow in a repeatable manner. It must meet the following requirements:

1. Use Node.js, Typescript, and the [Playwright](https://playwright.dev/) library. **IMPORTANT: Playwright should be used to facilitate the web automation, not for testing purposes.**
2. Navigate to https://amazon.com
3. Finds the three lowest prices for any given search term
4. Write these products' to a CSV locally where each row contains product, price, search term, and link to the product's page.
5. The design should be generalized enough so that the framework can be applied to another e-commerce site with relative ease and minimal re-work.
6. Should utilize Typescript features where helpful.
7. Should run successfully during the review session.
8. Focus on maintainability and scalability.

### Extra Credit

1. Introduce a set of tests around the project

### Run Project
To run the project enter the following command this will compile and run the project.

 **npm run start **

## Making request

Once the service is up and running on the port 3000(Default) then you can make request to the service. In order to make a POST request you need to goto the url.
`http://127.0.0.1:3000/findproduct` 


Pass the follwing api parameter in body json
```sh
{
    "url":"https://www.amazon.com",
    "searchTerm":"laptop", 
    "maxProducts":"3"
}
```
In this way it will be reusable.