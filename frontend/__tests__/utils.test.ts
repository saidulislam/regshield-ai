import { cn, formatDate, formatCurrency, getScoreGrade, calculateDaysUntil } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("merges tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("formatDate", () => {
  it("formats a date string", () => {
    const result = formatDate("2026-03-15");
    expect(result).toContain("Mar");
    expect(result).toContain("2026");
    // Date may vary by timezone, just check it contains a day number
    expect(result).toMatch(/\d{1,2}/);
  });
});

describe("formatCurrency", () => {
  it("formats cents to dollars", () => {
    expect(formatCurrency(500000)).toBe("$5,000");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });
});

describe("getScoreGrade", () => {
  it("returns A for 90+", () => {
    const grade = getScoreGrade(95);
    expect(grade.grade).toBe("A");
    expect(grade.label).toBe("Excellent");
  });

  it("returns B for 70-89", () => {
    const grade = getScoreGrade(72);
    expect(grade.grade).toBe("B");
    expect(grade.label).toBe("Good");
  });

  it("returns C for 50-69", () => {
    const grade = getScoreGrade(55);
    expect(grade.grade).toBe("C");
    expect(grade.label).toBe("Needs Attention");
  });

  it("returns D for <50", () => {
    const grade = getScoreGrade(30);
    expect(grade.grade).toBe("D");
    expect(grade.label).toBe("At Risk");
  });
});

describe("calculateDaysUntil", () => {
  it("returns positive for future dates", () => {
    const future = new Date();
    future.setDate(future.getDate() + 10);
    expect(calculateDaysUntil(future.toISOString())).toBe(10);
  });

  it("returns negative for past dates", () => {
    const past = new Date();
    past.setDate(past.getDate() - 5);
    expect(calculateDaysUntil(past.toISOString())).toBe(-5);
  });
});
