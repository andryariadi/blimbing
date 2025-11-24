export const getCustomers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`);

    if (!res.ok) {
      throw new Error("Failed to fetch customers");
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
