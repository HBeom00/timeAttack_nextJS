const revalidate: 10;
const Isrtest = async () => {
  const res = await fetch(
    "https://korean-advice-open-api.vercel.app/api/advice",
    {}
  );
  const data = await res.json();

  return (
    <div>
      <p>{data.author}</p>
      <p>{data.authorProfile}</p>
      <p>{data.message}</p>
    </div>
  );
};

export default Isrtest;
