import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Format the price to USD using their locales.
const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// handling toggle collapsible
const handleClick = (e) => {
  e.target.classList.toggle("active");
  var content = e.target.nextElementSibling;
  if (content.style.maxHeight){
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  } 
};

function Detail(props) {
  const history = useHistory();
  const address = new URLSearchParams(props.location.search).get("address");
  const [ filteredHome, setFilteredHome ] = useState([]);

  useEffect(() => {
    // encode the address value to a valid URL component
    fetch(`/home?address=${encodeURIComponent(address)}`)
      .then(res => res.json())
      .then(result => {
        setFilteredHome(result);
      })
    .catch(err => {
      console.log(err);
    });
  }, [address]);
  
  return (
    <div className="detail">
      <a href="#" onClick={() => history.goBack()}>&#8592; Back</a>
      {filteredHome.length < 1 && (
        <p>No property found with this address.</p>
      )}
      <div className="center">
        {filteredHome.length > 0 && (
          <div>
            <div>
              <p className=""><b>{dollarUS.format(filteredHome[0]["PRICE"])}</b></p>
              <div>
                <span className="main-info"><b>{filteredHome[0]["BEDS"]}</b> bed</span>
                <span className="main-info"><b>{filteredHome[0]["BATHS"]}</b> bath</span>
                <span className="main-info"><b>{(filteredHome[0]["SQUARE FEET"]).toLocaleString("en-US")}</b> sqft</span>
              </div>
              <p>{`${filteredHome[0]["ADDRESS"]}, ${filteredHome[0]["CITY"]}, ${filteredHome[0]["STATE OR PROVINCE"]} ${filteredHome[0]["ZIP OR POSTAL CODE"]}`}</p>
            </div>
            <h3 className="heading">Additional Information</h3>
            <button className="collapsible" onClick={(e) => handleClick(e)}>Property Info</button>
            <div className="content">
              <p><b>Property Type: </b>{filteredHome[0]["PROPERTY TYPE"]}</p>
              <p><b>Price per Sqft: </b>{dollarUS.format(filteredHome[0]["$/SQUARE FEET"])}</p>
              <p><b>HOA Fee: </b>{dollarUS.format(filteredHome[0]["HOA/MONTH"])}/month</p>

            </div>
            <button className="collapsible" onClick={(e) => handleClick(e)}>Listing Info</button>
            <div className="content">
              <p><b>Status: </b><span className={filteredHome[0]["STATUS"] === "Active" ? 'green' : ''}>{filteredHome[0]["STATUS"]}</span></p>
              <p><b>Next Open House Start Date: </b>{filteredHome[0]["NEXT OPEN HOUSE START TIME"]}</p>
              <p><b>Next Open House End Date: </b>{filteredHome[0]["NEXT OPEN HOUSE END TIME"]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail;