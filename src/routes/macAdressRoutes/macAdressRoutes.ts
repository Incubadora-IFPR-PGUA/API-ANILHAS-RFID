import { Router } from "express";
import cors from "cors";

import * as AnilhaController from "../../controllers/anilhaController/AnilhaController";
import * as EspMacAdressController from "../../controllers/macAdressController/espMacAdressController";

const routerMacAdress = Router();

//ANILHAS
routerMacAdress.post("/inserirEsp", EspMacAdressController.inserirEsp);

//MAC ADRESS

export default routerMacAdress;
