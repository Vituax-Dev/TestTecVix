// helpers: IPv4 e IPv6 (com /prefix opcional)
const ipv4Part = "(25[0-5]|2[0-4]\\d|1?\\d?\\d)"; // 0-255
const ipv4Core = `(?:${ipv4Part}\\.){3}${ipv4Part}`;
const ipv4WithOptCIDR = new RegExp(
  `^${ipv4Core}(?:\\/(3[0-2]|[12]?\\d))?$`,
  "i",
);

// IPv6 (todas variantes relevantes, incluindo :: e mapeado para IPv4) + CIDR 0–128
const ipv6WithOptCIDR = (() => {
  const h = "[0-9A-Fa-f]{1,4}";
  // Reaproveita o IPv4 já definido para casos IPv4-embedded (ex.: ::ffff:192.168.0.1)
  const v4 = ipv4Core;
  const body =
    "(" +
    `(${h}:){7}${h}` + // 1:2:3:4:5:6:7:8
    "|(" +
    h +
    ":){1,7}:" + // 1::  or  1:2:3:4:5:6:7::
    "|(" +
    h +
    ":){1,6}:" +
    h + // 1::8  or  1:2:3:4:5:6::8
    "|(" +
    h +
    ":){1,5}(:" +
    h +
    "){1,2}" + // 1::7:8 ... 1:2:3:4:5::7:8
    "|(" +
    h +
    ":){1,4}(:" +
    h +
    "){1,3}" + // 1::6:7:8 ... 1:2:3:4::6:7:8
    "|(" +
    h +
    ":){1,3}(:" +
    h +
    "){1,4}" + // 1::5:6:7:8 ... 1:2:3::5:6:7:8
    "|(" +
    h +
    ":){1,2}(:" +
    h +
    "){1,5}" + // 1::4:5:6:7:8 ... 1:2::4:5:6:7:8
    "|" +
    h +
    ":(:" +
    h +
    "){1,6}" + // 1::3:4:5:6:7:8
    "|:((:" +
    h +
    "){1,7}|:)" + // ::2:3:4:5:6:7:8  or  ::
    "|fe80:(:" +
    h +
    "){0,4}%[0-9A-Za-z]{1,}" + // fe80::7:8%eth0  (link-local com zone id)
    "|::(ffff(:0{1,4}){0,1}:){0,1}" +
    v4 + // ::255.255.255.255, ::ffff:255.255.255.255, ::ffff:0:255.255.255.255
    "|(" +
    h +
    ":){1,4}:" +
    v4 + // 1:2:3:4:255.255.255.255
    ")";
  const cidr = "(?:\\/(12[0-8]|1[01]\\d|\\d?\\d))?"; // 0–128
  return new RegExp(`^${body}${cidr}$`, "i");
})();

export const isIPv4OrCIDR = (value: string) => ipv4WithOptCIDR.test(value);
export const isIPv6OrCIDR = (value: string) => ipv6WithOptCIDR.test(value);
