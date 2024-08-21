export type Provider = "github" | "gitlab";
export const providers: Provider[] = ["github", "gitlab"];

export const config = (provider: Provider) => {
  if (!providers.includes(provider)) {
    throw new Error(`Unsupported provider ${provider}`);
  }
  return {
    client: client[provider],
    auth: auth[provider],
  };
};

const auth: Record<
  Provider,
  { tokenHost: string; tokenPath: string; authorizePath: string }
> = {
  github: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize",
  },
  gitlab: {
    tokenHost: "https://gitlab.com",
    tokenPath: "/oauth/token",
    authorizePath: "/oauth/authorize",
  },
};

const client: Record<Provider, { id: string; secret: string }> = {
  github: {
    id: process.env.OAUTH_GITHUB_CLIENT_ID as string,
    secret: process.env.OAUTH_GITHUB_CLIENT_SECRET as string,
  },
  gitlab: {
    id: process.env.OAUTH_GITLAB_CLIENT_ID as string,
    secret: process.env.OAUTH_GITLAB_CLIENT_SECRET as string,
  },
};

// Logging to verify environment variables are set
console.log("GitHub Client ID:", process.env.OAUTH_GITHUB_CLIENT_ID);
console.log("GitHub Client Secret:", process.env.OAUTH_GITHUB_CLIENT_SECRET);
console.log("GitLab Client ID:", process.env.OAUTH_GITLAB_CLIENT_ID);
console.log("GitLab Client Secret:", process.env.OAUTH_GITLAB_CLIENT_SECRET);
