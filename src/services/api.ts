export async function getGoogleDriveData() {
  const response = await fetch(process.env.NEXT_PUBLIC_GOOGLEDRIVE_API_URL!);
  const data = await response.json();
  return data;
}

export async function getGithubRepositories() {
  const response = await fetch(process.env.NEXT_PUBLIC_GITHUB_API_URL!);
  const data = await response.json();
  return data;
}
