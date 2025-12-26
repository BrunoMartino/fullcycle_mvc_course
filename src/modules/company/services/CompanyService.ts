import { CompanyRepository } from "../../../interfaces/repositories/CompanyRepository";
import { CompanyService } from "../../../interfaces/services/CompanyServices";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../shared/errors/AppError";
import { DocumentValidator } from "../../shared/utils/documentValidator";
import { CreateCompanyDTO } from "../dtos/createCompanyDTO";
import { UpdateCompanyDTO } from "../dtos/updateCompanyDTO";
import { Company } from "../models/Company";

export class CompanyServiceImpl implements CompanyService {
  constructor(private readonly companyRespository: CompanyRepository) {}

  async create(createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    if (!DocumentValidator.validateCNPJ(createCompanyDTO.cnpj)) {
      throw new BadRequestError("Invalid CNPJ");
    }

    const existingCompany = await this.companyRespository.findByCNPJ(
      createCompanyDTO.cnpj
    );
    if (existingCompany) {
      throw new BadRequestError("Company already exists");
    }

    return this.companyRespository.create(createCompanyDTO);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRespository.findAll();
  }

  async findByCNPJ(cnpj: string): Promise<Company> {
    const company = await this.companyRespository.findByCNPJ(cnpj);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  }

  async findById(id: string): Promise<Company> {
    const company = await this.companyRespository.findById(id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  }

  async update(
    id: string,
    updateCompanyDTO: UpdateCompanyDTO
  ): Promise<Company> {
    const existingCompany = await this.companyRespository.findById(id);
    if (!existingCompany) {
      throw new NotFoundError("Company not found");
    }

    if (existingCompany.cnpj !== updateCompanyDTO.cnpj) {
      if (!DocumentValidator.validateCNPJ(updateCompanyDTO.cnpj)) {
        throw new BadRequestError("Invalid CNPJ");
      }

      const company = await this.companyRespository.findByCNPJ(
        updateCompanyDTO.cnpj
      );
      if (company) {
        throw new ConflictError("Another Company already exists");
      }
    }

    return await this.companyRespository.update(id, updateCompanyDTO);
  }

  async delete(id: string): Promise<Company> {
    const company = await this.companyRespository.findById(id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return await this.companyRespository.delete(id);
  }
}
