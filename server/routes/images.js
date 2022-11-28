const multer = require("multer");
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const Pet = require("../models/pet.model");
const Product = require("../models/product.model");
const Post = require("../models/posts.model");
const Service = require("../models/services.model");
const News = require("../models/news.model");
const Gallery = require("../models/gallery.model");
const publicUploadsPath = path.join(__dirname, "../../public");
/**
 * Storage delle immagini con regole sul come salvarle
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, publicUploadsPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/**
 * Router per la gestione delle immagini profilo degli utenti
 */
router
  .route("/user")
  /**
   * GET
   * Ritorna l'immagine profilo di un utente
   */
  .get(async (req, res) => {
    try {
      if (req.user != null) {
        await User.findOne({ username: req.user.username }).then((user) => {
          if (user) {
            res.send(user.profilePicture);
          } else {
            res.json("not authorized");
          }
        });
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * Carica una nuova immagine profilo rimuovendo la precendente dal server e
   * dal database.
   * Questa funzione carica una singola immagine in quanto un utente può avere una sola
   * immagine profilo
   *
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.profilePicture != "") {
          const upload = multer({ storage: storage }).single("image");
          upload(req, res, async function (err) {
            if (err) {
              console.log(err);
            } else {
              await User.findOne({ username: req.user.username }).then(
                async (user) => {
                  await fs.unlink(
                    path.join(publicUploadsPath, user.profilePicture),
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                }
              );
              await User.updateOne(
                { username: req.user.username },
                {
                  profilePicture: res.req.file.filename,
                }
              ).then(() => {
                res.status(200).send("avatar uploaded correctly");
              });
            }
          });
        } else {
          const upload = multer({ storage: storage }).single("image");
          let file = res.req.files;
          console.log(file);
          upload(req, res, async function (err) {
            if (err) {
              console.log(err);
            } else {
              // console.log(user);
              console.log(file);
              await User.updateOne(
                { username: req.user.username },
                {
                  profilePicture: res.req.file.filename,
                }
              ).then(() => {
                res.status(200).send("avatar uploaded correctly");
              });
            }
          });
        }
      } else {
        res.status(401).send("unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   *
   * Rimuove l'immagine profilo di un utente.
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await User.findOneAndUpdate(
            { _id: req.query.id },
            { profilePicture: "" }
          )
            .then(async (user) => {
              await fs.unlink(
                path.join(publicUploadsPath, user.profilePicture),
                (err) => {
                  if (err) console.log(err);
                }
              );
            })
            .finally(() => {
              res.sendStatus(200);
            });
        } else {
          await User.findOne({ username: req.user.username })
            .then(async (user) => {
              await fs.unlink(
                path.join(publicUploadsPath, user.profilePicture),
                (err) => {
                  if (err) console.log(err);
                }
              );
            })
            .then(async () => {
              await User.findOneAndUpdate(
                {
                  username: req.user.username,
                },
                { profilePicture: "" }
              ).then(() => {
                res.status(200).send("avatar deleted successfully");
              });
            });
        }
      } else {
        res.status(401).send("unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/pets")
  /**
   * GET
   * Get all photos of a pet
   */
  .get(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Pet.findOne({ _id: req.query.id }).then((pet) => {
            if (pet) {
              res.send(pet.pictures);
            }
          });
        } else {
          await Pet.findOne({
            $and: [{ _id: req.query.id }, { owner: req.user.username }],
          }).then((pet) => {
            if (pet) {
              res.status(200).send(pet.pictures);
            } else {
              res.sendStatus(401);
            }
          });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * create new pet with photos
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        const upload = multer({ storage: storage }).array("images", 10);
        upload(req, res, async (err) => {
          if (err) {
            console.log(err);
          } else {
            const imagesAddr = [];
            console.log(res.req.files);
            for (let i = 0; i < res.req.files.length; i++) {
              imagesAddr.push(res.req.files[i].filename);
            }
            await Pet.findOneAndUpdate(
              {
                $and: [{ owner: req.user.username }, { _id: req.query.id }],
              },
              {
                $push: {
                  pictures: {
                    $each: imagesAddr,
                  },
                },
              }
            );
            res.status(200).send("images uploaded correctly");
          }
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * add or remove photos
   */
  //Todo
  .patch((req, res) => {})
  /**
   * DELETE
   * delete pet's photos
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Pet.findOne({ _id: req.query.id })
            .then(async () => {
              for (let i = 0; i < req.body; i++) {
                await fs.unlink(
                  path.join(publicUploadsPath, req.body[i]),
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              }
            })
            .then(async () => {
              await Pet.findOneAndUpdate(
                {
                  $and: [{ owner: req.user.username }, { _id: req.query.id }],
                },
                {
                  $pull: {
                    pictures: { $in: req.body },
                  },
                }
              ).then(() => {
                res.status(200).send("images deleted successfully");
              });
            });
        } else {
          await Pet.findOne({ _id: req.query.id })
            .then(async () => {
              for (let i = 0; i < req.body; i++) {
                await fs.unlink(
                  path.join(publicUploadsPath, req.body[i]),
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              }
            })
            .then(async () => {
              await Pet.findOneAndUpdate(
                {
                  $and: [{ owner: req.user.username }, { _id: req.query.id }],
                },
                {
                  $pull: {
                    pictures: { $in: req.body },
                  },
                }
              ).then(() => {
                res.status(200).send("images deleted successfully");
              });
            });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/products")
  .post((req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          const upload = multer({ storage: storage }).array("images", 6);
          upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const imagesAddr = [];
              let mainPhoto = "";
              console.log(res.req.files);
              if (res.req.files.length > 1) {
                mainPhoto = res.req.files[0].filename;
                for (let i = 1; i < res.req.files.length; i++) {
                  imagesAddr.push(res.req.files[i].filename);
                }
              } else {
                mainPhoto = res.req.files[0].filename;
              }

              await Product.findOneAndUpdate(
                {
                  _id: req.query.id,
                },
                {
                  $push: {
                    photos: {
                      $each: imagesAddr,
                    },
                  },
                  mainPhoto: mainPhoto,
                }
              ).then(() => {
                res.status(200).send("images uploaded correctly");
              });
            }
          });
        } else {
          const upload = multer({ storage: storage }).array("images", 6);
          upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const imagesAddr = [];
              for (let i = 0; i < res.req.files.length; i++) {
                imagesAddr.push(res.req.files[i].filename);
              }
              await Product.findOneAndUpdate(
                {
                  $and: [{ _id: req.query.id }, { seller: req.user.username }],
                },
                {
                  $push: {
                    pictures: {
                      $each: imagesAddr,
                    },
                  },
                }
              ).then(() => {
                res.status(200).send("images uploaded correctly");
              });
            }
          });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })

  .patch((req, res) => {
    if (req.user != null) {
      if (req.user.admin) {
      }
    }
  });

router
  .route("/posts")
  .post((req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          const upload = multer({ storage: storage }).array("images");
          upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const imagesAddr = [];
              for (let i = 0; i < res.req.files.length; i++) {
                imagesAddr.push(res.req.files[i].filename);
              }
              await Post.findOneAndUpdate(
                {
                  _id: req.query.id,
                },
                {
                  $push: {
                    photos: {
                      $each: imagesAddr,
                    },
                  },
                }
              );
              res.status(200).send("images uploaded correctly");
            }
          });
        } else {
          const upload = multer({ storage: storage }).array("images");
          upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const imagesAddr = [];
              for (let i = 0; i < res.req.files.length; i++) {
                imagesAddr.push(element.filename);
              }
              await Post.findOneAndUpdate(
                {
                  $and: [
                    { _id: req.query.id },
                    { username: req.user.username },
                  ],
                },
                {
                  $push: {
                    photos: {
                      $each: imagesAddr,
                    },
                  },
                }
              );
              res.status(200).send("images uploaded correctly");
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  })
  .patch((req, res) => {});

router
  .route("/services")
  /**
   * TODO: get
   */
  .get((req, res) => {})
  /**
   * POST
   * create new service with photos
   */
  .post((req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          const upload = multer({ storage: storage }).array("images", 2);
          upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const imagesAddr = [];
              for (let i = 0; i < res.req.files.length; i++) {
                imagesAddr.push(res.req.files[i].filename);
              }
              await Service.findOneAndUpdate(
                {
                  _id: req.query.id,
                },
                {
                  $push: {
                    pictures: {
                      $each: imagesAddr,
                    },
                  },
                }
              );
              res.status(200).send("images uploaded correctly");
            }
          });
        } else {
          res.sendStatus(401);
        }
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * edit service's photo
   */
  .patch();

router
  .route("/news")
  /**
   * POST
   * add photos to news
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          const upload = multer({ storage: storage }).array("images", 2);
          upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const imagesAddr = [];
              for (let i = 0; i < res.req.files.length; i++) {
                imagesAddr.push(res.req.files[i].filename);
              }
              await News.findOneAndUpdate(
                {
                  _id: req.query.id,
                },
                {
                  $push: {
                    pictures: {
                      $each: imagesAddr,
                    },
                  },
                }
              );
              res.status(200).send("images uploaded correctly");
            }
          });
        } else {
          res.sendStatus(401);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/gallery")
  .post(async (req, res) => {
    if (req.user != null) {
      const upload = multer({ storage: storage }).single("image");
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await Gallery.findOneAndUpdate(
            {
              _id: req.query.id,
            },
            {
              filename: res.req.file.filename,
            }
          ).then(() => {
            res.status(200).send("image uploaded correctly");
          });
        }
      });
    }
  })
  /**
   * PATCH
   *
   * Change an image
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        const upload = multer({ storage: storage }).single("image");
        upload(req, res, async (err) => {
          if (err) console.log(err);
          else {
            await Gallery.findOne({
              $and: [{ _id: req.query.id }, { username: req.user.username }],
            }).then(async (photo) => {
              fs.unlink(
                path.join(__dirname, "../../public/" + photo.filename),
                (err) => {
                  if (err) console.log(err);
                }
              ).then(
                await Gallery.findByIdAndUpdate(req.query.id, {
                  filename: res.req.file.filename,
                })
              );
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
