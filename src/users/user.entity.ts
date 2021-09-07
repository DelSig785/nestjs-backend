import { Report } from 'src/reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column({ default: true })
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted user', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated user', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed user', this.id)
    }
}