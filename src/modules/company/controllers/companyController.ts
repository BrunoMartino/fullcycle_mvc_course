import { NextFunction, Request, Response } from "express";
import { validateId } from "../../shared/validators/validateId";
import { responseSuccess } from "../../shared/helpers/responseSuccess";
import { CompanyService } from "../../../interfaces/services/CompanyServices";
import { NotFoundError } from "../../shared/errors/AppError";
import { validateCNPJ } from "../validators/validateCnpj";
import { validateCreateCompany } from "../validators/validateCreateCompany";
import { validateUpdateCompany } from "../validators/validateUpdateCompany";

export class companyController {
  constructor(private readonly companyService: CompanyService) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const data = validateCreateCompany(req.body);

    const company = await this.companyService.create(data);

    return responseSuccess(res, company, "Company created successfully", 201);
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const companies = await this.companyService.findAll();

    return responseSuccess(res, companies, "Companies found successfully");
  }

  async findByCNPJ(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const cnpj = req.params.cnpj;

    if (!cnpj) {
      throw new NotFoundError("Empresa não encontrada");
    }

    const validCNPJ = validateCNPJ(cnpj);
    const company = await this.companyService.findByCNPJ(validCNPJ);

    return responseSuccess(res, company, "Company found successfully");
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const id = req.params.id;

    if (!id) {
      throw new NotFoundError("Empresa não encontrada");
    }

    const validId = validateId(id);
    const company = await this.companyService.findById(validId);

    return responseSuccess(res, company, "Company found successfully");
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const id = req.params.id;
    if (!id) {
      throw new NotFoundError("Empresa não encontrada");
    }
    const validId = validateId(id);
    const data = validateUpdateCompany(req.body);

    const company = await this.companyService.update(validId, data);

    return responseSuccess(res, company, "Company updated successfully");
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params!.id;
    if (!id) {
      throw new NotFoundError("Empresa não encontrada");
    }

    const validatedId = validateId(id);
    const company = await this.companyService.delete(validatedId);

    return responseSuccess(res, company, "Company deleted successfully");
  }
}
