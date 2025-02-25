import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('logs')
export class Logs {
    @PrimaryColumn()
    id: string;

    @Column()
    user: string;

    @Column()
    service: string;

    @Column()
    path: string;

    @Column()
    responseCode: string;

    @Column()
    callTime: string;

    @Column()
    responseTime: string;
}