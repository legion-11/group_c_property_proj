import React, {useEffect, useState} from "react";
import PropertiesDataService from '../services/properties'
import {Link, useHistory} from "react-router-dom";
import {Button, ListGroup} from "react-bootstrap";

const ViewProperty = props => {
  const history = useHistory();

  const initialRestaurantState = {
    _id: null,
    zipcode: "",
    city: '',
    country: "",
    reviews: '',
    ownerId: '',
    contactNumber: '',
    description: '',
    apartmentNumber: '',
    type: ''
  };

  const [property, setProperty] = useState(initialRestaurantState)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    retrieveTransactions()
  }, []);


  const retrieveTransactions = () => {
    PropertiesDataService.getTransactionsByPropertyId(props.match.params.id)
      .then(response => {
        console.log(response.data);
        setTransactions(response.data.result.reverse());
      })
      .catch(e => {
        console.log(e);
        alert(e.message);
      });
  };


  const typeToString=(t)=>{
    if (t === 0) {
      return "Created"
    } else if (t === 1) {
      return "Set For Sale"
    } else if (t === 2) {
      return "Buy"
    } else if (t === 3) {
      return "Set For Rent"
    }else if (t === 4) {
      return "Rented"
    }
  }

  useEffect(() => {
    PropertiesDataService.getPropertyById(props.match.params.id)
      .then((res) => {
        if (res.data.success) {
          // alert(props.match.params)
          let property = res.data.result
          setProperty(property)
        } else {
          alert(res.data.msg)
        }
      })
      .catch((e) => {
        alert(e.message)
      })
  }, [props.match.params.id]);

  return (
    property._id &&
    <div>
      <div className="col-lg-12 d-flex justify-content-center">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{property.country} {property.city}</h5>
            <p className="card-text">
              <font size="+2"><strong>Address: </strong></font>
              {
                ` ${property.zipcode}  `
              }
              {
                property.apartmentNumber && `${(`Apt. ${property.apartmentNumber}`) || ''}`
              }<br/>
              <strong>Description: </strong>{property.description}<br/>

              <strong>Contact Number: </strong>{property.contactNumber}<br/>
              {
                property.type !== PropertiesDataService.types.notForSaleOrRent &&
                <div><strong>Price: </strong>{property.price}<br/></div>
              }</p>

            <div className="row d-flex justify-content-between">
              {
                property.type !== PropertiesDataService.types.notForSaleOrRent &&
                <Button className="btn btn-primary col-lg-5 mx-1 mb-1"
                onClick={()=> {
                  PropertiesDataService.buyProperty(property._id)
                    .then((res) => {
                      if (res.data.success) {
                        history.push('/transactions')
                      } else {alert(res.data.msg)}
                    })
                    .catch((e)=> {
                      alert(e.message)
                    })
                }}
                disabled={!(property.type === PropertiesDataService.types.forSale)}
                >
                  {property.type === PropertiesDataService.types.forSale ? "Buy" : "Rent"}
                </Button>
              }
              <a target="_blank"
                 href={"https://www.google.com/maps/place/" + `${property.country} ${property.city}, ${property.zipcode}`}
                 className=" btn btn-primary col-lg-5 mx-1 mb-1">Map</a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h5 className="card-title">Transaction List</h5>
        <ListGroup>
          {
            transactions.map((transaction) => (
              <ListGroup.Item className="card-text">
                <strong>Transaction Type: </strong>{transaction.type} {typeToString(transaction.type)}<br/>
                <strong>Property ID: </strong>{transaction.propertyId}<br/>
                <strong>Owner ID: </strong>{transaction.ownerId}<br/>
                {transaction.buyerId && <strong>Buyer: </strong>} {transaction.buyerId}{transaction.buyerId && <br/>}
                {transaction.price && <strong>Price: </strong>} {transaction.price}<br/>
                <strong>Nonce: </strong>{transaction.nonce}<br/>
                <strong>Previous Hash: </strong>{transaction.previousHash}<br/>
                <strong>Hash: </strong>{transaction.hash}<br/>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>

    </div>
  );
}

export default ViewProperty