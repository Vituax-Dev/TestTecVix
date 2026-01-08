import { querySchema } from "../../../src/types/validations/Queries/queryListAll";

describe("queryListAll", () => {
  it("should validate query", () => {
    const query = { search: "value", page: "1", limit: "20", offset: "0" };
    const result = querySchema.safeParse(query);
    expect(result.success).toBe(true);
  });
});
