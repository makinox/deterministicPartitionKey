const { deterministicPartitionKey } = require('./deterministicPartitionKey');

describe('deterministicPartitionKey', () => {
  it('should return trivial partition key when event is undefined', () => {
    const event = undefined;
    const result = deterministicPartitionKey(event);
    expect(result).toBe('0');
  });

  it('should return partition key from event when present', () => {
    const event = { partitionKey: 'test-partition-key' };
    const result = deterministicPartitionKey(event);
    expect(result).toBe('test-partition-key');
  });

  it('should return hashed partition key when event does not have partition key', () => {
    const event = { data: 'test-event-data' };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });

  it('should return hashed partition key when partition key is too long', () => {
    const event = { partitionKey: 'a'.repeat(300) };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
});
