import type { Faculty } from "@/types";

/** University faculties, programs and their course codes (ported from the Android app). */
export const FACULTIES: Faculty[] = [
  {
    id: "fba",
    name: "Faculty of Business Administration (FBA)",
    programs: [
      { id: "acc", name: "BSc in Accounting", facultyId: "fba", courses: ["ACCT 101", "ACCT 201", "FINC 101"] },
      { id: "bfin", name: "BSc in Banking and Finance", facultyId: "fba", courses: ["BFIN 101", "BFIN 201", "ECON 101"] },
      { id: "econ", name: "BSc in Economics", facultyId: "fba", courses: ["ECON 101", "ECON 201", "STAT 111"] },
      { id: "mkt", name: "BSc in Marketing", facultyId: "fba", courses: ["MKT 101", "MKT 201", "MGMT 101"] },
    ],
  },
  {
    id: "fesac",
    name: "Faculty of Engineering, Science and Computing (FESAC)",
    programs: [
      { id: "cs", name: "BSc in Computer Science", facultyId: "fesac", courses: ["CSC 101", "CSC 102", "CSC 201"] },
      { id: "it", name: "BSc in Information Technology", facultyId: "fesac", courses: ["IT 101", "IT 102", "NET 101"] },
      { id: "ce", name: "BSc in Civil Engineering", facultyId: "fesac", courses: ["CVL 101", "CVL 201", "MATH 111"] },
    ],
  },
  {
    id: "fhas",
    name: "Faculty of Health and Allied Sciences (FHAS)",
    programs: [
      { id: "nurs", name: "BSc in Nursing", facultyId: "fhas", courses: ["NURS 101", "NURS 201"] },
      { id: "pubh", name: "BSc in Public Health", facultyId: "fhas", courses: ["PUBH 101", "PUBH 201"] },
    ],
  },
  {
    id: "law",
    name: "Faculty of Law",
    programs: [{ id: "llb", name: "LLB (Bachelor of Laws)", facultyId: "law", courses: ["LAW 101", "LAW 102"] }],
  },
];