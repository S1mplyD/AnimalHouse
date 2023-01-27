const router = require("express").Router();
const Service = require("../models/services.model");
const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");

router
    .route("/")
    /**
     * GET
     * get all services info
     */
    .get(async (req, res) => {
        try {
            await Service.find().then((services) => {
                res.status(200).send(services);
            });
        } catch (error) {
            console.log(error);
        }
    })
    /**
     * POST
     * create a new service
     */
    .post(async (req, res) => {
        try {
            if (req.user.admin) {
                await Service.create({
                    name: req.body.name,
                    location: req.body.location,
                    coordinate: req.body.coordinate,
                    openDays: req.body.openDays,
                    openTime: req.body.openTime,
                    closeTime: req.body.closeTime,
                    type: req.body.type,
                    online: req.body.online,
                    info: req.body.info,
                    maxBooking: req.body.maxBooking,
                }).then((service) => {
                    res.status(201).send(service);
                });
            } else {
                await res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
        }
    })
    /**
     * PATCH
     * update a service
     */
    .patch(async (req, res) => {
        try {
            if (req.user.admin) {
                await Service.findByIdAndUpdate(req.query.id, {
                    name: req.body.name,
                    location: req.body.location,
                    openDays: req.body.openDays,
                    openTime: req.body.openTime,
                    type: req.body.type,
                    info: req.body.info,
                    mail: req.body.mail,
                    phone: req.body.phone
                }).then(() => {
                    res.sendStatus(200);
                });
            } else {
                await res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
        }
    })
    /**
     * DELETE
     * delete a service
     */
    .delete(async (req, res) => {
        try {
            if (req.user != null) {
                if (req.user.admin) {
                    await Service.findOneAndDelete(req.query.id)
                        .then(async (service) => {
                            console.log(service);
                            console.log(service.pictures);
                            for (let i = 0; i < service.pictures.length; i++) {
                                await fs.unlink(
                                    path.join(__dirname, "../../public/" + service.pictures[i]),
                                    (err) => {
                                        if (err) console.log(err);
                                    }
                                );
                            }
                        })
                        .finally(() => {
                            res.sendStatus(200);
                        });
                } else {
                    await Service.findById(req.query.id).then(async (service) => {
                        if (service.seller === req.user.username) {
                            await Service.deleteOne({_id: req.query.id})
                                .then(async () => {
                                    for (let i = 0; i < service.pictures.length; i++) {
                                        await fs.unlink(
                                            path.join(
                                                __dirname,
                                                "../../public/" + service.pictures[i]
                                            ),
                                            (err) => {
                                                if (err) console.log(err);
                                            }
                                        );
                                    }
                                })
                                .finally(() => {
                                    res.sendStatus(200);
                                });
                        }
                    });
                }
            } else {
                await res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
        }
    });

router
    .route("/service")
    /**
     * GET
     * get a specific service
     */
    .get(async (req, res) => {
        try {
            await Service.find({
                $or: [
                    {location: req.query.location},
                    {type: req.query.type},
                    {name: req.query.name},
                ],
            }).then((services) => {
                res.status(200).send(services);
            });
        } catch (error) {
            console.log(error);
        }
    });

router
    .route("/book")
    .get(async (req, res) => {
        try {
            await Service.find({_id: {$in: req.user.userBookings}}).then(
                (bookings) => {
                    res.send(bookings);
                }
            );
        } catch (error) {
            console.log(error);
        }
    })
    /**
     * POST
     * book a service
     */
    .post(async (req, res) => {
        try {
            if (req.user != null) {
                await Service.findOne({_id: req.query.id}).then(async (service) => {
                    if (service.numberOfBookings < service.maxBooking) {
                        await Service.updateOne(
                            {_id: service.id},
                            {$inc: {numberOfBookings: 1}}
                        ).then(async () => {
                            await User.updateOne(
                                {username: req.user.username},
                                {
                                    userBookings: service._id,
                                }
                            ).then(() => {
                                res.sendStatus(200);
                            });
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    })
    /**
     * DELETE
     * remove a booking
     */
    .delete(async (req, res) => {
        try {
            if (req.user != null) {
                await Service.findByIdAndUpdate(req.query.id, {
                    $inc: {numberOfBookings: -1}
                }).then(async (service) => {
                    await User.findOneAndUpdate({username: req.user.username}, {$pull: {userBookings: service.id}}).then(() => {
                        res.sendStatus(200)
                    })
                })
            } else {
                await res.sendStatus(401)
            }
        } catch (error) {
            console.log(error);
        }
    });

module.exports = router;
