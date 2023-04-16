import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('companies')
class Company {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column()
  cnpj: string;

  @Column()
  availableSeats: number;

  @Column()
  primaryColor: string;

  @Column()
  secondaryColor: string;

  @Column()
  password: string;
}

export default Company;
