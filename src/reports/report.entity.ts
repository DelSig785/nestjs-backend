import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approved: boolean;

    @Column()
    price: number;

    @Column()
    model: string;
    
    @Column()
    year: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;

    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}