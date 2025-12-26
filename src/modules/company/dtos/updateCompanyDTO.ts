export interface UpdateCompanyDTO {
  cnpj?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}
