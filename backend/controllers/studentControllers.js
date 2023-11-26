import asyncHandler from "express-async-handler";
import studentModel from "../models/studentModels.js";

export const getStudents = asyncHandler(async (req, res) => {
  const students = await studentModel.find();
  res.json(students);
});

export const getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await studentModel.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  res.json(student);
});

export const addStudent = asyncHandler(async (req, res) => {
  const { name, email, contact } = req.body;
  if (!name || !email || !contact) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const student = await studentModel.create({
    name,
    email,
    contact,
  });
  res.json(student);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const student = await studentModel.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  const updateStudent = await studentModel.findByIdAndUpdate(
    id,
    { name, email, contact },
    { new: true }
  );
  res.json(updateStudent);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await studentModel.findById(id);
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  await studentModel.deleteOne();
  res.json({ id });
});
