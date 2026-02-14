import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "src/data/enrollment.repository";

@Injectable()
export class GetAllEnrollments {
    constructor(private readonly repository: EnrollmentRepository) {}

    async execute() {
        return this.repository.findAll();
    }
}