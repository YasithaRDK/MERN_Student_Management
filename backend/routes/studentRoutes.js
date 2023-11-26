import { Router } from "express";
import {
  getStudent,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentControllers.js";

const router = Router();

router.route("/").get(getStudents).post(addStudent);

router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);

export default router;
