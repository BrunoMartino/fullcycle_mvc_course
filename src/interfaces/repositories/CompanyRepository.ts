import { CreateCompanyDTO } from "../../modules/company/dtos/createCompanyDTO";
import { UpdateCompanyDTO } from "../../modules/company/dtos/updateCompanyDTO";
import { Company } from "../../modules/company/models/Company";

export interface CompanyRepository {
  create(createCompanyDTO: CreateCompanyDTO): Promise<Company>;
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company | null>;
  findByCNPJ(cnpj: string): Promise<Company | null>;
  update(id: string, updateCompanyDTO: UpdateCompanyDTO): Promise<Company>;
  delete(id: string): Promise<any>;
}
