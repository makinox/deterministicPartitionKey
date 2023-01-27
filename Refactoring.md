# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Well, my thoughts in order were
1. Look what was the function returning
2. Look when "candidate" was changing its value
3. Transform the code to not have nested validations
4. Organize the validations in a way that all validations work well

I think that is the best way because you can see the coda change the value step by step like a cascade, in the previous code the order was confusing for the nested validations

```js
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) return TRIVIAL_PARTITION_KEY;

  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
```

```js
const { deterministicPartitionKey } = require('./dpk');

describe("deterministicPartitionKey", () => {
  it("should return trivial partition key when event is undefined", () => {
    const event = undefined;
    const result = deterministicPartitionKey(event);
    expect(result).toBe("0");
  });

  it("should return partition key from event when present", () => {
    const event = { partitionKey: "test-partition-key" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("test-partition-key");
  });

  it("should return hashed partition key when event does not have partition key", () => {
    const event = { data: "test-event-data" };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });

  it("should return hashed partition key when partition key is too long", () => {
    const event = { partitionKey: "a".repeat(300) };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
});
```