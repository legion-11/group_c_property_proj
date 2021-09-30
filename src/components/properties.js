import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import PropertiesDataService from '../services/properties'

const PropertiesList = props => {

  const [properties, setProperties] = useState([]);
  useEffect(() => {
    retrieveProperties()
  }, []);

  const retrieveProperties = () => {
    PropertiesDataService.getPropertiesByType(PropertiesDataService.types.forSale)
      .then(response => {
        console.log(response.data);
        setProperties(response.data.result);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
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
                  <strong>Description: </strong>{property.description}
                </p>
                <div className="row">
                  <Link to={"/properties/"+property._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View History
                  </Link>
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}
export default PropertiesList;
