import { Router } from "express";
import { InMemoryCompanyRepository } from "../repositories/inMemoryCompanyRepository";
import { CompanyServiceImpl } from "../services/CompanyService";
import { CompanyController } from "../controllers/companyController";

const router = Router();

const companyRepository = new InMemoryCompanyRepository();
const companyService = new CompanyServiceImpl(companyRepository);
const companyController = new CompanyController(companyService);

router.post("/companies/", (req, res, next) =>
  companyController.create(req, res, next)
);

router.get("/companies/", (req, res, next) =>
  companyController.findAll(req, res, next)
);

router.get("/companies/:id", (req, res, next) =>
  companyController.findById(req, res, next)
);

router.get("/companies/cnpj/:cnpj", (req, res, next) =>
  companyController.findByCNPJ(req, res, next)
);

router.put("/companies/:id", (req, res, next) =>
  companyController.update(req, res, next)
);

router.delete("/companies/:id", (req, res, next) =>
  companyController.delete(req, res, next)
);

export default router;
