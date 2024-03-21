const { Router } =require("express");
const {uploadeFile,telecgargeFilePdf} =require("../controllers/FileImage.js");
const router=Router();
const {createClient,getClient,getListClient}=require("./../controllers/clientController.js");
const { createProduit, getProduit, isModiProd, isModiProdStatus, getListProduit, deleteProd } = require("../controllers/produitController.js");
const { createCategorie, getCategorie, getListCategorie, isModifier,  deleteCat } = require("../controllers/categorieContoller.js");
const { connexionClient, connexionAdmin, modifierPassword } = require("../controllers/authenticationController.js");
const { createImage } = require("../controllers/imageController.js");
const { createFichier, getListImage, deleteImage } = require("../controllers/fichierController.js");
const { createDesc, getListDesc, deleteDesc, isModiDesc } = require("../controllers/descriptionController.js");
const { createCommande } = require("../controllers/commandeController.js");
const { createPannier } = require("../controllers/pannierController.js");
const { createRayon, getRayon, getListRayon, deleteRayon, isModRayon } = require("../controllers/rayonContoller.js");

///RaYON
router.post("/createRayon",createRayon);
router.post("/getRayon",getRayon);
router.get("/listRayon",getListRayon);
router.put("/isModRayon/:id",isModRayon);
router.delete("/deleteRayon/:id",deleteRayon);

router.post("/createProduit",createProduit);
router.get("/getProduit",getProduit);
router.put("/isModifierProduit/:id",isModiProd);
router.get("/isModifierProduitStauts/:id",isModiProdStatus);
router.get("/listProduit",getListProduit);
router.delete("/deleteProd/:id",deleteProd);

////Image
router.post("/createImage",createFichier);
router.get("/getImageProduct",getListImage);
router.delete("/deleteImage/:id",deleteImage);
router.post('/uploadeFile/:id', uploadeFile);
router.get("/download/:fileName",telecgargeFilePdf);
///Description
router.post("/createDescription",createDesc);
router.put("/isModifierDescription/:id",isModiDesc);
router.get("/listDescription",getListDesc);
router.delete("/deleteDescritpion/:id",deleteDesc);
/////Commande
router.post("/createCommande",createCommande);

////Pannier
router.post("/createPannier",createPannier);

/////Categorie

router.post("/createCategorie",createCategorie);
router.post("/getCategorie",getCategorie);
router.get("/listCategorie",getListCategorie);
router.put("/isModifier/:id",isModifier);
router.delete("/deleteCat/:id",deleteCat);

//client connexionClient
router.post("/createClient",createClient);
router.post("/connexion",connexionClient);
router.get("/client/:id",getClient);
router.get("/listClient",getListClient);

//chat  /connexion_admin /modifirPassword

router.post("/connexion_admin",connexionAdmin)

router.post("/modifirPassword",modifierPassword)

module.exports = router;