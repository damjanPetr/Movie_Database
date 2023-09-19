import { RiDeleteBack2Fill } from "react-icons/ri";

export function getFlag(flagCode: string) {
  // const flagstr = `https://flagcdn.com/24x18/${flagCode.toLowerCase()}.png`;
  const flagstr = `./assets/flag/${flagCode.toLowerCase()}.svg`;
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

export const convertLinks = (videoId: string) => {
  const imageUrl = `https://i.ytimg.com/vi/${videoId}/${"hq"}${"default"}.jpg`;
  return imageUrl;
};
export function setBubble(range: any, bubble: HTMLOutputElement) {
  const val = parseInt(range.value);
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = String(val);
  let timer;
  clearTimeout(timer);

  function debounce() {
    bubble.classList.add("opacity-0", "transition-opacity");
    return;
  }
  timer = setTimeout(debounce, 1200);

  bubble.classList.remove("opacity-0", "transition-opacity");

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.3}px))`;
}
