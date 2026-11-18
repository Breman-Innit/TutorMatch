export interface User {
  id: string; name: string; email: string; facultyId: string; programId: string;
  yearOfStudy: number; role: "student" | "tutor"; isApprovedTutor: boolean;
  tutorApplicationStatus: "none" | "pending" | "approved" | "rejected";
}

export interface Program { id: string; name: string; facultyId: string; courses: string[]; }
export interface Faculty { id: string; name: string; programs: Program[]; }
export interface Tutor {
  id: string; userId: string; name: string; subjects: string[]; faculty: string;
  program: string; role: "Staff Tutor" | "Student Tutor"; qualification: string;
  verifiedBy: string; bio: string; rating: number; reviewCount: number; studentRate: number;
  isVerified: boolean; isCampusTutor: boolean; availability: string[]; location: string; photoUrl?: string;
}
export interface TutorReview { id: string; tutorId: string; studentName: string; rating: number; reviewText: string; date: string; subject: string; }
export type PaymentMethod = "Mobile Money (MoMo)" | "Card" | "Bank Transfer" | "Cash";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export interface Booking {
  id: string; tutorId: string; tutorName: string; subject: string; date: string; time: string;
  location: string; price: number; paymentMethod: PaymentMethod; studentId: string; studentName: string;
  status: BookingStatus; ratingGiven: boolean; tutorRating: number; reviewText: string;
}
