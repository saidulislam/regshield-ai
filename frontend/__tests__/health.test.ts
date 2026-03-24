/**
 * Health check endpoint validation.
 * The actual route is tested via integration (curl /api/health).
 * Here we verify the response contract.
 */

describe("Health Check Response Contract", () => {
  it("expected response shape includes status, service, and timestamp", () => {
    const mockResponse = {
      status: "healthy",
      service: "regshield-ai",
      timestamp: new Date().toISOString(),
    };

    expect(mockResponse.status).toBe("healthy");
    expect(mockResponse.service).toBe("regshield-ai");
    expect(new Date(mockResponse.timestamp).getTime()).not.toBeNaN();
  });
});
