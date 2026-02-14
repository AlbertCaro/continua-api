import { Injectable } from "@nestjs/common";
import { CourseRepository } from "src/data/course.repository";

@Injectable()
export class GetAllCourses {
    constructor(private readonly repository: CourseRepository) {}

    async execute() {
        return this.repository.findAll();
    }
}