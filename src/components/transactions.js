import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropertiesDataService from '../services/properties'
import {Button, Form} from "react-bootstrap";

const TransactionsList = props => {

    const [transactions, setTransactions] = useState([]);
      
    useEffect(() => {
        retrieveTransactions()
    }, []);
  
    const retrieveTransactions = () => {
      PropertiesDataService.getTransactionsAll()
        .then(response => {
          console.log(response.data);
          setTransactions(response.data.result);          
        })
        .catch(e => {
          console.log(e);
          alert(e.message);
        });
    };

    return (
    <div className="row">
      <h5 className="card-title">Transaction List</h5>
        {transactions.reverse().map((transaction) => {          
             return(       
            <div>
                             
                  <p className="card-text">                      
                    <font size="+2"><strong>Transaction ID: </strong></font>{transaction._id}<br/>
                    <strong>Transaction Type: </strong>{transaction.type}<br/>
                    <strong>Owner ID: </strong>{transaction.ownerId}<br/>
                    <strong>Property ID: </strong>{transaction.propertyId}<br/>
                    <strong>Nonce: </strong>{transaction.nonce}<br/>
                    <strong>Previous Hash: </strong>{transaction.previousHash}<br/>
                    <strong>Hash: </strong>{transaction.hash}<br/>                   
                  </p>

                </div>
             );
          
        })}
      </div>
    );
}
export default TransactionsList;