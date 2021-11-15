import {
  Account,
  checkProjectReachability,
  listAccounts,
} from "./lib/dashboard";

const KEY_ALREADY_REDIRECTED = "__wgaaw_already";
const KEY_PROJECTID = "project";

const findAccount = async (projectID: string): Promise<Account | undefined> => {
  const accounts = listAccounts();
  console.dir(accounts);
  for (const a of accounts) {
    if (await checkProjectReachability(projectID, a.no)) {
      return a;
    }
  }
  return undefined;
};

const main = async (currentURL: string = location.href) => {
  const url = new URL(currentURL);

  // recovery from navigation-error
  // expected format: /navigation-error;errorUrl={parcent encoded path+query}/{errorpage}
  if (url.pathname.startsWith("/navigation-error;")) {
    const errorUrlSplit = url.pathname.split(";")[1].split("errorUrl=");
    if (errorUrlSplit.length === 2 && errorUrlSplit[0] === "") {
      const errorPath = decodeURIComponent(errorUrlSplit[1].split("/")[0]);
      // split path and search for replace
      const errorUrl = new URL(`https://example.com/${errorPath}`);
      console.log(`recovery from navigation error: ${errorUrl}`);
      url.pathname = errorUrl.pathname;
      url.search = errorUrl.search;
    }
  }

  // check already redirected
  if (url.searchParams.get(KEY_ALREADY_REDIRECTED)) {
    console.log("already redirected");
    return;
  }
  url.searchParams.set(KEY_ALREADY_REDIRECTED, "1");

  const prevUrl = url.toString();

  // skip: if projectID is missing
  const projectID = url.searchParams.get(KEY_PROJECTID);
  if (!projectID) {
    console.log("[skip] project id is missing");
    return;
  }

  // TODO: cache chosen account (email)

  const acc = await findAccount(projectID);
  if (!acc) {
    console.log(`[skip] no account has permission of project ${projectID}`);
    return;
  }
  if (acc.current) {
    console.log(`[skip] current account has appropriate permission`);
    return;
  }
  url.searchParams.set("authuser", acc.no);

  console.log(`goto ${prevUrl} -> ${url}`);
  location.href = url.toString();
};

window.addEventListener("load", () => {
  main().catch((e) => {
    console.error(e);
  });
});
