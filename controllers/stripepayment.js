const stripe = require("stripe")("sk_test_51MnQxmSGbjTtz4AzlSCxqQrrQsDLA883gPxps34F1ssCqtRue5CfwpoYQqZeTEpITAGV118EwUtXX89x3zZOXn7t00Cqbj5sja");
const { result } = require("lodash")
const uuid = require("uuid/v4")


exports.makepayment = (req,res) => {
    const { products,token } = req.body
    console.log("PRODUCTS",products)

    let amount  = 0;
    products.map(p => {
        amount = amount + p.price 
    });

    const idempotencyKey = uuid()

    return stripe.customers
        .create({
            email:token.email,
            source:token.id
        })
        .then(customer => {
            stripe.charges
                .create({
                    amount: amount,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    shipping:{
                        name:token.card.name
                    }
                }, { idempotencyKey })
                .then(result => res.status(200).json(result))
                .catch(err => console.log(err));
        })
}