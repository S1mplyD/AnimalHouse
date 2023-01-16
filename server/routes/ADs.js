const Products = require("../models/product.model");
const router = require("express").Router();

router
    .route("/")
    //Get custom or random ad
    .get(async (req, res) => {
        console.log(req.query)
        let arr = [];
        for (let i in req.query) {
            if (req.query[i] != "") {
                arr.push(req.query[i]);
            }
        }
        if (arr.length < 1) {
            // No element in query
            Products.find().then((products) => {
                res.send(products);
            });
        } else {
            Products.find().then((products) => {
                let ads = [];
                for (let i in products) {
                    for (let k in products[i].toJSON()) {
                        if (typeof products[i].toJSON()[k] === "string") {
                            arr.forEach((el) => {
                                if (products[i].toJSON()[k].includes(el)) {
                                    ads.push(products[i].toJSON());
                                }
                            });
                        }
                    }
                    //Controllo le categorie
                    arr.forEach((el) => {
                        if (products[i].toJSON().categories.includes(el)) {
                            ads.push(products[i].toJSON());
                        }
                    });
                }
                let response = []
                //Remove duplicates
                for(let i in ads){
                    for(let j = Number(i) + 1; j < ads.length; j++){
                        if(ads[i]._id === ads[j]._id){
                            ads.splice(Number(i),1)
                        }
                    }
                }
                //If there are items similar to the described pet
                if (!response.length < 1) {
                    res.send(response);
                } else {
                    // if nothing is found
                    res.send(products)
                }
            });
        }
    });

module.exports = router;
