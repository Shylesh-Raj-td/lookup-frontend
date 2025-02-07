import { isValidInput } from "../utils/validateInput";

describe("isValidInput", () => {
  it("should return true for valid domain with http", () => {
    expect(isValidInput("http://example.com")).toBe(true);
  });

  it("should return true for valid domain with https", () => {
    expect(isValidInput("https://example.com")).toBe(true);
  });

  it("should return true for valid domain without http(s)", () => {
    expect(isValidInput("example.com")).toBe(true);
  });

  it("should return false for invalid domain", () => {
    expect(isValidInput("example")).toBe(false);
  });

  it("should return false for domain with invalid TLD", () => {
    expect(isValidInput("example.xyz")).toBe(false);
  });

  it("should return true for valid IPv4 address", () => {
    expect(isValidInput("192.168.1.1")).toBe(true);
  });

  it("should return false for invalid IPv4 address", () => {
    expect(isValidInput("999.999.999.999")).toBe(false);
  });

  it("should return false for partially valid IPv4 address", () => {
    expect(isValidInput("192.168.1")).toBe(false);
  });

  it("should return true for valid IPv6 address", () => {
    expect(isValidInput("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
  });

  it("should return false for invalid IPv6 address", () => {
    expect(isValidInput("2001:db8::85a3::8a2e:370:7334::")).toBe(false);
  });

  it("should return false for incomplete IPv6 address", () => {
    expect(isValidInput("2001:db8:85a3::")).toBe(false);
  });
});
