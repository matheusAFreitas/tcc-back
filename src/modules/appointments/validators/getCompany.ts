import { ICompanyResponse } from '../../company/interfaces';
import { GetCompanyByNameService } from '../../company/services';

export async function getCompany(
  companyName: string
): Promise<ICompanyResponse> {
  const getCompany = new GetCompanyByNameService();
  const company = await getCompany.execute(companyName);

  return company;
}
