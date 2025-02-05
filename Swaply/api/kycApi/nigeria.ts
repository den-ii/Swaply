import { baseUrl } from "../utilsApi";

export async function verifyNIN(
  url: string,
  { arg }: { arg: { nin: string; token: string } }
) {
  const res = await fetch(baseUrl + url, {
    method: "POST",
    body: JSON.stringify({
      IdentityNumber: arg.nin,
      IdentityType: "NIN",
    }),
    headers: {
      Authorization: "Bearer " + arg.token,
    },
  });
  const data = await res.json();
  console.log(data);
}

export async function verifyBVN(
  url: string,
  { arg }: { arg: { bvn: string; token: string } }
) {
  const res = await fetch(baseUrl + url, {
    method: "POST",
    body: JSON.stringify({
      IdentityNumber: arg.bvn,
      IdentityType: "BVN",
    }),
  });
  const data = await res.json();
  console.log(data);
}
