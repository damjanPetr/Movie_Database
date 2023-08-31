export function getFlag(flagCode: string) {
  const flagstr = `https://flagcdn.com/24x18/${flagCode.toLowerCase()}.png`;
  return flagstr;
}

export function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

export function getFullCountryName(arg: string) {
  // const countryTitle = new Intl.Locale(arg);
  // console.log(
  // "🚀 ~ file: func.ts:16 ~ getFullCountryName ~ countryTitle:",
  // countryTitle
  // );
  if (arg === "null") {
    return "No Language";
  } else {
    return new Intl.DisplayNames(undefined, {
      type: "region",
      // style: "long",
      // languageDisplay: "dialect",
      // fallback: "code",
      // localeMatcher: "best fit",
    }).of(arg);
  }
}

export function getCountryLanguage(arg: string) {
  // const countryTitle = new Intl.Locale(arg);
  // console.log(
  // "🚀 ~ file: func.ts:16 ~ getFullCountryName ~ countryTitle:",
  // countryTitle
  // );
  if (arg === "null") {
    return "No Language";
  }
  return new Intl.DisplayNames(undefined, { type: "language" }).of(arg);
}

export function getSideCountryName(arg: string) {
  // const ln = new Intl.DisplayNames(arg, { type: "region" }).of(arg);
  const ln = arg.toLocaleLowerCase();

  // const region = arg.toLocaleUpperCase();
  // const region = new Intl.DisplayNames(arg, { type: "language" }).of(arg);
  let region = new Intl.DisplayNames(undefined, { type: "region" }).of(arg);
  region = region?.toLocaleLowerCase();
  return `${ln}-${region}`;
}

export function getHighlight(text: string, filter: string) {
  const highight = text.match(new RegExp(filter, "i"));
  if (highight !== null) {
    const [left, right] = text.split(highight[0]);
    const middle = highight[0];
    return { left, middle, right };
  }
}
