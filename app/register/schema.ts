import { z } from "zod";

export const MAX_FILE_SIZE = 4000000; // 4MB
export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export const memberSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    college: z.string().min(2, "College name is required"),
    rollNo: z.string().optional(),
    branch: z.string().optional(),
    accommodation: z.boolean(),
    food: z.enum(["Veg", "Non-Veg"]),
});

export const registrationSchema = z.object({
    teamName: z.string().min(3, "Team name must be at least 3 characters"),
    track: z.enum(["AI", "IoT", "Blockchain", "Open Innovation"]),
    teamSize: z.enum(["2", "3", "4", "5"]),
    members: z.array(memberSchema),
    upiReference: z.string().min(6, "UPI Reference ID is required"),
    paymentScreenshot: z
        .any()
        .refine((files) => files?.length == 1, "Payment screenshot is required.")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 4MB.`
        )
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .pdf files are accepted."
        ),
}).superRefine((data, ctx) => {
    // Validate leader (Member 1) specific fields

    if (!data.members[0].rollNo) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Roll No is required for the Team Leader",
            path: ["members", 0, "rollNo"],
        });
    }
    if (!data.members[0].branch) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Branch is required for the Team Leader",
            path: ["members", 0, "branch"],
        });
    }

    // Validate team size matches members array length
    if (data.members.length !== parseInt(data.teamSize)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Expected ${data.teamSize} members, but got ${data.members.length}`,
            path: ["members"],
        });
    }
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
