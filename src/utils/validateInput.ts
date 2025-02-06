export const isValidInput = (input: string) => {
  const trimmedInput = input.trim();

  // Domain regex for http:// or https:// followed by a valid domain and .com
  const domainRegex = /^(https?:\/\/)?(?!-)[A-Za-z0-9-]+(\.com)$/;

  // validating IPv4 addresses
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;

  //validating IPv6 addresses
  const ipv6Regex =
    /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|::([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$/;

  return (
    domainRegex.test(trimmedInput) ||
    ipRegex.test(trimmedInput) ||
    ipv6Regex.test(trimmedInput)
  );
};
