import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropertiesDataService from '../services/properties'
import {Button} from "react-bootstrap";

const PropertiesList = props => {

  const [properties, setProperties] = useState([]);
  const [type, setType] = useState(PropertiesDataService.types.forSale);
  useEffect(() => {
    retrieveProperties(type)
  }, [type]);

  const retrieveProperties = (type) => {
    PropertiesDataService.getPropertiesByType(type)
      .then(response => {
        console.log(response.data);
        setProperties(response.data.result);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
      <div className="row pb-1">
        <div className="input-group-append" >
          <div className="row pb-1">
            <div className="col-md-6"><h2>{(type===PropertiesDataService.types.forRent)? "For Rent": "For Sale"}</h2></div>
            <div className="col-md-6" align={"end"}>
              <Button

                className="btn "
                type="button"
                variant="primary"
                onClick={() => {
                  if (type===PropertiesDataService.types.forSale) {setType(PropertiesDataService.types.forRent)}
                  else {
                    setType(PropertiesDataService.types.forSale)}
                }}
              >
                {(type===PropertiesDataService.types.forRent)? "Search For Sale": "Search For Rent"}
              </Button>
            </div>

          </div>

        </div>
      </div>
      <div className="row">
        {properties.map((property) => {
          const address = `${property.country} ${property.city}, ${property.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{property.name}</h5>
                  <p className="card-text">
                    <strong>Address: </strong>{address}<br/>
                    <strong>Description: </strong>{property.description}<br/>
                    <strong>Price: </strong>{property.price}<br/>
                    {

                    }
                  </p>
                  <div className="row">
                    <Link to={"/properties/" + property._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View History
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address}
                       className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
export default PropertiesList;
