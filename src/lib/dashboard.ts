import * as zod from "zod";

const projectUrl = (projectID: string, authuser: string) =>
  `https://console.cloud.google.com/m/project/${projectID}?authuser=${authuser}`;

export const checkProjectReachability = async (
  projectID: string,
  authuser: string
): Promise<boolean> => {
  const status = await fetch(projectUrl(projectID, authuser), {
    credentials: "include",
  }).then((r) => r.status);
  switch (status) {
    case 200:
      return true;
    case 401: // account needs sign-in again
    case 403: // forbidden
      return false;
  }
  throw new Error(
    `failed to check project reachability. unexpected status code seen: ${status}`
  );
};

const schemaPantheonAccountChooserData_account = zod.tuple([
  zod.string(), // type (?)
  zod.string(), // authuser number
  zod.string(), // first name
  zod.string(), // last name
  zod.string(), // email
  zod.string(), // icon url
  zod.number(), // ?
  zod.unknown(), // ?
  zod.unknown(), // ?
  zod.string(), // joined name?
  zod.string(), // email (again?)
]);
const schemaPantheonAccountChooserData = zod.tuple([
  zod.string(), // type (?)
  schemaPantheonAccountChooserData_account, // current user
  zod.string(), // ?
  zod.unknown(), // ?
  zod.string(), // logout url
  zod.array(schemaPantheonAccountChooserData_account),
  zod.number(), // current authuser (maybe)
]);

export type Account = {
  no: string;
  email: string;
  current?: true;
};

const convertToAccount = (
  account: zod.TypeOf<typeof schemaPantheonAccountChooserData_account>
): Account => ({
  no: account[1],
  email: account[4],
});
export const listAccounts = (
  data: unknown = window.pantheon_account_chooser_data
): Account[] => {
  console.log("listAccounts...");
  const src = schemaPantheonAccountChooserData.parse(data);
  const currentAccount = src[1];
  const accounts = src[5];
  return [
    { ...convertToAccount(currentAccount), current: true },
    ...accounts.map(convertToAccount),
  ];
};
