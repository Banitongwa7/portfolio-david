import { describe, expect, it } from "vitest";
import { formatLongDate, formatRange, formatRole, formatShortDate } from "@/utils/format";

describe("formatRange", () => {
  it("turns month/year pairs into short month names", () => {
    expect(formatRange("04/2026 - Now")).toBe("Apr 2026 – now");
    expect(formatRange("01/2023 - 12/2024")).toBe("Jan 2023 – Dec 2024");
  });
});

describe("formatRole", () => {
  it("puts the job first and the kind of contract after it", () => {
    expect(formatRole("Internship - Microsoft Power Platform Consultant")).toBe(
      "Microsoft Power Platform Consultant, internship"
    );
    expect(formatRole("React JS Developer - Freelance")).toBe("React JS Developer, freelance");
  });

  it("leaves a role without a dash alone", () => {
    expect(formatRole("Software Engineer")).toBe("Software Engineer");
  });
});

describe("dates", () => {
  // UTC on purpose: the server's time zone must not shift the day.
  it("formats in UTC", () => {
    expect(formatShortDate("2025-12-07T23:30:00.000Z")).toBe("7 Dec 2025");
    expect(formatLongDate("2025-12-07T23:30:00.000Z")).toBe("7 December 2025");
  });
});
