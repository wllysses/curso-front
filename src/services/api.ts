export async function getGoogleDriveData() {
  const response = await fetch(process.env.NEXT_PUBLIC_GOOGLEDRIVE_API_URL!, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export async function getGithubRepository() {
  const response = await fetch(
    "https://api.github.com/repos/wllysses/curso-desenvolvedor-de-app",
    {
      cache: "no-store",
    },
  );
  const data = await response.json();
  return data;
}
