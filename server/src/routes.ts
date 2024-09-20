import express from "express";
import userController from "./controllers/UserController";
import MatchController from "./controllers/MatchController";
import MailController from "./controllers/MailController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.get("/user/:username", userController.getByUsername);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post('/email', MailController.sendEmail);    

routes.post("/match", MatchController.create);
routes.get("/match", MatchController.get);
routes.get("/match/:id", MatchController.getById);
routes.patch("/match/:id", MatchController.update);
routes.patch("/match/add/:id", MatchController.addPlayer);
routes.delete("/match/:id", MatchController.delete);
routes.patch("/match/remove/:id", MatchController.removePlayer);

export default routes;
