/** "Faculty of Law" -> "Law", "Faculty of Business Administration (FBA)" -> "FBA". */
export const shortFaculty = (name: string) => name.match(/\(([^)]+)\)/)?.[1] ?? name.replace(/^Faculty of /, "");