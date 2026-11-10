import { findValidTRM, getTRM } from "./trm.service";

describe("findValidTRM", () => {
  const data = [
    {
      valor: "3237.83",
      unidad: "COP",
      vigenciadesde: "2026-11-07T00:00:00.000",
      vigenciahasta: "2026-11-09T00:00:00.000",
    },
  ];

  it("should return the TRM valid for the given date", () => {
    const result = findValidTRM(data, "2026-11-09");

    expect(result?.valor).toBe("3237.83");
  });

  it("should return undefined when the date is outside the validity period", () => {
    const result = findValidTRM(data, "2026-11-10");

    expect(result).toBeUndefined();
  });

  it("should return undefined when the data array is empty", () => {
    const result = findValidTRM([], "2026-11-09");

    expect(result).toBeUndefined();
  });

  it("should accept the first day of the validity period", () => {
    const result = findValidTRM(data, "2026-11-07");

    expect(result?.valor).toBe("3237.83");
  });

  it("should accept the last day of the validity period", () => {
    const result = findValidTRM(data, "2026-11-09");

    expect(result?.valor).toBe("3237.83");
  });
});

describe("getTRM", () => {
  const mockFetch = jest.spyOn(global, "fetch");

  afterEach(() => {
    mockFetch.mockReset();
  });

  afterAll(() => {
    mockFetch.mockRestore();
  });

  it("should return the TRM value when the API responds successfully", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          valor: "3269.88",
          unidad: "COP",
          vigenciadesde: "2026-11-10T00:00:00.000",
          vigenciahasta: "2026-11-10T23:59:59.000",
        },
      ],
    } as Response);

    const result = await getTRM();

    expect(result).toBe(3269.88);
  });

  it("should throw an error when the API response is not successful", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getTRM()).rejects.toThrow(
      "Error fetching TRM data"
    );
  });

  it("should throw an error when the API returns an empty array", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    await expect(getTRM()).rejects.toThrow(
      "No TRM data available"
    );
  });

  it("should throw an error when the TRM value is zero", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          valor: "0",
          unidad: "COP",
          vigenciadesde: "2026-11-10T00:00:00.000",
          vigenciahasta: "2026-11-10T23:59:59.000",
        },
      ],
    } as Response);

    await expect(getTRM()).rejects.toThrow("Invalid TRM value");
  });

  it("should throw an error when the TRM value is not a number", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          valor: "invalid",
          unidad: "COP",
          vigenciadesde: "2026-11-10T00:00:00.000",
          vigenciahasta: "2026-11-10T23:59:59.000",
        },
      ],
    } as Response);

    await expect(getTRM()).rejects.toThrow("Invalid TRM value");
  });

  it("should throw an error when no TRM is available for today", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          valor: "3269.88",
          unidad: "COP",
          vigenciadesde: "2026-11-07T00:00:00.000",
          vigenciahasta: "2026-11-09T00:00:00.000",
        },
      ],
    } as Response);

    await expect(getTRM()).rejects.toThrow(
      "No TRM available for today"
    );
  });
});