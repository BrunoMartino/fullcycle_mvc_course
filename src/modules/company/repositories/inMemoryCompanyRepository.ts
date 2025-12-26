import { CompanyRepository } from "../../../interfaces/repositories/CompanyRepository";
import { NotFoundError } from "../../shared/errors/AppError";
import { CreateCompanyDTO } from "../dtos/createCompanyDTO";
import { UpdateCompanyDTO } from "../dtos/updateCompanyDTO";
import { Company } from "../models/Company";
import { v4 as uuidv4 } from "uuid";

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = [];

  constructor() {}

  async create(createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    const newCompany = {
      ...createCompanyDTO,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.companies.push(newCompany);

    return newCompany;
  }

  async findAll(): Promise<Company[]> {
    return [...this.companies];
  }

  async findByCNPJ(cnpj: string): Promise<Company | null> {
    return this.companies.find((company) => company.cnpj === cnpj) || null;
  }

  async findById(id: string): Promise<Company | null> {
    return this.companies.find((company) => company.id === id) || null;
  }

  async update(
    id: string,
    updateCompanyDTO: UpdateCompanyDTO
  ): Promise<Company> {
    const companyIndex = this.companies.findIndex((comp) => comp.id === id);
    const company = this.companies[companyIndex];
    if (!company) {
      throw new NotFoundError("Company not found");
    }

    const updatedCompany: Company = {
      ...company,
      ...updateCompanyDTO,

      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      updatedAt: new Date(),
    };

    this.companies[companyIndex] = updatedCompany;
    return updatedCompany;
  }

  async delete(id: string): Promise<any> {
    const companyIndex = this.companies.findIndex((comp) => comp.id === id);
    if (companyIndex === -1) {
      throw new NotFoundError("Company not found");
    }

    this.companies.splice(companyIndex, 1);
    return;
  }
}
