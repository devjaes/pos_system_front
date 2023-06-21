module.exports = {
  root: true,
  extends: [
    '@tinkin',
    '@tinkin/eslint-config/react',
    '@tinkin/eslint-config/next',
  ],
  rules: {
    "import/order": [
      "error",
      {
        "newlines-between": "always-and-inside-groups",
        "pathGroups": [
          {
            "pattern": "~/**",
            "group": "external",
            "position": "after"
          }
        ],
        "groups": [
          "builtin",
          [ 
            "external", 
            "object"
          ]
        ]
      }
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" }
    ]
  }
};
