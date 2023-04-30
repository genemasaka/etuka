import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

function Loading() {
  return <div style={{'margin-left' : '40px'}}>Creating your template. Please wait...</div>;
}

function CreateSite() {

  const [htmlMarkup, setHtmlMarkup] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");
  const [font, setFont] = useState("Arial");
  const [storeType, setStoreType] = useState("Goods");
  const [brandName, setBrandName] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  async function generateHtmlMarkup() {

  setIsLoading(true);

  const configuration = new Configuration({
    apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
  });

  delete configuration.baseOptions.headers['User-Agent'];
  const ethersjsCDN = 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.umd.min.js';
  const openai = new OpenAIApi(configuration);

  const prompt = `Generate HTML, javascript and CSS that creates a lean e-commerce store landing page called ${brandName} that sells ${storeType}.
Embed javascript code and CSS within the HTML.
Divide the page into header, body, and footer sections.
Include copyright information in the footer section.
Add a button to automatically scroll to the top of the page in the footer section.
Use ${brandName} as the nav brand in the navbar and redirect to the landing page on click.
Position the navbar links: 'About' and 'Contact' at the farthest left and horizontally next to each other.
The 'About' link should open a modal that displays information about the landing page.
The 'Contact' link should open a modal that displays contact information for the landing page.
Include an 'add product' link in the navbar that renders a modal with a form to add products to the landing page.
Include a field in the 'add products' modal to add the link of the product image.
Add javascript to make the 'add products' modal functional and dynamically add products to the main section of the page.
Display a modal with content relevant to a particular navbar link when clicked.
The cart modal should be the only modal with a 'checkout' button.
Remove the 'href' attribute from all links.
Position the navbrand and links horizontally on the same line.
Position the connect wallet button at the farthest right in the navbar.
Add javascript to get a user's metamask wallet address using ethersJS CDN and set the provider as: const provider = new ethers.BrowserProvider(window.ethereum).
To get the user's address from a list of accounts retrieved from the provider use: 
const accounts = provider.send("eth_requestAccounts", []);
const userAddress = accounts[0];
Hide the connect wallet button when the address is retrieved and display it as truncated.
Render products as a grid of cards with a margin of 30px between them.
Include an add to cart button on each card to dynamically add a product to the cart.
Add a cart icon to the navbar on the left of the connect wallet button.
Display a modal with the products a user adds to the cart, the total, and a checkout button when the cart icon is clicked.
Add javascript to make the cart feature functional and only add one instance of the product selected to the cart.
Include a button in the cart modal to close the modal when clicked.
Add CSS to style the page.
Make the page responsive.
Use ${primaryColor} as the primary color, ${secondaryColor} as the secondary color, and ${tertiaryColor} as the accent color.
Add a rounded border radius to all the buttons.
Do not include comments in the HTML.
Do not explain the result.
Return the result in one go.
  `
  console.log(prompt)

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 3400,
  });
  console.log(completion.data.choices[0].text)
  return completion.data.choices[0].text;
}

  const handleSubmit = (event) => {
    event.preventDefault();

    generateHtmlMarkup().then((markup) => {
      setHtmlMarkup(markup);
        setIsLoading(false);

      console.log(markup)
    });
  };

  return (
  <>
  {isLoading ? <Loading /> : null}
        <div className="container-fluid" style={{'margin-left': '0px', 'marginRight': '0px',}}>
          <div className="row">
          <div className="col-md-9">
          <iframe
          title="HTML Preview"
          srcDoc={htmlMarkup}
          style={{ height: "100vh", border: "none", }}
          className=" ml-2 mr-2 rounded w-100"
          sandbox="allow-forms allow-scripts allow-modals allow-same-origin"
        />
        </div>
        <div className="col-md-3" style={{'backgroundColor':'#F9F6EE'}}>
         <form>

                  <div class="form-group mb-2" >
                    <label>Colors</label>
                    <div class="form-row">
                      <div class="col mb-2">
                        <input type="text" class="form-control" placeholder="Primary" onChange={(event) => setPrimaryColor(event.target.value)}/>
                      </div>
                      <div class="col mb-2">
                        <input type="text" class="form-control" placeholder="Secondary" onChange={(event) => setSecondaryColor(event.target.value)}/>
                      </div>
                      <div class="col mb-2">
                        <input type="text" class="form-control" placeholder="Tertiary" onChange={(event) => setTertiaryColor(event.target.value)}/>
                      </div>
                    </div>
                  </div>
                  <div class="form-group mb-2">
                    <label>Fonts</label>
                    <select class="form-control" onChange={(event) => setFont(event.target.value)}>
                      <option>Arial</option>
                      <option>Times New Roman</option>
                      <option>Courier New</option>
                      <option>Verdana</option>
                      <option>Helvetica</option>
                    </select>
                  </div>
                  <div class="form-group mb-2">
                    <label>Store Type</label>
                    <select class="form-control" onChange={(event) => setStoreType(event.target.value)}>
                      <option>Goods</option>
                      <option>Services</option>
                    </select>
                  </div>
                  <div class="form-group mb-2">
                    <label>Brand Name</label>
                    <input type="text" class="form-control" placeholder="Brand Name" onChange={(event) => setBrandName(event.target.value)}/>
                  </div>
                </form>
                <button style={{'margin-left': '15px',}} class="btn btn-primary mt-2" onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div> 
  </>
 );
}

export default CreateSite