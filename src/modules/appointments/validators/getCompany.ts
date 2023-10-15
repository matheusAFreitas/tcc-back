import { ICompanyResponse } from '@modules/company/interfaces';
import { GetCompanyByNameService } from '@modules/company/services';

export async function getCompany(
  companyName: string
): Promise<ICompanyResponse> {
  const getCompany = new GetCompanyByNameService();
  const company = await getCompany.execute(companyName);

  return company;
}
