import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

function Loading() {
  return <div>Creating your template. Please wait...</div>;
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
  console.log(process.env.REACT_APP_OPENAI_API_KEY)
  const configuration = new Configuration({
    apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
  });

  delete configuration.baseOptions.headers['User-Agent'];
 
  const openai = new OpenAIApi(configuration);

  const prompt = `Generate HTML markup for a single page e-commerce site landing page for a store called ${brandName} that sells ${storeType}. The page should have 
  a navbar with the navbrand and the links: Home, Add product, Blog and About positioned at the far left of
  the navbar positioned beside each other horizintally. The navbar should also have a connect wallet button(background color: ${tertiaryColor}) and a cart icon positioned at the far right of the navbar. On click of a link
  on the navbar a modal should open that displays content with respect to the selected link. Add javascript code to the markup to make the modals functional. On click of the cart icon a 
  dropdown menu should render which dynamically updates to showing the ${storeType} that have been ordered when a user clicks add to cart. Also include javascript code within the
  markup that makes the cart feature functional. The cart icon should come before the connect wallet button. The navbar should have a padding of 5px,
  have ${secondaryColor} as the background color and the links should be of fontsize 15px. The body of the page should have a 
  background color of ${primaryColor}, and contain a card grid with cards that display the ${storeType} on offer. The card grid should have a
  margin top of 50px. The cards should be 9 in number, spaced around and include a button 
  with a background color of ${tertiaryColor}. The button's text should be white. 
  On click of the button the selected product should be added to the cart. The cards' background color should be ${secondaryColor}.
  On hover  of each card they should rise smoothly, be highlighted and have a marging bottom of 50px. The footer of the page should have a background color of ${secondaryColor} and contain
  copyright with the ${brandName}. The page should use ${font} as the main font.The page should scroll smmothly and be styled in bootstrap. Do not return any explanation to the result, just return the markup` 

  console.log(prompt)
  
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.1,
    max_tokens: 3000,
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