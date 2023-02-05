const Products = require("../models/product.model");
const router = require("express").Router();

router
    .route("/")
    //Get custom or random ad
    .get(async (req, res) => {
        let arr = [];
        console.log(req.query)
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
                // index of products
                for (let i in products) {
                    // fields of products
                    for (let k in products[i].toJSON()) {
                        // value of field
                        if (typeof products[i].toJSON()[k] === "string" && (k === "info" || k === "title")) {
                            arr.forEach((el) => {
                                let string = products[i].toJSON()[k].toLowerCase()
                                if (string.includes(el.toLowerCase()) ) {
                                    ads.push(products[i].toJSON());
                                }
                            });
                        }

                    }
                    //Controllo le categorie
                    // index of category
                    for (let j in products[i].toJSON().categories){
                        arr.forEach((el) => {
                            if (products[i].toJSON().categories[j].toLowerCase() === el.toLowerCase()) {
                                ads.push(products[i].toJSON());
                            }
                        });
                    }

                }
                //Remove duplicates
                // index of ads
                for(let i in ads){
                    // ads
                    for(let j = Number(i) + 1; j < ads.length; j++){
                        if(ads[i]._id === ads[j]._id){
                            ads.splice(Number(i),1)
                        }
                    }
                }
                //If there are items similar to the described pet
                if (ads.length > 0) {
                    res.send(ads);
                } else {
                    // if nothing is found
                    res.send(products)
                }
            });
        }
    });

module.exports = router;
