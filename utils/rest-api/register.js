// Utils/api.js

export async function registerUser(data) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    return result;
  } catch (error) {
    throw error;
  }
}
