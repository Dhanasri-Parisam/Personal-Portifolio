import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GITHUB_USER_API = "https://api.github.com/users/Dhanasri-Parisam";

const AboutProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const response = await fetch(GITHUB_USER_API);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <Link
            to="/about"
            className="rounded-full border border-orange-300 px-4 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-50"
          >
            Back to About
          </Link>
        </div>

        {isLoading && (
          <div className="animate-pulse rounded-2xl border border-slate-200 p-5">
            <div className="mb-3 h-6 w-44 rounded bg-slate-200" />
            <div className="mb-2 h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
          </div>
        )}

        {!isLoading && hasError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Unable to fetch profile right now.
          </p>
        )}

        {!isLoading && !hasError && profile && (
          <div className="flex flex-col gap-5 md:flex-row">
            <img
              src={profile.avatar_url}
              alt={profile.name || profile.login}
              className="h-28 w-28 rounded-full border border-slate-200 object-cover"
            />
            <div className="min-w-0">
              <h2 className="text-xl font-semibold text-slate-900">{profile.name || profile.login}</h2>
              <p className="text-sm text-orange-600">@{profile.login}</p>
              {profile.bio && <p className="mt-3 text-sm text-slate-600">{profile.bio}</p>}
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700">
                <span className="rounded-full bg-orange-50 px-3 py-1">Repos: {profile.public_repos}</span>
                <span className="rounded-full bg-orange-50 px-3 py-1">Followers: {profile.followers}</span>
                <span className="rounded-full bg-orange-50 px-3 py-1">Following: {profile.following}</span>
              </div>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Open GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutProfile;
