import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropertiesDataService from '../services/properties'
import {Button, ButtonGroup, Row, Col, Card} from "react-bootstrap";

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

  const isRent = t => t == PropertiesDataService.types.forRent;
  const isSale = t => t == PropertiesDataService.types.forSale;

  const handleTypeSwitch = e => {
    const toType = Number(e.target.dataset.to);

    if( toType == type ) return;

    setType(toType);
  }


  return (
    <div>
      <div className="row pb-1">
        <div className="input-group-append" >
          <div className="row pb-1">
            <div className="col-md-6"><h2>{(type===PropertiesDataService.types.forRent)? "For Rent": "For Sale"}</h2></div>
            <div className="col-md-6" align={"end"}>
              {/* <Button

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
              </Button> */}
              <ButtonGroup size="md" className="mb-2">
                <Button onClick={handleTypeSwitch} data-to={PropertiesDataService.types.forSale} variant={isRent(type) ? "outline-success" : "success"}>For Sale</Button>
                <Button onClick={handleTypeSwitch} data-to={PropertiesDataService.types.forRent} variant={isSale(type) ? "outline-success" : "success"} >For Rent</Button>
              </ButtonGroup>
            </div>

          </div>

        </div>
      </div>
      <Row>
        {properties.map((property) => {
          const address = `${property.country} ${property.city}, ${property.zipcode}`;
          return (
            <Col lg="4">
              <Card className="mb-3">
                <Card.Body style={{height:170}}>
                  <h5 className="card-title">{property.name}</h5>
                  <p className="card-text">
                    <font size="+2"><strong>Address:</strong></font> {address}<br/>
                    <strong>Description: </strong>{property.description}<br/>
                    <strong>Contact Number: </strong>{property.contactNumber}<br/>
                    <strong>Price: </strong>{property.price}<br/>
                  </p>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end align-items-end">
                  <a target="_blank" href={`https://www.google.com/maps/place/${address}`} className="mx-2">Map</a>
                  <Link to={`/property/${property._id}`} className="">
                      Detail
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  )
}
export default PropertiesList;


