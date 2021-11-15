import { listAccounts } from "./dashboard";

const DATA = `
[
    \"p6n.p\",
    [
      \"p6n.a\",
      \"1\",
      \"名前\",
      \"名字\",
      \"name@company.local\",
      \"https://photoslh4.local/icon.png\",
      0,
      null,
      [
        \"p6n.gas\",
        \"company.local\"
      ],
      \"名前 名字\",
      \"name@company.local\"
    ],
    \"111379403671341091060\",
    null,
    \"https://accounts.google.com/Logout?service=cloudconsole&continue=https://console.cloud.google.com/?authuser%3D1&hl=en_US\",
    [
      [
        \"p6n.a\",
        \"0\",
        \"First\",
        \"Last\",
        \"master@personal.local\",
        \"https://photoslh4.local/icon.png\",
        0,
        null,
        [
          \"p6n.gas\",
          \"personal.local\"
        ],
        \"First Last\",
        \"master@personal.local\"
      ],
      [
        \"p6n.a\",
        \"2\",
        \"First\",
        \"Last\",
        \"handle@community.local\",
        \"https://photoslh4.local/icon.png\",
        0,
        null,
        [
          \"p6n.gas\",
          \"community.local\"
        ],
        \"First Last\",
        \"handle@community.local\"
      ],
      [
        \"p6n.a\",
        \"3\",
        \"\",
        \"\",
        \"number@edu.local\",
        \"https://photoslh4.local/icon.png\",
        0,
        null,
        [
          \"p6n.gas\",
          \"edu.local\"
        ],
        \" \",
        \"number@edu.local\"
      ],
      [
        \"p6n.a\",
        \"4\",
        \"First\",
        \"Last\",
        \"y@community2.local\",
        \"https://photoslh4.local/icon.png\",
        0,
        null,
        [
          \"p6n.gas\",
          \"community2.local\"
        ],
        \"First Last\",
        \"y@community2.local\"
      ],
      [
        \"p6n.a\",
        \"5\",
        \"otofune\",
        \"\",
        \"otofune@gmail.com\",
        \"https://photoslh5.local/icon.png\",
        0,
        null,
        null,
        \"otofune \",
        \"otofune@gmail.com\"
      ],
      [
        \"p6n.a\",
        \"6\",
        \"First\",
        \"Last\",
        \"otofune2@gmail.com\",
        \"https://photoslh5.local/icon.png\",
        0,
        null,
        null,
        \"First Last\",
        \"otofune2@gmail.com\"
      ],
      [
        \"p6n.a\",
        \"7\",
        \"名前\",
        \"名字\",
        \"otofune3@gmail.com\",
        \"https://photoslh4.local/icon.png\",
        0,
        null,
        null,
        \"名前 名字\",
        \"otofune3@gmail.com\"
      ],
      [
        \"p6n.a\",
        \"8\",
        \"First\",
        \"Last\",
        \"otofune4@gmail.com\",
        \"https://photoslh4.local/icon.png\",
        0,
        null,
        null,
        \"First Last\",
        \"otofune4@gmail.com\"
      ]
    ],
    1
  ]
`;

describe("listAccount", () => {
  test("can parse", () => {
    const expected = [
      ["name@company.local", 1],
      ["master@personal.local", 0],
      ["handle@community.local", 2],
      ["number@edu.local", 3],
      ["y@community2.local", 4],
      ["otofune@gmail.com", 5],
      ["otofune2@gmail.com", 6],
      ["otofune3@gmail.com", 7],
      ["otofune4@gmail.com", 8],
    ].map((a) => ({
      email: a[0],
      no: a[1].toString(),
    }));
    expect(listAccounts(JSON.parse(DATA))).toEqual(expected);
  });
});
