import { pgTable, text, timestamp, integer, varchar, uuid, boolean, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").default(false),
    name: varchar("name", { length: 255 }),
    image: text("image"),
    hashedPassword: text("hashed_password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Accounts table for OAuth
export const accounts = pgTable("accounts", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    accountId: varchar("account_id", { length: 255 }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Sessions table
export const sessions = pgTable("sessions", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Students table with additional profile information
export const students = pgTable("students", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
    enrollmentNumber: varchar("enrollment_number", { length: 50 }).notNull().unique(),
    age: integer("age"),
    phone: varchar("phone", { length: 20 }),
    department: varchar("department", { length: 100 }),
    semester: integer("semester"),
    batch: varchar("batch", { length: 20 }),
    address: text("address"),
    emergencyContact: varchar("emergency_contact", { length: 20 }),
    emergencyContactName: varchar("emergency_contact_name", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Subjects table
export const subjects = pgTable("subjects", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 50 }).notNull().unique(),
    semester: integer("semester").notNull(),
    credits: integer("credits").notNull(),
    instructor: varchar("instructor", { length: 255 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Student-Subject enrollments
export const enrollments = pgTable("enrollments", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
    subjectId: uuid("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
    enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
    attendance: decimal("attendance", { precision: 5, scale: 2 }).default("0"),
});

// Exams table
export const exams = pgTable("exams", {
    id: uuid("id").primaryKey().defaultRandom(),
    subjectId: uuid("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    examDate: timestamp("exam_date").notNull(),
    duration: integer("duration"), // in minutes
    totalMarks: integer("total_marks").notNull(),
    examType: varchar("exam_type", { length: 50 }), // midterm, final, quiz
    venue: varchar("venue", { length: 255 }),
    instructions: text("instructions"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Results table
export const results = pgTable("results", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
    examId: uuid("exam_id").notNull().references(() => exams.id, { onDelete: "cascade" }),
    marksObtained: decimal("marks_obtained", { precision: 5, scale: 2 }).notNull(),
    grade: varchar("grade", { length: 5 }),
    remarks: text("remarks"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Feedback table
export const feedback = pgTable("feedback", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
    subject: varchar("subject", { length: 255 }).notNull(),
    message: text("message").notNull(),
    rating: integer("rating"), // 1-5 rating
    category: varchar("category", { length: 100 }), // academic, infrastructure, faculty, etc.
    status: varchar("status", { length: 50 }).default("pending"), // pending, reviewed, resolved
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
    student: one(students, {
        fields: [users.id],
        references: [students.userId],
    }),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
    user: one(users, {
        fields: [students.userId],
        references: [users.id],
    }),
    enrollments: many(enrollments),
    results: many(results),
    feedback: many(feedback),
}));

export const subjectsRelations = relations(subjects, ({ many }) => ({
    enrollments: many(enrollments),
    exams: many(exams),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
    student: one(students, {
        fields: [enrollments.studentId],
        references: [students.id],
    }),
    subject: one(subjects, {
        fields: [enrollments.subjectId],
        references: [subjects.id],
    }),
}));

export const examsRelations = relations(exams, ({ one, many }) => ({
    subject: one(subjects, {
        fields: [exams.subjectId],
        references: [subjects.id],
    }),
    results: many(results),
}));

export const resultsRelations = relations(results, ({ one }) => ({
    student: one(students, {
        fields: [results.studentId],
        references: [students.id],
    }),
    exam: one(exams, {
        fields: [results.examId],
        references: [exams.id],
    }),
}));
