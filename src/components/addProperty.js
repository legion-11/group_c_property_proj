import React, {useState} from "react";
import PropertiesDataService from "../services/properties";
import {Button, FloatingLabel, Form} from "react-bootstrap";

const UserNotAuth = props => {
  return (
    <div>
      <h2>Please Authenticate</h2>
    </div>
  )
}

const AddPropertyForm = props => {

  const handleSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      add()
    }
  };

  const initialPropertyState = props.property || {
    contactNumber: "",
    description: "",
    zipcode: "",
    city: "",
    country: '',
    apartmentNumber: '',
  };

  const [property, setProperty] = useState(initialPropertyState);
  const [type, setType] = useState(PropertiesDataService.types.forSale);
  const [validated, setValidated] = useState(false);
  const [price, setPrice] = useState(0);

  const add = () => {
    PropertiesDataService.addProperty(property)
      .then((response)=> {
        if (response.data.success) {
          let setter;
          if (type === PropertiesDataService.types.forSale)  {
            setter = PropertiesDataService.setForRent({price: price, propertyId: response.data.result.insertedId})
          } else if (type === PropertiesDataService.types.forRent)  {
            setter = PropertiesDataService.setForSale({price: price, propertyId: response.data.result.insertedId})
          }
          if(setter) {
            setter.then((response)=> {
                if (!response.data.success) {
                  alert(response.data.msg)
                }
            })
              .catch((e)=> {alert(e.message)})
          }

        } else {alert(response.data.msg)}
      })
      .catch((e)=> {alert(e.message)})
    props.history.push('/');
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProperty({ ...property, [name]: value });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Zipcode</Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          id="zipcode"
          required
          value={property.zipcode}
          onChange={handleInputChange}
          name="zipcode"
        />
        <Form.Control.Feedback type="invalid">
          Not filled.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          id="city"
          required
          value={property.city}
          onChange={handleInputChange}
          name="city"
        />
        <Form.Control.Feedback type="invalid">
          Not filled.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          id="country"
          required
          value={property.country}
          onChange={handleInputChange}
          name="country"
        />
        <Form.Control.Feedback type="invalid">
          Not filled.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Apartment Number (if applicable)</Form.Label>
        <Form.Control
          type="text"
          className="form-control"
          id="apartmentNumber"
          value={property.apartmentNumber}
          onChange={handleInputChange}
          name="apartmentNumber"
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Description"
        >
          <Form.Control
            type="text"
            className="form-control"
            id="description"
            value={property.description}
            onChange={handleInputChange}
            name="description"
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
        </FloatingLabel>
      </Form.Group>


      <Form.Group className="mb-3" >
        <FloatingLabel controlId="floatingSelect" label="Type">
          <Form.Select aria-label="Floating label select example"
            onChange={(e)=> {setType(parseInt(e.target.value))}}
          >
            <option value={PropertiesDataService.types.notForSaleOrRent}>Not For Rent or Sale</option>
            <option value={PropertiesDataService.types.forRent}>For Rent</option>
            <option value={PropertiesDataService.types.forSale}>For Sale</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Price CAD</Form.Label>
        <Form.Control
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(event)=>setPrice(event.target.value)}
          disabled={parseInt(type)===PropertiesDataService.types.notForSaleOrRent}
          name="price"
        />
      </Form.Group>

      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
  )
}

const AddProperty = props => {

  return (
    (props.user)? AddPropertyForm(props): UserNotAuth(props)
  )
}
export default AddProperty;