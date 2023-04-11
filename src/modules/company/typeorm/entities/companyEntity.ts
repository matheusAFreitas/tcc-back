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
  password: string;
}

export default Company;
