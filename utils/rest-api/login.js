export const loginUser = async (credentials) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Login failed');
  }

  return res.json();
};
