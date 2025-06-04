export async function GET(): Promise<Response> {
  const response = Response.json({
    user: {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "admin",
    },
    permissions: ["read", "write", "delete"],
  });

  return response;
}
