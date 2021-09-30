import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropertiesDataService from '../services/properties'
import {Button, Form} from "react-bootstrap";

const TransactionsList = txn => {

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
        });
    };

    
    <div className="row">
        {transactions.map((transaction) => {
                    return (
            <div className="col-lg-4 pb-1">
              
                  <h5 className="card-title">Transaction List</h5>
                  <p className="card-text">                      
                    <font size="+2"><strong>Transaction ID:</strong></font>{transaction._id}<br/>
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
    
}
export default TransactionsList;