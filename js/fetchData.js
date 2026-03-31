window.fetchData = async function () {
  const res  = await fetch("https://rmv-publish-dashboard.vercel.app/api/data");
  const json = await res.json();

  return json.data;
};